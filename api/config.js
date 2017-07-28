var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
    process.env[req.body.key] = req.body.value;
});


module.exports = router;
