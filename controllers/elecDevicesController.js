const TV = require('../models/television');
const Category = require('../models/category');
const { validationResult } = require('express-validator');

exports.elec_devices_list = function (req, res, next) {
    TV.find()
        .sort([['name', 'descending']])
        .then((found) => {
            res.render('electronic_devices', {
                title: 'Electronic Devices',
                tv_list: found,
            });
        });
};

exports.elec_device_detail = function (req, res, next) {
    TV.findById(req.params.id).then((item) => {
        res.render('elec_device_detail', { item });
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('create_electronic_device', {
            title: 'Create an electronic device',
            errors: errors.errors,
            item: { name, description, category, price, stock },
        });
        return;
    }
    const file_url = req.file
        ? `/images/${req.file.filename}`
        : 'https://via.placeholder.com/400.jpg/f1f5f4/516f4e/?text=Product+Doesn%27t+Have+An+Image+Yet';
    Category.findById(category).then((found) => {
        const newDevice = new TV({
            name,
            description,
            category: found._id,
            price,
            stock,
            file_url,
        });
        newDevice.save().then((item) => {
            res.redirect(item.url);
        });
    });
};

exports.get_elec_device_delete = function (req, res, next) {
    TV.findById(req.params.id).then((item) => {
        res.render('delete_elec_device', { item });
    });
};

exports.post_elec_device_delete = function (req, res, next) {
    TV.findByIdAndDelete(req.params.id).then((deleted) => {
        TV.find().then((list) => {
            res.redirect('/catalog/electronic-devices');
        });
    });
};

exports.get_elec_device_update = function (req, res, next) {
    TV.findById(req.params.id)
        .populate('category')
        .then((item) => {
            res.render('update_elec_device', { item });
        });
};

exports.post_elec_device_update = function (req, res, next) {
    const { name, description, category, price, stock } = req.body;
    const errors = validationResult(req);
    TV.findById(req.params.id).then((toUpdate) => {
        const file_url = !req.file ? toUpdate.file_url : `/images/${req.file.filename}`;
        toUpdate.populate('Category');
        const updated = {
            name,
            description,
            category: toUpdate.category,
            price,
            stock,
            file_url,
        };
        if (!errors.isEmpty()) {
            res.render('update_elec_device', {
                errors: errors.errors,
                item: { ...updated },
            });
            return;
        }
        TV.findByIdAndUpdate(req.params.id, updated).then((updated) => {
            res.redirect(updated.url);
        });
    });
};
