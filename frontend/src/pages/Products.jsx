import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard, FaSpinner } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [successMessage, setSuccessMessage] = useState(null);
  const [addingProductId, setAddingProductId] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector(state => state.cart.items);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = `${API_BASE_URL}/api/products?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`;
        const response = await axios.get(apiUrl);
        setProducts(response.data);
      } catch {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setAddingProductId(product._id);

    dispatch(addToCart(product));
    
    setSuccessMessage(`${product.name} added to cart!`);
    
    setTimeout(() => {
      setSuccessMessage(null);
      setAddingProductId(null);
    }, 1500);
  };

  const handlePayment = async (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setProcessingPayment(true);
      const amount = product.discountPrice || product.price;
      
      // Create order
      const response = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount,
        currency: 'INR'
      });

      const { order } = response.data;

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Jain Chappal Store',
        description: `Payment for ${product.name}`,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              setSuccessMessage('Payment successful!');
              // Add to cart after successful payment
              dispatch(addToCart(product));
            } else {
              setError('Payment verification failed');
            }
          } catch (error) {
            setError('Error verifying payment');
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#2563eb'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setError('Error initiating payment');
    } finally {
      setProcessingPayment(false);
    }
  };

  const isProductInCart = (productId) => cartItems.some(item => item._id === productId);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-amber-800">Premium Dry Fruits Collection</h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <input
          type="text"
          placeholder="Search dry fruits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-amber-200 rounded-lg w-full md:w-auto flex-grow focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          aria-label="Search dry fruits"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          aria-label="Select dry fruit category"
        >
          <option value="all">All Categories</option>
          <option value="nuts">Nuts</option>
          <option value="dried-fruits">Dried Fruits</option>
          <option value="seeds">Seeds</option>
          <option value="dry-fruits-mix">Dry Fruits Mix</option>
          <option value="roasted-nuts">Roasted Nuts</option>
          <option value="organic">Organic</option>
          <option value="gift-boxes">Gift Boxes</option>
          <option value="imported">Imported</option>
        </select>
      </div>

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const inCart = isProductInCart(product._id);
            const hasDiscount = product.discountPrice && product.discountPrice < product.price;
            const discountPercent = hasDiscount
              ? ((product.price - product.discountPrice) / product.price * 100).toFixed(0)
              : 0;

            return (
              <div
                key={product._id}
                className={`rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  inCart ? 'bg-amber-50' : 'bg-white'
                }`}
              >
                <img
                  src={`${API_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col">
                  <h2 className="text-xl font-semibold mb-2 text-amber-800">{product.name}</h2>
                  <p className="text-gray-600 mb-2 flex-grow">{product.description}</p>
                  
                  {hasDiscount ? (
                    <div className="mt-1">
                      <p className="text-gray-500 line-through text-sm">MRP: ₹{product.price}</p>
                      <p className="text-lg font-bold text-amber-600">Deal Price: ₹{product.discountPrice}</p>
                      <p className="text-green-600 text-sm font-semibold">Save {discountPercent}%</p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-amber-600">₹{product.price}</p>
                  )}

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2 px-4 rounded-lg text-white bg-amber-600 hover:bg-amber-700 flex items-center justify-center transition-colors duration-300"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {addingProductId === product._id ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        <FaShoppingCart className="mr-2" />
                      )}
                      {addingProductId === product._id ? 'Adding...' : 'Add to Cart'}
                    </button>
                    
                    <button
                      onClick={() => handlePayment(product)}
                      disabled={processingPayment}
                      className="w-full py-2 px-4 rounded-lg text-white bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 flex items-center justify-center transition-colors duration-300"
                      aria-label={`Buy ${product.name} now`}
                    >
                      {processingPayment ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        <FaCreditCard className="mr-2" />
                      )}
                      {processingPayment ? 'Processing...' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;
