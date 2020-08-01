var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET list of followed projects. */
router.get('/', async function(req, res, next) {
  const url = "https://circleci.com/api/v1.1/projects";
  const token = req.cookies["circleci-api-token"];
  if (!token) {
    res.status(403).send({message: "Api Token not found"})
  } else {
    const result = await axios.get(url, {headers: {"Circle-Token": token, "Access-Control-Allow-Origin": "*", "Content-Type": "application/json;charset=utf-8"}});

    res.send(result.data);
  }
});
module.exports = router;
