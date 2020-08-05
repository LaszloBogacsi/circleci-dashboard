var express = require('express');
var router = express.Router();
const {authenticate} = require('../authentication')
const authCookieName = "circleci-api-token";

/* check token cookie present */
router.get('/', async function (req, res, next) {
    const auth = authenticate(req.cookies);
    !auth.success ? auth.error(res) : res.status(200).send()
});

/* set token cookie */
router.post('/login', async function (req, res, next) {
    const body = req.body;
// maxage in ms
    res.cookie(authCookieName, body.token, {httpOnly: true, maxAge: 900000, sameSite: undefined})
        .status(200)
        .send();
});

/* logout, remove token cookie */
router.post('/logout', async function (req, res, next) {
    res.clearCookie(authCookieName)
        .send()
});

module.exports = router;
