const TV = require('../models/television');
const Category = require('../models/category');

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
    Category.findById(category).then((found) => {
        const newDevice = new TV({
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

exports.get_elec_device_delete = function (req, res, next) {
    TV.findById(req.params.id).then((item) => {
        res.render('delete_elec_device', { item });
    });
};

exports.post_elec_device_delete = function (req, res, next) {
    TV.findByIdAndDelete(req.params.id).then((deleted) => {
        TV.find().then((list) => {
            res.render('electronic_devices', {
                tv_list: list,
            });
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
    const updated = {
        name,
        description,
        category,
        price,
        stock,
    };
    TV.findByIdAndUpdate(req.params.id, updated).then((updated) => {
        res.redirect(updated.url);
    });
};
