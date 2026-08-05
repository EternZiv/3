import { Book, Download, MessageCircle, Phone, Mail, Clock, Search, FileText, Video, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk to our expert team",
      detail: "+92-300-1234567",
      availability: "Mon-Fri, 9 AM - 6 PM PKT"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed assistance",
      detail: "support@power2go.energy",
      availability: "Response within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help online",
      detail: "Start Chat",
      availability: "Mon-Sat, 9 AM - 8 PM PKT"
    }
  ];

  const resources = [
    {
      icon: Book,
      title: "User Manuals",
      description: "Comprehensive guides for all our products with installation and operation instructions.",
      action: "Download Manuals"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides covering installation, setup, and troubleshooting.",
      action: "Watch Videos"
    },
    {
      icon: FileText,
      title: "Technical Specs",
      description: "Detailed technical specifications and datasheets for all product models.",
      action: "View Specs"
    },
    {
      icon: Download,
      title: "Software & Firmware",
      description: "Latest software updates, mobile apps, and firmware for your energy systems.",
      action: "Download Now"
    }
  ];

  const faqs = [
    {
      question: "How long does installation take?",
      answer: "Professional installation typically takes 4-8 hours depending on the system size and complexity. Our certified installers will work efficiently to minimize disruption."
    },
    {
      question: "What warranty coverage do you offer?",
      answer: "All Power2Go systems come with a comprehensive 10-year warranty covering defects and performance. Extended warranty options are available up to 15 years."
    },
    {
      question: "Can I expand my system later?",
      answer: "Yes! Our modular systems are designed for easy expansion. You can add additional battery modules as your energy needs grow."
    },
    {
      question: "What maintenance is required?",
      answer: "Power2Go systems require minimal maintenance. We recommend an annual inspection by a certified technician and regular monitoring through our mobile app."
    },
    {
      question: "How do I monitor my system?",
      answer: "Use the Power2Go mobile app (iOS and Android) to monitor your system in real-time, view energy usage, and receive alerts."
    },
    {
      question: "What happens during a power outage?",
      answer: "Your Power2Go system automatically switches to battery power within milliseconds, keeping your essential appliances running seamlessly."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      {/* Hero Section: Premium Dark Tech Grid */}
      <section className="relative h-[550px] md:h-[650px] bg-black text-white overflow-hidden flex items-center border-b border-gray-900 select-none">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] z-10 opacity-60 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Support & Engineering Assistance
          </div>
          <h1 className="font-extrabold mb-6 text-white text-[40px] sm:text-[52px] md:text-[68px] leading-[1.12] tracking-tight font-sans max-w-3xl mx-auto">
            We're Here to Help
          </h1>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 font-semibold max-w-2xl mx-auto mb-8">
            Installation, troubleshooting, documentation — get answers directly from our engineering support team.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                className="w-full pl-12 pr-4 py-6 text-base bg-white/5 border border-gray-800 text-white placeholder:text-gray-600 rounded-2xl focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">Contact Options</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto font-medium">
              Choose your preferred way to reach our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <channel.icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  {channel.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-medium">
                  {channel.description}
                </p>
                <div className="text-base font-bold text-emerald-600 mb-3">
                  {channel.detail}
                </div>
                <div className="flex items-center justify-center text-xs text-gray-400 font-semibold">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {channel.availability}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">Downloads</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Resources & Downloads
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto font-medium">
              Access manuals, videos, and technical documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-gray-50/80 border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <resource.icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900 mb-2 tracking-tight">
                  {resource.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4 font-medium leading-relaxed">
                  {resource.description}
                </p>
                <Button variant="outline" className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-bold tracking-wider rounded-xl">
                  {resource.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-500 font-medium">
              Quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden hover:border-emerald-200 transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <HelpCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="font-bold text-gray-900 text-sm">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`transform transition-transform ml-4 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-2 bg-gray-50/50 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed pl-8 font-medium">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#08080a] border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Still Have Questions?</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
            Talk to Our Engineers
          </h2>
          <p className="text-gray-400 mb-8 text-lg font-medium">
            Our expert support team is ready to assist with any technical questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 text-sm tracking-wider rounded-2xl transition-all hover:scale-[1.02]">
                Contact Support
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 text-sm font-bold tracking-wider rounded-2xl">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
