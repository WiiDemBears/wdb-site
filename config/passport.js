const LocalStrategy = require("passport-local").Strategy;
const User = require("../app/models/user");
const randomstring = require('randomstring');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local-register",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        process.nextTick(function() {
          User.findOne(
            {
              $or: [
                { "local.username_lower": username.toLowerCase() },
                { "local.email": req.body.email }
              ]
            },
            function(err, user) {
              if (err) return done(err);

              if (user) {
                if (user.local.username_lower === username.toLowerCase()) {
                  return done(
                    null,
                    false,
                    req.flash("flashMessage", "That username is already taken.")
                  );
                }
                return done(
                  null,
                  false,
                  req.flash("flashMessage", "That email is already registered.")
                );
              } else {

                //generate random token
                const secretToken = randomstring.generate();
                const newUser = new User();

                newUser.local.secretToken = secretToken;
                newUser.local.confirmed = false;
                newUser.local.username = username;
                newUser.local.username_lower = username.toLowerCase();
                newUser.local.password = newUser.generateHash(password);
                newUser.local.email = req.body.email;
                newUser.local.firstname = req.body.firstname;
                newUser.local.lastname = req.body.lastname;

                newUser.save();
                
                return done(
                  null,
                  newUser,
                  req.flash(
                    "flashMessage",
                    "Check your email for a verification code before you may use the full site."
                  )
                );
              }
            }
          );
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },

      function(req, username, password, done) {
        User.findOne({ "local.username": username }, function(err, user) {
          if (err) return done(err);

          // for deploy, change this to one large message. This should not tell the user whether the username or password is the incorrect key.

          if (!user)
            return done(
              null,
              false,
              req.flash(
                "flashMessage",
                "Error. Wrong username or password."
              )
            );

          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash(
                "flashMessage",
                "Error. Wrong username or password."
              )
            );

          return done(null, user);
        });
      }
    )
  );
};
