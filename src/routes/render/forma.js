const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('forma');
});

module.exports = router