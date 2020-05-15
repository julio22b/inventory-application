const mongoose = require('mongoose');
const category = require('./category');

const modemSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        minlength: 1,
        required: true,
        ref: 'Category',
    },
    price: { type: Number, min: 1, required: true },
    stock: { type: Number, required: true },
});

modemSchema.virtual('url').get(function () {
    return `/catalog/electronic-devices/${this._id}`;
});

module.exports = mongoose.model('Modem', modemSchema);
