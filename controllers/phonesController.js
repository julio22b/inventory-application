const Smartphone = require('../models/smartphone');

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
