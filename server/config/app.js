//COMP229-Assignment-2-Vivian-Dang-302278335
// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//MODULES FOR AUTHENTICAION
let session = require("express-session");     //creates sessions with cookies
let passport = require("passport");           //authenticates pw
let passportLocal = require("passport-local");//stores user and pw locally
let localStrategy = passportLocal.Strategy;   
let flash = require("connect-flash");         //for rendering flash messages

//--------------------------------------------------------------------
//database Setup
let mongoose = require("mongoose");           //to "control" mongodb (object modelling tool)
let DB = require("./db");

//Point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true});

let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error: "));
mongodb.once("open", () => {
  console.log("Database Connected");
});

// paths - how app endpoints respond (URIs) to client requests 
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require("../routes/contacts");       //create contacts route
const { allowedNodeEnvironmentFlags } = require('process');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));   //add double .. for views --> ../views when you move file to config folder
app.set('view engine', 'ejs'); // express  -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));         //add double ..
app.use(express.static(path.join(__dirname, '../../node_modules')));   //add double ..

//SETUP EXPRESS SESSION--------------------------------------------------------------------------
app.use(
  session({
    secret: "SomeSecret",           //if hackers have secret key, then they can decrypt
    saveUninitialized: false,
    resave: false,
  })
);

//INITIALIZE FLASH
app.use(flash());                   //for error messages

//INITIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//CREATE USERMODEL INSTANCE - user model schema made already
let userModel = require("../models/user");
let User = userModel.User;

//Implement a user authentication strategy
passport.use(User.createStrategy());

//Serialize/Deserialize user object info -encrypt and decrypt (password)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);                         //user router
app.use('/contact-list', contactsRouter);               //contact router
//app.use('/contact', contactsRouter); 

//------------------------------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
