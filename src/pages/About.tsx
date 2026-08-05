import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { 
  ArrowRight, Shield, Zap, Target, Eye, Users, Leaf,
  CheckCircle2, Server, Cpu, 
  MapPin, Lightbulb, Activity
} from "lucide-react";

// ==========================================
// 1. CINEMATIC HERO
// ==========================================
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[650px] md:h-[750px] lg:h-[850px] bg-black text-white overflow-hidden flex items-center border-b border-gray-900 pt-20 select-none">
      {/* Background Image & Dark Overlays */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Clean Energy Campus" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] z-10 opacity-60 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-2xl text-left">
            <motion.div style={{ opacity }} className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 backdrop-blur-md text-xs font-bold uppercase tracking-wider"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Engineering the Future
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-extrabold mb-8 text-white text-[44px] sm:text-[56px] md:text-[76px] lg:text-[82px] leading-[1.12] tracking-tight font-sans max-w-[620px]"
              >
                Intelligent Energy For A Smarter World
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg mb-12 leading-relaxed text-gray-400 font-semibold max-w-[540px]"
              >
                Power2Go develops advanced energy storage systems that help homes, businesses, and industries transition toward a cleaner, more reliable energy future.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/products">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-600/20 cursor-pointer">
                    Our Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white text-white hover:text-gray-900 font-extrabold px-8 py-6 rounded-2xl text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.03] cursor-pointer">
                    Contact Our Team
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-5 relative h-full">
            <motion.div style={{ y: y2 }} className="flex flex-col gap-4 justify-center">
              {[
                { title: "5000+", label: "Projects Completed" },
                { title: "20+", label: "Cities Served Across Pakistan" },
                { title: "20 GWh", label: "Installed Capacity" },
                { title: "24/7", label: "Nationwide Support" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + (i * 0.1) }}
                  className="p-4 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-between"
                >
                  <div className="text-2xl font-extrabold text-white">{stat.title}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 2. OUR STORY
// ==========================================
function OurStory() {
  const sections = [
    {
      title: "The Beginning",
      heading: "A Vision for Reliable Power",
      content: "Founded by a team of energy veterans, Power2Go was born from a simple realization: the world's power grids are aging, while our reliance on electricity is growing exponentially. We set out to build technology that puts power generation and storage directly into the hands of the people who need it most.",
      image: "https://images.unsplash.com/photo-1620825937374-87fc7d620984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "The Challenge",
      heading: "Modernizing Legacy Infrastructure",
      content: "As industries digitized and homes became smarter, the legacy centralized grid struggled to keep pace. Rolling blackouts, voltage drops, and severe weather events proved that a decentralized, intelligent energy storage approach wasn't just an option—it was a global necessity.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3 block">Our Origin</span>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight">The Story Behind The Power</h2>
        </div>

        <div className="space-y-32">
          {sections.map((sec, i) => (
            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <div className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-4">{sec.title}</div>
                <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 tracking-tight mb-6">{sec.heading}</h3>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">{sec.content}</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 group">
                  <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={sec.image} alt={sec.heading} className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. MISSION & VISION
// ==========================================
function MissionVision() {
  return (
    <section className="py-12 md:py-24 bg-gray-50 border-y border-gray-200 relative overflow-hidden w-full">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-3xl p-10 md:p-14 overflow-hidden border border-gray-200 shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
                To empower individuals and businesses with cutting-edge energy storage solutions that enable energy independence, reduce costs, and contribute to a sustainable future for generations to come.
              </p>
              <blockquote className="border-l-4 border-emerald-500 pl-6 text-gray-500 italic font-medium">
                "We don't just build batteries; we build the foundation for a resilient tomorrow."
              </blockquote>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-3xl p-10 md:p-14 overflow-hidden border border-gray-200 shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 group-hover:scale-110 transition-transform duration-500">
                <Eye className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight mb-6">Our Vision</h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
                To be the global leader in energy storage technology, creating a world where clean, reliable, and affordable energy is accessible to all, driving the transition to renewable energy worldwide.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-6 text-gray-500 italic font-medium">
                "A world where every structure generates, stores, and manages its own perfect energy."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. COMPANY HIGHLIGHTS (ANIMATED STATS)
// ==========================================
function AnimatedCounter({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Use a spring for the count up
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2000
  });

  React.useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center p-8 bg-[#08080a] border border-gray-800 rounded-3xl hover:border-emerald-500/50 transition-colors">
      <div className="text-5xl font-extrabold text-emerald-400 mb-3 tracking-tighter">
        {display}{suffix}
      </div>
      <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function Highlights() {
  return (
    <section className="py-12 md:py-24 bg-[#050505] relative border-b border-gray-900 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedCounter value={99} suffix=".9%" label="Reliability Rating" />
          <AnimatedCounter value={5000} suffix="+" label="Projects Completed" />
          <AnimatedCounter value={20} suffix=" GWh" label="Installed Capacity" />
          <AnimatedCounter value={100} suffix="%" label="In-House R&D" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. CORE VALUES (MASONRY LAYOUT)
// ==========================================
function CoreValues() {
  const values = [
    { icon: Lightbulb, title: "Innovation First", desc: "We invest heavily in R&D, continuously pushing the boundaries of battery chemistry, AI management, and thermal safety.", col: "col-span-1 md:col-span-2", bg: "bg-emerald-50", text: "text-emerald-900" },
    { icon: Shield, title: "Uncompromising Safety", desc: "From aerospace-grade thermal management to multi-layered BMS, safety is engineered into every cell.", col: "col-span-1", bg: "bg-gray-900", text: "text-white" },
    { icon: Leaf, title: "Sustainable Design", desc: "Our systems are built for long lifecycles and 95% recyclability at end-of-life.", col: "col-span-1", bg: "bg-white", text: "text-gray-900", border: "border-gray-200" },
    { icon: Users, title: "Customer Centricity", desc: "We design for the end-user, ensuring our software and hardware are intuitive, reliable, and backed by global support.", col: "col-span-1 md:col-span-2", bg: "bg-blue-50", text: "text-blue-900" }
  ];

  return (
    <section className="py-16 md:py-32 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3 block">Core Values</span>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight">Principles That Drive Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className={`p-10 rounded-3xl ${v.col} ${v.bg} ${v.border ? `border ${v.border}` : ''} group cursor-pointer transition-all duration-300`}
            >
              <v.icon className={`w-12 h-12 mb-6 ${v.text} opacity-80 group-hover:scale-110 transition-transform duration-300`} />
              <h3 className={`text-2xl font-extrabold mb-4 tracking-tight ${v.text}`}>{v.title}</h3>
              <p className={`font-medium leading-relaxed opacity-80 ${v.text}`}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. PARENT COMPANIES (PREMIUM SHOWCASE)
// ==========================================
function ParentCompanies() {
  return (
    <section className="py-16 md:py-32 bg-gray-50 border-y border-gray-200 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3 block">Corporate Structure</span>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight mb-6">Backed by Industry Giants</h2>
          <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto">
            Power2Go benefits from the vast resources, infrastructure, and decades of expertise provided by our parent organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Multinet */}
          <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full" />
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Multinet</h3>
                <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">Telecom & Tech Infrastructure</span>
              </div>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              One of Pakistan's leading enterprise telecom companies, providing nationwide fiber connectivity, cloud, data center, and cybersecurity solutions across 120+ cities.
            </p>
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Contribution to Power2Go</div>
              <ul className="space-y-3">
                {["Smart Monitoring Cloud Infrastructure", "Cybersecurity for BESS Networks", "Enterprise-grade IT backbone"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Orient Power */}
          <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full" />
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Orient Power</h3>
                <span className="text-sm font-bold tracking-widest text-emerald-600 uppercase">Independent Power Producer</span>
              </div>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              A diversified energy portfolio supplying power to the national grid through thermal and rapidly expanding renewable solar arrays for commercial clients.
            </p>
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Contribution to Power2Go</div>
              <ul className="space-y-3">
                {["Grid-scale engineering expertise", "Regulatory compliance & PPA structuring", "Renewable generation integration"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. INTERACTIVE TIMELINE
// ==========================================
function Timeline() {
  const events = [
    { year: "2024", title: "Foundation & R&D", desc: "Power2Go is established with a heavy focus on developing proprietary BMS algorithms and thermal safety protocols." },
    { year: "2024", title: "First Deployments", desc: "Successful installation of initial commercial microgrids and residential backup systems across key test markets." },
    { year: "2025", title: "Global Expansion", desc: "Opening of new manufacturing facilities to meet growing international demand for the Megawatt Vault series." },
    { year: "2026", title: "AI Integration", desc: "Launch of the SEM Cloud Dashboard, bringing predictive AI analytics to every deployed battery unit." }
  ];

  return (
    <section className="py-16 md:py-32 bg-white relative w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight">Our Journey</h2>
        </div>

        <div className="relative border-l-2 border-emerald-100 pl-8 ml-4 md:mx-auto md:border-l-0 md:pl-0 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-0.5 md:before:bg-emerald-100">
          {events.map((ev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative mb-16 md:mb-24 flex md:justify-between items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute -left-[41px] md:left-1/2 md:-ml-3 w-6 h-6 rounded-full bg-white border-4 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] z-10" />
              
              <div className="hidden md:block w-5/12" />
              
              <div className="w-full md:w-5/12 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <span className="text-emerald-600 font-extrabold tracking-widest text-lg mb-2 block">{ev.year}</span>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">{ev.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{ev.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. TECHNOLOGY & INNOVATION
// ==========================================
function Technology() {
  return (
    <section className="py-16 md:py-32 bg-[#08080a] text-white border-t border-gray-900 overflow-hidden relative w-full">
      <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 block">Engineering</span>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight mb-6">Innovation at the Core</h2>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            Hardware is only half the equation. Our systems are driven by advanced software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: "AI Battery Management", desc: "Machine learning algorithms constantly optimize charge/discharge cycles based on usage patterns." },
            { icon: Server, title: "Modular Architecture", desc: "Hot-swappable components allow for seamless scaling and maintenance without system downtime." },
            { icon: Shield, title: "Active Fire Suppression", desc: "Aerospace-grade thermal sensors combined with automated liquid cooling and suppression gas." }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-colors duration-300">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30">
                <item.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 9. GLOBAL IMPACT & CERTIFICATIONS
// ==========================================
function ImpactAndCerts() {
  return (
    <section className="py-16 md:py-32 bg-gray-50 border-t border-gray-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Global Impact map stand-in */}
        <div className="mb-32 text-center">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3 block">Global Reach</span>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight mb-16">Powering The World</h2>
          
          <div className="relative h-[400px] md:h-[600px] w-full bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden flex items-center justify-center">
            {/* Using a placeholder map image, in a real app this might be a GSAP/Three.js interactive map */}
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" alt="Global Map" className="absolute inset-0 w-full h-full object-cover opacity-20 sepia contrast-150 grayscale" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-24">
              <div className="text-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-3xl font-extrabold text-gray-900">20+</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Cities Served Across Pakistan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">Certified for Enterprise Safety & Quality</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder certs text */}
            <h3 className="text-3xl font-black text-gray-800 tracking-tighter">ISO 9001</h3>
            <h3 className="text-3xl font-black text-gray-800 tracking-tighter">CE Certified</h3>
            <h3 className="text-3xl font-black text-gray-800 tracking-tighter">UL 9540</h3>
            <h3 className="text-3xl font-black text-gray-800 tracking-tighter">IEC Standard</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 10. TEAM & CULTURE
// ==========================================
function Team() {
  return (
    <section className="py-16 md:py-32 bg-white relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3 block">Our People</span>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-gray-900 tracking-tight mb-6">Engineers, Thinkers, Innovators.</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
              At Power2Go, we believe that the best products are built by diverse teams who share a common obsession: perfecting the flow of energy. From our advanced R&D labs to our manufacturing floors, our culture is defined by continuous improvement and rigorous testing.
            </p>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-6 rounded-xl">
              View Careers
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Engineer" className="rounded-3xl h-64 w-full object-cover shadow-lg" />
             <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Lab" className="rounded-3xl h-64 w-full object-cover shadow-lg mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 11. WHY CHOOSE US
// ==========================================
function WhyChooseUs() {
  const reasons = [
    "Advanced AI BMS Algorithms",
    "A-Grade Tier 1 Lithium Cells",
    "10-15 Year Extended Warranties",
    "Containerized Plug & Play Design",
    "24/7 Global NOC Monitoring",
    "Complete Grid Independence"
  ];

  return (
    <section className="py-16 md:py-32 bg-[#050505] text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight mb-6">The Power2Go Advantage</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div key={i} className="flex items-center gap-4 bg-[#0a0a0c] border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold text-gray-300">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 12. FINAL CTA
// ==========================================
function FinalCTA() {
  return (
    <section className="relative py-20 md:py-40 bg-[#08080a] text-white overflow-hidden text-center flex items-center justify-center w-full">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
          alt="Smart City Sunset" 
          className="w-full h-full object-cover opacity-20 mix-blend-screen sepia-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-[#08080a]/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold tracking-tight mb-8"
        >
          Powering Tomorrow <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Starts With Vision.
          </span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 font-medium mb-12 max-w-2xl mx-auto"
        >
          Join us in building a cleaner, smarter, and more resilient energy future through advanced energy storage technology.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/products">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-7 rounded-xl text-lg font-bold shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all hover:scale-105">
              Explore Products <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-10 py-7 rounded-xl text-lg font-bold backdrop-blur-md transition-all hover:scale-105">
              Contact Our Experts
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function About() {
  return (
    <div className="bg-white font-sans overflow-hidden">
      <Hero />
      <OurStory />
      <MissionVision />
      <Highlights />
      <CoreValues />
      <ParentCompanies />
      <Timeline />
      <Technology />
      <ImpactAndCerts />
      <Team />
      <WhyChooseUs />
      <FinalCTA />
    </div>
  );
}