const mongoose = require('mongoose');

const smartPhoneSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5 },
    description: {
        OS: String,
        RAM: Number,
        ROM: Number,
        battery: Number,
        cameras: { camera1: String, camera2: String, camera3: String },
    },
    category: { type: String, required: true, minlength: 1 },
    price: { type: Number, required: true, min: 1 },
    stock: { type: Number, required: true },
});

smartPhoneSchema.virtual('url').get(() => {
    return `/catalog/smartphones/${this._id}`;
});

module.exports = mongoose.model('Smartphone', smartPhoneSchema);
