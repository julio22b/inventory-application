const mongoose = require('mongoose');

const landlinePhoneSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
    category: { type: String, minlength: 1, required: true },
    price: { type: Number, min: 1, required: true },
    stock: { type: Number, required: true },
});

landlinePhoneSchema.virtual('url').get(() => {
    return `/catalog/landlinephones/${this._id}`;
});

module.exports = mongoose.model('Landline', landlinePhoneSchema);
