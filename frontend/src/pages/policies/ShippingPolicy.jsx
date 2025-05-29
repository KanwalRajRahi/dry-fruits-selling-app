import React from 'react';

function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">Shipping Policy</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">1. Shipping Areas</h2>
          <p>We currently ship to all major cities and towns across India. Some remote areas may have limited shipping options or additional delivery time.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">2. Processing Time</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Orders are typically processed within 1-2 business days</li>
            <li>Processing time may be longer during peak seasons or sales</li>
            <li>Orders placed after 2 PM will be processed the next business day</li>
            <li>Weekend orders will be processed on the next business day</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">3. Delivery Time</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Metro cities: 2-3 business days</li>
            <li>Other cities: 3-5 business days</li>
            <li>Remote areas: 5-7 business days</li>
            <li>Delivery times may vary during peak seasons</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">4. Shipping Methods</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Standard Shipping</h3>
              <p>Free shipping on orders above ₹1000</p>
              <p>₹100 shipping charge for orders below ₹1000</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Express Shipping</h3>
              <p>Available at an additional cost</p>
              <p>Delivery within 1-2 business days</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">5. Order Tracking</h2>
          <p>Once your order is shipped, you will receive:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Order confirmation email with tracking number</li>
            <li>SMS updates on order status</li>
            <li>Real-time tracking through our website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">6. Special Handling</h2>
          <p>Our dry fruits are packed with special care to ensure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proper sealing to maintain freshness</li>
            <li>Protection from moisture and air</li>
            <li>Safe transportation</li>
            <li>Temperature control when necessary</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">7. Delivery Issues</h2>
          <p>In case of delivery issues:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact our customer service within 24 hours</li>
            <li>Provide order number and tracking details</li>
            <li>Document any damage with photos</li>
            <li>Keep the original packaging</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">8. International Shipping</h2>
          <p>Currently, we only ship within India. International shipping may be available in the future.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">9. Contact Information</h2>
          <p>For any shipping-related queries, please contact us at:</p>
          <div className="mt-2">
            <p>Email: shipping@bharatdryfruits.com</p>
            <p>Phone: [Your Contact Number]</p>
            <p>Address: [Your Business Address]</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ShippingPolicy; 