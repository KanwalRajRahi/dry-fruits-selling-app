import React from 'react';

function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-800">About Us</h1>
      
      <div className="text-gray-700 text-lg leading-relaxed space-y-6">
        <p>Welcome to Bharat Dry Fruits, your ultimate destination for premium quality dry fruits, nuts, and seeds. We are passionate about bringing you the finest selection of natural and wholesome products sourced from the best regions.</p>
        
        <p>Our journey began with a simple vision: to provide our customers with healthy and delicious dry fruits that are carefully selected and packed to retain their freshness and nutritional value. We believe in the power of nature and the goodness that dry fruits offer.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">Our Commitment to Quality</h2>
        <p>Quality is at the heart of everything we do. We work directly with trusted farmers and suppliers to ensure that our dry fruits are:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Naturally grown and harvested</li>
          <li>Free from harmful chemicals and additives</li>
          <li>Freshly packed to preserve flavor and nutrients</li>
          <li>Subject to strict quality control measures</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">Our Products</h2>
        <p>We offer a wide range of dry fruits, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Almonds, Cashews, Walnuts, Pistachios</li>
          <li>Raisins, Dates, Figs, Apricots</li>
          <li>Seeds (Chia, Flax, Sunflower, Pumpkin)</li>
          <li>Exotic Dry Fruits and Berries</li>
          <li>Specially curated Gift Boxes</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">Our Mission</h2>
        <p>Our mission is to promote healthy living by making high-quality dry fruits accessible to everyone. We are committed to providing exceptional customer service and a seamless shopping experience.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">Connect With Us</h2>
        <p>We love hearing from our customers! If you have any questions, feedback, or custom requests, please don't hesitate to <a href="/contact" className="text-amber-600 hover:underline">contact us</a>.</p>
      </div>
    </div>
  );
}

export default AboutUs; 