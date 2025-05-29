import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import backgroundImage from '../assets/home-background.jpg';
import SubNavbar from '../components/SubNavbar';
import { FaShoppingCart, FaSpinner, FaSeedling, FaCertificate, FaGift } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [successMessage, setSuccessMessage] = useState(null);
  const [addingProductId, setAddingProductId] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = `${API_BASE_URL}/api/products?category=${selectedCategory}`;
        const response = await axios.get(apiUrl);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

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
        name: 'Bharat Dry Fruits',
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
              // Optionally add to cart after successful payment, or handle as a direct purchase
              // dispatch(addToCart(product));
            } else {
              setError('Payment verification failed');
            }
          } catch (error) {
            setError('Error verifying payment');
          } finally {
            setProcessingPayment(false);
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#f59e0b'
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

  const isProductInCart = (productId) => {
    return cartItems.some(item => item._id === productId);
  };

  if (loading) {
    return <div className="text-center py-10 text-lg text-amber-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <>
      <SubNavbar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      <div
        className="relative bg-cover bg-center py-20 text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-amber-100">Welcome to Bharat Dry Fruits</h1>
          <p className="text-xl mb-10 text-amber-50">
            Discover our premium collection of dry fruits, nuts, and seeds.
          </p>

        </div>

        {successMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-8 px-4">
          {products.map(product => (
            <div
              key={product._id}
              className={`bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105 ${isProductInCart(product._id) ? 'ring-2 ring-amber-500' : ''}`}
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={`${API_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded mb-4"
                />
              </Link>
              <h2 className="text-lg font-semibold text-amber-800">{product.name}</h2>
              {product.brand && <p className="text-sm text-gray-600 mb-2">{product.brand}</p>}
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                 {product.isOrganic && <span className="flex items-center mr-2"><FaSeedling className="mr-1" /> Organic</span>}
                 {product.weight && <span className="flex items-center"><FaWeight className="mr-1" /> {product.weight}</span>}
              </div>

              {product.discountPrice && product.discountPrice < product.price ? (
                <div className="mt-1">
                  <p className="text-gray-500 line-through text-sm">MRP: ₹{product.price}</p>
                  <p className="font-bold text-amber-600 text-lg">Deal Price: ₹{product.discountPrice}</p>
                  <p className="text-green-600 text-sm font-semibold">
                    Save {((product.price - product.discountPrice) / product.price * 100).toFixed(0)}%
                  </p>
                </div>
              ) : (
                <p className="font-bold mt-1 text-lg text-amber-600">₹{product.price}</p>
              )}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 py-2 px-3 rounded-lg text-white text-sm bg-amber-600 hover:bg-amber-700 transform hover:scale-105 transition duration-150 ease-in-out cursor-pointer flex items-center justify-center"
                  aria-label={`Add ${product.name} to cart`}
                >
                   {addingProductId === product._id ? <FaSpinner className="animate-spin mr-2" /> : <FaShoppingCart className="mr-2" />}
                  {addingProductId === product._id ? 'Adding...' : 'Add to Cart'}
                </button>
                 <button
                  onClick={() => handlePayment(product)}
                  disabled={processingPayment}
                  className="flex-1 py-2 px-3 rounded-lg text-white text-sm bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 transform hover:scale-105 transition duration-150 ease-in-out cursor-pointer flex items-center justify-center"
                  aria-label={`Buy ${product.name} now`}
                >
                   {processingPayment ? <FaSpinner className="animate-spin mr-2" /> : <FaCreditCard className="mr-2" />}
                  {processingPayment ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
