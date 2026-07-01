const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("Database connected");

    await initDB();
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
};

main()
    .then(() => {
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });