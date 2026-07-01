const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const app = express();

require("dotenv").config();

const mongoose = require("mongoose");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const passport = require("passport");
const LocalStrategy = require("passport-local");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Booking = require("./models/booking.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");

const geocodeAddress = require("./utils/geocode.js");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");

const { listingSchema } = require("./schema.js");
const { isLoggedIn } = require("./middleware.js");
const { saveRedirectUrl } = require("./middleware.js");

const dbURL = process.env.ATLASDB;

if (!dbURL) {
    throw new Error("ATLASDB is missing in .env file");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));


const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: "mysupersecret"
    },
    touchAfter: 24 * 3600
});

store.on("error", (err) => {
    console.log("Mongo session store error", err);
});


const sessionOptions = {
    store: store,
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
     res.redirect("/listings");
});


// Signup
app.post(
    "/signup",
    wrapAsync(async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            const newUser = new User({
                email,
                username
            });

            const registeredUser = await User.register(newUser, password);

            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }

                res.redirect("/listings");
            });
        } catch (err) {
            res.render("error.ejs", {
                title: "Signup failed",
                message: err.message || "This username or email may already exist. Please try again."
            });
        }
    })
);


// Login
app.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login-error"
    }),
    (req, res) => {
        const redirectUrl = res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    }
);

app.get("/login-error", (req, res) => {
    res.render("error.ejs", {
        title: "Invalid login",
        message: "Your username or password is incorrect. Please check your details and try again."
    });
});

// Validate listing middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const message = error.details
            .map((detail) => detail.message)
            .join(", ");

        throw new ExpressError(400, message);
    }

    next();
};


// Index route
app.get(
    "/listings",
    wrapAsync(async (req, res) => {
        const { category, search } = req.query;

        let filter = {};

        if (category && category !== "all") {
            filter.category = category;
        }

        if (search && search.trim() !== "") {
            const searchRegex = new RegExp(search.trim(), "i");

            filter.$or = [
                { title: searchRegex },
                { location: searchRegex },
                { country: searchRegex },
                { category: searchRegex }
            ];
        }

        const data = await Listing.find(filter);

        res.render("listings/index.ejs", {
            data: data,
            selectedCategory: category || "all",
            searchQuery: search || ""
        });
    })
);


// New listing form
app.get("/listings/new", isLoggedIn, (req, res) => {
    res.render("listings/form", {});
});


// Show route
app.get(
    "/listings/:id",
    wrapAsync(async (req, res) => {
        const { id } = req.params;

        const data = await Listing
            .findById(id)
            .populate("reviews");

        if (!data) {
            throw new ExpressError(404, "Listing not found");
        }

        res.render("listings/show", {
            data,
            geoapifyKey: process.env.GEOAPIFY_API_KEY
        });
    })
);


// Create listing
app.post(
    "/listings",
    isLoggedIn,
    validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);

        const geoData = await geocodeAddress(
            newListing.location,
            newListing.country
        );

        newListing.geometry = {
            type: "Point",
            coordinates: geoData.coordinates
        };

        await newListing.save();

        res.redirect("/listings");
    })
);


// Review route
app.post(
    "/listings/:id/reviews",
    wrapAsync(async (req, res) => {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            throw new ExpressError(404, "Listing not found");
        }

        const newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        res.redirect(`/listings/${req.params.id}`);
    })
);


// Booking route
app.post(
    "/listings/:id/bookings",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const { id } = req.params;

        if (!req.body.booking) {
            throw new ExpressError(400, "Booking data is missing");
        }

        const { checkIn, checkOut, guests } = req.body.booking;

        if (!checkIn || !checkOut || !guests) {
            throw new ExpressError(
                400,
                "Check-in, check-out and guests are required"
            );
        }

        const listing = await Listing.findById(id);

        if (!listing) {
            throw new ExpressError(404, "Listing not found");
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (
            isNaN(checkInDate.getTime()) ||
            isNaN(checkOutDate.getTime())
        ) {
            throw new ExpressError(400, "Invalid booking dates");
        }

        if (checkOutDate <= checkInDate) {
            throw new ExpressError(
                400,
                "Check-out date must be after check-in date"
            );
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkInDate < today) {
            throw new ExpressError(
                400,
                "Check-in date cannot be in the past"
            );
        }

        const guestCount = Number(guests);

        if (!guestCount || guestCount < 1) {
            throw new ExpressError(
                400,
                "At least 1 guest is required"
            );
        }

        const overlappingBooking = await Booking.findOne({
            listing: id,
            status: { $ne: "cancelled" },
            checkIn: { $lt: checkOutDate },
            checkOut: { $gt: checkInDate }
        });

        if (overlappingBooking) {
            throw new ExpressError(
                400,
                "This property is already booked for selected dates"
            );
        }

        const oneDay = 1000 * 60 * 60 * 24;

        const nights = Math.ceil(
            (checkOutDate - checkInDate) / oneDay
        );

        const pricePerNight = Number(listing.price || 0);

        const subtotal = pricePerNight * nights;

        const serviceFee = Math.round(subtotal * 0.12);

        const tax = Math.round(subtotal * 0.18);

        const totalPrice = subtotal + serviceFee + tax;

        const booking = new Booking({
            listing: id,
            user: req.user._id,

            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: guestCount,

            nights,
            pricePerNight,
            subtotal,
            serviceFee,
            tax,
            totalPrice,

            status: "confirmed"
        });

        await booking.save();

        await booking.populate("listing");

        res.render("sucess", {
            booking: booking
        });
    })
);


// 404 route
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;

    res.status(statusCode).send(message);
});


// Database connection + server start
async function main() {
    await mongoose.connect(dbURL);
}

main()
    .then(() => {
        console.log("Database connected");

        app.listen(8080, () => {
            console.log("Server is listening to port 8080");
        });
    })
    .catch((err) => {
        console.log("Database connection error");
        console.log(err);
    });
