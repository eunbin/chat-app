const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello Node js');
});

module.exports = router;
