import { Cpu, Layers, TrendingUp, Smartphone, Clock, Shield } from "lucide-react";
import { motion } from "motion/react";

const largeFeature = {
  icon: Cpu,
  title: "AI Battery Management & Grid Sync",
  description: "Our proprietary machine learning models analyze charge states, cell health, and temperature at 100Hz. Predicts degradation curves, runs active balancing to prolong cell lifecycles by 25%, and synchronizes grid frequency fluctuations dynamically.",
};

const mediumFeatures = [
  {
    icon: Layers,
    title: "Modular Scaling",
    description: "Easy plug-and-play scaling configurations. Build and scale your storage capacity dynamically from 5 kWh to 75 kWh without complex reconfiguration or site rewiring.",
  },
  {
    icon: Shield,
    title: "Extreme Grid Protection",
    description: "IP65 weather seals, structural steel barriers, pressure relief valves, and built-in aerosol extinguishing fire isolation.",
  },
];

const smallFeatures = [
  {
    icon: TrendingUp,
    title: "Superior 95%+ Efficiency",
    description: "Optimized DC high-voltage architecture reduces line loss.",
  },
  {
    icon: Smartphone,
    title: "Cloud IoT Dashboards",
    description: "Live monitoring, diagnostics telemetry, and remote firmware updates.",
  },
  {
    icon: Clock,
    title: "Rapid Deployments",
    description: "Installs in under 2 hours with standard factory connector blocks.",
  },
];

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/15 to-white select-none">
      {/* Background Subtle Blur Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[130px] bg-emerald-500/5 pointer-events-none -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[130px] bg-emerald-500/5 pointer-events-none -bottom-40 -right-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 mb-4 inline-block">
            Technological Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 font-sans leading-tight">
            Why Choose Power2Go
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto font-medium">
            We engineer high-performance clean energy solutions that redefine reliability, safety, and smart grid automation.
          </p>
        </motion.div>

        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          
          {/* 1. Large Card (spans full 6 columns on md+) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="col-span-1 md:col-span-6 flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 bg-white border border-gray-100/60 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-shadow duration-300 relative group gap-8 text-left"
          >
            <div className="absolute top-0 left-12 right-12 h-1 bg-emerald-500 rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            
            <div className="max-w-2xl">
              <div className="mb-6 flex-shrink-0">
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-100/50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_75%)] pointer-events-none" />
                  <largeFeature.icon className="h-6 w-6 stroke-[2.2]" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight font-sans">
                {largeFeature.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                {largeFeature.description}
              </p>
            </div>
            
            {/* Split Decorative Layout Visual inside the Large Card */}
            <div className="hidden lg:flex flex-col gap-2 bg-emerald-50/50 border border-emerald-100/20 p-6 rounded-2xl shrink-0 w-[240px]">
              <span className="text-[9px] font-bold text-emerald-800 tracking-widest uppercase block mb-1">
                AI Diagnostic Telemetry
              </span>
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>Frequency Drift</span>
                  <span className="text-emerald-600">±0.01 Hz</span>
                </div>
                <div className="w-full bg-gray-200/55 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[85%]" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-500 pt-1">
                  <span>Thermal Delta</span>
                  <span className="text-emerald-600">1.8°C Max</span>
                </div>
                <div className="w-full bg-gray-200/55 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[92%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Medium Cards (each spans 3 columns on md+) */}
          {mediumFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="col-span-1 md:col-span-3 flex flex-col items-start p-8 bg-white border border-gray-100/60 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-shadow duration-300 relative group text-left"
              >
                <div className="absolute top-0 left-8 right-8 h-1 bg-emerald-500 rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                <div className="mb-6 flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-100/50 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_75%)] pointer-events-none" />
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight font-sans">
                  {feat.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}

          {/* 3. Small Cards (each spans 2 columns on md+) */}
          {smallFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="col-span-1 md:col-span-2 flex flex-col items-start p-6 sm:p-8 bg-white/60 border border-gray-100/60 rounded-[24px] shadow-[0_4px_25px_rgba(0,0,0,0.01)] transition-shadow duration-300 relative group text-left"
              >
                <div className="absolute top-0 left-6 right-6 h-1 bg-emerald-500 rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                <div className="mb-5 flex-shrink-0">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-100/50 text-emerald-600 rounded-lg flex items-center justify-center shadow-sm relative overflow-hidden">
                    <Icon className="h-4.5 w-4.5 stroke-[2.2]" />
                  </div>
                </div>
                
                <h3 className="text-base font-extrabold text-gray-900 mb-2 tracking-tight font-sans">
                  {feat.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}