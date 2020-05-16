var express = require('express');
var router = express.Router();
const elecDevicesController = require('../controllers/elecDevicesController');
const compAccessoriesController = require('../controllers/computerAccsController');
const phonesController = require('../controllers/phonesController');
const categoriesController = require('../controllers/categoriesController');

// GET HOME CATALOG WHICH SHOWS ALL CATEGORIES
router.get('/', categoriesController.category_list);

// COMPUTER ACCESSORIES CATEGORY
router.get('/computer-accessories', compAccessoriesController.comp_accessories_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/computer-accessories/item/:id', compAccessoriesController.comp_accessory_detail);

// GET CREATE FORM OF KEYBOARD
router.get('/computer-accessories/create', compAccessoriesController.get_comp_accessory_create);

// LOGIC TO CREATE A KEYBOARD GOES HERE
router.post('/computer-accessories/create', compAccessoriesController.post_comp_accessory_create);

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

// ELECTRONIC DEVICES CATEGORY
router.get('/electronic-devices/', elecDevicesController.elec_devices_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/electronic-devices/item/:id', elecDevicesController.elec_device_detail);

// GET CREATE FORM OF MODEM
router.get('/electronic-devices/create', elecDevicesController.get_electronic_device_create);

// LOGIC TO CREATE A MODEM GOES HERE
router.post('/electronic-devices/create', elecDevicesController.post_electronic_device_create);

// LOGIC TO UPDATE AN ELECTRONIC DEVICE (LAPTOP, TV, MODEM) GOES HERE
router.put('/electronic-devices/:id', function (req, res, next) {
    res.send('i wannna UPDATE an ELECTRONIC DEVICE');
});

// LOGIC TO DELETE AN ELECTRONIC DEVICE (LAPTOP, TV, MODEM) GOES HERE
router.delete('/electronic-devices/:id', function (req, res, next) {
    res.send('i wannna DELETE an ELECTRONIC DEVICE');
});

// PHONES CATEGORY
router.get('/phones', phonesController.phone_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/phones/item/:id', phonesController.phone_detail);

// GET CREATE FORM OF SMARTPHONE
router.get('/phones/create', phonesController.get_phone_create);

// LOGIC TO CREATE A SMARTPHONE GOES HERE
router.post('/phones/create', phonesController.post_phone_create);

// LOGIC TO UPDATE A PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.get('/phones/item/:id/update', function (req, res, next) {
    res.send('i wannna UPDATE an PHONE');
});

// LOGIC TO DELETE AN PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.get('/phones/item/:id/delete', phonesController.get_phone_delete);

// LOGIC TO DELETE AN PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.post('/phones/item/:id/delete', phonesController.post_phone_delete);

module.exports = router;
