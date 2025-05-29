import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

function AdminDashboard() {
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [formData, setFormData] = useState({
    name: '',
    brand: '', // Added brand field
    price: '',
    discountPrice: '', // Add discountPrice field
    description: '',
    category: 'nuts', // Default category changed to lowercase 'nuts'
    stock: '',
    weight: '', // Added weight field
    storageInstructions: '', // Added storageInstructions field
    shelfLife: '', // Added shelfLife field
    weightUnit: '', // Added weightUnit field
    image: null, // State to hold the selected image file
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Function to fetch products (will be needed for edit/delete later)
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Store the selected file object
    });
  };

  // Handle form submission for adding a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token'); // Get the JWT token
    if (!token) {
      setError('Authentication token not found. Please login again.');
      setLoading(false);
      return;
    }

    const data = new FormData(); // Use FormData for file uploads
    data.append('name', formData.name);
    data.append('brand', formData.brand); // Append brand data
    data.append('price', formData.price);
    data.append('discountPrice', formData.discountPrice); // Append discountPrice
    data.append('description', formData.description);
    data.append('category', formData.category); // This should now be lowercase
    data.append('stock', formData.stock);
    data.append('weight', formData.weight); // Append weight data
    data.append('storageInstructions', formData.storageInstructions); // Append storageInstructions data
    data.append('shelfLife', formData.shelfLife); // Append shelfLife data
    data.append('weightUnit', formData.weightUnit); // Append weightUnit data
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
          'Authorization': `Bearer ${token}`,
        },
      });
      // Clear the form and refresh the product list on success
      setFormData({
        name: '',
        brand: '', // Clear brand field
        price: '',
        discountPrice: '', // Clear discountPrice field
        description: '',
        category: 'nuts', // Reset to default category (lowercase)
        stock: '',
        weight: '', // Clear weight field
        storageInstructions: '',
        shelfLife: '',
        weightUnit: '',
        image: null,
      });
      // Clear the file input value manually
      e.target.reset();
      fetchProducts();
      alert('Product uploaded successfully!'); // Simple success feedback
    } catch (err) {
      console.error('Product upload failed:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Product upload failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-amber-800">Admin Dashboard</h1> {/* Updated color */}

      {/* Add New Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-amber-100"> {/* Added border */}
        <h2 className="text-xl font-bold mb-4 text-amber-700">Add New Product</h2> {/* Updated color */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required /> {/* Updated border and focus colors */}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
              <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required /> {/* Updated border and focus colors */}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required min="0" step="0.01" /> {/* Updated border and focus colors */}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPrice">Discount Price (Optional)</label>
              <input type="number" id="discountPrice" name="discountPrice" value={formData.discountPrice} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" min="0" step="0.01" /> {/* Updated border and focus colors */}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">Stock</label>
              <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required min="0" /> {/* Updated border and focus colors */}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">Weight (in grams)</label> {/* Added label for weight */}
              <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required min="0" step="0.01" /> {/* Added input for weight */}
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storageInstructions">Storage Instructions</label>
              <textarea id="storageInstructions" name="storageInstructions" value={formData.storageInstructions} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500 h-20" required></textarea>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shelfLife">Shelf Life (in days)</label>
              <input type="number" id="shelfLife" name="shelfLife" value={formData.shelfLife} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required min="1" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weightUnit">Weight Unit (e.g., grams, kg)</label>
              <input type="text" id="weightUnit" name="weightUnit" value={formData.weightUnit} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" required> {/* Updated border and focus colors */}
                <option value="nuts">Nuts</option> {/* Lowercase value */}
                <option value="dried-fruits">Dried Fruits</option> {/* Lowercase value */}
                <option value="seeds">Seeds</option> {/* Lowercase value */}
                <option value="dry-fruits-mix">Dry Fruits Mix</option> {/* Lowercase value */}
                <option value="roasted-nuts">Roasted Nuts</option> {/* Lowercase value */}
                <option value="organic">Organic</option> {/* Lowercase value */}
                <option value="gift-boxes">Gift Boxes</option> {/* Lowercase value */}
                <option value="imported">Imported</option> {/* Lowercase value */}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500 h-32" required></textarea> {/* Updated border and focus colors */}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500" accept="image/*" required /> {/* Updated border and focus colors */}
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Product List (for edit/delete will be added here later) */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100"> {/* Added border */}
        <h2 className="text-xl font-bold mb-4 text-amber-700">Existing Products</h2> {/* Updated color */}
        {/* Display existing products here */}
        <ul className="divide-y divide-amber-100"> {/* Added divider style */}
          {products.map(product => (
            <li key={product._id} className="py-3 text-gray-800">
              {product.name} - <span className="text-amber-700">{product.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard 