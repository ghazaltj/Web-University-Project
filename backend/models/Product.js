const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    fit: { type: String },
    description: { type: String },
    details: { type: String },
    usage: { type: String }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
