import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Building2, Factory, Sprout, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

interface CaseStudy {
  id: number;
  name: string;
  country: string;
  industry: string;
  capacity: string;
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
  icon: React.ComponentType<any>;
  bgGradient: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    name: "Karachi Industrial Grid Integration",
    country: "Pakistan",
    industry: "Heavy Manufacturing",
    capacity: "5.2 MWh Capacity",
    metric: "22.4%",
    metricLabel: "Downtime Cost Reductions",
    quote: "Power2Go transformed our manufacturing plant's operating margins. Downtime is now completely down to zero.",
    author: "Dr. Farhan Malik, Director of Engineering",
    icon: Factory,
    bgGradient: "from-emerald-950/80 to-gray-950",
  },
  {
    id: 2,
    name: "Lahore Commercial Plaza Sync",
    country: "Pakistan",
    industry: "Corporate Real Estate",
    capacity: "750 kWh Capacity",
    metric: "100%",
    metricLabel: "Continuous Power Uptime",
    quote: "During regional grid failure events, the automatic battery transfer is completely imperceptible to our tenants.",
    author: "Zainab Rizvi, Operations Manager",
    icon: Building2,
    bgGradient: "from-slate-950/80 to-gray-950",
  },
  {
    id: 3,
    name: "Sindh Off-Grid AgriFarm Grid",
    country: "Pakistan",
    industry: "Sustainable Agriculture",
    capacity: "320 kWh Capacity",
    metric: "84.8%",
    metricLabel: "Diesel Fuel Savings Offset",
    quote: "No more relying on erratic diesel shipments. Our cold storage and high-power pumps run 24/7 on pure clean energy.",
    author: "Kamran Shah, Managing Partner",
    icon: Sprout,
    bgGradient: "from-amber-950/80 to-gray-950",
  }
];

export function CaseStudies() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % caseStudies.length);
  };

  const prev = () => {
    setCurrentIdx((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const activeStudy = caseStudies[currentIdx];
  const ActiveIcon = activeStudy.icon;

  return (
    <section className="py-24 relative overflow-hidden bg-gray-950 text-white select-none">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Decorative radial glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] bg-emerald-500/10 pointer-events-none -top-40 -left-40" />
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] bg-emerald-500/5 pointer-events-none -bottom-40 -right-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-900/50 mb-4 inline-block">
              Customer Success
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 font-sans leading-tight">
              Real Results at Scale
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl font-medium">
              Explore how enterprise operations utilize Power2Go to slash utility expenses and secure infrastructure.
            </p>
          </div>

          {/* Slider Controllers */}
          <div className="flex gap-3">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous case study"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next case study"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Display Container */}
        <div className="relative min-h-[460px] md:min-h-[420px] bg-gradient-to-br border border-white/10 rounded-[32px] overflow-hidden transition-all duration-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStudy.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute inset-0 bg-gradient-to-br ${activeStudy.bgGradient} p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
            >
              {/* Left Details Block (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* Meta details row */}
                <div className="flex flex-wrap gap-2.5 items-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-extrabold tracking-widest text-emerald-300 uppercase">
                    <ActiveIcon className="h-3.5 w-3.5" />
                    {activeStudy.industry}
                  </span>
                  <span className="text-xs text-gray-500 font-extrabold">•</span>
                  <span className="text-xs font-extrabold text-gray-400 tracking-wide">
                    {activeStudy.country}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 font-sans">
                  {activeStudy.name}
                </h3>

                {/* Quote Block */}
                <div className="relative mb-8 pl-6 border-l-2 border-emerald-500">
                  <Quote className="absolute -top-3 -left-3 h-8 w-8 text-emerald-500/10 rotate-180 pointer-events-none" />
                  <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed italic">
                    "{activeStudy.quote}"
                  </p>
                  <span className="text-xs font-bold text-gray-500 block mt-3 uppercase tracking-wider">
                    — {activeStudy.author}
                  </span>
                </div>

                {/* Case Study Actions */}
                <div className="flex gap-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-5 rounded-2xl text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-950/20">
                    Read Case Study
                  </Button>
                  <Button variant="outline" className="border-white/15 bg-white/5 hover:bg-white hover:text-gray-900 text-white font-bold px-6 py-5 rounded-2xl text-xs transition-all cursor-pointer">
                    View Live Operations
                  </Button>
                </div>

              </div>

              {/* Right Performance Stats Block (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-6 bg-white/5 border border-white/10 p-8 rounded-[28px] backdrop-blur-md">
                
                {/* Installed Capacity */}
                <div className="text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    System Configuration
                  </span>
                  <span className="text-lg font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <Zap className="h-4.5 w-4.5 stroke-[2.2]" />
                    {activeStudy.capacity}
                  </span>
                </div>

                {/* Line Break */}
                <div className="h-px bg-white/10 w-full" />

                {/* Main Improvement Metric */}
                <div className="text-left">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                    Measured Results
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
                      {activeStudy.metric}
                    </span>
                    <TrendingUp className="h-6 w-6 text-emerald-400 animate-bounce shrink-0" />
                  </div>
                  <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mt-2">
                    {activeStudy.metricLabel}
                  </p>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators dots */}
        <div className="flex justify-center gap-2 mt-8">
          {caseStudies.map((study, idx) => (
            <button
              key={study.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIdx === idx ? "bg-emerald-500 w-8" : "bg-white/20 w-2.5 hover:bg-white/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}