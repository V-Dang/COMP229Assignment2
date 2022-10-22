let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to Books model
let Book = require("../models/book");

//GET Route for the Book list page - READ Operation
module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(booklist)

            res.render("book/list", {title: "Books", BookList: bookList, displayName: req.user ? req.user.displayName: ''});
            //render book.ejs and pass title and Booklist variable we are passing bookList object to BookList 
        }
    });
};

//For displaying add page CREATE
module.exports.displayAddPage = (req, res, next) => {
    res.render("book/add", {title: "Add Book", displayName: req.user ? req.user.displayName: ''});
}

//For processing add page CREATE
module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.redirect(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });
}

//For displaying UPDATE
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;     //id of actual object

    Book.findById(id, (err, booktoedit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render("book/edit", {title: "Edit Book", book: booktoedit, displayName: req.user ? req.user.displayName: ''});         //show edit view
        }
    });
};

//For processing UPDATE page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });
}

//For performing DELETE
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Book.remove({_id:id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/book-list"); 
        }
    });
};