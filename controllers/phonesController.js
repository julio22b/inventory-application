const Smartphone = require('../models/smartphone');
const LandlinePhone = require('../models/landlinePhone');

exports.phone_list = function (req, res, next) {
    Promise.all([
        Smartphone.find().sort([['price', -1]]),
        LandlinePhone.find().sort([['price', -1]]),
    ]).then((lists) => {
        res.render('phones', {
            title: 'Phones',
            smartphone_list: lists[0],
            landline_list: lists[1],
        });
    });
};

exports.phone_detail = function (req, res, next) {
    Promise.all([Smartphone.findById(req.params.id), LandlinePhone.findById(req.params.id)]).then(
        (arr) => {
            const item = arr[0] ? arr[0] : arr[1];
            res.render('phone_detail', { item: item });
        },
    );
};
