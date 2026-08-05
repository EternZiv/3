
// @ts-ignore
import { Building2, Factory, Home as HomeIcon, Zap, Shield, ArrowRight, Download, Globe, Award, CheckCircle2, Wrench, Settings, Activity, Battery, MapPin, Sun, Phone, Cpu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";

// --- Data Models ---

const SOLUTIONS = [
  {
    id: "residential",
    title: "Residential Solutions",
    icon: HomeIcon,
    image: "https://images.unsplash.com/photo-1513692694121-a3f2d0113f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    challenge: "Rising utility costs and frequent grid outages disrupt modern living and threaten home security.",
    solution: "A seamless, compact battery energy storage system that integrates directly with residential solar to capture and store excess daytime energy.",
    result: "Achieve up to 90% energy independence, zero downtime during blackouts, and significant reductions in monthly power bills.",
    product: {
      name: "Power2Go LV Energy Vault 25",
      desc: "5 kWh to 25 kWh modular capacity for home backup.",
      link: "/products/4"
    }
  },
  {
    id: "commercial",
    title: "Commercial Solutions",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    challenge: "Extreme peak demand charges and power instability cripple operating margins and business continuity.",
    solution: "Scalable commercial storage that utilizes AI-driven peak shaving to automatically discharge during the most expensive tariff periods.",
    result: "Drastically lowered demand charges, stabilized operations, and a clear path to corporate net-zero sustainability goals.",
    product: {
      name: "Power2Go HV Energy Vault 60",
      desc: "30 kWh to 60 kWh high-voltage storage stack for business plazas.",
      link: "/products/7"
    }
  },
  {
    id: "industrial",
    title: "Industrial & Megawatt Solutions",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    challenge: "Heavy manufacturing requires massive, unyielding power that the traditional grid struggles to supply reliably.",
    solution: "High-voltage, containerized BESS infrastructure engineered for load balancing, frequency regulation, and microgrid formation.",
    result: "100% uptime for mission-critical machinery, wholesale energy market participation, and total grid independence.",
    product: {
      name: "Power2Go HV Energy Vault 240 Industrial Tower",
      desc: "Up to 240 kWh high-voltage storage tower with 314A continuous output.",
      link: "/products/9"
    }
  }
];

const COMPARISON_FEATURES = [
  { feature: "Typical Capacity", res: "5 kWh - 50 kWh", com: "50 kWh - 500 kWh", ind: "1 MWh - 20+ MWh" },
  { feature: "Scalability", res: "Modular (up to 4 units)", com: "Highly scalable", ind: "Infinite (Containerized)" },
  { feature: "Backup Duration", res: "1-3 Days", com: "4-12 Hours (Peak Load)", ind: "Continuous/Shift-based" },
  { feature: "AI Peak Shaving", res: "Basic", com: "Advanced", ind: "Enterprise-grade" },
  { feature: "Grid Support", res: "Net Metering", com: "Demand Response", ind: "Frequency Regulation" },
  { feature: "Solar Integration", res: "Hybrid Inverters", com: "AC/DC Coupling", ind: "Utility-Scale Coupling" },
  { feature: "Remote Management", res: "Mobile App", com: "Fleet Dashboard", ind: "SCADA Integration" },
];

const TIMELINE_STEPS = [
  { title: "Consultation", desc: "Understanding your unique energy profile and goals.", icon: Phone },
  { title: "Site Assessment", desc: "Technical evaluation of your infrastructure.", icon: MapPin },
  { title: "System Design", desc: "Custom engineering and capacity planning.", icon: Wrench },
  { title: "Installation", desc: "Professional deployment by certified technicians.", icon: Settings },
  { title: "Commissioning", desc: "Rigorous testing and grid synchronization.", icon: CheckCircle2 },
  { title: "Monitoring", desc: "24/7 AI-driven remote management.", icon: Activity },
];

const CASE_STUDIES = [
  {
    id: 1,
    name: "Karachi Industrial Grid Integration",
    industry: "Heavy Manufacturing",
    country: "Pakistan",
    capacity: "5.2 MWh",
    improvement: "22.4% Cost Reduction",
    quote: "Power2Go transformed our manufacturing plant's operating margins. Downtime is now completely down to zero.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 2,
    name: "Lahore Commercial Plaza",
    industry: "Real Estate",
    country: "Pakistan",
    capacity: "750 kWh",
    improvement: "100% Uptime",
    quote: "During regional grid failure events, the automatic battery transfer is completely imperceptible to our tenants.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  }
];

// --- Components ---

function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[650px] md:h-[750px] lg:h-[850px] bg-black text-white overflow-hidden flex items-center border-b border-gray-900 pt-20 select-none">
      {/* Background Image & Dark Overlays */}
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center transition-transform duration-[4000ms] scale-105"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] z-10 opacity-60 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-2xl text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Enterprise Solutions
              </span>
              <h1 className="font-extrabold mb-8 text-white text-[44px] sm:text-[56px] md:text-[76px] lg:text-[82px] leading-[1.12] tracking-tight font-sans">
                Energy Solutions for Every Need
              </h1>
              <p className="text-sm sm:text-base md:text-lg mb-12 leading-relaxed text-gray-400 font-semibold max-w-[540px]">
                Deliver scalable, intelligent energy storage systems for residential, commercial, industrial, and utility applications. Powering a resilient future.
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-start">
                <Button onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-600/20 cursor-pointer">
                  Explore Solutions
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="lg:col-span-5 hidden lg:flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Glassmorphism Statistics */}
            <div className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-white/15 transition-colors cursor-default">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Factory className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">5000+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Projects Deployed</div>
              </div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-4 hover:bg-white/15 transition-colors cursor-default ml-8">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Battery className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">20 GWh</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Installed Capacity</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Scroll to Discover</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function StorytellingShowcase() {
  return (
    <section id="solutions" className="py-12 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">Real World Applications</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Solving Energy Challenges at Every Scale</h2>
        </div>

        <div className="space-y-32">
          {SOLUTIONS.map((sol, idx) => (
            <motion.div 
              key={sol.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl lg:rounded-[2.rem] overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img src={sol.image} alt={sol.title} className="w-full h-64 sm:h-[400px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Floating Product Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:w-80 bg-white/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl shadow-2xl z-20 transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Recommended</span>
                      <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{sol.product.name}</h4>
                    <p className="text-sm text-gray-500 font-medium mb-4">{sol.product.desc}</p>
                    <Link to={sol.product.link} className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                      View Specifications <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <sol.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-[clamp(1.875rem,3vw+1rem,2.25rem)] font-extrabold text-gray-900 tracking-tight">{sol.title}</h3>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" /> The Challenge
                    </h4>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">{sol.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" /> The Solution
                    </h4>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">{sol.solution}</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" /> The Result
                    </h4>
                    <p className="text-lg text-emerald-800 font-medium leading-relaxed">{sol.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="py-12 md:py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">Technical Specifications</span>
          <h2 className="text-[clamp(1.875rem,3vw+1rem,2.25rem)] font-extrabold text-gray-900 tracking-tight">Compare Solutions</h2>
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50/50 border-b border-gray-200">
              <div className="p-6"></div>
              <div className="p-6 text-center border-l border-gray-200">
                <HomeIcon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg">Residential</h3>
              </div>
              <div className="p-6 text-center border-l border-gray-200 bg-emerald-50/30">
                <Building2 className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg">Commercial</h3>
              </div>
              <div className="p-6 text-center border-l border-gray-200">
                <Factory className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg">Industrial</h3>
              </div>
            </div>

            {COMPARISON_FEATURES.map((item, idx) => (
              <div key={idx} className="grid grid-cols-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <div className="p-5 font-bold text-gray-900 text-sm flex items-center">{item.feature}</div>
                <div className="p-5 text-center text-sm font-medium text-gray-600 border-l border-gray-100 flex items-center justify-center">{item.res}</div>
                <div className="p-5 text-center text-sm font-medium text-gray-600 border-l border-gray-100 bg-emerald-50/30 flex items-center justify-center">{item.com}</div>
                <div className="p-5 text-center text-sm font-medium text-gray-600 border-l border-gray-100 flex items-center justify-center">{item.ind}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">The Process</span>
          <h2 className="text-[clamp(1.875rem,3vw+1rem,2.25rem)] font-extrabold text-gray-900 tracking-tight">How It Works</h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {TIMELINE_STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white border-2 border-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-emerald-500 group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-2">
                  <step.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2 text-lg">{step.title}</h3>
                <p className="text-sm font-medium text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="py-12 md:py-24 bg-[#08080a] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#08080a] to-[#08080a]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-400 font-bold tracking-widest uppercase text-[11px] mb-3 block">Integration</span>
          <h2 className="text-[clamp(1.875rem,3vw+1rem,2.25rem)] font-extrabold text-white tracking-tight">Interactive Energy Ecosystem</h2>
          <p className="text-gray-400 mt-4 text-lg font-medium">Power2Go connects seamlessly with your existing infrastructure.</p>
        </div>

        <div className="relative h-[400px] md:h-[600px] w-full max-w-4xl mx-auto flex items-center justify-center transform scale-75 md:scale-100">
          {/* Center Node */}
          <div className="relative z-20 w-32 h-32 bg-emerald-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.4)] border-4 border-[#08080a] cursor-pointer hover:scale-110 transition-transform duration-500">
            <Zap className="w-10 h-10 text-white mb-1" />
            <span className="font-extrabold text-sm tracking-wide">P2G CORE</span>
          </div>

          {/* Orbital Rings */}
          <div className="absolute inset-0 border border-white/5 rounded-full scale-75 animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-0 border border-white/5 rounded-full scale-90 animate-[spin_90s_linear_infinite_reverse]" />
          <div className="absolute inset-0 border border-white/5 rounded-full scale-110 animate-[spin_120s_linear_infinite]" />

          {/* Floating Nodes */}
          {[
            { icon: Sun, label: "Solar Array", pos: "top-10 left-1/4" },
            { icon: Activity, label: "Smart Grid", pos: "top-20 right-1/4" },
            { icon: Battery, label: "EV Charging", pos: "bottom-20 right-1/4" },
            { icon: Cpu, label: "AI Mgmt", pos: "bottom-10 left-1/4" },
            { icon: Building2, label: "Facilities", pos: "left-10 top-1/2 -translate-y-1/2" },
            { icon: Factory, label: "Industry", pos: "right-10 top-1/2 -translate-y-1/2" },
          ].map((node, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`absolute ${node.pos} group cursor-pointer z-20`}
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all duration-300">
                <node.icon className="w-6 h-6 text-emerald-400 group-hover:text-white mb-1 transition-colors" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                  {node.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessStories() {
  return (
    <section className="py-12 md:py-24 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">Customer Success</span>
            <h2 className="text-[clamp(1.875rem,3vw+1rem,2.25rem)] font-extrabold text-gray-900 tracking-tight">Proven Real-World Impact</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-gray-300 hover:border-emerald-600 hover:text-emerald-600">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Button>
            <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-gray-300 hover:border-emerald-600 hover:text-emerald-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="h-64 overflow-hidden relative">
                <img src={study.image} alt={study.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{study.industry}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{study.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Capacity</div>
                    <div className="text-xl font-extrabold text-gray-900">{study.capacity}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Result</div>
                    <div className="text-xl font-extrabold text-emerald-600">{study.improvement}</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 font-medium italic border-l-2 border-emerald-500 pl-4 mb-8">
                  "{study.quote}"
                </blockquote>
                <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold p-0">
                  Read Full Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-12 md:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">Global Trust</span>
            <h2 className="text-[clamp(1.875rem,3vw+1rem,2.25rem)] font-extrabold text-gray-900 tracking-tight mb-6">Recognized Worldwide</h2>
            <p className="text-lg text-gray-600 font-medium mb-10">
              Power2Go systems are certified to the highest international safety and performance standards, trusted by enterprises across 50+ countries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-extrabold text-emerald-600 mb-2">98%</div>
                <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-emerald-600 mb-2">20GWh</div>
                <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Total Installed Capacity</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['ISO 9001', 'CE Certified', 'UL Listed', 'IEC 62619'].map((cert, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center aspect-square hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                <Award className="w-10 h-10 text-emerald-600 mb-3" />
                <div className="font-bold text-gray-900">{cert}</div>
                <div className="text-xs font-medium text-gray-500 mt-1">Global Standard</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyPower2Go() {
  const features = [
    { title: "AI Energy Mgmt", desc: "Predictive algorithms optimize charge/discharge cycles automatically.", icon: Cpu, col: "md:col-span-2" },
    { title: "Enterprise Safety", desc: "Multi-layer thermal runaway protection and aerosol suppression.", icon: Shield, col: "md:col-span-1" },
    { title: "Infinite Scalability", desc: "Modular architecture grows with your business.", icon: Layers, col: "md:col-span-1" },
    { title: "Cloud Monitoring", desc: "Real-time fleet visibility and remote diagnostics.", icon: Globe, col: "md:col-span-2" },
  ];

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[11px] mb-3 block">The Advantage</span>
          <h2 className="text-[clamp(1.875rem,3vw+1rem,2.25rem)] font-extrabold text-gray-900 tracking-tight">Why Choose Power2Go</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className={`bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors ${f.col} group`}>
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 group-hover:border-emerald-300 transition-colors">
                <f.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quick component for Layers icon used above
function Layers(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 12 12 17 22 12"></polyline>
      <polyline points="2 17 12 22 22 17"></polyline>
    </svg>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-16 md:py-32 bg-[#08080a] text-white overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Wind Turbines Sunset" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-[clamp(2rem,4vw+1rem,3.5rem)] lg:text-6xl font-extrabold tracking-tight mb-4 lg:mb-6">
          Power the Future with <span className="text-emerald-400">Confidence</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 lg:mb-10 max-w-2xl mx-auto">
          Partner with Power2Go to design intelligent, reliable, and scalable energy infrastructure for your business.
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

export default function Solutions() {
  return (
    <div className="min-h-screen bg-white font-sans pt-16 overflow-x-hidden">
      <HeroSection />
      <StorytellingShowcase />
      <ComparisonSection />
      <HowItWorks />
      <Ecosystem />
      <SuccessStories />
      <TrustSection />
      <WhyPower2Go />
      <FinalCTA />
    </div>
  );
}