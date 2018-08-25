// const mongoose = require("mongoose");
const User = require("../app/models/user");
const Quote = require("../app/models/quote");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

let mailConf = require("../config/mail.js");

module.exports = function(app, passport) {

  /* GET ROUTES */

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/profile",  (req, res) => {
    res.render("pages/profile");
  }); 

  app.get("/forgot-password", (req, res) => {
    res.render("authentication/forgot-password", { user: req.user });
  });

  app.get("/reset", (req, res) =>{
    res.rednder("authentication/reset");
  });
  
  app.get("/memes", isLoggedIn, isConfirmed, (req, res) => {
    res.render("pages/memes");
  });
  
  app.get("/quotes", isLoggedIn, isConfirmed, (req, res) => {
    Quote.find({}, function(err, quotes) {
      if (err) {
        console.log(err);
      }
      res.render("pages/quotes", { allQuotes: quotes });
    });
  });

  app.get("/verify", isLoggedIn, (req, res) => {
    res.render("authentication/verify");
  })

  app.get("/down", isLoggedIn, isConfirmed, (req, res) => {
    res.render("pages/down");
  });

  app.get("/logout", async function(req, res) {
    await req.logOut();
    await res.redirect("/");
  });

  app.get("/login", (req, res) => {
    res.render("authentication/login");
  });

  app.get("/register", (req, res) => {
    res.render("authentication/register");
  });

  app.get("/reset/:token", (req, res) => {
    User.findOne(
      {
        "local.resetPasswordToken": req.params.token,
        "local.resetPasswordExpires": { $gt: Date.now() }
      },
      function(err, user) {
        if (err) console.log(err);
        if (!user) {
          req.flash(
            "flashMessage",
            "Password reset token has expired, or is invalid."
          );
          return res.redirect("/forgot-password");
        }
        res.render("authentication/reset", {
          user: req.user
        });
      }
    );
  });

  /* POST ROUTES */

  app.post("/forgot-password", (req, res, next) => {
    async.waterfall(
      [
        function(done) {
          crypto.randomBytes(20, function(err, buffer) {
            let token = buffer.toString("hex");
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ "local.email": req.body.email }, async function(err, user) {
            if (!user) {
              req.flash('flashMessage', 'No account with that email address exists')
              return res.redirect('/forgot-password');
            }

            user.local.resetPasswordToken = token;
            user.local.resetPasswordExpires = Date.now() + 3600000;

            await user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          const smtpTransport = nodemailer.createTransport({
            service: "SendGrid",
            auth: {
              user: mailConf.user,
              pass: mailConf.pass
            }
          });
          const mailOptions = {
            to: user.local.email,
            from: "passwordreset@wdbears.com",
            subject: "Password Reset Email - DO NOT REPLY",
            text:
              "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
              "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
              "http://" +
              req.headers.host +
              "/reset/" +
              token +
              "\n\n" +
              "If you did not request this, please ignore this email and your password will remain unchanged.\n"
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            req.flash(
              "flashMessage",
              "Check your email address for further instruction."
            );
            done(err);
          });
        }
      ],
      function(err) {
        if (err) return next(err);
        res.redirect("/forgot-password");
      }
    );
  });

  app.post("/reset/:token", (req, res) => {
    async.waterfall([
      function(done) {
        User.findOne(
          {
            "local.resetPasswordToken" : req.params.token,
            "local.resetPasswordExpires" : { $gt: Date.now() }
          },
          function(err, user) {
            if (err) console.log(err);
            
            if (!user) {
              req.flash(
                "flashMessage",
                "Password reset token has expired, or is invalid."
              );
              return res.redirect("back");
            }
      
            user.local.password = user.generateHash(req.body.password);
            user.local.resetPasswordToken = undefined;
            user.local.resetPasswordExpires = undefined;

            user.save(function(err){
              req.logIn(user, function(err){
                done(err, user);
              });
            });
          });
      },
      function(user, done){
        let smtpTransport = nodemailer.createTransport({
          service: "SendGrid",
          auth:{
            user: mailConf.user,
            pass: mailConf.pass
          }
        });
        let mailOptions = {
          to: user.local.email,
          from: "passwordreset@wdbears.com",
          subject: "Your password has been changed.",
          text: 'Hello,\n\n' +
          'The password for your account at wdbears.me through ' + user.local.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash(
            "flashMessage",
            "Your password has been changed."
          );
          done(err);
        });
      }
    ], function(err){
      res.redirect('/');
    });
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
      successRedirect: "/verify",
      failureRedirect: "/register",
      failureFlash: true
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  function isConfirmed(req, res, next){
    if(req.user.local.confirmed){
      return next();
    }

    res.redirect("/verify");
  }
};
