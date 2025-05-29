const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      // Nuts Category
      'Almonds',
      'Cashews',
      'Walnuts',
      'Pistachios',
      'Pine Nuts',
      'Brazil Nuts',
      'Hazelnuts',
      'Macadamia Nuts',
      'Pecans',
      'Mixed Nuts',
      
      // Dried Fruits Category
      'Raisins',
      'Dates',
      'Prunes',
      'Dried Apricots',
      'Dried Figs',
      'Dried Cranberries',
      'Dried Blueberries',
      'Dried Mango',
      'Dried Pineapple',
      'Dried Apple',
      'Dried Pear',
      'Dried Peach',
      'Dried Papaya',
      'Dried Kiwi',
      
      // Seeds Category
      'Pumpkin Seeds',
      'Sunflower Seeds',
      'Chia Seeds',
      'Flax Seeds',
      'Sesame Seeds',
      'Watermelon Seeds',
      'Mixed Seeds',
      
      // Premium Mixes
      'Trail Mix',
      'Student Mix',
      'Energy Mix',
      'Protein Mix',
      'Diabetic Mix',
      'Weight Loss Mix',
      
      // Gift Boxes
      'Premium Gift Box',
      'Corporate Gift Box',
      'Festival Gift Box',
      'Health Gift Box',
      'Luxury Gift Box',
      
      // Special Categories
      'Organic Dry Fruits',
      'Sugar-Free Dry Fruits',
      'Roasted Nuts',
      'Raw Nuts',
      'Spiced Nuts',
      'Candied Nuts'
    ]
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  weightUnit: {
    type: String,
    required: true,
    enum: ['g', 'kg', 'oz', 'lb']
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  shelfLife: {
    type: String,
    required: true
  },
  storageInstructions: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 