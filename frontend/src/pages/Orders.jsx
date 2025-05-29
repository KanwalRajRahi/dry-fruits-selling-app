import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/orders/my-orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-amber-800">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-800">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">You haven't placed any orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-amber-700">Order #{order._id}</h2>
                  <p className="text-gray-600">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-amber-600">₹{order.totalPrice}</p>
                  <p className={`text-sm ${
                    order.isPaid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </p>
                </div>
              </div>

              <div className="border-t border-amber-100 pt-4">
                <h3 className="font-semibold mb-2 text-amber-700">Order Items:</h3>
                <div className="space-y-2">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img
                          src={`${API_BASE_URL}${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-amber-600">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-amber-100 mt-4 pt-4">
                <h3 className="font-semibold mb-2 text-amber-700">Shipping Address:</h3>
                <p className="text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.city},<br />
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                <p className="text-gray-600 mt-1">
                  Contact: {order.shippingAddress.contactNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders; 