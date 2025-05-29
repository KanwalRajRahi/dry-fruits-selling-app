const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query; // Get search and category from query parameters
    let query = {};

    if (search) {
      // Add search condition for name or description (case-insensitive)
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      // Add category filter condition
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  console.log('Received product data:', req.body); // Log request body
  console.log('Received file:', req.file); // Log received file

  // Get product data from req.body and file info from req.file - INCLUDING BRAND
  const { name, brand, discountPrice, description, price, category, stock } = req.body; // Added brand and discountPrice here
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  // Check if imagePath is null and image is required by the model
  if (!imagePath && Product.schema.path('image').options.required) {
      console.error('Image file missing, but required.');
      return res.status(400).json({ message: 'Image file is required.' });
  }

  const product = new Product({
    name,
    brand, // Now using the extracted brand
    discountPrice, // Now using the extracted discountPrice
    description,
    price,
    category,
    image: imagePath,
    stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Product save error:', error.message); // Log save error
    res.status(400).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, brand, price, discountPrice, description, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Handle potential new image upload

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.brand = brand || product.brand;
      product.price = price !== undefined ? price : product.price; // Allow price to be 0
      product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice; // Allow discountPrice to be 0 or null
      product.description = description || product.description;
      product.category = category || product.category;
      product.image = image || product.image;
      product.stock = stock !== undefined ? stock : product.stock; // Allow stock to be 0

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 