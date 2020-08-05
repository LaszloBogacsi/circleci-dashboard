const express = require('express');
const router = express.Router();
const axios = require('axios');
const {authenticate} = require('../authentication')

const CIRCLECI_BASE_URL = "https://circleci.com/api/v2";

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const auth = authenticate(req.cookies);

  const url = `${CIRCLECI_BASE_URL}/me`;
  const headers = {"Circle-Token": auth.token, "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain;charset=utf-8"};

  !auth.success ? auth.error(res) : res.send((await axios.get(url, {headers})).data);
});

module.exports = router;
