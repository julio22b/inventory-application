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
