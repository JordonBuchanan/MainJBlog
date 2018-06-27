const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const User = require('../Models/Users');
//uncomment when this is downloaded
//const findOrCreate = require('mongoose-findorcreate')

passport.use(new FacebookStrategy({
    clientID: 444425035971110,
    clientSecret: 'secret',
    callbackURL: "http://localhost:3000",
    profileFields: ['id', 'displayName', 'name', 'gender', 'photos'],
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });