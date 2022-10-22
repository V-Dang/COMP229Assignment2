let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');

//connect to Books model
//let Book = require("../models/book");

let bookController = require('../controllers/book');

function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();         //used for maintaining state
}


router.get('/', bookController.displayBookList);

router.get('/add', requireAuth, bookController.displayAddPage);

router.post('add', requireAuth, bookController.processAddPage);

router.get('/edit/:id', requireAuth, bookController.displayEditPage);

router.post('/edit/:id', requireAuth, bookController.processEditPage);

router.get('/delete/:id',requireAuth, bookController.performDelete);


module.exports = router;