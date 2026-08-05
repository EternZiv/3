import { FileText, Shield, AlertTriangle } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      {/* Hero Section: Premium Dark Carbon Grid */}
      <section className="relative py-20 bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(259,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(259,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Legal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">Terms of Service</h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Governing rules and warranty terms of use
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose max-w-none text-gray-700 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Terms and Conditions</h2>
            <p className="leading-relaxed">
              These Terms of Service govern your use of the Power2Go.Energy website and outline the contractual warranty rules under which Power2Go Energy Private Limited BESS units are registered and serviced.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Warranty Activation Rules
            </h2>
            <p className="leading-relaxed mb-4">
              All Power2Go residential, commercial, and portable products carry a comprehensive manufacturer warranty, subject to these activation requirements:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Timely Registration:</strong> Warranty must be registered through this website within thirty (30) days of the purchase date.</li>
              <li><strong>Accurate Details:</strong> The serial number, purchase date, and dealer details submitted must match the official sales invoice.</li>
              <li><strong>Certified Installation:</strong> Residential and commercial systems must be installed by a Power2Go certified installer. Self-installation of high-voltage systems voids all warranty protections.</li>
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-emerald-600" />
              Warranty Exclusions
            </h2>
            <p className="leading-relaxed mb-4">
              The warranty covers only hardware manufacturing defects under normal operating conditions. It does not cover damage resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Grid fluctuations, lightning strikes, flooding, or other acts of god.</li>
              <li>Incorrect configuration, overloading, or integration with incompatible third-party BESS components.</li>
              <li>Attempted repairs, changes, or services performed by unauthorized personnel.</li>
              <li>Normal wear-and-tear or battery degradation exceeding normal cycles specified in the datasheet.</li>
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Use of Platform
            </h2>
            <p className="leading-relaxed">
              You agree to use this platform only for lawful purposes, such as checking your warranty, managing your customer profile, or contacting our team. Any attempt to scrape warranty data, brute-force admin routes, or submit fraudulent claims is strictly prohibited and will result in permanent service suspension.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-8 bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Legal Jurisdiction</h3>
            <p className="text-emerald-800 text-sm">
              These terms are governed by and construed in accordance with the corporate laws of the Islamic Republic of Pakistan. Any dispute arising from warranty claims shall be resolved in Lahore or Karachi courts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
