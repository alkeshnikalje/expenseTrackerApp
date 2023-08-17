const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');
const dotenv = require('dotenv').config();

exports.purchasePremium = async (req, res) => {
    try {
        const newRzpInstance = new Razorpay({
            key_id: process.env.RAZOR_KEY,
            key_secret: process.env.RAZOR_SECRET
        });

        const amount = 5000;
        newRzpInstance.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            try {
                await Order.create({ orderId: order.id, status: "PENDING", userId: req.user.id });
                return res.json({ success: true, orderId: order.id });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

exports.updatePremium = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderId: order_id } });
        const user = await User.findByPk(req.user.id);
        await Promise.all([
            order.update({ paymentId: payment_id, status: "SUCCESSFULL" }),
            user.update({isPremiumMember: true})
        ])

        return res.json({ success: true, msg: "transaction successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};