const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, async (req, res) => {
    try {
        await req.user.populate('cart.product');
        res.json(req.user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const item = req.user.cart.find(item => item.product.toString() === productId);
        if (item) {
            item.quantity += quantity || 1;
        } else {
            req.user.cart.push({ product: productId, quantity: quantity || 1 });
        }
        await req.user.save();
        await req.user.populate('cart.product');
        res.json(req.user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:productId', protect, async (req, res) => {
    try {
        req.user.cart = req.user.cart.filter(item => item.product.toString() !== req.params.productId);
        await req.user.save();
        await req.user.populate('cart.product');
        res.json(req.user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:productId', protect, async (req, res) => {
    try {
        const { quantity } = req.body;
        const item = req.user.cart.find(item => item.product.toString() === req.params.productId);
        if (!item) return res.status(404).json({ message: 'Product not in cart' });
        item.quantity = quantity;
        await req.user.save();
        await req.user.populate('cart.product');
        res.json(req.user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
