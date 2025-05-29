import React from 'react';

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping & Delivery Policy</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Shipping Areas</h2>
            <p className="mb-4">We currently ship to all major cities and towns across India. Delivery times may vary based on your location:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Metro Cities: 2-3 business days</li>
              <li>Other Cities: 3-5 business days</li>
              <li>Remote Areas: 5-7 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Shipping Methods</h2>
            <p className="mb-4">We offer the following shipping options:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard Delivery (3-5 business days)</li>
              <li>Express Delivery (1-2 business days)</li>
              <li>Same Day Delivery (selected areas)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Shipping Costs</h2>
            <p className="mb-4">Shipping costs are calculated based on:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Order value</li>
              <li>Delivery location</li>
              <li>Selected shipping method</li>
              <li>Free shipping on orders above ₹2000</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Order Processing</h2>
            <p className="mb-4">Orders are processed in the following manner:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Order confirmation email sent</li>
              <li>Order processing and packaging (1-2 business days)</li>
              <li>Shipping confirmation with tracking number</li>
              <li>Delivery to your address</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Tracking Your Order</h2>
            <p>Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status on our website or through the courier partner's website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Delivery Attempts</h2>
            <p>Our delivery partners will make up to 3 attempts to deliver your order. If all attempts fail, the order will be returned to our warehouse and you will be contacted to reschedule the delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Delivery Issues</h2>
            <p className="mb-4">In case of delivery issues:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact our customer service immediately</li>
              <li>Provide your order number and tracking details</li>
              <li>We will assist you in resolving the issue</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. International Shipping</h2>
            <p>Currently, we only ship within India. International shipping services will be available soon.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h2>
            <p>For any questions about shipping and delivery, please contact us at:</p>
            <p className="mt-2">Email: support@shoestore.com</p>
            <p>Phone: 9999690161</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery; 