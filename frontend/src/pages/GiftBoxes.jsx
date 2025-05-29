import React from 'react';

function GiftBoxes() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-800">Gift Boxes</h1>
      
      <div className="text-gray-700 text-lg leading-relaxed">
        <p className="mb-4">Looking for the perfect gift? Our beautifully curated dry fruit gift boxes are ideal for any occasion – festivals, celebrations, corporate gifts, or just to show you care.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-amber-700">Why Choose Our Gift Boxes?</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Premium selection of the finest dry fruits</li>
          <li>Elegant and sturdy packaging</li>
          <li>Perfect for personal and corporate gifting</li>
          <li>Available in various sizes and combinations</li>
        </ul>

        <p className="mb-4">Browse our collection below and find the perfect gift box for your loved ones or colleagues.</p>

        {/* Placeholder for Gift Box Products - You will likely fetch and display actual products here later */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Placeholder Item */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-amber-100">
                <img src="/path/to/default-giftbox-image.jpg" alt="Gift Box" className="w-full h-48 object-cover rounded mb-4"/>
                <h3 className="text-lg font-semibold text-amber-800">Classic Assortment</h3>
                <p className="text-gray-600 mb-4">A mix of almonds, cashews, raisins, and pistachios.</p>
                <p className="font-bold text-amber-600">₹999</p>
            </div>
             <div className="bg-white rounded-lg shadow-md p-4 border border-amber-100">
                <img src="/path/to/another-giftbox-image.jpg" alt="Gift Box" className="w-full h-48 object-cover rounded mb-4"/>
                <h3 className="text-lg font-semibold text-amber-800">Premium Selection</h3>
                <p className="text-gray-600 mb-4">Includes walnuts, figs, apricots, and dates.</p>
                <p className="font-bold text-amber-600">₹1499</p>
            </div>
            {/* Add more gift box items here */}
        </div>

        <p className="mt-8">For bulk orders or custom gift box inquiries, please <a href="/contact" className="text-amber-600 hover:underline">contact us</a>.</p>

      </div>
    </div>
  );
}

export default GiftBoxes; 