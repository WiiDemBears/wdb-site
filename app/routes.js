const mongoose = require("mongoose");
const User = require("../app/models/user");

module.exports = function(app, passport) {

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/forgot-password", (req, res) => {
    res.render("forgot-password");
  });

  app.get("/memes", (req, res) => {
    res.render("memes");
  });

  app.get("/quotes", (req, res) => {
    res.render("quotes");
  });

  app.get("/down", (req, res) => {
    res.render("down");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post("/register", passport.authenticate('local-register', {

    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  
  }));

  /*
        Middleware functions are called between requests... 
    */
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/");
  }
};
