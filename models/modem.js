const mongoose = require('mongoose');

const modemSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: { item1: { type: String }, item2: { type: String }, item3: { type: String } },
    category: { type: String, minlength: 1, required: true },
    price: { type: Number, min: 1, required: true },
    stock: { type: Number, required: true },
});

modemSchema.virtual('url').get(() => {
    return `/catalog/modems/${this._id}`;
});

module.exports = mongoose.model('Modem', modemSchema);
