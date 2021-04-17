const express = require('express');
const router = express.Router();
// const {APP_NAME} = process.env;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('ini untuk router ke service media');
});

module.exports = router;
