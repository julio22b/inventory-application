const Smartphone = require('../models/smartphone');
const Category = require('../models/category');

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
    });
    newPhone.save().then((result) => {
        res.render('phone_detail', { item: result });
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
            res.render('phones', { smartphone_list: docs });
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

    const updatedPhone = {
        name: req.body.name,
        description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
    };

    Smartphone.findByIdAndUpdate(req.params.id, updatedPhone).then((updated) => {
        res.redirect(updated.url);
    });
};
