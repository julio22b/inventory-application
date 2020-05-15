const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
});

categorySchema.virtual('url').get(function () {
    const url = this.name
        .split(' ')
        .map((word) => word.toLowerCase())
        .join('-');
    return url;
});

module.exports = mongoose.model('Category', categorySchema);
