const LocalStrategy = require("passport-local").Strategy
const User = require("../app/models/user")

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {

    done(null, user.id);

  });

  passport.deserializeUser(function(id, done) {
    
    User.findById(id, function(err, user) {
      done(err, user);
    });

  });

  passport.use('local-register', new LocalStrategy({

      emailField: 'email',
      passworldField: 'password',
      passReqToCallback: true
    },

    function(req, email, password, done){

       process.nextTick(function (){
        
          User.findOne({'local.email': email}, function (err, user){
        
            if(err)
              return done(err);

            if(user)
              return done(null, false, {message: 'That email is already registered for an account.'});
          
            else{

              const newUser = new User();
              newUser.local.email = email;
              newUser.local.firstname = req.body.firstname;
              newUser.local.lastname = req.body.lastname;

              newUser.save(function(err){
                if(err)
                  throw err;
                return done(null, newUser);
              });
            }

          });

        });
  }));

  passport.use('local-login', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done){

    User.findOne({'local.email' : email}, function(err, user){

      if(err)
        return done(err);
      
      if(!user)
        return done(null, false, req.flash('loginMessage', 'Email does not exist.'));
      
      if(!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return done(null, user);

    });

  }));

};
