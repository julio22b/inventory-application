const mongoose = require('mongoose');

const mouseSchema = new mongoose.Schema({
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
    file_url: String,
});

mouseSchema.virtual('url').get(function () {
    return `/catalog/computer-accessories/item/${this._id}`;
});

module.exports = mongoose.model('Mouse', mouseSchema);
