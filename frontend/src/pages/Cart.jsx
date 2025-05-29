import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash, FaCreditCard, FaSpinner } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // State for shipping address
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    contactNumber: '',
  });

  const total = cartItems.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    // Basic validation for shipping address
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country || !shippingAddress.contactNumber) {
        setError('Please fill in all shipping address fields.');
        return;
    }

    if (!isAuthenticated) {
        navigate('/login');
        return;
    }
    
    const authToken = localStorage.getItem('token');
    if (!authToken) {
        setError('Authentication token not found. Please log in again.');
        navigate('/login');
        return;
    }

    try {
      setProcessingPayment(true);
      setError(null);
      setSuccessMessage(null);
      
      const amountInPaise = total * 100;
      
      // Create order with shipping address
      const response = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount: amountInPaise,
        currency: 'INR',
        shippingAddress: shippingAddress,
        orderItems: cartItems.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.discountPrice || item.price,
        })),
        paymentMethod: 'Razorpay',
      }, {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const { order } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Bharat Dry Fruits',
        description: 'Payment for Cart Items',
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            }, {
              headers: { 
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
              }
            });

            if (verifyResponse.data.success) {
              setSuccessMessage('Payment successful! Your order has been placed.');
              dispatch(removeFromCart(null));
              navigate('/order-success');
            } else {
              setError('Payment verification failed.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setError('Error verifying payment.');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: shippingAddress.contactNumber,
        },
        theme: {
          color: '#f59e0b'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      if (error.response) {
          console.error('Error response status:', error.response.status);
          console.error('Error response data:', error.response.data);
      }

      if (error.response && error.response.data && error.response.data.message) {
          setError(`Error initiating payment: ${error.response.data.message}`);
      } else {
          setError('Error initiating payment. Please try again.');
      }

      if (error.response && error.response.status === 401) {
          navigate('/login');
      }
    } finally {
      setProcessingPayment(false);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-800">Shopping Cart</h1>

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">{successMessage}</div>}

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-amber-100"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`${API_BASE_URL}${item.image}`}
                    alt={`Product: ${item.name}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-amber-800">{item.name}</h3>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="bg-amber-200 text-amber-800 px-2 py-1 rounded-l hover:bg-amber-300 transition-colors duration-200"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-4 py-1 bg-amber-100 text-amber-900">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="bg-amber-200 text-amber-800 px-2 py-1 rounded-r hover:bg-amber-300 transition-colors duration-200"
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="font-bold text-amber-600">₹{(item.discountPrice || item.price) * item.quantity}</p>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:text-red-800 flex items-center transition-colors duration-200"
                    aria-label="Remove item"
                  >
                    <FaTrash className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address Form */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow border border-amber-100">
              <h2 className="text-xl font-bold mb-4 text-amber-800">Delivery Address</h2>
              <div className="space-y-4">
                  <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                      <input type="text" name="address" id="address" value={shippingAddress.address} onChange={handleInputChange} className="mt-1 block w-full border border-amber-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                  </div>
                   <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input type="text" name="city" id="city" value={shippingAddress.city} onChange={handleInputChange} className="mt-1 block w-full border border-amber-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                  </div>
                   <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input type="text" name="postalCode" id="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} className="mt-1 block w-full border border-amber-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                  </div>
                   <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                      <input type="text" name="country" id="country" value={shippingAddress.country} onChange={handleInputChange} className="mt-1 block w-full border border-amber-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                  </div>
                   <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                      <input type="text" name="contactNumber" id="contactNumber" value={shippingAddress.contactNumber} onChange={handleInputChange} className="mt-1 block w-full border border-amber-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
                  </div>
              </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow border border-amber-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-amber-800">Total:</span>
              <span className="text-xl font-bold text-amber-600">₹{total}</span>
            </div>
            <button
              onClick={handlePayment}
              disabled={cartItems.length === 0 || processingPayment}
              className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 disabled:bg-amber-300 flex items-center justify-center transition-colors duration-200"
              aria-label="Proceed to payment"
            >
              {processingPayment ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaCreditCard className="mr-2" />
              )}
              {processingPayment ? 'Processing Payment...' : 'Pay Now'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
