let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let bookModel = mongoose.Schema(
    {
        name: String,
        author: String,
        published: String,
        description: String,
        price: Number,
    },

    {
        collection: "books",
    }
);

module.exports = mongoose.model('Book', bookModel);

//THEN create route to connect to book model in route folder
