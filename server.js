/*
    App.js, or server.js contains the entry point to the web app.
 */

/* Dependencies */

//Require Express framework for routing pages. This is further explained in /app/routes.js
const express = require('express');

//Require mongoose, an Object Document Mapper that allows for seamless communication between Node.js and MongoDb
const mongoose = require('mongoose');

//Require express-session. This allows for user sessions.
const session = require('express-session');

//Require passport. This package allows for authentication of users throughout the app through the use of
//various authentication strategies. This is further explained in /config/passport.js
const passport = require('passport');

//Require the path package. This is for naming paths in the directory.
const path = require('path');
//Set app, our webapp, to a new express object. This initializes a new app. From here, app represents our web-app.
const app = express();


//connect to passport configuration file, passing in passport package from above.
//require('./config/passport')(passport);

//import defined routes, passing in our passport strategy and our defined web-app.
require('./app/routes.js')(app, passport);

//set our templating engine to Handlebars (hbs).
app.set('view engine', 'hbs');

//allow for express to parse the body object.
app.use(express.urlencoded({ extended: false }));

//set a new static path for serving static files. Namely, the public folder.
app.use(express.static(path.join(__dirname, 'public')));

//app startup. If PORT is not defined, use port 3000. Log the port out to the console.
//Normally, the app is started as defined in the README (node app.js). But Heroku is weird about it...
app.listen(process.env.PORT || 3000);
console.log("This is the port: " + (process.env.PORT || 3000));