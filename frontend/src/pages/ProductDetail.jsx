import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../store/cartSlice';
import { FaShoppingCart, FaLeaf, FaWeight, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (product) {
      setAddingToCart(true);
      dispatch(addToCart(product));
      setSuccessMessage(`${product.name} added to cart!`);
      
      setTimeout(() => {
        setSuccessMessage(null);
        setAddingToCart(false);
      }, 1500);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? ((product.price - product.discountPrice) / product.price * 100).toFixed(0)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img
            src={`${API_BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col">
          <h1 className="text-3xl font-bold mb-4 text-amber-800">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            {product.isOrganic && (
              <span className="flex items-center text-green-600">
                <FaLeaf className="mr-1" />
                Organic
              </span>
            )}
            <span className="flex items-center text-gray-600">
              <FaWeight className="mr-1" />
              {product.weight || '500g'}
            </span>
          </div>

          {hasDiscount ? (
            <div className="mb-4">
              <p className="text-gray-500 line-through text-lg">MRP: ₹{product.price}</p>
              <p className="text-2xl font-bold text-amber-600">Deal Price: ₹{product.discountPrice}</p>
              <p className="text-green-600 text-sm font-semibold">Save {discountPercent}%</p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-amber-600 mb-4">₹{product.price}</p>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Product Details</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            <div className="space-y-2">
              {product.nutritionalInfo && (
                <div className="flex items-start">
                  <FaInfoCircle className="text-amber-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Nutritional Information</p>
                    <p className="text-gray-600">{product.nutritionalInfo}</p>
                  </div>
                </div>
              )}
              
              {product.shelfLife && (
                <div className="flex items-start">
                  <FaCalendarAlt className="text-amber-600 mt-1 mr-2" />
                  <div>
                    <p className="font-medium text-gray-800">Shelf Life</p>
                    <p className="text-gray-600">{product.shelfLife}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 flex items-center justify-center"
              aria-label={`Add ${product.name} to cart`}
            >
              {addingToCart ? (
                <span className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Adding...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
