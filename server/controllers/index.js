//COMP229-Assignment-2-Vivian-Dang-302278335
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//CREATE USER MODEL INSTANCE
let userModel = require('../models/user');
let User = userModel.User;      //alias


/* GET home page. */
module.exports.displayHomePage = (req, res, next) => {
  res.render("index", { title: "Home", displayName: req.user ? req.user.displayName :'' });
}

/* GET About Us page. */
module.exports.displayAboutPage = (req, res, next) => {
    res.render("index", { title: "About", displayName: req.user ? req.user.displayName :'' });
}

/* GET Products page. */
module.exports.displayProductsPage = (req, res, next) => {
    res.render("index", { title: "Products", displayName: req.user ? req.user.displayName :'' });
}

/* GET Services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render("index", { title: "Services", displayName: req.user ? req.user.displayName :'' });
}

/* GET Contact Us page. */
module.exports.displayContactPage = (req, res, next) => {
    res.render("index", { title: "Contact", displayName: req.user ? req.user.displayName :'' });
}

//LOGIN------------------------------------------------------
module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : '',
        })
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server err
        if (err)
        {
            return next(err);
        }
        //user login err
        if (!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

//REGISTER------------------------------------------------------

module.exports.displayRegisterPage =(req, res, next) => {
    //check if user is not already registered
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName :''
        });
    }
    else {
        return res.rediect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //instantiante a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,      //password will be added later...
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Instering New User");
            if(err.name =="UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                )
                console.log('Error: User already exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName :''
            });
        }
        else
        {
            //if no error exists, then registration is successful
            
            //redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect('/');
    });
};

// get("/logout", (req, res) => {
//     req.logout(req.user, err => {
//       if(err) return next(err);
//       res.redirect("/");
//     });
//   });