
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronUp } from 'lucide-react';
import { trackEmailClick } from '@/utils/emailTracking';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--neutral-050)' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-forest-gradient text-white py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Privacy Policy</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            How we handle your data and protect your privacy
          </p>
          
          {/* Last Updated Pill */}
          <div className="mt-8">
            <span className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              Last updated: 20 August 2025
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 flex gap-12">
        
        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-32">
            <div className="bg-white rounded-2xl p-6 shadow-premium border border-neutral-200">
              <h3 className="text-lg font-semibold mb-4 text-forest-900">Table of Contents</h3>
              <nav className="space-y-2">
                <a href="#information-we-collect" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  1. Information we collect
                </a>
                <a href="#how-we-use-data" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  2. How we use your data
                </a>
                <a href="#sharing-data" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  3. Sharing your data
                </a>
                <a href="#data-retention" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  4. Data retention
                </a>
                <a href="#cookies" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  5. Cookies
                </a>
                <a href="#your-rights" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  6. Your rights
                </a>
                <a href="#security" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  7. Security
                </a>
                <a href="#children" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  8. Children
                </a>
                <a href="#updates" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  9. Updates
                </a>
                <a href="#contact-us" className="block text-sm font-medium text-forest-600 hover:text-accent-emerald transition-colors py-1 hover:underline">
                  Contact us
                </a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 lg:max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-premium border border-neutral-200">
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <div className="mb-12 text-center lg:text-left">
                <p className="text-lg leading-relaxed mb-4">
                  <strong>Reeves Tree Surgeons Ltd</strong> ("we", "us", "our") provides professional tree care services across the West Midlands. We are committed to protecting your privacy and handling your personal data lawfully, fairly and transparently.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  This Privacy Policy explains what data we collect, why we collect it, how we use it, and your rights under the UK GDPR and the Data Protection Act 2018.
                </p>
                <div className="bg-neutral-050 rounded-lg p-6 space-y-2">
                  <p className="text-lg"><strong>Data Controller:</strong> Reeves Tree Surgeons Ltd</p>
                  <p className="text-lg"><strong>Email:</strong> <a href="mailto:info@reevestreesurgeons.co.uk" onClick={() => trackEmailClick('info@reevestreesurgeons.co.uk')} className="text-accent-emerald hover:text-forest-600 underline">info@reevestreesurgeons.co.uk</a></p>
                  <p className="text-lg"><strong>Telephone:</strong> <a href="tel:01527-874143" className="text-accent-emerald hover:text-forest-600 underline">01527 874143</a></p>
                  <p className="text-lg"><strong>Postal Address:</strong> [Insert your full registered business address here]</p>
                </div>
              </div>

              <section id="information-we-collect" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">1. Information we collect</h2>
                <p className="text-lg leading-relaxed mb-4">
                  When you use our website, request a quote, or contact us, we may collect:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  <li><strong>Identity & Contact Details</strong> – name, phone number, email, address/postcode.</li>
                  <li><strong>Service Information</strong> – property details, tree information, and any photos you upload.</li>
                  <li><strong>Communication Data</strong> – messages, emails, and call notes.</li>
                  <li><strong>Technical Data</strong> – IP address, browser type, pages visited, cookie preferences.</li>
                  <li><strong>Testimonials/Reviews</strong> – with your consent if you provide them.</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  We do not collect or store payment card details via this website.
                </p>
              </section>

              <section id="how-we-use-data" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">2. How we use your data</h2>
                <p className="text-lg leading-relaxed mb-4">
                  We use your data to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  <li>Provide quotes and services you request.</li>
                  <li>Respond to enquiries and customer support.</li>
                  <li>Send booking confirmations and updates.</li>
                  <li>Improve our website performance and services.</li>
                  <li>Meet legal obligations (e.g., insurance, tax, safety).</li>
                  <li>Publish testimonials (with your consent).</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  <strong>Legal bases:</strong> Contract, Legitimate Interests, Legal Obligation, and Consent (for optional uses like reviews or analytics).
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  <strong>We never sell your data.</strong>
                </p>
              </section>

              <section id="sharing-data" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">3. Sharing your data</h2>
                <p className="text-lg leading-relaxed mb-4">
                  We only share your data with trusted service providers ("processors") such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  <li>Website hosting providers (e.g., Loveable or other hosts).</li>
                  <li>Email and productivity tools.</li>
                  <li>Analytics tools (only if you consent).</li>
                  <li>Telecoms providers (for call handling).</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  If required by law, we may disclose information to regulators or authorities.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  If data is transferred outside the UK/EEA, we ensure safeguards (such as Standard Contractual Clauses) are in place.
                </p>
              </section>

              <section id="data-retention" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">4. Data retention</h2>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  <li><strong>Quote requests/enquiries:</strong> up to 24 months after last contact.</li>
                  <li><strong>Job records, invoices, insurance & H&S data:</strong> up to 7 years (legal/insurance).</li>
                  <li><strong>Photos:</strong> kept only as needed for quoting or with your consent for marketing.</li>
                  <li><strong>Cookie consent records:</strong> up to 12 months.</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  After this, data is securely deleted or anonymised.
                </p>
              </section>

              <section id="cookies" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">5. Cookies</h2>
                <p className="text-lg leading-relaxed mb-4">
                  We use essential cookies to make our site function properly. With your consent, we may also use analytics cookies to understand site performance.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  You can:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  <li>Accept/reject non-essential cookies via our cookie banner.</li>
                  <li>Change preferences anytime via the "Cookie Settings" link in the footer.</li>
                  <li>Manage cookies through your browser.</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  See our separate Cookie Notice for details.
                </p>
              </section>

              <section id="your-rights" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">6. Your rights</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Under UK GDPR, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  <li>Access your personal data.</li>
                  <li>Correct inaccurate or incomplete data.</li>
                  <li>Request deletion ("right to be forgotten").</li>
                  <li>Restrict or object to certain uses.</li>
                  <li>Request transfer of your data.</li>
                  <li>Withdraw consent at any time.</li>
                  <li>Lodge a complaint with the ICO (Information Commissioner's Office): <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:text-forest-600 underline">ico.org.uk</a> / <a href="tel:0303-123-1113" className="text-accent-emerald hover:text-forest-600 underline">0303 123 1113</a>.</li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  To exercise these rights, email <a href="mailto:info@reevestreesurgeons.co.uk" onClick={() => trackEmailClick('info@reevestreesurgeons.co.uk')} className="text-accent-emerald hover:text-forest-600 underline">info@reevestreesurgeons.co.uk</a>.
                </p>
              </section>

              <section id="security" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">7. Security</h2>
                <p className="text-lg leading-relaxed">
                  We use industry-standard security measures (SSL/HTTPS encryption, access controls, secure hosting). While no system is 100% secure, we continually review our safeguards.
                </p>
              </section>

              <section id="children" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">8. Children</h2>
                <p className="text-lg leading-relaxed">
                  Our services are intended for adults. We do not knowingly collect children's data. If you believe a child has provided information, contact us so we can remove it.
                </p>
              </section>

              <section id="updates" className="mb-12">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">9. Updates</h2>
                <p className="text-lg leading-relaxed">
                  We may update this Privacy Policy from time to time. The latest version will always be published here with a "Last updated" date.
                </p>
              </section>

              <section id="contact-us" className="mb-8">
                <h2 className="text-2xl font-bold text-forest-900 mb-6">Contact us</h2>
                <div className="bg-neutral-050 rounded-lg p-6 space-y-2">
                  <p className="text-lg">📧 <a href="mailto:info@reevestreesurgeons.co.uk" onClick={() => trackEmailClick('info@reevestreesurgeons.co.uk')} className="text-accent-emerald hover:text-forest-600 underline">info@reevestreesurgeons.co.uk</a></p>
                  <p className="text-lg">📞 <a href="tel:01527-874143" className="text-accent-emerald hover:text-forest-600 underline">01527 874143</a></p>
                </div>
              </section>

            </div>
          </div>

          {/* Back to Top Button */}
          <div className="mt-8 text-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-500 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2"
            >
              <ChevronUp size={20} />
              Back to top
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
