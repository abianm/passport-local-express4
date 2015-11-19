"use strict";
var express   = require('express');
var passport  = require('passport');
var Account   = require('../models/account');
var router    = express.Router();


/**
 *  Index GET
 *  
 *  @param {request}   req
 *  @param {response}  res
 */
exports.index = function (req, res) {
    //Find all user to list
    Account.find({}, function(err,all_users){
        if (!err && all_users){
         console.log("Found " + all_users.length + " users");    
        }
        res.render('index', { user : req.user , users : all_users}); 
    }); 
};

/**
 *  Register GET
 *  
 *  @param {request}   req
 *  @param {response}  res
 */
exports.register_get = function(req, res) {
    res.render('register', {});
};

/**
 *  Register POST
 *  
 *  @param {request}   req
 *  @param {response}  res
 *  @param {function}  next
 */
exports.register_post = function(req, res, next) {
  Account.register(new Account({ username : req.body.username , email : req.body.email }),
   req.body.password, function(err, account) {
    if (err) {
      return res.render("register", {info: "Sorry. That username already exists. Try again."});
    }
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
}

/**
 *  Login POST
 *  
 *  @param {request}   req
 *  @param {response}  res
 */
exports.login_get = function(req, res) {
    res.render('login', { user : req.user });
};

/**
 *  Login POST
 *  
 *  @param {request}   req
 *  @param {response}  res
 *  @param {function}  next
 */
exports.login_post = function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

/**
 *  Register POST
 *  
 *  @param {request}   req
 *  @param {response}  res
 *  @param {function}  next
 */
exports.logout_get = function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

/**
 *  Register POST
 *  
 *  @param {request}   req
 *  @param {response}  res
 */
exports.ping = function(req, res){
    res.status(200).send("pong!");
};

/**
 *  Show POST
 *  
 *  @param {request}   req
 *  @param {response}  res
 *  @param {function}  next
 */
exports.show = function (req, res, next) {
  Account.findById( req.params.id , function(err,user){
    if (!err && user){
     res.render('show', {user : user});
    } 
  });
};

/**
 *  Upload GET
 *  
 *  @param {request}   req
 *  @param {response}  res
 *  @param {function}  next
 */
exports.upload = function (req, res, next) {
   Account.findById(req.body.id , function(err,user){
        if (!err && user){
          user.image = "/uploads/"+req.file.filename;
          user.accounts.push({name: 'Cuenta' + user.accounts.length.toString(),
                              total: (0 + Math.floor(Math.random() * 1000)) , 
                              number: (10000000000 + Math.floor(Math.random() * 90000000000)).toString()});
          user.save();
          console.log("Guardado la imagen " + user.image + " del usuario " + user.name);
          res.redirect('/users/'+ user.id);    
        }
        else{
          res.redirect('/');
        }
    });

};



