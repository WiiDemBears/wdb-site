// const mongoose = require("mongoose");
// const User = require("../app/models/user");
const Quote = require("../app/models/quote");

module.exports = function(app, passport) {
  app.use((req, res, next) => {
    res.locals.user = req.user;
    // res.locals.error = req.flash("error");
    next();
  });

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
    Quote.find({}, function(err, quotes) {
      if (err) {
        console.log(err);
      }
      res.render("quotes", { allQuotes: quotes });
    });
  });

  app.get("/down", (req, res) => {
    res.render("down");
  });

  // Talk with group about the login and register forms i.e. where they will be GET requesting to

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/",
      failureFlash: true
    })
  );

  app.post(
    "/register",
    passport.authenticate("local-register", {
      successRedirect: "/",
      failureRedirect: "/",
      failureFlash: true
    })
  );

  app.get("/logout", function(req, res) {
    req.logOut();
    res.redirect("/");
  });

  /*
        Middleware functions are called between requests... 
    
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/");
  }

  */
};
