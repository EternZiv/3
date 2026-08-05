import { useState } from "react";
import { Cpu, Wind, Zap, ShieldAlert, Layers, Activity, Info } from "lucide-react";
import { motion } from "motion/react";

interface TechComponent {
  id: number;
  name: string;
  desc: string;
  icon: React.ComponentType<any>;
  details: string;
  techSpec: string;
  zOffset: number; // For 3D stack exploded distance
  glowColor: string;
}

const techComponents: TechComponent[] = [
  {
    id: 1,
    name: "AI Controller",
    desc: "Predictive energy forecasting and grid peak syncing.",
    icon: Cpu,
    details: "Built-in machine learning models balance power grids, schedule peak demand offsets, and run utility syncing logic within 10 milliseconds.",
    techSpec: "ARM Cortex-M7 / 400 MHz Grid Sync Engine",
    zOffset: 120,
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: 2,
    name: "Power Electronics",
    desc: "Bidirectional high-frequency DC-AC inverter sync.",
    icon: Zap,
    details: "Converts solar and storage energy at 98.4% efficiency with active frequency stability controllers to interface cleanly with any smart grid configuration.",
    techSpec: "Gallium Nitride (GaN) Power Switches / 120kW Max Peak",
    zOffset: 80,
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: 3,
    name: "Cooling System",
    desc: "Active liquid cooling and temperature distribution.",
    icon: Wind,
    details: "Keeps cell stacks within 2°C temperature variance to extend cycle life, featuring variable-speed quiet pumps and dual grid vents.",
    techSpec: "Dual liquid cold plates / Dynamic speed PWM fans",
    zOffset: 40,
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: 4,
    name: "BMS (Battery Management)",
    desc: "Cell balance circuits and voltage monitor arrays.",
    icon: Activity,
    details: "Checks individual cell voltages, temperature, and internal resistance continuously at 100Hz to prevent imbalance and optimize power distribution.",
    techSpec: "16-Channel ASICs / Active Cell Balancing",
    zOffset: 0,
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: 5,
    name: "Safety Protection Layer",
    desc: "Aerosol extinguishers and physical flame isolators.",
    icon: ShieldAlert,
    details: "Incorporates microsecond pressure vents, advanced aerogel thermal insulation sheets, and a built-in automated aerosol suppression fire canister.",
    techSpec: "UL9540A Compliant / Physical cell barrier insulation",
    zOffset: -40,
    glowColor: "rgba(239, 68, 68, 0.4)",
  },
  {
    id: 6,
    name: "Battery Modules",
    desc: "Cobalt-free stackable LiFePO4 cells.",
    icon: Layers,
    details: "Lithium Iron Phosphate cells rated for 6000+ deep charge cycles. Completely non-combustible chemistry packed in high-density modules.",
    techSpec: "6000+ Cycles / 90% DoD / 25kWh modular block",
    zOffset: -80,
    glowColor: "rgba(16, 185, 129, 0.4)",
  }
];

export function ProductHotspots() {
  const [activeId, setActiveId] = useState<number>(1);
  const activeComp = techComponents.find((c) => c.id === activeId) || techComponents[0];
  const ActiveIcon = activeComp.icon;

  return (
    <section className="py-24 bg-white relative overflow-hidden select-none border-b border-gray-100">
      {/* Background grids for engineering blueprint look */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.006)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-80" />
      
      {/* Blueprint radial light background */}
      <div className="absolute w-[800px] h-[800px] rounded-full blur-[160px] bg-emerald-500/[0.03] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 mb-4 inline-block">
            Inside Power2Go
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 font-sans leading-tight">
            Interactive Engineering Showcase
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Inspect the high-performance exploded technical layers that compose our energy storage architecture.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Spec Sheet Details (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left order-2 lg:order-1">
            
            {/* Dynamic Component Info Box */}
            <div className="p-8 bg-gray-50 border border-gray-100/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative overflow-hidden">
              {/* Highlight accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shadow-inner">
                  <ActiveIcon className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-gray-900 leading-tight">
                    {activeComp.name}
                  </h4>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 block">
                    Engineering Specs
                  </span>
                </div>
              </div>

              {/* Subheading Short Description */}
              <h5 className="text-sm font-bold text-gray-800 mb-3 leading-relaxed">
                {activeComp.desc}
              </h5>

              {/* In-depth Details */}
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                {activeComp.details}
              </p>

              {/* Spec sheet parameters */}
              <div className="p-4 bg-white border border-gray-100 rounded-2xl mb-6">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  Architecture Metric
                </span>
                <span className="text-xs font-extrabold text-emerald-700">
                  {activeComp.techSpec}
                </span>
              </div>

              {/* Hint tag */}
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Info className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Hover or select layers in the 3D stack.</span>
              </div>
            </div>

            {/* Flat components list selector */}
            <div className="flex flex-col gap-2">
              {techComponents.map((comp) => {
                const CompIcon = comp.icon;
                const isActive = activeId === comp.id;
                return (
                  <button
                    key={comp.id}
                    onMouseEnter={() => setActiveId(comp.id)}
                    onClick={() => setActiveId(comp.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-white border-emerald-500 shadow-md shadow-emerald-500/5 translate-x-2"
                        : "bg-white/50 border-gray-100 hover:border-gray-200 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-xl transition-all ${
                        isActive ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"
                      }`}>
                        <CompIcon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-xs font-extrabold tracking-tight">{comp.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                      0{comp.id}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Interactive 3D Exploded Visual Stack (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[500px] order-1 lg:order-2">
            
            {/* SVG Connector Line connecting active layer to left info box coordinates */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {techComponents.map((comp) => {
                const isActive = activeId === comp.id;
                // Calculate y percent based on layer position
                const layerYPercent = 15 + comp.id * 12; 
                
                return (
                  <g key={comp.id}>
                    {/* Curve connector */}
                    <motion.path
                      d={`M 15 ${layerYPercent} Q 40 ${layerYPercent - 15} 62 ${layerYPercent}`}
                      fill="none"
                      stroke={isActive ? "#10b981" : "rgba(0,0,0,0.02)"}
                      strokeWidth="1.2"
                      strokeDasharray={isActive ? "4 4" : "none"}
                      animate={isActive ? { strokeDashoffset: [0, -20] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* 3D stack wrapper viewport */}
            <div 
              className="relative w-full max-w-[440px] h-[480px] flex items-center justify-center pointer-events-auto"
              style={{
                perspective: "1200px",
              }}
            >
              {techComponents.map((comp) => {
                const isActive = activeId === comp.id;
                
                return (
                  <motion.div
                    key={comp.id}
                    onMouseEnter={() => setActiveId(comp.id)}
                    onClick={() => setActiveId(comp.id)}
                    className="absolute w-[280px] h-[120px] rounded-[24px] cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: 20 - comp.id,
                    }}
                    animate={{
                      // 3D rotation and translation stacks
                      rotateX: 52,
                      rotateY: 0,
                      rotateZ: -28,
                      y: (comp.id - 1.5) * 56 - (isActive ? 32 : 0), // Spread offset
                      scale: isActive ? 1.06 : 0.98,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 24,
                    }}
                  >
                    {/* Layer Base Glass Pane */}
                    <div 
                      className={`w-full h-full rounded-[24px] border p-4 flex flex-col justify-between transition-all duration-300 ${
                        isActive
                          ? "bg-white/95 border-emerald-500/80 shadow-[0_15px_45px_rgba(16,185,129,0.12)]"
                          : "bg-white/45 backdrop-blur-sm border-gray-200/50 hover:bg-white/60 hover:border-gray-300/85 shadow-lg shadow-black/[0.02]"
                      }`}
                    >
                      {/* Grid Pattern interior trace blueprint detail */}
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] bg-[size:12px_12px] opacity-70 pointer-events-none rounded-[24px]" />

                      {/* Top Row: Icon badge & ID index */}
                      <div className="flex justify-between items-start relative z-10">
                        <div className={`p-2 rounded-xl border shadow-inner ${
                          isActive 
                            ? "bg-emerald-500 border-emerald-400 text-white" 
                            : "bg-white border-gray-100 text-gray-400"
                        }`}>
                          {(() => {
                            const Icon = comp.icon;
                            return <Icon className="h-4.5 w-4.5 stroke-[2.2]" />;
                          })()}
                        </div>
                        <span className="text-[10px] font-extrabold text-gray-300 tracking-wider">
                          LAYER 0{comp.id}
                        </span>
                      </div>

                      {/* Bottom Row: Name label & active light indicator */}
                      <div className="flex items-end justify-between relative z-10">
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                            Component
                          </span>
                          <span className={`text-xs font-extrabold tracking-tight ${
                            isActive ? "text-emerald-700" : "text-gray-800"
                          }`}>
                            {comp.name}
                          </span>
                        </div>

                        {/* Pulsing indicator light */}
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-emerald-500 animate-ping" : "bg-gray-200"
                          }`} />
                          <span className={`w-1.5 h-1.5 rounded-full -ml-3 ${
                            isActive ? "bg-emerald-500" : "bg-gray-200"
                          }`} />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}