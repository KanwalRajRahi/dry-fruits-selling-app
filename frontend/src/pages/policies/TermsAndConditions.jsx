import React from 'react';

function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">Terms and Conditions</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using Bharat Dry Fruits website, you accept and agree to be bound by the terms and conditions of this agreement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">2. Use License</h2>
          <p>Permission is granted to temporarily access the materials on Bharat Dry Fruits website for personal, non-commercial transitory viewing only.</p>
          <p className="mt-2">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Bharat Dry Fruits at any time.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">3. Product Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All product descriptions and prices are subject to change without notice</li>
            <li>Product images are for illustrative purposes only</li>
            <li>Actual product packaging and materials may contain different information</li>
            <li>We reserve the right to limit the quantity of items purchased</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">4. Pricing and Payment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are in Indian Rupees (INR)</li>
            <li>Prices are subject to change without notice</li>
            <li>Payment must be made in full before order processing</li>
            <li>We accept various payment methods as displayed during checkout</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">5. User Account</h2>
          <p>To make purchases, you must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Be at least 18 years old</li>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">6. Intellectual Property</h2>
          <p>The content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Bharat Dry Fruits and is protected by copyright laws.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">7. Limitation of Liability</h2>
          <p>Bharat Dry Fruits shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">8. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">9. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of these terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">10. Contact Information</h2>
          <p>For any questions about these Terms and Conditions, please contact us at:</p>
          <div className="mt-2">
            <p>Email: legal@bharatdryfruits.com</p>
            <p>Phone: [Your Contact Number]</p>
            <p>Address: [Your Business Address]</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TermsAndConditions; 