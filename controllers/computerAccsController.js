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
