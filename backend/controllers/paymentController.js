const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Order = require('../models/Order'); // Import Order model

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
exports.createOrder = async (req, res) => {
    try {
        // Assuming user is authenticated and user ID is available in req.user._id
        // (This depends on your authentication middleware)
        const userId = req.user ? req.user._id : null; // Get user ID (adjust based on your auth setup)

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated.'
            });
        }

        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No order items.'
            });
        }

        // Calculate total price from order items (ensure price is included in frontend items)
        const itemsPrice = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // For now, set tax and shipping to 0.0 - you can implement logic later
        const taxPrice = 0.0;
        const shippingPrice = 0.0;
        const totalPrice = itemsPrice + taxPrice + shippingPrice;

        // Create order in your database
        const order = new Order({
            user: userId,
            orderItems: orderItems.map(item => ({
                productId: item.productId, // Ensure productId is correctly passed
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price, // Price at the time of order
            })),
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        // Create Razorpay order
        const options = {
            amount: totalPrice * 100, // amount in smallest currency unit (paise for INR)
            currency: 'INR',
            receipt: createdOrder._id.toString(), // Use your backend order ID as receipt
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(201).json({
            success: true,
            order: razorpayOrder,
            backendOrderId: createdOrder._id, // Return your backend order ID
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId // Your backend order ID sent from frontend
        } = req.body;

        // Find the order in your database
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found.'
            });
        }

        // Verify signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Payment is verified, update order status
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: razorpay_payment_id,
                status: 'paid', // Or the actual status from Razorpay if available
                update_time: new Date().toISOString(), // Or the actual update time
                email_address: req.user ? req.user.email : 'N/A', // Assuming user is available via auth middleware
            };
            order.razorpayOrderId = razorpay_order_id; // Save Razorpay order ID
            order.razorpayPaymentId = razorpay_payment_id; // Save Razorpay payment ID
            order.razorpaySignature = razorpay_signature; // Save Razorpay signature

            await order.save();

            res.json({
                success: true,
                message: 'Payment verified successfully',
                orderId: order._id // Return backend order ID
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message
        });
    }
}; 