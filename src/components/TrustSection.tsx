import { useEffect, useState, useRef } from "react";
import { MapPin, ShieldCheck, Users2, BatteryCharging, Headset } from "lucide-react";
import { motion, useInView } from "motion/react";

interface StatItem {
  id: number;
  label: string;
  target: number;
  suffix: string;
  icon: React.ComponentType<any>;
}

const statsData: StatItem[] = [
  { id: 1, label: "Projects Completed", target: 5000, suffix: "+", icon: Users2 },
  { id: 2, label: "Energy Capacity", target: 20, suffix: " GWh", icon: BatteryCharging },
  { id: 3, label: "Cities Served Across Pakistan", target: 20, suffix: "+", icon: MapPin },
  { id: 4, label: "Customer Satisfaction", target: 99, suffix: ".8%", icon: ShieldCheck },
  { id: 5, label: "Nationwide Operations", target: 24, suffix: "/7 Support", icon: Headset },
];

const partners = ["CATL", "HUAWEI", "ABB", "SCHNEIDER ELECTRIC", "SIEMENS", "SUNGROW"];
const certifications = ["ISO CERTIFIED", "CE COMPLIANT", "UL 1973", "IEC 62619"];

// National Pakistan operations network hubs for SVG map overlay
const hubs = [
  { name: "Karachi (HQ)", x: 38, y: 78, isHQ: true },
  { name: "Lahore Hub", x: 68, y: 44, isHQ: false },
  { name: "Islamabad Hub", x: 62, y: 30, isHQ: false },
  { name: "Faisalabad Hub", x: 60, y: 48, isHQ: false },
  { name: "Multan Hub", x: 52, y: 56, isHQ: false },
  { name: "Sialkot Hub", x: 69, y: 38, isHQ: false },
  { name: "Peshawar Hub", x: 52, y: 26, isHQ: false },
];

export function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50/50 border-b border-gray-100 select-none">
      {/* Subtle background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 mb-4 inline-block">
            National Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 font-sans leading-tight">
            Credibility at Enterprise Scale
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Powering mission-critical utilities, commercial grids, and residential homes across Pakistan.
          </p>
        </div>

        {/* Top Grid: World Map Visualizer & Stat Numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Network Map (lg:col-span-7) */}
          <motion.div 
            className="lg:col-span-7 bg-white border border-gray-100/70 p-6 sm:p-8 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative h-[360px] sm:h-[420px] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Soft background light */}
            <div className="absolute w-60 h-60 rounded-full blur-[80px] bg-emerald-500/5 pointer-events-none" />

            {/* Stylized Network Map Canvas */}
            <svg 
              className="absolute inset-0 w-full h-full p-4 z-10" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Grid outline lines to simulate longitude/latitude */}
              {Array.from({ length: 9 }).map((_, idx) => (
                <line 
                  key={idx}
                  x1="0" 
                  y1={(idx + 1) * 10} 
                  x2="100" 
                  y2={(idx + 1) * 10} 
                  stroke="rgba(0,0,0,0.01)" 
                  strokeWidth="0.5" 
                />
              ))}
              {Array.from({ length: 9 }).map((_, idx) => (
                <line 
                  key={idx}
                  x1={(idx + 1) * 10} 
                  y1="0" 
                  x2={(idx + 1) * 10} 
                  y2="100" 
                  stroke="rgba(0,0,0,0.01)" 
                  strokeWidth="0.5" 
                />
              ))}

              {/* Hub Network Connections (Curved curves radiating from HQ in Karachi) */}
              {hubs.filter(h => !h.isHQ).map((h, idx) => {
                const hq = hubs.find(node => node.isHQ)!;
                // Generate a control point for bezier curve
                const cx = (hq.x + h.x) / 2;
                const cy = (hq.y + h.y) / 2 - 12; // curve upwards
                
                return (
                  <g key={idx}>
                    {/* Underlying line shadow */}
                    <path
                      d={`M ${hq.x} ${hq.y} Q ${cx} ${cy} ${h.x} ${h.y}`}
                      fill="none"
                      stroke="rgba(16, 185, 129, 0.05)"
                      strokeWidth="2.5"
                    />
                    {/* Pulsing connection line */}
                    <motion.path
                      d={`M ${hq.x} ${hq.y} Q ${cx} ${cy} ${h.x} ${h.y}`}
                      fill="none"
                      stroke="rgba(16, 185, 129, 0.35)"
                      strokeWidth="1.2"
                      strokeDasharray="4 6"
                      animate={{
                        strokeDashoffset: [0, -30],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                      }}
                    />
                  </g>
                );
              })}

              {/* Render Network Nodes */}
              {hubs.map((hub, idx) => (
                <g key={idx}>
                  {/* Glowing halo */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={hub.isHQ ? 5 : 3.5}
                    fill="#10b981"
                    className="animate-ping opacity-25"
                    style={{ transformOrigin: `${hub.x}% ${hub.y}%` }}
                  />
                  {/* Central Node Core */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={hub.isHQ ? 2.5 : 1.8}
                    fill={hub.isHQ ? "#059669" : "#10b981"}
                  />
                </g>
              ))}
            </svg>

            {/* Label elements overlay */}
            {hubs.map((hub, idx) => (
              <div
                key={idx}
                className="absolute z-20 pointer-events-none select-none flex flex-col items-center"
                style={{ top: `${hub.y}%`, left: `${hub.x}%` }}
              >
                <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-md border mt-3 whitespace-nowrap shadow-sm bg-white/95 backdrop-blur-sm -translate-x-1/2 ${
                  hub.isHQ 
                    ? "text-emerald-700 border-emerald-200/50" 
                    : "text-gray-600 border-gray-100"
                }`}>
                  {hub.name}
                </span>
              </div>
            ))}
            
            <div className="absolute bottom-4 left-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Pakistan Network Grid Overlay
            </div>
          </motion.div>

          {/* Right Column: Dynamic Numerical Statistics counters (lg:col-span-5) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {statsData.map((stat) => (
              <StatCounterCard key={stat.id} stat={stat} />
            ))}
          </div>

        </div>

        {/* Bottom Section: Monochrome Partner Logos & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-gray-200/70 items-center">
          
          {/* Partners Column */}
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-6">
              Trusted Technology Integration Partners
            </span>
            <div className="grid grid-cols-3 gap-6">
              {partners.map((partner) => (
                <div 
                  key={partner}
                  className="py-4 px-2 border border-gray-100 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.01)] rounded-xl flex items-center justify-center text-center font-extrabold text-[10px] sm:text-xs text-gray-400 hover:text-gray-900 hover:border-gray-200/80 transition-all duration-300 cursor-default"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-6">
              International Grid & Safety Certifications
            </span>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span 
                  key={cert}
                  className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-extrabold text-gray-800 shadow-sm flex items-center gap-2 hover:border-emerald-300 hover:shadow-emerald-50 hover:shadow-md transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// Numerical Counter sub-card component
function StatCounterCard({ stat }: { stat: StatItem }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // ms
    const incrementTime = 30; // ms
    const totalSteps = duration / incrementTime;
    const stepIncrement = stat.target / totalSteps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= stat.target) {
        setCount(stat.target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, stat.target]);

  const StatIcon = stat.icon;

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden text-left"
    >
      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
        <StatIcon className="h-5 w-5 stroke-[2.2]" />
      </div>
      <div>
        <h4 className="text-2xl font-extrabold text-gray-900 leading-tight">
          {count.toLocaleString()}{stat.suffix}
        </h4>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}