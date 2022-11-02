//COMP229-Assignment-2-Vivian-Dang-302278335
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to contact model
let Contact = require("../models/contacts");

//GET Route for the contact list page - READ Operation
module.exports.displayContactsList = (req, res, next) => {
    Contact.find((err, contactsList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(contactlist)

            res.render("contacts/list", {title: "Contacts", ContactsList: contactsList, displayName: req.user ? req.user.displayName: ''});
            //render contact.ejs and pass title and contactlist variable we are passing contactsList object to ContactsList 
        }
    });
};

//For displaying add page CREATE
module.exports.displayAddPage = (req, res, next) => {
    res.render("contacts/add", {title: "Add Contact", displayName: req.user ? req.user.displayName: ''});
}

//For processing add page CREATE
module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "c_name": req.body.c_name,
        "c_number": req.body.c_number,
        "c_email": req.body.c_email,
    });

    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            //res.redirect(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

//For displaying UPDATE
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;     //id of actual object

    Contact.findById(id, (err, contacttoedit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render("contacts/edit", {title: "Edit Contact", contact: contacttoedit, displayName: req.user ? req.user.displayName: ''});         //show edit view
        }
    });
};

//For processing UPDATE page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = Contact({
        "_id": id,
        "c_name": req.body.c_name,
        "c_number": req.body.c_number,
        "c_email": req.body.c_email,
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

//For performing DELETE
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({_id:id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/contact-list"); 
        }
    });
};