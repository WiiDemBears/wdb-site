const mongoose = require('mongoose');
const User = require('../app/models/user');

module.exports = function(app, passport){

    app.get('/', (req, res) => {
        res.render('index');
    });

<<<<<<< HEAD
    app.get('/forgot_password', (req, res) => {
        res.render('forgot_password');
    });

    app.get('/memes', (req, res) => {
        res.render('memes');
    });

    app.get('/quotes', (req, res) => {
        res.render('quotes');
    });

    app.get('/down', (req, res) => {
        res.render('down');
    });

    app.get('/register', (req, res) => {
        res.render('register');
    });

=======
>>>>>>> baab64929582c0f8a033016066c8dc36657e85f3
    /*
        Middleware functions are called between requests... 
    */
    function isLoggedIn(req, res, next){

        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/');
    }




};