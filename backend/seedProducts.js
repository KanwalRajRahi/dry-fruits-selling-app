const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: "Premium California Almonds",
    brand: "Bharat Dry Fruits",
    price: 899,
    discountPrice: 799,
    description: "Premium quality California almonds, rich in protein and healthy fats. Perfect for snacking and cooking.",
    category: "Almonds",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/almonds.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Whole Cashews",
    brand: "Bharat Dry Fruits",
    price: 999,
    discountPrice: 899,
    description: "Premium quality whole cashews, rich in minerals and healthy fats. Perfect for snacking and cooking.",
    category: "Cashews",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 553,
      protein: 18,
      carbs: 30,
      fat: 44,
      fiber: 3
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/cashews.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Black Raisins",
    brand: "Bharat Dry Fruits",
    price: 299,
    discountPrice: 249,
    description: "Premium quality black raisins, rich in iron and antioxidants. Perfect for snacking and baking.",
    category: "Raisins",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 299,
      protein: 3,
      carbs: 79,
      fat: 0.5,
      fiber: 4
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/raisins.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Medjool Dates",
    brand: "Bharat Dry Fruits",
    price: 399,
    discountPrice: 349,
    description: "Premium quality Medjool dates, rich in fiber and natural sugars. Perfect for snacking and desserts.",
    category: "Dates",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 277,
      protein: 1.8,
      carbs: 75,
      fat: 0.2,
      fiber: 6.7
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/dates.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Mixed Nuts",
    brand: "Bharat Dry Fruits",
    price: 1299,
    discountPrice: 1199,
    description: "Premium quality mixed nuts including almonds, cashews, walnuts, and pistachios. Perfect for snacking.",
    category: "Mixed Nuts",
    weight: 1000,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 607,
      protein: 20,
      carbs: 21,
      fat: 54,
      fiber: 7
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/mixed-nuts.jpg",
    stock: 50,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Gift Box",
    brand: "Bharat Dry Fruits",
    price: 2499,
    discountPrice: 2299,
    description: "Premium gift box containing a selection of our finest dry fruits and nuts. Perfect for gifting.",
    category: "Premium Gift Box",
    weight: 2000,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 550,
      protein: 18,
      carbs: 25,
      fat: 45,
      fiber: 8
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/gift-box.jpg",
    stock: 25,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Walnuts",
    brand: "Bharat Dry Fruits",
    price: 799,
    discountPrice: 699,
    description: "Premium quality walnuts, rich in omega-3 fatty acids. Perfect for brain health and snacking.",
    category: "Walnuts",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 654,
      protein: 15,
      carbs: 14,
      fat: 65,
      fiber: 7
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/walnuts.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Pistachios",
    brand: "Bharat Dry Fruits",
    price: 899,
    discountPrice: 799,
    description: "Premium quality pistachios, rich in antioxidants and protein. Perfect for snacking.",
    category: "Pistachios",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 562,
      protein: 20,
      carbs: 28,
      fat: 45,
      fiber: 10
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/pistachios.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Dried Apricots",
    brand: "Bharat Dry Fruits",
    price: 499,
    discountPrice: 449,
    description: "Premium quality dried apricots, rich in vitamin A and fiber. Perfect for snacking and baking.",
    category: "Dried Apricots",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 241,
      protein: 3.4,
      carbs: 63,
      fat: 0.5,
      fiber: 7.3
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/apricots.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  },
  {
    name: "Premium Pumpkin Seeds",
    brand: "Bharat Dry Fruits",
    price: 399,
    discountPrice: 349,
    description: "Premium quality pumpkin seeds, rich in magnesium and zinc. Perfect for snacking and salads.",
    category: "Pumpkin Seeds",
    weight: 500,
    weightUnit: "g",
    nutritionalInfo: {
      calories: 559,
      protein: 30,
      carbs: 10,
      fat: 49,
      fiber: 6
    },
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in an airtight container",
    image: "/uploads/pumpkin-seeds.jpg",
    stock: 100,
    isOrganic: true,
    isGlutenFree: true,
    isVegan: true
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(sampleProducts);
    console.log('Added sample products');

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts(); 