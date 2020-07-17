var express = require('express');
var router = express.Router();
const axios = require('axios');

/* set token cookie */
router.post('/', async function (req, res, next) {
    const body = req.body;

    res.cookie("token", body.token, {httpOnly: true, maxAge: 900000, sameSite: ""}).status(200);
    res.send();
});

module.exports = router;
