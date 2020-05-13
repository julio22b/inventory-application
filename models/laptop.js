const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: {
        OS: String,
        RAM: Number,
        hard_disk: String,
        CPU: String,
        GPU: String,
    },
    category: { type: String, minlength: 1, required: true },
    price: { type: Number, min: 1, required: true },
    stock: { type: Number, required: true },
});

laptopSchema.virtual('url').get(() => {
    return `/catalog/laptops/${this._id}`;
});

module.exports = mongoose.model('Laptop', laptopSchema);