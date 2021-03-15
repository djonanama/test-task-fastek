const express = require('express');
const forma= require('./forma');

const router = express.Router();

router.use('/', forma)

module.exports = router