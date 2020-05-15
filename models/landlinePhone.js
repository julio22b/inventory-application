const mongoose = require('mongoose');

const landlinePhoneSchema = new mongoose.Schema({
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

landlinePhoneSchema.virtual('url').get(function () {
    return `/catalog/phones/${this._id}`;
});

module.exports = mongoose.model('Landline', landlinePhoneSchema);
