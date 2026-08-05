import { Lock, Eye, FileText } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      {/* Hero Section: Premium Dark Carbon Grid */}
      <section className="relative py-20 bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(259,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(259,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Legal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">Privacy Policy</h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            How we protect and manage your personal information
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose max-w-none text-gray-700 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="leading-relaxed">
              Power2Go Energy Private Limited ("we", "us", or "our") values your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, register a product warranty, or contact us.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              Information We Collect
            </h2>
            <p className="leading-relaxed mb-4">
              We collect information that you provide directly to us when using our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identifiable Information (PII):</strong> Full name, email address, phone number, physical address, and city.</li>
              <li><strong>Account Credentials:</strong> Passwords and security credentials when you create a profile.</li>
              <li><strong>Product & Warranty Details:</strong> Product models, serial numbers, date of purchase, dealer name, and dealer location.</li>
              <li><strong>Claim Attachments:</strong> Supporting documents, photos, or receipts uploaded for warranty claims.</li>
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-4">
              We process your personal information for the following business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To register and administer your product warranties.</li>
              <li>To process and resolve warranty claims or requests.</li>
              <li>To respond to customer queries and offer technical support.</li>
              <li>To send transactional emails, confirmations, and security notices.</li>
              <li>To comply with regulatory obligations and legal requirements.</li>
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Data Security and Retention
            </h2>
            <p className="leading-relaxed">
              We implement strict technical and organizational security measures to protect your customer PII. Your personal information is retained only as long as necessary to fulfill your product warranty requirements (typically 5 years from registration) or to comply with corporate tax and commercial laws in Pakistan.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-8 bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Contact Us</h3>
            <p className="text-emerald-800 text-sm">
              If you have any questions or concerns about this policy or our data practices, please reach out to us at:
              <br />
              <strong>Email:</strong> privacy@power2go.energy
              <br />
              <strong>Address:</strong> Power2Go Energy Head Office, Karachi, Pakistan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
