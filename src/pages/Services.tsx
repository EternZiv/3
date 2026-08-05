import { motion } from "motion/react";
import { Wrench, Shield, Zap, HeadphonesIcon, CheckCircle2, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: Wrench,
      title: "Installation & Setup",
      description: "Professional installation services by certified technicians to ensure optimal performance and safety.",
      features: [
        "Site inspection and assessment",
        "Professional installation",
        "System configuration",
        "Safety compliance check"
      ]
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description: "Regular maintenance and 24/7 technical support to keep your energy storage system running smoothly.",
      features: [
        "Scheduled maintenance visits",
        "Performance monitoring",
        "Firmware updates",
        "Emergency support"
      ]
    },
    {
      icon: Zap,
      title: "System Optimization",
      description: "Maximize your energy savings with our expert system optimization and efficiency audits.",
      features: [
        "Energy usage analysis",
        "Performance optimization",
        "Cost savings report",
        "Upgrade recommendations"
      ]
    },
    {
      icon: HeadphonesIcon,
      title: "Consultation Services",
      description: "Expert guidance to help you choose the right energy storage solution for your needs.",
      features: [
        "Free initial consultation",
        "Custom solution design",
        "ROI calculation",
        "Financing options"
      ]
    }
  ];

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 backdrop-blur-md text-xs font-bold uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Engineering Support & Services
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-extrabold mb-6 text-white text-[40px] sm:text-[52px] md:text-[68px] leading-[1.12] tracking-tight font-sans max-w-3xl mx-auto"
          >
            Our Services & Engineering Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 font-semibold max-w-2xl mx-auto mb-8"
          >
            Comprehensive installation, maintenance, optimization, and consultation services for your Power2Go energy storage systems.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full bg-white border border-gray-200/50 rounded-3xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                      <service.icon className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sans tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-normal font-semibold">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 pl-14">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-650 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-20 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Warranty & Protection
            </h2>
            <p className="text-sm sm:text-base text-gray-550 max-w-2xl mx-auto font-medium">
              All Power2Go energy storage systems are backed by industry-standard warranties and proactive operations monitoring.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "5 Years", label: "Product Warranty", desc: "Comprehensive engineering coverage on all battery cells and components." },
              { title: "24/7", label: "Support Access", desc: "Enterprise telemetry support and remote assistance channels." },
              { title: "Free", label: "Installation Guidance", desc: "Full certified engineering site audits and remote implementation checkups." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center h-full bg-white border border-gray-200/50 rounded-3xl hover:shadow-md transition-all duration-300">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-2 font-sans tracking-tight">{item.title}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans tracking-tight">{item.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-normal font-semibold">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#08080a] rounded-3xl p-10 md:p-12 text-center text-white relative overflow-hidden select-none border border-gray-900"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-sans tracking-tight">
              Need Assistance Selecting a Solution?
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-2xl mx-auto font-semibold leading-relaxed">
              Our support team and grid engineers are ready to build a custom load profile and recommend suitable capacity units.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-5.5 rounded-2xl text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <Phone className="mr-2 h-4 w-4 shrink-0" />
                  Contact Us
                </Button>
              </Link>
              <Link to="/support">
                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white text-white hover:text-gray-900 font-extrabold px-8 py-5.5 rounded-2xl text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  Visit Support Center
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
