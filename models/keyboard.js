const mongoose = require('mongoose');

const keyboardSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        minlength: 1,
        required: true,
        ref: 'Category',
    },
    price: { type: Number, min: 1, required: true },
    stock: { type: Number, min: 0, required: true },
});

keyboardSchema.virtual('url').get(function () {
    return `/catalog/computer-accessories/item/${this._id}`;
});

module.exports = mongoose.model('Keyboard', keyboardSchema);
