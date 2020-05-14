var express = require('express');
var router = express.Router();

// GET HOME CATALOG WHICH SHOWS ALL CATEGORIES
router.get('/', function (req, res, next) {
    res.send('catalog with categories goes here');
});

// COMPUTER ACCESSORIES CATEGORY
router.get('/computer-accessories', function (req, res, next) {
    res.send('list of all comp acc products here');
});

//
router.get('/computer-accessories/:id', function (req, res, next) {
    res.send(`show detail page of the item ${req.params.id}`);
});

/* GET users listing. */
router.get('/electronic-devices', function (req, res, next) {
    res.send('list of all electronic devices here');
});
/* GET users listing. */
router.get('/phones', function (req, res, next) {
    res.send('list of all phones products');
});

module.exports = router;
