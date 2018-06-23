const mongoose = require('mongoose');
const User = require('../app/models/user');

module.exports = function(app, passport){

    app.get('/', (req, res) => {
        res.render('index');
    });


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