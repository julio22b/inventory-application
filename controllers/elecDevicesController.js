const Modem = require('../models/modem');
const TV = require('../models/television');
const Laptop = require('../models/laptop');
const Category = require('../models/category');

exports.elec_devices_list = function (req, res, next) {
    Promise.all([
        Modem.find().sort([['name', 'descending']]),
        TV.find().sort([['name', 'descending']]),
        Laptop.find().sort([['name', 'descending']]),
    ]).then((lists) => {
        res.render('electronic_devices', {
            title: 'Electronic Devices',
            modem_list: lists[0],
            tv_list: lists[1],
            laptop_list: lists[2],
        });
    });
};

exports.elec_device_detail = function (req, res, next) {
    Promise.all([
        Modem.findById(req.params.id),
        TV.findById(req.params.id),
        Laptop.findById(req.params.id),
    ]).then((arr) => {
        let item;
        if (arr[0]) item = arr[0];
        else if (arr[1]) item = arr[1];
        else if (arr[2]) item = arr[2];
        res.render('elec_device_detail', { item: item });
    });
};

exports.get_electronic_device_create = function (req, res, next) {
    Category.find({ name: 'Electronic Devices' }).then((category) => {
        res.render('create_electronic_device', {
            title: 'Create an electronic device',
            category: category[0],
        });
    });
};

exports.post_electronic_device_create = function (req, res, next) {
    const { name, description, category, price, stock } = req.body;
    Category.findById(category).then((found) => {
        const newDevice = new Modem({
            name,
            description,
            category: found._id,
            price,
            stock,
        });
        newDevice.save().then((item) => {
            res.render('elec_device_detail', { item });
        });
    });
};
