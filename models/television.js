const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
    category: { type: String, minlength: 1, required: true },
    price: { type: Number, min: 1, required: true },
    stock: { type: Number, required: true },
});

tvSchema.virtual('url').get(() => {
    return `/catalog/televisions/${this._id}`;
});

module.exports = mongoose.model('Television', tvSchema);
