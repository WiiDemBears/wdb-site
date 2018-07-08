# WiiDemBears.Down

## "Down" Web App

A webapp for organizing short-term events, such as video game sessions, quick get-togethers, and any other spontaneous event.

## Overview of file structure

This project will eventually make use of the MERN stack:

- MongoDB (Database)
- Express (Web Framework)
- React.js (UI Framework)
- Node.js (Javascript runtime environment)

Version 0.1.0 will use Bootstrap and HTML templating for UI.

### Explanation of Directory Structure

- app (All files that deal with backend setup of the application go here)
  - routes.js
    - Express app routes are defined here. Post requests, get requests, and middleware are all located here.
- config (All database, authentication, and registration js files go here)
- public (All publicly served files go here [such as images, css files, and client-side javascript]).
- views (Contain handlebars HTML templates to make our HTML life easier)
- app.js
  - App.js (or server.js should we choose to deploy on Heroku), is the entry point to the web app. Everything begins from
    this js file, and almost every file in the project can be reached through this file. To run the app, in a terminal run
    the command
    `console $ node app.js`
- .gitigore
  - Define all files that git should ignore through commits.
- package.json
  - Define all dependencies (created through npm init). If you just cloned this repo, you should run
    ```console
    $ npm init
    ```
- README.md
  - You're reading this right now, aren't you?

## Use Cases For 0.1.0

As a non-registered user...

- You can login to the Down app, register for an account, and view the splash page.

As a registered user...

- You can create an event, view your current events, and your profile picture on your profile page.
- You have a friends list, which contains a list of other users of the Down webapp.

## Implementation for Future Deployments

In future releases, we will implement categories of friends. This will allow you to invite your food squad in one tap, without going through your list of gaming friends.

Eventually we will move to React.js and Redux, as this will allow for a better overall UI experience compared to barebones CSS with HTML templating.
