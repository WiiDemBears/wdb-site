const LocalStrategy = require("passport-local").Strategy;
const User = require("../app/models/user");

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
          User.findOne({ "local.username": username }, function(err, user) {
            if (err) return done(err);

            if (user)
              return done(null, false, {
                message: "That username is already taken."
              });
            else {
              const newUser = new User();
              newUser.local.username = username;
              newUser.local.password = newUser.generateHash(password);
              newUser.local.email = req.body.email;
              newUser.local.firstname = req.body.firstname;
              newUser.local.lastname = req.body.lastname;

              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
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
            return done(null, false, {
              message: "Error with login. Wrong password"
            });

          if (!user.validPassword(password))
            return done(null, false, {
              message: "Error with login. Wrong password"
            });

          return done(null, user);
        });
      }
    )
  );
};
