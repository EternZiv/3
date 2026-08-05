import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import backgroundImage from "figma:asset/2cdaeedf90e235319e8a7b8ed818acd496eda538.png";

export function EmotionalCTA() {
  return (
    <section className="relative h-[480px] sm:h-[540px] md:h-[600px] overflow-hidden bg-black select-none">
      
      {/* Background Image Container with Slow Parallax Scale */}
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-65"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 12, ease: "easeOut" }}
      />

      {/* Sunset Orange-to-Carbon Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      
      {/* Faint orange grid overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10 opacity-70" />

      {/* Floating Sparkle/Energy Particles */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {Array.from({ length: 12 }).map((_, idx) => {
          const size = Math.random() * 4 + 2;
          const left = Math.random() * 100;
          const delay = Math.random() * 6;
          const duration = Math.random() * 8 + 6;
          return (
            <motion.span
              key={idx}
              className="absolute rounded-full bg-orange-400/30 blur-[0.5px]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                bottom: "-20px",
              }}
              animate={{
                y: ["0vh", "-70vh"],
                opacity: [0, 0.8, 0],
                x: ["0px", `${Math.random() * 40 - 20}px`],
              }}
              transition={{
                repeat: Infinity,
                duration,
                delay,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      {/* SVG Neon Energy Grid Lines (Pulsing across background) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-15 opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Animated energy line 1 */}
        <motion.path
          d="M -10 30 Q 30 15 60 45 T 110 25"
          fill="none"
          stroke="#f97316"
          strokeWidth="0.8"
          strokeDasharray="6 8"
          animate={{
            strokeDashoffset: [0, -30],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
        />
        {/* Animated energy line 2 */}
        <motion.path
          d="M -10 80 Q 25 60 70 75 T 110 50"
          fill="none"
          stroke="#10b981"
          strokeWidth="0.6"
          strokeDasharray="5 7"
          animate={{
            strokeDashoffset: [0, 25],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
        />
      </svg>

      {/* Content Center */}
      <div className="relative w-full h-full flex items-center z-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <div className="max-w-3xl flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full mb-6 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest"
            >
              <Sparkles className="h-3 w-3 animate-spin" />
              Empowering Tomorrow
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5 font-sans"
            >
              Powering Tomorrow Starts Today
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-10 max-w-xl"
            >
              Let's build smarter, cleaner, and more reliable energy infrastructure together.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Link to="/contact">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.03] cursor-pointer">
                  Request Consultation
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}