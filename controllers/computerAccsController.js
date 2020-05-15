const Keyboard = require('../models/keyboard');
const Mouse = require('../models/mouse');
const Category = require('../models/category');

exports.comp_accessories_list = function (req, res, next) {
    Promise.all([
        Keyboard.find().sort([['name', 'ascending']]),
        Mouse.find().sort([['name', 'ascending']]),
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

exports.get_comp_accessory_create = function (req, res, next) {
    Category.find({ name: 'Computer Accessories' }).then((category) => {
        res.render('create_computer_accessory', {
            title: 'Create a computer accessory',
            category: category[0],
        });
    });
};

exports.post_comp_accessory_create = function (req, res, next) {
    const { name, description, category, price, stock } = req.body;
    Category.findById(category).then((result) => {
        const newAcc = new Keyboard({
            name,
            description,
            category: result._id,
            price,
            stock,
        });
        newAcc.save().then((item) => {
            res.render('computer_accessory_detail', { item });
        });
    });
};
