const mongoose = require('mongoose');

const OrderItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    weight: { type: Number, required: true },
    weightUnit: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }, // Price at the time of order
});

const ShippingAddressSchema = mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    deliveryInstructions: { type: String }
});

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [OrderItemSchema],
    shippingAddress: ShippingAddressSchema,
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    orderStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    estimatedDeliveryDate: { type: Date },
    trackingNumber: { type: String },
    giftWrapping: { type: Boolean, default: false },
    giftMessage: { type: String }
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order; 