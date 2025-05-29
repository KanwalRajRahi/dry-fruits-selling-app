import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">1. Information We Collect</h2>
          <p className="mb-2">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information</li>
            <li>Billing and shipping address</li>
            <li>Payment information</li>
            <li>Order history and preferences</li>
            <li>Account credentials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">2. How We Use Your Information</h2>
          <p className="mb-2">We use the collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processing and fulfilling your orders</li>
            <li>Communicating about your orders and account</li>
            <li>Sending promotional offers (with your consent)</li>
            <li>Improving our website and services</li>
            <li>Preventing fraud and ensuring security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers (payment processors, shipping partners)</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of sensitive data</li>
            <li>Secure payment processing</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">6. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remember your preferences</li>
            <li>Analyze website usage</li>
            <li>Improve user experience</li>
            <li>Provide personalized content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">7. Contact Us</h2>
          <p>For any privacy-related questions or concerns, please contact us at:</p>
          <div className="mt-2">
            <p>Email: privacy@bharatdryfruits.com</p>
            <p>Phone: [Your Contact Number]</p>
            <p>Address: [Your Business Address]</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-amber-700 mb-3">8. Updates to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. The latest version will always be posted on our website with the effective date.</p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy; 