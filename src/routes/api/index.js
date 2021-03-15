const express = require('express');
const files= require('./files');

const {StorageFactory} = require('../../libs/storage');
const router = express.Router();

const storeOne = (req, res, next) => {
    req.storage = StorageFactory('one');
    next();
}
const storeMulti = (req, res, next) => {
    req.storage = StorageFactory('multi');
    next();
}

router.use('/one',[storeOne], files)
router.use('/multi',[storeMulti], files)

module.exports = router