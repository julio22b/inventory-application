const Smartphone = require('../models/smartphone');
const Category = require('../models/category');
const { validationResult } = require('express-validator');

exports.phone_list = function (req, res, next) {
    Smartphone.find()
        .sort([['price', -1]])
        .then((list) => {
            res.render('phones', {
                title: 'Smartphones',
                smartphone_list: list,
            });
        });
};

exports.phone_detail = function (req, res, next) {
    Smartphone.findById(req.params.id).then((arr) => {
        res.render('phone_detail', { item: arr });
    });
};

exports.get_phone_create = function (req, res, next) {
    Category.find({ name: 'Phones' }).then((category) => {
        res.render('create_phone', { title: 'Add a new phone', category: category[0] });
    });
};

exports.post_phone_create = function (req, res, next) {
    const errors = validationResult(req);
    const file_url = req.file
        ? `/images/${req.file.filename}`
        : 'https://via.placeholder.com/400.jpg/f1f5f4/516f4e/?text=Product+Doesn%27t+Have+An+Image+Yet';
    const cameras = {
        camera1: req.body.camera1,
        camera2: req.body.camera2,
        camera3: req.body.camera3,
    };
    const description = {
        OS: req.body.OS,
        RAM: req.body.RAM,
        ROM: req.body.ROM,
        battery: req.body.battery,
        cameras,
    };
    const newPhone = new Smartphone({
        name: req.body.name,
        description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        file_url,
    });
    if (!errors.isEmpty()) {
        res.render('create_phone', {
            title: 'Add a new phone',
            item: newPhone,
            errors: errors.errors,
        });
        return;
    }
    newPhone.save().then((item) => {
        res.redirect(item.url);
    });
};

exports.get_phone_delete = function (req, res, next) {
    Smartphone.findById(req.params.id).then((item) => {
        res.render('delete_phone', { item });
    });
};

exports.post_phone_delete = function (req, res, next) {
    Smartphone.findByIdAndRemove(req.params.id).then((deleted) => {
        Smartphone.find().then((docs) => {
            res.redirect('/catalog/phones');
        });
    });
};

exports.get_phone_update = function (req, res, next) {
    Smartphone.findById(req.params.id)
        .populate('category')
        .then((item) => {
            res.render('update_phone', { item });
        });
};

exports.post_phone_update = function (req, res, next) {
    const errors = validationResult(req);
    const cameras = {
        camera1: req.body.camera1,
        camera2: req.body.camera2 || '',
        camera3: req.body.camera3 || '',
    };
    const description = {
        OS: req.body.OS,
        RAM: req.body.RAM,
        ROM: req.body.ROM,
        battery: req.body.battery,
        cameras,
    };

    Smartphone.findById(req.params.id).then((toUpdate) => {
        const file_url = !req.file ? toUpdate.file_url : `/images/${req.file.filename}`;
        toUpdate.populate('Category');
        const updatedPhone = {
            name: req.body.name,
            description,
            category: toUpdate.category,
            price: req.body.price,
            stock: req.body.stock,
            file_url,
        };
        if (!errors.isEmpty()) {
            res.render('update_phone', {
                item: updatedPhone,
                errors: errors.errors,
            });
            return;
        }
        Smartphone.findByIdAndUpdate(req.params.id, updatedPhone).then((updated) => {
            res.redirect(updated.url);
        });
    });
};
