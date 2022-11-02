//COMP229-Assignment-2-Vivian-Dang-302278335
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');

//connect to Books model
//let Book = require("../models/book");

let contactsController = require('../controllers/contacts');

function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();         //used for maintaining state
}


router.get('/', contactsController.displayContactsList);

router.get('/add', requireAuth, contactsController.displayAddPage);

router.post('/add', requireAuth, contactsController.processAddPage);

router.get('/edit/:id', requireAuth, contactsController.displayEditPage);

router.post('/edit/:id', requireAuth, contactsController.processEditPage);

router.get('/delete/:id',requireAuth, contactsController.performDelete);


module.exports = router;