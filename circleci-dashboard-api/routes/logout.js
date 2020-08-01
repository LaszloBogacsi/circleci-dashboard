var express = require('express');
var router = express.Router();

/* set token cookie */
router.post('/', async function (req, res, next) {
    res.clearCookie("circleci-api-token")
    res.send();
});

module.exports = router;
