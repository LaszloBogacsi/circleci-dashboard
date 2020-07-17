var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users collaborations. */
router.get('/', async function(req, res, next) {
  const url = "https://circleci.com/api/v2/me/collaborations";
  let token = req.cookies.token;
  if (!token) {
    res.status(403).send({message: "Api Token not found"})

  } else {
    const result = await axios.get(url, {headers: {"Circle-Token" : token, "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain;charset=utf-8"}});

    res.send(result.data);
  }

});

module.exports = router;