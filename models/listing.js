const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema= new Schema({
title: {
        type: String,
        required: true
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage"
        },

        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
        }
    },

    price: Number,
    location: String,
    country: String,
    category: {
    type: String,
    enum: ["mountains", "beach", "city", "lake", "desert", "forest", "heritage"],
    required: true
},
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner :{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;