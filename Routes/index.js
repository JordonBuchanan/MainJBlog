const express = require('express');
const router = express.Router();
const passport = require('passport');
const Posts = require('../Models/Posts');
const passportFacebook = require('passport-facebook');
const User = require('../Models/Users');
const PassportFacebook = require('../config/PassportFacebook.js');
const Mongoose = require('mongoose');
const moment = require('moment');

//=================
// GET Routes
//=================

router.get('/', (req, res) => {
  res.render('Home', { title: 'JBlog' });
});

router.get('/post', (req, res, next) => {
  res.render('Post');
});

router.get("/:id", function(req, res, next){
  Posts.findById(req.params.id, function(err, foundPosts){
      if(err){
          console.log(err);
      } else{
          res.render("Blogpost", {Posts: foundPosts});
      }
  })
});

//==================
// AUTH
//==================

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/`login/facebook/callback`',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

//================
//POST Route
//================

  router.post("/", upload.single('image'), function(req, res){
    cloudinary.uploader.upload(req.file.path, function(result) {
    var name = req.body.name;
    var image = req.body.image = result.secure_url;
    var textField = req.body.textField;    
    //var author = {}
    var newPosts = {name: name, image: image, textField: textField};

    Posts.create(newPosts, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/blog");
        }
    });
});
});

//===========
//PUT Route
//===========

//=================
//DESTROY Route
//=================

  router.delete("/blog/:id", function(req, res, next){
    Posts.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog");
        }else{
            res.redirect("/blog");
        }
    });
});

//==============
//MIDDLEWARE
//==============

//IMAGE UPLOADER
const multer = require('multer');
let storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
let imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter})

const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dumxfw6s6', 
  api_key: 772524293964862, 
  api_secret: 'secret' //not actual secret
});


module.exports = router;
