const Keyboard = require('../models/keyboard');
const Mouse = require('../models/mouse');

exports.comp_accessories_list = function (req, res, next) {
    Promise.all([
        Keyboard.find().sort([['name', 'descending']]),
        Mouse.find().sort([['name', 'descending']]),
    ]).then((lists) => {
        res.render('comp_accessories', {
            title: 'Computer Accessories',
            keyboard_list: lists[0],
            mice_list: lists[1],
        });
    });
};

exports.comp_accessory_detail = function (req, res, next) {
    Promise.all([Keyboard.findById(req.params.id), Mouse.findById(req.params.id)]).then((array) => {
        const item = array[0] ? array[0] : array[1];
        res.render('computer_accessory_detail', { item: item });
    });
};
