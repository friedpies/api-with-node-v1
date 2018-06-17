# api-with-node-v1
#Treehouse FSJS Project 7

To run use:
node js/app.js
Place config.js in root directory

Uses Express to interface with Twitter API

## To Do:
### Dependency Management
- [x] Project includes a package.json file containing dependencies to run the project
- [x] Running npm install installs relevant dependencies

### Server-Side API Access
- [x] Correctly uses an API key and secret from Twitter to communicate on the server.
- [x] Application can be authenticated using a config.js file, and contains code allowing a config.js file to be imported into app.js

### Correct Express Routes
- [x] Renders a template with the user’s Twitter info using the ‘/’ route

### Rendered Template
- [x] Matches the sample layout: a header and three columns of data as shown.

### Displays Correct Information
- [x] Displays 5 tweets, 5 friends, and username in a Jade/Pug template that roughly matches the mockups
- [x] App should try to display 5 direct messages, but if there aren't 5 direct messages available to display, It's okay to show fewer, as long as the app doesn't crash as a result of it.
