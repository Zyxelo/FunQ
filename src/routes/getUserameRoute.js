var express = require('express');

var router = express.Router();

// Another example of a GET request that takes a parameter from the address
// (in this case a userID) and returns that users username
router.get('/getUsername/:userID?', function(req,res) {
    var userID = parseInt(req.params.userID);


    if (userID === 1) {
        res.json({username : "odelali"});
    } else if (userID === 2) {
        res.json({username : "anton hoppsansa "});
    } else {
        res.json({
            username : "plankton",
            userID : userID
        });
    }

});

// to be able to "require" the route from another file
module.exports = router;