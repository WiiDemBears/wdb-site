const mongoose = require('mongoose');

module.exports = function(app, passport){

    app.get('/', (req, res) => {
        res.render('index');
    });
};