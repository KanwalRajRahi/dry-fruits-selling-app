import React from 'react';

function ReturnsAndRefunds() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">Returns and Refunds Policy</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">1. Return Policy</h2>
          <p>We accept returns within 7 days of delivery for the following reasons:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Damaged or defective products</li>
            <li>Wrong items received</li>
            <li>Quality issues</li>
            <li>Expired products</li>
          </ul>
          <p className="mt-2">Note: Returns are not accepted for products that have been opened or consumed.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">2. Return Process</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Contact our customer service within 24 hours of delivery</li>
            <li>Provide order number and reason for return</li>
            <li>Take clear photos of the product and packaging</li>
            <li>Wait for return authorization</li>
            <li>Pack the product securely in original packaging</li>
            <li>Ship the product back using our return shipping label</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">3. Refund Policy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Refund Timeline</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are processed within 7-10 business days</li>
                <li>Refund amount will be credited to the original payment method</li>
                <li>Bank processing time may vary</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Refund Amount</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full refund for damaged/defective products</li>
                <li>Shipping charges are non-refundable</li>
                <li>Return shipping costs may be deducted if the return is not due to our error</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">4. Quality Assurance</h2>
          <p>We ensure the quality of our products through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Regular quality checks</li>
            <li>Proper storage conditions</li>
            <li>Fresh packaging</li>
            <li>Expiry date monitoring</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">5. Exceptions</h2>
          <p>The following items are not eligible for returns:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Opened or consumed products</li>
            <li>Products damaged due to improper storage</li>
            <li>Products purchased during clearance sales</li>
            <li>Custom or personalized orders</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">6. Replacement Policy</h2>
          <p>In case of damaged or wrong items, we offer:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Free replacement of the same product</li>
            <li>Option to choose a different product of equal value</li>
            <li>Full refund if replacement is not possible</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">7. Contact Information</h2>
          <p>For any returns or refunds related queries, please contact us at:</p>
          <div className="mt-2">
            <p>Email: returns@bharatdryfruits.com</p>
            <p>Phone: [Your Contact Number]</p>
            <p>Address: [Your Business Address]</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">8. Policy Updates</h2>
          <p>We reserve the right to modify this returns and refunds policy at any time. Any changes will be effective immediately upon posting on our website.</p>
        </section>
      </div>
    </div>
  );
}

export default ReturnsAndRefunds; 