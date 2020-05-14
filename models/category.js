const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
});

categorySchema.virtual('url').get(() => {
    return `/catalog/categories/${this._id}`;
});

module.exports = mongoose.model('Category', categorySchema);
