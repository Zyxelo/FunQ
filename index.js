var express = require('express');

var app = express();
var port = 3000;

// Require the routers - should be able to be handled dynamically
// i.e always "require" all the routes in the routes folder
// TODO look into this, using filesystem funcitons or something

var homeRoute = require('./routes/homeRoute');
var getUsernameRoute = require('./routes/getUserameRoute');

// Use the route - Should also be able to do this dynamically
// TODO Anton - can look at his PUM project to see how you guys did this
app.use(homeRoute);
app.use(getUsernameRoute);
app.use(express.static('./static'));


// Select which port to listen to
app.listen(port, function () {
    console.log("The application is running on localhost:" + port);
});
