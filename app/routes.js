// const mongoose = require("mongoose");
// const User = require("../app/models/user");
const Quote = require("../app/models/quote");

module.exports = function(app, passport) {
  app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    next();
  });

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/forgot-password", (req, res) => {
    res.render("forgot-password");
  });

  app.get("/memes", isLoggedIn, (req, res) => {
    res.render("memes");
  });

  app.get("/quotes", isLoggedIn, (req, res) => {
    Quote.find({}, function(err, quotes) {
      if (err) {
        console.log(err);
      }
      res.render("quotes", { allQuotes: quotes });
    });
  });

  app.get("/down", isLoggedIn, (req, res) => {
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
      failureRedirect: "/login",
      failureFlash: true
    }),
    function(req, res) {
      if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );

  app.post(
    "/register",
    passport.authenticate("local-register", {
      successRedirect: "/",
      failureRedirect: "/register",
      failureFlash: true
    })
  );

  app.get("/logout", function(req, res) {
    req.logOut();
    res.redirect("/");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
};
