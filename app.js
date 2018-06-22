const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require('./app/routes.js')(app);

app.listen(3000);
console.log("Listening on port 3000");
