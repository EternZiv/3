import { HelpCircle, ChevronDown, Search, Zap, Shield, Settings, Package, DollarSign } from "lucide-react";
import { useState } from "react";

export default function FAQS() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "general", name: "General", icon: Package },
    { id: "technical", name: "Technical", icon: Settings },
    { id: "installation", name: "Installation", icon: Zap },
    { id: "warranty", name: "Warranty", icon: Shield },
    { id: "pricing", name: "Pricing", icon: DollarSign },
  ];

  const faqs = [
    {
      category: "general",
      question: "What is Power2Go and what products do you offer?",
      answer: "Power2Go is a leading manufacturer of advanced energy storage solutions. We offer a comprehensive range of products including residential battery systems, commercial energy storage solutions, industrial-scale systems, and portable power stations. Our products are designed to provide reliable, efficient, and sustainable energy storage for various applications."
    },
    {
      category: "general",
      question: "How long does a Power2Go battery system last?",
      answer: "Power2Go battery systems are designed for longevity with a typical lifespan of 10-15 years depending on usage patterns and maintenance. Our lithium iron phosphate (LiFePO4) batteries can handle 6000+ charge cycles while maintaining 80% capacity. We provide a comprehensive warranty covering performance degradation over time."
    },
    {
      category: "technical",
      question: "What is the efficiency of Power2Go battery systems?",
      answer: "Our battery systems achieve industry-leading round-trip efficiency of 95-97%. This means that for every 100 kWh stored, you can retrieve 95-97 kWh for use. The integrated Battery Management System (BMS) optimizes charging and discharging to maintain peak efficiency throughout the system's lifetime."
    },
    {
      category: "technical",
      question: "Can I monitor my system remotely?",
      answer: "Yes! All Power2Go systems come with advanced monitoring capabilities. Our mobile app and web dashboard provide real-time data on energy production, consumption, battery status, and system performance. You can monitor your system from anywhere in the world with an internet connection."
    },
    {
      category: "technical",
      question: "Are Power2Go systems compatible with solar panels?",
      answer: "Absolutely! Power2Go battery systems are designed to integrate seamlessly with solar panel installations from any manufacturer. Our systems support both AC and DC coupling configurations, making them compatible with new and existing solar setups. We provide complete hybrid solutions for maximum energy independence."
    },
    {
      category: "installation",
      question: "How long does installation take?",
      answer: "A typical residential installation takes 4-8 hours, depending on system size and complexity. Commercial installations may take 1-3 days. Installation must be performed by certified professionals. We work with a network of certified installers across Pakistan who are trained specifically on Power2Go systems."
    },
    {
      category: "installation",
      question: "Do I need special permits for installation?",
      answer: "Yes, most locations require electrical permits and inspections for battery system installations. Our certified installers handle all permit applications and ensure compliance with local building codes and regulations. Requirements vary by location, but we guide you through the entire process."
    },
    {
      category: "installation",
      question: "Can the system be installed outdoors?",
      answer: "Power2Go offers both indoor and outdoor-rated systems. Our outdoor models feature IP65-rated enclosures that protect against dust and water ingress. Indoor installations require adequate ventilation and temperature control. Your installer will assess your site and recommend the best configuration for your needs."
    },
    {
      category: "warranty",
      question: "What warranty do you provide?",
      answer: "We offer a comprehensive 10-year warranty on all residential systems and 5-year warranty on commercial/industrial systems. The warranty covers manufacturing defects, component failures, and performance degradation below specified thresholds (typically 80% capacity retention). Extended warranty options are available up to 15 years."
    },
    {
      category: "warranty",
      question: "What does the warranty cover?",
      answer: "Our warranty covers all system components including battery cells, BMS, inverter, and mounting hardware. It includes free replacement of defective parts, labor costs for repairs, and performance guarantees. The warranty does not cover damage from improper installation, unauthorized modifications, or force majeure events."
    },
    {
      category: "warranty",
      question: "How do I claim warranty service?",
      answer: "To claim warranty service, contact our support team via phone, email, or through the mobile app. Provide your system serial number and description of the issue. Our technical team will diagnose the problem remotely if possible. If physical service is required, we dispatch certified technicians within 48-72 hours."
    },
    {
      category: "pricing",
      question: "How much does a Power2Go system cost?",
      answer: "Pricing varies based on system capacity and configuration. Residential systems start from PKR 450,000 for a 5kWh system and range up to PKR 2,500,000+ for larger installations. Commercial systems are quoted based on specific requirements. Contact our sales team for a detailed quote tailored to your energy needs."
    },
    {
      category: "pricing",
      question: "Are there financing options available?",
      answer: "Yes, we partner with leading financial institutions to offer flexible financing options. These include 0% installment plans for up to 12 months, low-interest loans for 24-60 months, and leasing options for commercial customers. Financing availability and terms depend on creditworthiness and system size."
    },
    {
      category: "pricing",
      question: "What is included in the price?",
      answer: "The system price includes all hardware components (battery modules, BMS, inverter, mounting equipment), monitoring software subscription for 2 years, standard installation by certified professionals, and warranty coverage. Additional costs may include extended warranties, electrical upgrades, or premium monitoring features."
    },
    {
      category: "general",
      question: "How do I maintain my Power2Go system?",
      answer: "Power2Go systems require minimal maintenance. We recommend quarterly visual inspections, annual professional servicing, and keeping firmware updated (automatic via WiFi). The BMS continuously monitors system health and alerts you to any issues. Regular cleaning of ventilation areas and checking connections ensures optimal performance."
    },
    {
      category: "technical",
      question: "What happens during a power outage?",
      answer: "During a grid outage, Power2Go systems with backup functionality automatically switch to battery power within milliseconds (typically <10ms). Your critical loads continue operating seamlessly. The system prioritizes essential appliances and manages available battery capacity intelligently. When grid power returns, the system automatically reconnects."
    },
    {
      category: "general",
      question: "Can I expand my system later?",
      answer: "Yes! Power2Go systems are designed with expandability in mind. You can add battery modules to increase capacity or add additional inverters for more power. Our modular architecture allows systems to grow with your needs. Consult with our technical team to ensure compatibility and proper system configuration."
    },
    {
      category: "technical",
      question: "What safety features are included?",
      answer: "Safety is our top priority. Every system includes multiple protection layers: overcharge/over-discharge protection, temperature monitoring and thermal management, short-circuit protection, ground fault protection, arc fault detection, and automatic emergency shutdown. Our BMS continuously monitors all safety parameters 24/7."
    },
  ];

  const filteredFaqs = faqs
    .filter(faq => activeCategory === "all" || faq.category === activeCategory)
    .filter(faq =>
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      {/* Hero Section: Premium Dark Carbon Grid */}
      <section className="relative py-24 bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(259,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(259,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/5 blur-[80px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">
            Knowledge Base
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold mb-6 tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed mb-10">
            Find answers to commonly asked questions about Power2Go energy storage systems.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-sm bg-white/5 border border-gray-800 text-white placeholder:text-gray-600 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                <category.icon className="w-3.5 h-3.5" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden hover:border-emerald-200 transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <HelpCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <h3 className="text-sm font-bold text-gray-900 pr-4 leading-relaxed break-words whitespace-normal">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ml-4 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 pl-14 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed font-medium pt-3">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#08080a] border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Need More Help?</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
            Still Have Questions?
          </h2>
          <p className="text-gray-400 mb-8 text-lg font-medium">
            Our support team is here to help you with any questions about Power2Go products and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-4 rounded-2xl text-sm tracking-wider transition-all hover:scale-[1.02]">
              Contact Support
            </button>
            <button className="border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-2xl text-sm font-bold tracking-wider transition-all">
              Request a Call Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
