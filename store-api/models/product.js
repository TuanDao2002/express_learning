const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name must be provided"],
    },

    price: {
        type: Number,
        require: [true, "price must be provided"],
    },

    featured: {
        type: Boolean,
        default: false,
    },

    rating: {
        type: Number,
        default: 4.5,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

    company: {
        type: String,
        enum:{
            values: ["ikea", "liddy", "caressa", "marcos"], // limit the number of options for this attribute
            message: '{VALUE} is not supported' // custom error message indicates that the value input is not supported
        },
    },
});

module.exports = mongoose.model('Product', productSchema);
