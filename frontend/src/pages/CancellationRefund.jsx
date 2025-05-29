import React from 'react';

const CancellationRefund = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cancellation & Refund Policy</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Order Cancellation</h2>
            <p className="mb-4">You can cancel your order under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Before the order is shipped</li>
              <li>Within 24 hours of placing the order</li>
              <li>If the product is out of stock</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Refund Policy</h2>
            <p className="mb-4">We offer refunds in the following cases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Defective or damaged products</li>
              <li>Wrong items received</li>
              <li>Size/fit issues (subject to return conditions)</li>
              <li>Quality issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Return Conditions</h2>
            <p className="mb-4">To be eligible for a return, your item must be:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Unused and in the same condition as received</li>
              <li>In the original packaging</li>
              <li>Returned within 7 days of delivery</li>
              <li>Accompanied by the original receipt or proof of purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Refund Process</h2>
            <p className="mb-4">The refund process is as follows:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our customer service to initiate the return</li>
              <li>Ship the item back to our address</li>
              <li>Once received, we will inspect the item</li>
              <li>If approved, refund will be processed within 7-10 business days</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Refund Methods</h2>
            <p>Refunds will be processed through the original payment method used for the purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Shipping Costs</h2>
            <p>Return shipping costs are the responsibility of the customer unless the return is due to our error (wrong item, defective product, etc.).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Non-Refundable Items</h2>
            <p className="mb-4">The following items are not eligible for refund:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items marked as "Final Sale"</li>
              <li>Used or damaged items</li>
              <li>Items without original packaging</li>
              <li>Items returned after 7 days of delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
            <p>For any questions about our cancellation and refund policy, please contact us at:</p>
            <p className="mt-2">Email: support@shoestore.com</p>
            <p>Phone: 9999690161</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund; 