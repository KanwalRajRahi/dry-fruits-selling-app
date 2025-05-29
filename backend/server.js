const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User'); // Import User model
const bcrypt = require('bcryptjs'); // Import bcryptjs
const path = require('path'); // Import path module

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Enable JSON parsing for all routes

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Only use express.json() for routes that specifically need JSON body parsing
// Multer will handle parsing for multipart/form-data routes
// app.use(express.json()); // Comment out global JSON parsing

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    createAdminUser(); // Call function to create admin user after connecting
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Function to create admin user if none exists
const createAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      // Use email and hashed password from environment variables
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@bharatdryfruits.com';
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

      if (!adminPasswordHash) {
        console.error('ADMIN_PASSWORD_HASH is not set in environment variables.');
        // Optionally, you could fall back to hashing a default password here,
        // but relying on the env var is better for production.
        return;
      }

      const newAdmin = new User({
        name: 'Admin', // Or use ADMIN_NAME from env if desired
        email: adminEmail,
        password: adminPasswordHash, // Use the pre-hashed password from env
        role: 'admin'
      });
      await newAdmin.save();
      console.log(`Admin user created with email: ${adminEmail}`);
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Routes
app.use('/api/products', require('./routes/products'));
// Apply express.json() middleware only to the auth routes
app.use('/api/auth', express.json(), require('./routes/auth'));
app.use('/api/payment', require('./routes/paymentRoutes')); // Add payment routes
app.use('/api/orders', require('./routes/orderRoutes'));

// Serve frontend static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Serve index.html for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
}

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  
  const findAvailablePort = async (startPort) => {
    const net = require('net');
    return new Promise((resolve, reject) => {
      const server = net.createServer();
      server.unref();
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          resolve(findAvailablePort(startPort + 1));
        } else {
          reject(err);
        }
      });
      server.listen(startPort, () => {
        server.close(() => {
          resolve(startPort);
        });
      });
    });
  };

  try {
    const availablePort = await findAvailablePort(PORT);
    app.listen(availablePort, () => {
      console.log(`Server running on port ${availablePort}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 