const Keyboard = require('../models/keyboard');
const Mouse = require('../models/mouse');
const Category = require('../models/category');
const { validationResult } = require('express-validator');

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
        res.render('computer_accessory_detail', { title: item.name, item });
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('create_computer_accessory', {
            title: 'Create a computer accessory',
            errors: errors.errors,
            item: {
                name,
                description,
                category,
                price,
                stock,
            },
        });
        return;
    }
    const filename = req.file
        ? `/images/${req.file.filename}`
        : 'https://via.placeholder.com/300x200.jpg/f1f5f4/516f4e/?text=Product+Doesn%27t+Have+An+Image+Yet';
    Category.findById(category).then((result) => {
        const newAcc = new Keyboard({
            name,
            description,
            category: result._id,
            price,
            stock,
            file_url: filename,
        });
        newAcc.save().then((item) => {
            res.redirect(item.url);
        });
    });
};

exports.get_comp_accessory_delete = function (req, res, next) {
    Promise.all([Mouse.findById(req.params.id), Keyboard.findById(req.params.id)]).then((found) => {
        const [item] = found.filter((doc) => doc !== null);
        res.render('delete_computer_acc', { title: item.name, item });
    });
};

exports.post_comp_accessory_delete = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        Promise.all([Mouse.findById(req.params.id), Keyboard.findById(req.params.id)]).then(
            (docs) => {
                const [item] = docs.filter((doc) => doc !== null);
                res.render('delete_computer_acc', { errors: errors.errors, item });
            },
        );
        return;
    }
    Promise.all([
        Mouse.findByIdAndDelete(req.params.id),
        Keyboard.findByIdAndDelete(req.params.id),
    ]).then((found) => {
        res.redirect('/catalog/computer-accessories');
    });
};

exports.get_comp_accessory_update = function (req, res, next) {
    Promise.all([
        Mouse.findById(req.params.id).populate('category'),
        Keyboard.findById(req.params.id).populate('category'),
    ]).then((found) => {
        const item = found.filter((doc) => doc !== null);
        res.render('update_computer_acc', { title: item.name, item: item[0] });
    });
};

exports.post_comp_accessory_update = function (req, res, next) {
    const { name, description, category, price, stock } = req.body;
    const errors = validationResult(req);

    Promise.all([Mouse.findById(req.params.id), Keyboard.findById(req.params.id)]).then(
        (results) => {
            const [toUpdate] = results.filter((doc) => doc !== null);
            const file_url = !req.file ? toUpdate.file_url : `/images/${req.file.filename}`;
            toUpdate.populate('Category');
            const newAcc = {
                name,
                description,
                category: toUpdate.category,
                price,
                stock,
                file_url,
            };
            if (!errors.isEmpty()) {
                res.render('update_computer_acc', {
                    errors: errors.errors,
                    item: newAcc,
                });
                return;
            }

            Promise.all([
                Mouse.findByIdAndUpdate(req.params.id, newAcc),
                Keyboard.findByIdAndUpdate(req.params.id, newAcc),
            ]).then((docs) => {
                const [updated] = docs.filter((doc) => doc !== null);
                res.redirect(updated.url);
            });
        },
    );
};
