import { useState } from "react";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Youtube, 
  Twitter, 
  Send 
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "figma:asset/5ce08c1df550714d0fc0aa9b66e97432a1986a84.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setLoading(false);
    }, 800);
  };

  return (
    <footer className="bg-[#08080a] text-gray-500 select-none border-t border-gray-900/60 font-sans">
      
      {/* Top Segment: Brand & Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pb-16 border-b border-gray-900/50">
          
          {/* Left Block: Brand, Info, and Newsletter */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <img src={logo} alt="Power2Go" className="h-9 mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              We design and manufacture high-performance clean energy storage systems for grid stability, industrial nodes, and modern homes.
            </p>

            {/* Compact Newsletter Input */}
            <div className="w-full max-w-sm mb-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                Subscribe to Tech Digest
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter corporate email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-900/40 border border-gray-800 focus:border-emerald-500/80 px-4 py-2.5 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
            
            {/* Social Media links with clean scale transitions */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, url: "https://linkedin.com/company/power2go" },
                { icon: Youtube, url: "https://youtube.com/@power2go" },
                { icon: Facebook, url: "https://facebook.com/power2go" },
                { icon: Instagram, url: "https://instagram.com/power2go" },
                { icon: Twitter, url: "https://twitter.com/power2go" }
              ].map((social, idx) => {
                const SocialIcon = social.icon;
                return (
                  <a 
                    key={idx}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 hover:border-gray-700 hover:bg-gray-800"
                  >
                    <SocialIcon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Block: Simplified Tidy Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 text-left">
            
            {/* Company Column */}
            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-5">Company</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-gray-400">
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Solutions Column */}
            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-5">Solutions</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-gray-400">
                <li><Link to="/solutions" className="hover:text-emerald-400 transition-colors">Residential</Link></li>
                <li><Link to="/solutions" className="hover:text-emerald-400 transition-colors">Commercial</Link></li>
                <li><Link to="/solutions" className="hover:text-emerald-400 transition-colors">Industrial</Link></li>
              </ul>
            </div>

            {/* Products Column */}
            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-5">Products</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-gray-400">
                <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Energy Vault 25</Link></li>
                <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Energy Vault 75</Link></li>
                <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Pulse Portable</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-5">Resources</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-gray-400">
                <li><Link to="/documentation" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
                <li><Link to="/calculator" className="hover:text-emerald-400 transition-colors">Calculator</Link></li>
                <li><Link to="/faqs" className="hover:text-emerald-400 transition-colors">FAQs Help</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Segment: Contact Details & Legal Copyright */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-left">
          
          {/* Global Contact row */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-semibold text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <span>Karachi, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-500" />
              <span>111-P2G-247</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-500" />
              <span>info@power2go.energy</span>
            </div>
          </div>

          {/* Legal Copyright info */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-xs font-semibold text-gray-500">
            <span>© {new Date().getFullYear()} Power2Go Energy. All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
