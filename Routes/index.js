const express = require('express');
const router = express.Router();
const passport = require('passport');
const Posts = require('../Models/Posts');
const passportFacebook = require('passport-facebook');
const User = require('../Models/Users');
const PassportFacebook = require('../config/PassportFacebook.js');
const Mongoose = require('mongoose');
const moment = require('moment');

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

//=================
// GET Routes
//=================

  router.get('/', (req, res, next) => {
    Posts.find({}, (err, allPosts) => {
      if(err){
        console.log(err);
      } else {
        res.render('Home', {Posts:allPosts});
      }
    });
  });

router.get('/post', (req, res, next) => {
  res.render('Post');
});

router.get("/:id", (req, res, next) => {
  Posts.findById(req.params.id, (err, foundPosts) => {
      if(err){
          console.log(err);
      } else{
          res.render("Blogpost", {Posts: foundPosts});
      }
  })
});

router.get("/:id/edit", (req, res) => {
  Posts.findById(req.params.id, (err, foundPosts) => {
      res.render("Edit", {Posts: foundPosts});
  });
});

//================
//POST Route
//================

  router.post("/", upload.single('image'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (result) => {
      const newPosts = ({
        name: req.body.name,
        image: req.body.image = result.secure_url,
        textField: req.body.textField,   
        icon: req.body.icon,
        tags: req.body.tags,
      });
    Posts.create(newPosts, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else{
            res.redirect("/");
        }
    });
});
});

//===========
//PUT Route
//===========

router.put("/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body.Posts, (err, updatedPosts) => {
      if(err){
          res.redirect("/");
      } else {
          res.redirect("/" + req.params.id);
      }
  });
});

//=================
//DESTROY Route
//=================

  router.delete("/:id", (req, res, next) => {
    Posts.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

//==================
// AUTH
//==================

router.get('/login', (req, res, next) => {
  res.render('login');
});
router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/`login/facebook/callback`',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
