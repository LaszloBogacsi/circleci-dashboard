var express = require('express');
var router = express.Router();
const axios = require('axios');

/* set token cookie */
router.get('/', async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).send({message: "Api Token not found"})

    } else {
        res.status(200).send()
    }
});

module.exports = router;
