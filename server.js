// App.js, or server.js contains the entry point to the web app.

/* Dependencies */

// Require Express framework for routing pages. This is further explained in /app/routes.js
const express = require("express");

// Require mongoose, an Object Document Mapper that allows for seamless communication between Node.js and MongoDb
// const mongoose = require("mongoose");

// Require express-session. This allows for user sessions.
const session = require("express-session");

const MongoStore = require("connect-mongo")(session);

// Require flash. This allows flash error messages.
const flash = require("connect-flash");

const cookieParser = require("cookie-parser");

/*
Require passport. This package allows for authentication of users throughout the app through the use of
various authentication strategies. This is further explained in /config/passport.js
*/
const passport = require("passport");

// Require the path package. This is for naming paths in the directory.
const path = require("path");
// Set app, our webapp, to a new express object. This initializes a new app. From here, app represents our web-app.
const app = express();

// require the database config file. (Add EncodeURI)
let dbconf = require("./config/db.js");

// connect to passport configuration file, passing in passport package from above.
require("./config/passport")(passport);

// set our templating engine to Handlebars (hbs).
app.set("view engine", "hbs");

// allow for express to parse the body object.
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

/*
TODO : MAKE DB CONFIG A MODULE
*/

app.use(
  session({
    secret: "suchsecretwowe!",
    store: new MongoStore({ url: dbconf, autoRemove: "native" }),
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set a new static path for serving static files. Namely, the public folder.
app.use(express.static(path.join(__dirname, "public")));

// enable flash message for login/register errors
app.use(flash());

// import defined routes, passing in our passport strategy and our defined web-app.
require("./app/routes.js")(app, passport);

// app startup. If PORT is not defined, use port 3000. Log the port out to the console.
// Normally, the app is started as defined in the README (node app.js). But Heroku is weird about it...

/*
if (process.env.NODE_ENV === "PRODUCTION") {
  require("greenlock-express")
    .create({
      version: "draft-11",
      server: "https://acme-v02.api.letsencrypt.org/directory",
      configDir: "/config/acme/",
      email: "lao294@nyu.edu",
      approveDomains: ["wdbears.me", "wdbears.herokuapp.com"],
      agreeTos: true,
      app: app,
      communityMember: true,
      telemetry: true
    })
    .listen(80, 443);
} else {
  app.listen(process.env.PORT || 3000);
  console.log("This is the port: " + (process.env.PORT || 3000));
}
*/

app.listen(process.env.PORT || 3000);
console.log("This is the port: " + (process.env.PORT || 3000));
