const Category = require('../models/category');

exports.category_list = function (req, res, next) {
    Category.find()
        .sort([['name', 'ascending']])
        .then((categories) => {
            console.log(categories);
            res.render('categories', {
                title: 'Categories',
                category_list: categories,
            });
        });
};
