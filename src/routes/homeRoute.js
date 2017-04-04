var express = require('express');

var router = express.Router();

// A simple GET request, the req stands for request(header of the request) and res for response
// which is used to respond to the client, in the future we should use a parser to parse all respones into
// JSON objects
router.get('/', function(req,res) {
    res.send("You are now at the home tab")

});

// to be able to "require" the route from another file
module.exports = router;