var express = require('express');
var router = express.Router();
const elecDevicesController = require('../controllers/elecDevicesController');
const compAccessoriesController = require('../controllers/computerAccsController');

// GET HOME CATALOG WHICH SHOWS ALL CATEGORIES
router.get('/', function (req, res, next) {
    res.send('catalog with categories goes here');
});

// COMPUTER ACCESSORIES CATEGORY
router.get('/computer-accessories', compAccessoriesController.comp_accessories_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/computer-accessories/:id', function (req, res, next) {
    res.send(`show detail page of the item ${req.params.id}`);
});

// GET CREATE FORM OF KEYBOARD
router.get('/computer-accessories/keyboard/create', function (req, res, next) {
    res.send('a form to create a keyboard goes here');
});

// GET CREATE FORM OF MOUSE
router.get('/computer-accessories/mouse/create', function (req, res, next) {
    res.send('a form to create a mouse goes here');
});

// LOGIC TO CREATE A KEYBOARD GOES HERE
router.post('/computer-accessories/keyboard/create', function (req, res, next) {
    res.send('a form to create a keyboard goes here');
});

// LOGIC TO CREATE A MOUSE GOES HERE
router.post('/computer-accessories/mouse/create', function (req, res, next) {
    res.send('a form to create a mouse goes here');
});

// LOGIC TO UPDATE A KEYBOARD GOES HERE
router.put('/computer-accessories/:id', function (req, res, next) {
    res.send('i wannna UPDATE an ACCESSORY');
});

/* // LOGIC TO UPDATE A MOUSE GOES HERE
router.put('/computer-accessories/:id', function(req, res, next) {
  res.send('i wannna UPDATE a MOUSE')
}) */

// LOGIC TO DELETE A KEYBOARD GOES HERE
router.delete('/computer-accessories/:id', function (req, res, next) {
    res.send('i wannna DELETE an ACCESSORY');
});

// LOGIC TO DELETE A MOUSE GOES HERE

// ELECTRONIC DEVICES CATEGORY
router.get('/electronic-devices/', elecDevicesController.elec_devices_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/electronic-devices/:id', function (req, res, next) {
    res.send(`show detail page of the item ${req.params.id}`);
});

// GET CREATE FORM OF MODEM
router.get('/electronic-devices/modem/create', function (req, res, next) {
    res.send('a form to create a MODEM goes here');
});

// GET CREATE FORM OF TELEVISION
router.get('/electronic-devices/tv/create', function (req, res, next) {
    res.send('a form to create a TELEVISION goes here');
});

// GET CREATE FORM OF LAPTOP
router.get('/electronic-devices/laptop/create', function (req, res, next) {
    res.send('a form to create a LAPTOP goes here');
});

// LOGIC TO CREATE A MODEM GOES HERE
router.post('/electronic-devices/modem/create', function (req, res, next) {
    res.send('a form to create a modem goes here');
});

// LOGIC TO CREATE A MOUSE GOES HERE
router.post('/electronic-devices/tv/create', function (req, res, next) {
    res.send('a form to create a tv goes here');
});

// LOGIC TO CREATE A MOUSE GOES HERE
router.post('/electronic-devices/laptop/create', function (req, res, next) {
    res.send('a form to create a laptop goes here');
});

// LOGIC TO UPDATE AN ELECTRONIC DEVICE (LAPTOP, TV, MODEM) GOES HERE
router.put('/electronic-devices/:id', function (req, res, next) {
    res.send('i wannna UPDATE an ELECTRONIC DEVICE');
});

// LOGIC TO DELETE AN ELECTRONIC DEVICE (LAPTOP, TV, MODEM) GOES HERE
router.delete('/electronic-devices/:id', function (req, res, next) {
    res.send('i wannna DELETE an ELECTRONIC DEVICE');
});

// PHONES CATEGORY
router.get('/phones', function (req, res, next) {
    res.send('list of all phones products');
});

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/phones/:id', function (req, res, next) {
    res.send(`show detail page of the item ${req.params.id}`);
});

// GET CREATE FORM OF SMARTPHONE
router.get('/phones/smartphone/create', function (req, res, next) {
    res.send('a form to create a SMARTPHONE goes here');
});

// GET CREATE FORM OF LANDLINE PHONE
router.get('/phones/phone/create', function (req, res, next) {
    res.send('a form to create a LANDLINE PHONE goes here');
});

// LOGIC TO CREATE A SMARTPHONE GOES HERE
router.post('/phones/smartphone/create', function (req, res, next) {
    res.send('a form to create a smartphone goes here');
});

// LOGIC TO CREATE A LANDLINE PHONE GOES HERE
router.post('/phones/phone/create', function (req, res, next) {
    res.send('a form to create a LANDLINE PHONE goes here');
});

// LOGIC TO UPDATE A PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.put('/phones/:id', function (req, res, next) {
    res.send('i wannna UPDATE an PHONE');
});

// LOGIC TO DELETE AN PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.delete('/phones/:id', function (req, res, next) {
    res.send('i wannna DELETE an PHONE');
});

module.exports = router;
