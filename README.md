# Bharat Dry Fruits - E-commerce Website

A full-stack e-commerce website for selling premium dry fruits and nuts, built with React and Node.js.

## Features

- Browse products by category (Nuts, Dried Fruits, Seeds, etc.)
- Detailed product information including nutritional facts
- Weight-based pricing
- Shopping cart functionality
- Gift wrapping options
- Admin dashboard for product management
- Responsive design with Tailwind CSS
- Secure admin authentication
- Order tracking system
- Multiple payment options

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled
- Razorpay integration for payments

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment
1. Set up a VPS with Node.js and PM2
2. Clone the repository
3. Install dependencies
4. Set up environment variables
5. Start the server with PM2:
   ```bash
   pm2 start server.js
   ```

### Frontend Deployment
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service

## Admin Access
- Email: admin@bharatdryfruits.com
- Password: (set in .env file)

## Product Categories
- Nuts
- Dried Fruits
- Seeds
- Dry Fruits Mix
- Dates
- Berries
- Apricots
- Prunes
- Raisins
- Figs
- Candied Fruits
- Premium Mix
- Gift Boxes

## License
MIT 