const sampleListings = [
    {
        title: "Cozy Mountain Cottage",
        description: "A peaceful cottage surrounded by hills, pine trees and fresh mountain air.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        },
        price: 2500,
        location: "Dehradun",
        country: "India",
        category: "mountains",
        geometry: {
            type: "Point",
            coordinates: [78.0322, 30.3165]
        }
    },
    {
        title: "Wooden Cabin in Manali",
        description: "A warm wooden cabin surrounded by snowy mountains and peaceful valleys.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233"
        },
        price: 4200,
        location: "Manali",
        country: "India",
        category: "mountains",
        geometry: {
            type: "Point",
            coordinates: [77.1892, 32.2432]
        }
    },
    {
        title: "Forest Retreat in Mussoorie",
        description: "A peaceful forest retreat with mountain views and a cozy interior.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
        },
        price: 3700,
        location: "Mussoorie",
        country: "India",
        category: "forest",
        geometry: {
            type: "Point",
            coordinates: [78.0664, 30.4598]
        }
    },
    {
        title: "Beachside Villa",
        description: "A beautiful villa close to the beach with relaxing sea views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        },
        price: 6000,
        location: "Goa",
        country: "India",
        category: "beach",
        geometry: {
            type: "Point",
            coordinates: [74.1240, 15.2993]
        }
    },
    {
        title: "Luxury Apartment in Delhi",
        description: "Modern apartment located near popular city attractions and markets.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
        },
        price: 4500,
        location: "New Delhi",
        country: "India",
        category: "city",
        geometry: {
            type: "Point",
            coordinates: [77.2090, 28.6139]
        }
    },
    {
        title: "Lake View Stay",
        description: "A relaxing stay with a beautiful lake view and calm surroundings.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
        },
        price: 3500,
        location: "Nainital",
        country: "India",
        category: "lake",
        geometry: {
            type: "Point",
            coordinates: [79.4636, 29.3919]
        }
    },
    {
        title: "Modern Jaipur Haveli",
        description: "Traditional Rajasthani design with modern comfort in the heart of Jaipur.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b"
        },
        price: 5200,
        location: "Jaipur",
        country: "India",
        category: "heritage",
        geometry: {
            type: "Point",
            coordinates: [75.7873, 26.9124]
        }
    },
    {
        title: "Riverside Homestay",
        description: "A comfortable homestay near the river with a peaceful natural environment.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1494526585095-c41746248156"
        },
        price: 2800,
        location: "Rishikesh",
        country: "India",
        category: "forest",
        geometry: {
            type: "Point",
            coordinates: [78.2676, 30.0869]
        }
    },
    {
        title: "Premium Stay in Mumbai",
        description: "A stylish city apartment close to restaurants, cafes and business areas.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
        },
        price: 7000,
        location: "Mumbai",
        country: "India",
        category: "city",
        geometry: {
            type: "Point",
            coordinates: [72.8777, 19.0760]
        }
    },
    {
        title: "Tea Garden Bungalow",
        description: "A peaceful bungalow surrounded by tea gardens and misty hills.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
        },
        price: 3900,
        location: "Darjeeling",
        country: "India",
        category: "mountains",
        geometry: {
            type: "Point",
            coordinates: [88.2636, 27.0410]
        }
    },
    {
        title: "Backwater Houseboat Stay",
        description: "A unique houseboat stay with calm backwater views and traditional meals.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1"
        },
        price: 8000,
        location: "Alleppey",
        country: "India",
        category: "lake",
        geometry: {
            type: "Point",
            coordinates: [76.3388, 9.4981]
        }
    },
    {
        title: "Heritage Stay in Udaipur",
        description: "A beautiful heritage-style property near lakes and royal architecture.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        },
        price: 5800,
        location: "Udaipur",
        country: "India",
        category: "heritage",
        geometry: {
            type: "Point",
            coordinates: [73.7125, 24.5854]
        }
    },
    {
        title: "Peaceful Coorg Villa",
        description: "A private villa surrounded by coffee plantations and green hills.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        },
        price: 4800,
        location: "Coorg",
        country: "India",
        category: "forest",
        geometry: {
            type: "Point",
            coordinates: [75.8069, 12.3375]
        }
    },
    {
        title: "City View Apartment",
        description: "A clean and modern apartment with a beautiful city skyline view.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
        },
        price: 5500,
        location: "Bengaluru",
        country: "India",
        category: "city",
        geometry: {
            type: "Point",
            coordinates: [77.5946, 12.9716]
        }
    },
    {
        title: "Desert Camp Experience",
        description: "A unique desert stay with tents, cultural music and night sky views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
        },
        price: 4300,
        location: "Jaisalmer",
        country: "India",
        category: "desert",
        geometry: {
            type: "Point",
            coordinates: [70.9083, 26.9157]
        }
    }
];

module.exports = { data: sampleListings };