const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Create order
router.post('/create-order', protect, paymentController.createOrder);

// Verify payment
router.post('/verify-payment', protect, paymentController.verifyPayment);

module.exports = router; 