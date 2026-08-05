import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  Search,
  User,
  X,
  GitCompare,
  ArrowRight,
  Sun,
  Battery,
  Zap,
  Cpu,
  Activity,
  Shield,
  Network,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { useCompare } from "../context/CompareContext";

import logo from "figma:asset/77747af3103ef2d86e83f2259cd8a89b07a206af.png";
import pulseImg from "figma:asset/ea529c31d35fcbf1a139a1bce88295e077160b2b.png";
import lvImg from "figma:asset/d302be08e4e938ad503ae31569661716ec3fc738.png";
import hvImg from "figma:asset/b513ab30d1b02dbe05d9d52d7e3e8a9aae208341.png";
import monitoringImg from "figma:asset/ad3f165e372f5048d4697f9bed1945fb35149239.png";

export function Header() {
  const navigate = useNavigate();
  const { comparedProducts } = useCompare();
  useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  // Mega Menu Hover state with Stripe-style delay
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  // Search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "BESS Container",
    "PULSE 320",
    "Warranty Verification",
    "LV Energy Vault",
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard support (Escape key to close modal/menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      // Add to recent list (deduplicated)
      if (!recentSearches.includes(q)) {
        setRecentSearches((prev) => [q, ...prev.slice(0, 3)]);
      }
      navigate(`/products?search=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const selectRecentSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const toggleMobileAccordion = (name: string) => {
    setMobileAccordion((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Floating Navbar */}
      <header
        className={`fixed left-4 right-4 z-50 transition-all duration-300 max-w-[1400px] mx-auto rounded-[24px] border border-gray-200/40 shadow-lg ${
          scrolled
            ? "top-2 md:top-3 bg-white/90 backdrop-blur-lg shadow-xl"
            : "top-4 bg-white/75 backdrop-blur-md"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src={logo} alt="Power2Go" className="h-10 md:h-12" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-10" role="menubar">
              {[
                { name: "solutions", label: "Solutions", to: "/solutions" },
                { name: "products", label: "Products", to: "/products" },
                { name: "company", label: "Company", to: "/about" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="relative py-5"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  role="none"
                >
                  <Link
                    to={item.to}
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={activeMenu === item.name}
                    onClick={(e) => {
                      if (item.name !== "products") {
                        e.preventDefault();
                      } else {
                        setActiveMenu(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setActiveMenu(item.name);
                      }
                    }}
                    className={`flex items-center gap-1 text-[15px] font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md ${
                      activeMenu === item.name
                        ? "text-emerald-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        activeMenu === item.name ? "rotate-180 text-emerald-600" : "text-gray-400"
                      }`}
                    />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right-side Actions */}
            <div className="flex items-center gap-3">
              {/* Search button trigger */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex hover:bg-gray-100 rounded-full h-10 w-10 shrink-0 cursor-pointer"
                aria-label="Open Search"
              >
                <Search className="h-5 w-5 text-gray-600 hover:text-emerald-600 transition-colors" />
              </Button>

              {/* Compare Badge Trigger */}
              <Link to="/compare" className="hidden lg:flex relative shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 rounded-full h-10 w-10 cursor-pointer"
                  aria-label="Compare Products"
                >
                  <GitCompare className="h-5 w-5 text-gray-600 hover:text-emerald-600 transition-colors" />
                  {comparedProducts.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm">
                      {comparedProducts.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Profile Account */}
              <Link to="/profile" className="hidden lg:flex shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 rounded-full h-10 w-10 cursor-pointer"
                  aria-label="User Account"
                >
                  <User className="h-5 w-5 text-gray-600 hover:text-emerald-600 transition-colors" />
                </Button>
              </Link>

              {/* Primary Premium CTA */}
              <Link to="/contact" className="hidden lg:inline-block shrink-0">
                <button className="group relative bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5">
                  <span>Get a Quote</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>

              {/* Mobile hamburger menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full h-10 w-10 cursor-pointer shrink-0"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Mobile Menu"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mega Menus Dropdown Cards */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 right-0 top-[65px] bg-white border border-gray-200/50 shadow-2xl rounded-3xl overflow-hidden mx-1.5 md:mx-3 p-8 z-40"
              onMouseEnter={() => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              {/* SOLUTIONS MEGA MENU */}
              {activeMenu === "solutions" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Solutions List */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2 border-b border-gray-100 pb-3 mb-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600">Solutions</h3>
                    </div>
                    {[
                      {
                        title: "Solar Solutions",
                        desc: "High-yield photovoltaic solar integration grids.",
                        icon: Sun,
                        link: "/solutions",
                      },
                      {
                        title: "Battery Energy Storage",
                        desc: "High-voltage/low-voltage Vault systems.",
                        icon: Battery,
                        link: "/solutions",
                      },
                      {
                        title: "EV Charging Solutions",
                        desc: "Fast EV infrastructure for fleets and businesses.",
                        icon: Zap,
                        link: "/solutions",
                      },
                      {
                        title: "Energy Management",
                        desc: "Intelligent AI-driven energy controllers.",
                        icon: Cpu,
                        link: "/solutions",
                      },
                      {
                        title: "Smart Grid Integration",
                        desc: "Interactive storage setups tied with localized grids.",
                        icon: Network,
                        link: "/solutions",
                      },
                      {
                        title: "Utility Scale Solutions",
                        desc: "Massive megawatt storage backup units.",
                        icon: Activity,
                        link: "/solutions",
                      },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        to={item.link}
                        onClick={() => setActiveMenu(null)}
                        className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition duration-300 group"
                      >
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition duration-300 shrink-0">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-[15px] group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 leading-normal">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Right Column: Promotional Block */}
                  <div className="lg:col-span-5">
                    <div className="relative h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 p-6 flex flex-col justify-end text-white border border-slate-800">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent)] pointer-events-none" />
                      <div className="relative z-10 space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-400">
                          <Shield className="h-3 w-3" />
                          Featured Technology
                        </div>
                        <h4 className="text-xl font-bold tracking-tight">The Next Generation of Clean Storage</h4>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                          Discover how our modular high-voltage Vault batteries power grids, facilities, and critical networks.
                        </p>
                        <Link
                          to="/solutions"
                          onClick={() => setActiveMenu(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-white transition group pt-2 cursor-pointer"
                        >
                          <span>Explore Solutions</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCTS MEGA MENU */}
              {activeMenu === "products" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Product categories */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2 border-b border-gray-100 pb-3 mb-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600">Product Categories</h3>
                    </div>
                    {[
                      {
                        title: "Residential Storage",
                        desc: "LV 5, LV Wall Mount 5 & LV 16 (5 - 25 kWh).",
                        image: lvImg,
                        link: "/products?category=residential",
                      },
                      {
                        title: "Commercial Storage",
                        desc: "HV 7.5 & HV 60 Systems.",
                        image: hvImg,
                        link: "/products?category=commercial",
                      },
                      {
                        title: "Industrial Storage",
                        desc: "HV Energy Vault 60, 70 & 240 Towers.",
                        image: hvImg,
                        link: "/products?category=industrial",
                      },
                      {
                        title: "Portable Power",
                        desc: "PULSE 320 portable stations.",
                        image: pulseImg,
                        link: "/products?category=portable",
                      },
                      {
                        title: "Smart Monitoring",
                        desc: "SEM-PRO cloud telemetry analytics.",
                        image: monitoringImg,
                        link: "/products?category=monitoring",
                      },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        to={item.link}
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-gray-100 transition duration-300 group"
                      >
                        <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition duration-300">
                          <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-[15px] group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 leading-normal">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Right Column: Featured Product Card */}
                  <div className="lg:col-span-5">
                    <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 h-full flex flex-col justify-between">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-4">
                          <Zap className="h-3 w-3" />
                          Featured Product
                        </span>
                        <h4 className="text-lg font-extrabold text-gray-900 leading-tight">LV Energy Vault 25</h4>
                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed max-w-sm">
                          5.0 - 25.0 kWh stackable residential clean power backup system with active smart BMS controllers.
                        </p>
                      </div>

                      <div className="my-5 w-full flex items-center justify-center h-28 bg-white border border-gray-100 rounded-xl p-3 overflow-hidden shadow-inner">
                        <img src={lvImg} alt="LV Energy Vault 25" className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" />
                      </div>

                      <Link to="/products/3" onClick={() => setActiveMenu(null)}>
                        <Button className="w-full h-11 text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center rounded-xl cursor-pointer">
                          <span>View Product details</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}


              {/* COMPANY MEGA MENU */}
              {activeMenu === "company" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 border-b border-gray-100 pb-2">
                      Who We Are
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { label: "About Us", link: "/about" },
                        { label: "Our Story", link: "/about" },
                        { label: "Leadership Team", link: "/about" },
                        { label: "Careers", link: "/about" },
                        { label: "Partners", link: "/about" },
                      ].map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.link}
                            onClick={() => setActiveMenu(null)}
                            className="text-sm text-gray-600 hover:text-emerald-600 hover:pl-1 transition-all duration-200 block py-1 font-semibold"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 border-b border-gray-100 pb-2">
                      Resources
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { label: "Product Documentation", link: "/documentation" },
                        { label: "Installation Guidance", link: "/installation-guidance" },
                        { label: "Technical Certificates", link: "/documentation" },
                        { label: "Case Studies", link: "/solutions" },
                        { label: "Projects", link: "/solutions" },
                      ].map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.link}
                            onClick={() => setActiveMenu(null)}
                            className="text-sm text-gray-600 hover:text-emerald-600 hover:pl-1 transition-all duration-200 block py-1 font-semibold"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 border-b border-gray-100 pb-2">
                      Support & News
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { label: "Blog & News Articles", link: "/blog" },
                        { label: "FAQ Center", link: "/faqs" },
                        { label: "Contact Customer Support", link: "/support" },
                        { label: "Online Registrations Support", link: "/warranty" },
                        { label: "Sales & Inquiries", link: "/contact" },
                      ].map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.link}
                            onClick={() => setActiveMenu(null)}
                            className="text-sm text-gray-600 hover:text-emerald-600 hover:pl-1 transition-all duration-200 block py-1 font-semibold"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[100] flex flex-col justify-start pt-24 px-6 md:px-24"
          >
            <div className="max-w-4xl mx-auto w-full relative">
              {/* Close Button */}
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute -top-12 right-0 rounded-full p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition cursor-pointer"
                aria-label="Close Search"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Input Form */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 border-b border-gray-300 pb-4 mb-8">
                <Search className="h-8 w-8 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, storage, or documents..."
                  className="w-full text-2xl md:text-4xl font-extrabold text-gray-900 bg-transparent outline-none placeholder-gray-300"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>

              {/* Suggestions panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-4">
                    Popular Searches
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "BESS container pricing",
                      "Pulse 320 portable charger",
                      "LV Energy Vault stack config",
                      "Warranty claim submission",
                    ].map((q) => (
                      <li key={q}>
                        <button
                          type="button"
                          onClick={() => selectRecentSearch(q)}
                          className="flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-600 cursor-pointer"
                        >
                          <Search className="h-3.5 w-3.5 mr-2 text-gray-400" />
                          {q}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-4">
                    Recent Searches
                  </h4>
                  {recentSearches.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No search history yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {recentSearches.map((q) => (
                        <li key={q}>
                          <button
                            type="button"
                            onClick={() => selectRecentSearch(q)}
                            className="flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-600 cursor-pointer"
                          >
                            <Search className="h-3.5 w-3.5 mr-2 text-gray-400" />
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed top-0 bottom-0 right-0 bg-white shadow-2xl z-[90] w-full max-w-md flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Navigation Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full cursor-pointer h-10 w-10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6 text-gray-600" />
              </Button>
            </div>

            {/* Content list with search */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Search at the top */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Quick search products, solar..."
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
                  readOnly
                />
              </div>

              {/* Accordions */}
              <div className="space-y-2">
                {[
                  {
                    name: "solutions",
                    label: "Solutions",
                    links: [
                      { label: "All Solutions Overview", link: "/solutions" },
                      { label: "Solar solutions", link: "/solutions" },
                      { label: "Battery energy storage", link: "/solutions" },
                      { label: "EV charging depots", link: "/solutions" },
                    ],
                  },
                  {
                    name: "products",
                    label: "Products",
                    links: [
                      { label: "View All Products", link: "/products" },
                      { label: "Residential Storage", link: "/products?category=residential" },
                      { label: "Commercial Storage", link: "/products?category=commercial" },
                      { label: "Industrial Storage", link: "/products?category=industrial" },
                      { label: "Portable Power", link: "/products?category=portable" },
                      { label: "Smart Monitoring", link: "/products?category=monitoring" },
                    ],
                  },

                  {
                    name: "company",
                    label: "Company",
                    links: [
                      { label: "About Us & Story", link: "/about" },
                      { label: "Technical Downloads", link: "/documentation" },
                      { label: "Technical FAQs", link: "/faqs" },
                      { label: "Blog & News Articles", link: "/blog" },
                    ],
                  },
                ].map((group) => {
                  const isOpen = mobileAccordion === group.name;
                  return (
                    <div key={group.name} className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => toggleMobileAccordion(group.name)}
                        className="flex items-center justify-between w-full py-3.5 text-left font-bold text-gray-900 text-[16px] cursor-pointer"
                      >
                        <span>{group.label}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            isOpen ? "rotate-180 text-emerald-600" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pl-3 pr-2 py-1.5 space-y-2.5 bg-gray-50/60 rounded-xl mt-1">
                          {group.links.map((link) => (
                            <Link
                              key={link.label}
                              to={link.link}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 text-sm font-semibold text-gray-600 hover:text-emerald-600"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Utility actions */}
              <div className="space-y-2.5 pt-4">
                <Link
                  to="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-emerald-50 border border-gray-100 rounded-xl text-gray-700 text-sm font-bold transition"
                >
                  <span className="flex items-center gap-2">
                    <GitCompare className="h-4 w-4 text-gray-500" />
                    <span>Compare Products List</span>
                  </span>
                  {comparedProducts.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm">
                      {comparedProducts.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-emerald-50 border border-gray-100 rounded-xl text-gray-700 text-sm font-bold transition"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  <span>My Profile Account</span>
                </Link>
              </div>
            </div>

            {/* Footer containing quote request */}
            <div className="p-5 border-t border-gray-100 bg-white">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-3 text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition">
                  <span>Get a Sizing Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
