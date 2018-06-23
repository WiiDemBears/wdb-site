# WiiDemBears.Down

## "Down" Web App

*todo add app description*  

## Overview of file structure

This project will make use of the MERN stack:
* MongoDB (Database)
* Express (Web Framework)
* React.js (UI Framework)
* Node.js (Javascript runtime environment)

### Explanation of Directory Structure

* app (All files that deal with backend setup of the application go here)
    * routes.js
       * Express app routes are defined here. Post requests, get requests, and middleware are all located here. 
* config (All database, authentication, and registration js files go here)
* public (All publicly served files go here [such as images, css files, and client-side javascript]).
* views (Contain handlebars HTML templates to make our HTML life easier)
* app.js
    * App.js (or server.js should we choose to deploy on Heroku), is the entry point to the web app. Everything begins from
    this js file, and almost every file in the project can be reached through this file. To run the app, in a terminal run
    the command 
        ```console 
        $ node app.js 
        ```
* .gitigore
    * Define all files that git should ignore through commits. 
* package.json
    * Define all dependencies (created through npm init). If you just cloned this repo, you should run
        ```console
        $ npm init
        ```
* README.md
    * You're reading this right now, aren't you?

## Use Cases

1) As a non-registered user, I can see Yuta. 