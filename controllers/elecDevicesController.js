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
        console.log(lists);
        res.render('electronic_devices', {
            title: 'Electronic Devices',
            modem_list: lists[0],
            tv_list: lists[1],
            laptop_list: lists[2],
        });
    });
};
