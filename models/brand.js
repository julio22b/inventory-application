const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
});

brandSchema.virtual('url').get(() => {
    return `/catalog/brands/${this._id}`;
});

module.exports = mongoose.model('Brand', brandSchema);
