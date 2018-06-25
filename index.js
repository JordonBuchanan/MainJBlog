const express = require("express");
const mongoose = require('mongoose');   
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const cloudinary = require('cloudinary');
const methodOverride = require("method-override");
const session = require('express-session');
    
const app = express();
const indexRouter = require('./Routes/index');
const Posts = require('./Models/Posts');
const User = require('./Models/Users');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/Views/public'));
app.set('Views', __dirname + '/Views');
app.use(express.static('files'))
app.set("view engine", "ejs"); 

// view engine setup
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

//decide if needed or not
//app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Moment require
app.locals.moment = require('moment');

//Initializing the Landing Page
app.use('/', indexRouter);

//Mongoose Configuration
//DB COnfig
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected')
    .catch(error => console.log(error)));
    mongoose.set('debug', true);
    process.on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        // application specific logging, throwing an error, or other logic here
      }); 
   

// PASSPORT CONFIGURATION
//Passport Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
 
//Passport Config
require('./config/PassportFacebook');

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

//================
//LISTEN
//================

var server     =    app.listen(process.env.PORT || 3002,function(){
    console.log("We have started our server on port 3002");
});