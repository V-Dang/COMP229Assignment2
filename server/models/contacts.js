//COMP229-Assignment-2-Vivian-Dang-302278335
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactsModel = mongoose.Schema(
    {
        c_name: String,
        c_number: Number,
        c_email: String,
    },

    {
        collection: "contacts",
    }
);

module.exports = mongoose.model('Contact', contactsModel);

//THEN create route to connect to book model in route folder
