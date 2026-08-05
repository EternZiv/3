import { useState } from "react";
import { ArrowRight, Play, X, Check, Globe, BatteryCharging } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import heroImage from "figma:asset/27fbf51dd3bdeacfac524e1f7ee0368fab893f48.png";

export function Hero() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="relative h-[650px] md:h-[750px] lg:h-[850px] overflow-hidden bg-black select-none">
      {/* Background Image with Dark Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-center transition-transform duration-[4000ms] scale-105"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center 45%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />
      </div>

      {/* Grid Pattern Overlay for Tech Aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] z-10 opacity-60 pointer-events-none" />

      <div className="relative w-full h-full flex items-center z-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 max-w-2xl text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 backdrop-blur-md text-xs font-bold uppercase tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Advanced Energy Storage Solutions
              </motion.div>
              
              <motion.h1
                className="font-extrabold mb-8 text-white text-[44px] sm:text-[56px] md:text-[76px] lg:text-[82px] leading-[1.12] tracking-tight font-sans max-w-[620px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Power Your Future with Clean Energy
              </motion.h1>
              
              <motion.p
                className="text-sm sm:text-base md:text-lg mb-12 leading-relaxed text-gray-400 font-semibold max-w-[540px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Discover cutting-edge battery storage systems designed for residential, commercial, and industrial applications. Maximize your energy independence with Power2Go.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link to="/solutions">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-600/20 cursor-pointer">
                    Explore Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Button 
                  onClick={() => setShowDemo(true)}
                  size="lg" 
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white text-white hover:text-gray-900 font-extrabold px-8 py-6 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
                >
                  <Play className="mr-2 h-4 w-4 fill-current shrink-0" />
                  Watch Product Demo
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Floating Trust Badges (Desktop Only) */}
            <div className="hidden lg:col-span-5 relative h-[400px] w-full lg:flex items-center justify-end">
              {/* Badges Container */}
              <div className="flex flex-col gap-6 w-[280px]">
                
                {/* Badge 1 */}
                <motion.div
                  className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-white/15 transition-colors cursor-default"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -10, 0] 
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.5 },
                    x: { duration: 0.8, delay: 0.5 },
                    y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                  }}
                >
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/20 text-emerald-400 rounded-xl shrink-0 shadow-inner">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-extrabold text-white leading-tight">5000+</h4>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Projects Delivered</p>
                  </div>
                </motion.div>

                {/* Badge 2 */}
                <motion.div
                  className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-white/15 transition-colors cursor-default"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -12, 0] 
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.7 },
                    x: { duration: 0.8, delay: 0.7 },
                    y: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }
                  }}
                >
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/20 text-emerald-400 rounded-xl shrink-0 shadow-inner">
                    <BatteryCharging className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-extrabold text-white leading-tight">20 GWh</h4>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Energy Capacity</p>
                  </div>
                </motion.div>

                {/* Badge 3 */}
                <motion.div
                  className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-white/15 transition-colors cursor-default"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -8, 0] 
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.9 },
                    x: { duration: 0.8, delay: 0.9 },
                    y: { repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 2 }
                  }}
                >
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/20 text-emerald-400 rounded-xl shrink-0 shadow-inner">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-extrabold text-white leading-tight">50+</h4>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Countries Served</p>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Subtle animated "Scroll to Explore" indicator */}
      <motion.div 
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 80,
            behavior: "smooth"
          });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer text-white/50 hover:text-white transition-colors duration-300"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">Scroll to Explore</span>
        <div className="w-5 h-8 border border-white/35 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Watch Demo Video Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Demo Showcase Content */}
              <div className="aspect-video w-full relative bg-gray-950 flex flex-col items-center justify-center p-8">
                {/* Glowing light behind visualizer */}
                <div className="absolute w-80 h-80 rounded-full blur-[100px] bg-emerald-500/10 pointer-events-none" />
                
                <BatteryCharging className="h-16 w-16 text-emerald-400 animate-pulse mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Power2Go Flagship Product Demo</h3>
                <p className="text-sm text-gray-400 max-w-md text-center leading-relaxed">
                  Experiencing advanced hybrid battery controller orchestration, dynamic peak shaving algorithms, and remote mobile telemetry synchronization.
                </p>

                {/* Simulated playback speed bar */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 text-xs text-white/50">
                  <span>0:14 / 2:30</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-400"
                      initial={{ width: "0%" }}
                      animate={{ width: "35%" }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <span className="text-emerald-400 font-semibold tracking-wider">1080p HD</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}