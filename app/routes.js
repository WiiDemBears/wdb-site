const mongoose = require('mongoose');

module.exports = function(app, passport){

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/quotes', (req, res) =>{
        res.render('quotes');
    });

    app.get('/memes', (req, res) =>{
        res.render('memes');
    });
};