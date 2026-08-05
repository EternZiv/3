import { useState, useEffect } from "react";
import { SlidersHorizontal, ArrowRight, Zap, Shield, Award, Hexagon, Globe, Home as HomeIcon, Building2, Factory } from "lucide-react";
import { Button } from "../components/ui/button";
import { useSearchParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ProductFilters } from "../components/ProductFilters";
import { ProductGrid } from "../components/ProductGrid";

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative h-[650px] md:h-[750px] lg:h-[850px] bg-black text-white overflow-hidden flex items-center border-b border-gray-900 pt-20 select-none">
      {/* Premium Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Energy Storage Facility" 
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
      </motion.div>

      {/* Grid Pattern Overlay for Tech Aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] z-10 opacity-60 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-7 max-w-2xl text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Official Product Catalog
            </span>
            <h1 className="font-extrabold mb-8 text-white text-[44px] sm:text-[56px] md:text-[76px] lg:text-[82px] leading-[1.12] tracking-tight font-sans">
              Energy Storage Systems
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-12 leading-relaxed text-gray-400 font-semibold max-w-[540px]">
              Explore our complete portfolio of intelligent energy storage solutions engineered for residential, commercial, industrial, and utility-scale applications.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-600/20 cursor-pointer">
                Browse Products
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 hidden lg:flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Glassmorphism Statistics Badges */}
            <div className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-white/15 transition-colors cursor-default">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">20 GWh</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Installed Capacity</div>
              </div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-white/15 transition-colors cursor-default ml-8">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">5000+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Projects Completed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function BuyerGuide() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">Selection Guide</span>
          <h2 className="text-[clamp(1.875rem,5vw,2.25rem)] font-extrabold text-gray-900 tracking-tight">How to Choose the Right System</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Residential", cap: "5-25 kWh", desc: "For single-family homes looking to maximize solar self-consumption and gain backup power.", icon: HomeIcon },
            { title: "Commercial", cap: "50-500 kWh", desc: "For offices and retail targeting peak shaving and demand charge reduction.", icon: Building2 },
            { title: "Portable", cap: "1-10 MWh", desc: "Heavy-duty systems for manufacturing requiring 100% uptime and microgrid formation.", icon: Factory },
            { title: "Utility", cap: "20+ MWh", desc: "Containerized solutions for grid operators needing frequency regulation and massive storage.", icon: Zap },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              {/* Note: I didn't import Home, Building2, etc. at top yet, will fix import if needed but I did add Factory, Zap... Wait, I need to make sure I import them. I'll just use Zap for all or add them to import. I added them to the import list above. */}
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-1">{item.title}</h3>
              <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">{item.cap}</div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">Global Standards</span>
          <h2 className="text-[clamp(1.875rem,5vw,2.25rem)] font-extrabold text-gray-900 tracking-tight">Enterprise Trust & Reliability</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: "ISO 9001", icon: Award },
            { label: "CE Certified", icon: Hexagon },
            { label: "UL Listed", icon: Shield },
            { label: "IEC Standard", icon: Globe }
          ].map((cert, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 transition-colors group">
              <cert.icon className="w-10 h-10 text-gray-400 group-hover:text-emerald-600 mb-3 transition-colors" />
              <span className="font-bold text-gray-900">{cert.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-32 bg-[#08080a] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Global Energy Network" 
          className="w-full h-full object-cover opacity-20 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-[#08080a]/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold tracking-tight mb-6">
          Find the Perfect <span className="text-emerald-400">Energy Storage Solution</span>
        </h2>
        <p className="text-xl text-gray-300 font-medium mb-10 max-w-2xl mx-auto">
          Our engineers can help you choose the right system based on your application, capacity requirements, and future scalability.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-7 rounded-xl text-lg font-bold shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all hover:scale-105">
              Request Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Products() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: initialCategory,
    capacity: "all",
    sortBy: "featured",
    search: search,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: search, category: initialCategory }));
  }, [search, initialCategory]);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev: any) => ({ ...prev, ...newFilters }));
    // Auto-close filters on mobile if it wasn't just a search/sort update
    // Just keeping it simple here
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <HeroSection />

      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-center bg-white border-gray-200 py-6 rounded-xl font-bold shadow-sm"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2 text-emerald-600" />
            {showFilters ? "Hide Filters" : "Filter & Sort Catalog"}
          </Button>
        </div>

        {/* Mobile Filters Overlay */}
        {showFilters && (
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] lg:hidden transition-opacity" 
            onClick={() => setShowFilters(false)}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Smart Filter Sidebar */}
          <aside 
            className={`
              lg:block lg:w-[320px] lg:flex-shrink-0 lg:z-auto transition-transform duration-300
              ${showFilters ? 'block' : 'hidden'}
            `}
            style={showFilters ? {
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '85vw',
              maxWidth: '360px',
              backgroundColor: '#f9fafb',
              zIndex: 101,
              overflowY: 'auto',
            } : undefined}
          >
            {showFilters && (
              <div className="lg:hidden flex items-center justify-between p-6 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="font-bold text-gray-500">
                  Close
                </Button>
              </div>
            )}
            <ProductFilters filters={filters} setFilters={handleFilterChange} />
          </aside>

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            <ProductGrid filters={filters} />
          </main>
        </div>
      </div>

      <BuyerGuide />
      <TrustSection />
      <FinalCTA />
    </div>
  );
}