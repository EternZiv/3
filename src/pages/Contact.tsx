import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { createContactMessage } from "../admin/adminApi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState("Karachi");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createContactMessage(formData);
      toast.success("Message sent successfully! We'll reply within 24h.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Karachi Office: 1D‑27 Sector 30, Korangi, Karachi, Pakistan",
        "Lahore Office: 10 Ali Block, Garden Town, Lahore",
      ],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Karachi: 111‑P2G‑247", "Lahore: (042) 3591 1165‑69"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@power2go.energy", "sales@power2go.energy", "support@power2go.energy"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon‑Fri: 9 AM‑6 PM", "Sat: 10 AM‑4 PM", "Sun: Closed"],
    },
  ];

  const offices = [
    {
      city: "Karachi",
      address: "1D‑27 Sector 30, Korangi, Karachi, Pakistan",
      phone: "111‑P2G‑247",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59.1!2d67.0992625!3d24.8297773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33b00375af6b5%3A0xd31235cf42fa277e!2sPower2Go.Energy+Private+Limited!5e1!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s",
    },
    {
      city: "Lahore",
      address: "10 Ali Block, Garden Town, Lahore",
      phone: "(042) 3591 1165‑69",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.5!2d74.326!3d31.503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMwJzEwLjgiTiA3NMKwMTknMzMuNiJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s",
    },
  ];

  const getMapUrl = () => {
    const office = offices.find(o => o.city === selectedOffice);
    return office?.mapUrl ?? offices[0].mapUrl;
  };

  return (

    <div className="min-h-screen bg-[#08080a] text-white font-sans pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 bg-gray-900/80 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions about our energy solutions? Our team is ready to help you power the future.
          </p>
        </div>
      </motion.section>

      {/* Info Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        className="py-12 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-200/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{info.title}</h3>
              <div className="text-sm space-y-1 text-gray-300">
                {info.details.map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Form & Map */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        className="py-12 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input id="name" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus-visible:ring-emerald-500" />
              <Input id="email" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus-visible:ring-emerald-500" />
              <Input id="phone" name="phone" placeholder="+92 300 1234567" required value={formData.phone} onChange={handleChange} className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus-visible:ring-emerald-500" />
              <Input id="subject" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus-visible:ring-emerald-500" />
              <Textarea id="message" name="message" rows={5} placeholder="Your message..." required value={formData.message} onChange={handleChange} className="bg-white/5 border border-white/20 text-white placeholder-gray-400 focus-visible:ring-emerald-500" />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                {isSubmitting ? "Sending…" : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Office Selector & Map */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Offices</h2>
            <div className="grid grid-cols-2 gap-4">
              {offices.map((office) => (
                <button key={office.city} onClick={() => setSelectedOffice(office.city)} className={`p-3 text-left border rounded-xl transition ${selectedOffice === office.city ? "border-emerald-500 bg-emerald-500/10" : "border-white/20 bg-white/5 hover:bg-white/10"}`}>
                  <h3 className="font-semibold text-white">{office.city} Office</h3>
                  <p className="text-xs text-gray-300 mt-1">{office.phone}</p>
                </button>
              ))}
            </div>
            <div className="border border-white/20 rounded-2xl overflow-hidden h-64">
              <iframe title="Office Map" src={getMapUrl()} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call‑to‑Action */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        className="py-12 md:py-24 bg-[#08080a] text-center"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Power Your Future?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Get a tailored quote or speak directly with our engineering team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold">View Products</Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-3 rounded-xl font-semibold">Request a Quote</Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}