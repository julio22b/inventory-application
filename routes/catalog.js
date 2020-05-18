var express = require('express');
var router = express.Router();
const elecDevicesController = require('../controllers/elecDevicesController');
const compAccessoriesController = require('../controllers/computerAccsController');
const phonesController = require('../controllers/phonesController');
const categoriesController = require('../controllers/categoriesController');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination:
        '/mnt/c/Users/pc/the-odin-project/nodejs-course/inventory-application/public/images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10000000 },
}).single('image');

// GET HOME CATALOG WHICH SHOWS ALL CATEGORIES
router.get('/', categoriesController.category_list);

// COMPUTER ACCESSORIES CATEGORY
router.get('/computer-accessories', compAccessoriesController.comp_accessories_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/computer-accessories/item/:id', compAccessoriesController.comp_accessory_detail);

// GET CREATE FORM OF COMPUTER ACC
router.get('/computer-accessories/create', compAccessoriesController.get_comp_accessory_create);

// LOGIC TO CREATE A COMPUTER ACC GOES HERE
router.post(
    '/computer-accessories/create',
    upload,
    compAccessoriesController.post_comp_accessory_create,
);

// LOGIC TO UPDATE A COMPUTER ACC GOES HERE
router.get(
    '/computer-accessories/item/:id/update',
    compAccessoriesController.get_comp_accessory_update,
);

router.post(
    '/computer-accessories/item/:id/update',
    upload,
    compAccessoriesController.post_comp_accessory_update,
);

// LOGIC TO DELETE A COMPUTER ACC GOES HERE
router.get(
    '/computer-accessories/item/:id/delete',
    compAccessoriesController.get_comp_accessory_delete,
);

router.post(
    '/computer-accessories/item/:id/delete',
    compAccessoriesController.post_comp_accessory_delete,
);

//
//
//
// ELECTRONIC DEVICES CATEGORY
router.get('/electronic-devices/', elecDevicesController.elec_devices_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/electronic-devices/item/:id', elecDevicesController.elec_device_detail);

// GET CREATE FORM OF MODEM
router.get('/electronic-devices/create', elecDevicesController.get_electronic_device_create);

// LOGIC TO CREATE A MODEM GOES HERE
router.post(
    '/electronic-devices/create',
    upload,
    elecDevicesController.post_electronic_device_create,
);

// LOGIC TO UPDATE AN ELECTRONIC DEVICE (LAPTOP, TV, MODEM) GOES HERE
router.get('/electronic-devices/item/:id/update', elecDevicesController.get_elec_device_update);

router.post(
    '/electronic-devices/item/:id/update',
    upload,
    elecDevicesController.post_elec_device_update,
);

// LOGIC TO DELETE AN ELECTRONIC DEVICE (LAPTOP, TV, MODEM) GOES HERE
router.get('/electronic-devices/item/:id/delete', elecDevicesController.get_elec_device_delete);

router.post('/electronic-devices/item/:id/delete', elecDevicesController.post_elec_device_delete);

//
//
//
// PHONES CATEGORY
router.get('/phones', phonesController.phone_list);

// GET DETAIL PAGE OF A SINGLE PRODUCT
router.get('/phones/item/:id', phonesController.phone_detail);

// GET CREATE FORM OF SMARTPHONE
router.get('/phones/create', phonesController.get_phone_create);

// LOGIC TO CREATE A SMARTPHONE GOES HERE
router.post('/phones/create', upload, phonesController.post_phone_create);

// LOGIC TO UPDATE A PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.get('/phones/item/:id/update', phonesController.get_phone_update);

router.post('/phones/item/:id/update', upload, phonesController.post_phone_update);

// LOGIC TO DELETE AN PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.get('/phones/item/:id/delete', phonesController.get_phone_delete);

// LOGIC TO DELETE AN PHONE (SMARTPHONE, LANDLINE) GOES HERE
router.post('/phones/item/:id/delete', phonesController.post_phone_delete);

module.exports = router;
