import { useState, useRef } from "react";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  TrendingUp, 
  Activity, 
  Cpu, 
  Home, 
  Building2, 
  Factory, 
  Sun, 
  Battery, 
  GitCompare,
  Layers,
  Wind,
  Smartphone,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data/products";
import { useCompare } from "../context/CompareContext";
import { Product } from "../lib/types";

// Display order: LV Module (1), LV Vault 25 (4), HV Vault 60 (7), Industrial 240 (9), Megawatt Container (10), PULSE Portable (11)
const DISPLAY_ORDER = [1, 4, 7, 9, 10, 11];

// Storytelling copy mapping for why the product exists and what customer problem it solves
const STORY_DATA: Record<number, {
  shortStory: string;
  problemSolved: string;
  advantages: string[];
}> = {
  1: { // LV 5
    shortStory: "A reliable 5.12 kWh energy foundation for everyday living.",
    problemSolved: "Protects families from rising utility tariffs and power blackouts while maximizing home solar self-consumption with cobalt-free LFP safety.",
    advantages: [
      "Cobalt-Free LFP Chemistry: Maximum thermal and chemical safety proven in 1M+ EVs.",
      "High Current Performance: 100A continuous discharge current with 170A surge power.",
      "Universal Compatibility: Works with DEYE, Solis, GoodWe, Growatt and Megarevo inverters."
    ]
  },
  4: { // LV Energy Vault 25
    shortStory: "Modular residential energy storage stacked up to 25 kWh.",
    problemSolved: "Eliminates power cuts for whole-home circuits with a space-saving 1.05m cabinet holding up to 5 modules.",
    advantages: [
      "Expandable Capacity: Scale from 5 kWh up to 25 kWh as your home energy needs grow.",
      "Whole-Home Surge Power: 500A continuous and 850A surge capability to start heavy loads.",
      "Plug & Play BMS: Single-point intelligent management and cloud remote monitoring."
    ]
  },
  7: { // HV Energy Vault 60
    shortStory: "High-voltage energy storage for commercial operations.",
    problemSolved: "Saves commercial plazas and businesses from peak demand penalties and power outages with operating voltages up to 710V.",
    advantages: [
      "Commercial Peak Shaving: Intelligently discharges during peak tariff rate hours.",
      "Wide Voltage Range: 307V to 614.4V nominal voltage for high-voltage commercial inverters.",
      "High Efficiency: 93% round-trip efficiency with Sungrow and DEYE HV inverter support."
    ]
  },
  9: { // HV Energy Vault 240
    shortStory: "Utility-scale high-voltage tower delivering up to 240 kWh.",
    problemSolved: "Solves heavy industrial power instability and Provides massive 314A continuous current for manufacturing plants.",
    advantages: [
      "Industrial Power Output: 314A continuous and 514A peak surge for heavy motor starts.",
      "SCADA & Modbus TCP: Direct integration with industrial enterprise automation systems.",
      "High Voltage Scaling: Nominal voltage scaling up to 768V for industrial grid tie-in."
    ]
  },
  11: { // PULSE 320
    shortStory: "Compact 1000 Wh portable power station for active life.",
    problemSolved: "Resolves portable energy constraints for outdoor activities, job sites, and emergency field operations.",
    advantages: [
      "Lightweight Portability: Ergonomic 3.5 kg chassis with 1000 Wh LiFePO4 battery.",
      "Multi-Port Charging: Pure sine wave AC output, 12V DC, and USB-C Power Delivery.",
      "Long Cycle Life: Over 2000+ cycles with integrated digital LED status screen."
    ]
  }
};

// Icon mapper for applications
const APP_ICONS: Record<string, React.ComponentType<any>> = {
  "Residential homes": Home,
  "Solar energy storage": Sun,
  "Backup power systems": Zap,
  "Load shifting and peak shaving": TrendingUp,
  "Commercial buildings": Building2,
  "Industrial facilities": Factory,
  "Small businesses": Building2,
  "Off-grid installations": Sun,
  "Small commercial buildings": Building2,
  "Medium commercial buildings": Building2,
  "Large commercial buildings": Building2,
  "Industrial manufacturing": Factory,
  "Large businesses": Building2,
  "Data centers": Cpu,
  "Critical infrastructure": Shield,
  "Large-scale commercial operations": Building2,
  "Industrial manufacturing plants": Factory,
  "Mission-critical data centers": Cpu,
  "Telecommunications infrastructure": Activity,
  "Infrastructure and utilities": Factory,
  "Heavy industrial facilities": Factory,
  "Large-scale manufacturing": Factory,
  "Mission-critical operations": Shield,
  "Utility-scale installations": Factory,
  "Heavy manufacturing operations": Factory,
  "Camping and outdoor activities": Sun,
  "Emergency backup power": Zap,
  "Photography and videography": Activity,
  "Small appliances and devices": Cpu,
  "Extended backup power": Zap,
  "Full-home backup power": Home,
  "Peak shaving and load management": TrendingUp,
  "Luxury residential homes": Home,
  "Complete energy independence": Shield,
  "Advanced load management": Cpu,
  "Large estates and villas": Home,
  "Multi-family residential": Home,
  "Professional energy management": Cpu,
  "Commercial solar installations": Building2,
  "Battery storage monitoring": Battery,
  "Grid-tied and off-grid systems": Zap,
  "Energy management optimization": Cpu,
  "System performance diagnostics": Activity,
};

// Hotspots detail descriptions & icons for product overlays
const FLOATING_CALLOUTS: Record<number, Array<{
  title: string;
  desc: string;
  lineX1: number;
  lineY1: number;
  lineX2: number;
  lineY2: number;
  badgeStyle: string;
  icon: React.ComponentType<any>;
}>> = {
  3: [ // Residential Vault 25
    { 
      title: "AI Battery Management", 
      desc: "Built-in machine learning balances cells dynamically to optimize lifespan.", 
      lineX1: 20, lineY1: 22, lineX2: 44, lineY2: 32, 
      badgeStyle: "top-[20%] left-[6%]",
      icon: Cpu
    },
    { 
      title: "Thermal Cooling System", 
      desc: "Dual quiet fan vents maintain optimal temperature zones automatically.", 
      lineX1: 80, lineY1: 40, lineX2: 56, lineY2: 48, 
      badgeStyle: "top-[38%] right-[6%]",
      icon: Wind
    },
    { 
      title: "Modular Battery Packs", 
      desc: "LiFePO4 stackable battery packs modular from 5 to 25 kWh.", 
      lineX1: 24, lineY1: 75, lineX2: 46, lineY2: 60, 
      badgeStyle: "top-[73%] left-[10%]",
      icon: Layers
    }
  ],
  1: [ // Commercial Vault 75
    { 
      title: "AI Power Controller", 
      desc: "Advanced power electronics synchronize inverter inputs in microseconds.", 
      lineX1: 20, lineY1: 20, lineX2: 44, lineY2: 30, 
      badgeStyle: "top-[18%] left-[6%]",
      icon: Cpu
    },
    { 
      title: "Active Fire Suppressors", 
      desc: "Thermal runaway containment blocks and aerosol automatic extinguishers.", 
      lineX1: 80, lineY1: 38, lineX2: 56, lineY2: 46, 
      badgeStyle: "top-[36%] right-[6%]",
      icon: Shield
    },
    { 
      title: "High-Voltage Cells", 
      desc: "Series-connected cell grids capable of up to 768V DC utility loads.", 
      lineX1: 24, lineY1: 76, lineX2: 46, lineY2: 62, 
      badgeStyle: "top-[74%] left-[10%]",
      icon: Layers
    }
  ],
  2: [ // Pulse
    { 
      title: "AC Pure Sine Inverter", 
      desc: "Delivers clean grid-equivalent AC power safe for sensitive laptops.", 
      lineX1: 20, lineY1: 24, lineX2: 44, lineY2: 35, 
      badgeStyle: "top-[22%] left-[6%]",
      icon: Zap
    },
    { 
      title: "LED Diagnostic Board", 
      desc: "High-contrast telemetry panel logs remaining capacity and port draw.", 
      lineX1: 80, lineY1: 42, lineX2: 56, lineY2: 48, 
      badgeStyle: "top-[40%] right-[6%]",
      icon: Smartphone
    },
    { 
      title: "Safety Protection BMS", 
      desc: "Real-time surge protection, thermal cutoff, and cell voltage monitors.", 
      lineX1: 24, lineY1: 74, lineX2: 46, lineY2: 58, 
      badgeStyle: "top-[72%] left-[10%]",
      icon: Shield
    }
  ],
  4: [ // Monitoring System
    { 
      title: "AI Diagnostics Gateway", 
      desc: "Aggregates grid statistics and predicts capacity faults proactively.", 
      lineX1: 20, lineY1: 22, lineX2: 44, lineY2: 34, 
      badgeStyle: "top-[20%] left-[6%]",
      icon: Cpu
    },
    { 
      title: "Cloud Analytics Uplink", 
      desc: "Dual-band Wi-Fi and 4G cellular antennas sync state variables in real-time.", 
      lineX1: 80, lineY1: 42, lineX2: 56, lineY2: 48, 
      badgeStyle: "top-[40%] right-[6%]",
      icon: Activity
    },
    { 
      title: "High-Precision Sensors", 
      desc: "Measures grid frequency, cell resistance, and voltage fluctuations instantly.", 
      lineX1: 24, lineY1: 72, lineX2: 46, lineY2: 58, 
      badgeStyle: "top-[70%] left-[10%]",
      icon: Sparkles
    }
  ]
};

// Background gradients mapping
const SECTION_BG: Record<number, string> = {
  3: "bg-gradient-to-b from-[#f7fdfa] via-white to-white", // Greenish
  1: "bg-gradient-to-b from-[#f5fafe] via-white to-white", // Blueish
  2: "bg-gradient-to-b from-[#fffbf5] via-white to-white", // Amberish
  4: "bg-gradient-to-b from-[#faf6fe] via-white to-white", // Purpleish
};

// Brand accent colors mapping
const ACCENT_COLORS: Record<number, { text: string; bg: string; border: string; glow: string }> = {
  3: { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", glow: "rgba(16, 185, 129, 0.12)" },
  1: { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", glow: "rgba(16, 185, 129, 0.12)" },
  2: { text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", glow: "rgba(245, 158, 11, 0.12)" },
  4: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", glow: "rgba(168, 85, 247, 0.12)" },
};

export function AllProducts() {
  const [activeStickyProduct, setActiveStickyProduct] = useState<Product | null>(null);
  const orderedProducts = [...products].sort((a, b) => {
    return DISPLAY_ORDER.indexOf(a.id) - DISPLAY_ORDER.indexOf(b.id);
  });

  return (
    <section className="bg-white scroll-smooth relative">
      {/* Sticky Mobile CTA Bar */}
      <AnimatePresence>
        {activeStickyProduct && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 p-4 z-40 flex items-center justify-between gap-4 md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Currently viewing</span>
              <h4 className="font-extrabold text-sm text-gray-900 truncate">{activeStickyProduct.name}</h4>
            </div>
            <div className="flex gap-2">
              <Link to={`/products/${activeStickyProduct.id}`}>
                <Button size="sm" variant="outline" className="text-xs py-1.5 h-8">
                  Details
                </Button>
              </Link>
              <Link to={`/contact?product=${activeStickyProduct.id}`}>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-1.5 h-8 font-semibold">
                  Get Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Showcase Page Navigation Dot Bar (Floating right) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-30 bg-white/40 backdrop-blur-sm px-2.5 py-5 rounded-full border border-gray-200/30 shadow-md">
        {orderedProducts.map((p) => (
          <a
            key={p.id}
            href={`#product-showcase-${p.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(`product-showcase-${p.id}`)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 relative group ${
              activeStickyProduct?.id === p.id 
                ? "bg-emerald-500 scale-125" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-900/90 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">
              {p.model}
            </span>
          </a>
        ))}
      </div>

      {orderedProducts.map((product) => (
        <ProductSection 
          key={product.id} 
          product={product} 
          onIntersect={(isActive) => {
            if (isActive) setActiveStickyProduct(product);
          }} 
        />
      ))}
    </section>
  );
}

interface ProductSectionProps {
  product: Product;
  onIntersect: (isActive: boolean) => void;
}

function ProductSection({ product, onIntersect }: ProductSectionProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { isCompared, addToCompare, removeFromCompare } = useCompare();
  const compared = isCompared(product.id);

  // Trigger intersection observer to update active sticky product
  useState(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          onIntersect(entry.isIntersecting);
        },
        { threshold: 0.35 }
      );
      
      // Delay observation to ensure DOM ref is attached
      setTimeout(() => {
        if (sectionRef.current) observer.observe(sectionRef.current);
      }, 100);

      return () => observer.disconnect();
    }
  });

  const variants = product.variants || [];
  const currentVariant = product.hasVariants && variants[selectedVariantIdx] ? variants[selectedVariantIdx] : null;

  // Compile active variables
  const name = product.name;
  const model = currentVariant ? currentVariant.model : product.model;
  const keyFeatures = currentVariant ? currentVariant.keyFeatures : (product.keyFeatures || []);
  const applications = currentVariant ? currentVariant.applications : (product.applications || []);
  const images = Array.isArray(product.image) ? product.image : [product.image];
  const activeImg = images[activeImgIdx] || images[0];

  const accent = ACCENT_COLORS[product.id] || ACCENT_COLORS[3];

  // Helper to extract specifications object
  const specsObj = currentVariant ? currentVariant.specifications : (product.specifications || {});

  // Build spec preview cards dynamically with icons & descriptions
  const getSpecsList = () => {
    if (product.id === 4) {
      return [
        { label: "Real-time Telemetry", value: "1-Second Logs", desc: "Instant 1-second system metrics tracking.", icon: Cpu },
        { label: "Cloud Storage", value: "Unlimited Logs", desc: "Store detailed historical telemetry logs.", icon: Activity },
        { label: "API Integrations", value: "Universal Sync", desc: "Seamless third-party automation interfaces.", icon: TrendingUp },
        { label: "Warranty Support", value: product.warranty, desc: "Comprehensive manufacturer coverage.", icon: Shield },
      ];
    }
    const capVal = currentVariant ? currentVariant.capacityLabel : product.capacityLabel;
    const powVal = currentVariant ? currentVariant.power : product.power;
    const voltVal = currentVariant ? currentVariant.voltage : product.voltage;
    const effVal = specsObj["Efficiency"] || "94%+";

    return [
      { label: "Capacity", value: capVal, desc: "Total battery storage volume.", icon: Battery },
      { label: "Power Output", value: powVal, desc: "Max continuous power output.", icon: Zap },
      { label: "Voltage Range", value: voltVal, desc: "Nominal system voltage.", icon: Activity },
      { label: "System Efficiency", value: effVal, desc: "Round-trip charge efficiency.", icon: TrendingUp },
    ];
  };

  const specsList = getSpecsList();

  // Floating callouts details
  const callouts = FLOATING_CALLOUTS[product.id] || [];

  // Custom visual stack count based on variant selected
  const unitCount = product.hasVariants ? selectedVariantIdx + 1 : 1;

  // Story information with fallback safeguard
  const story = STORY_DATA[product.id] || {
    shortStory: "Advanced clean energy storage engineered for maximum reliability.",
    problemSolved: "Protects against power outages and high utility rates.",
    advantages: [
      "Lithium Iron Phosphate (Cobalt-Free)",
      "High Round-trip Efficiency",
      "Plug & Play BMS Connectivity"
    ]
  };

  // Stacking logic rendering (Increased size by ~30%)
  const renderStackedVisual = () => {
    if (!product.hasVariants || unitCount <= 1) {
      return (
        <div className="relative w-full h-[480px] sm:h-[600px] md:h-[720px] flex items-center justify-center group pointer-events-auto">
          {/* Subtle floor reflection */}
          <div className="absolute -bottom-36 left-0 right-0 h-32 pointer-events-none overflow-hidden opacity-[0.07] select-none scale-y-[-1] blur-[1.5px] z-0 hidden md:block">
            <ImageWithFallback src={activeImg} className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </div>
          {/* Floating Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/10 rounded-[100%] blur-xl opacity-80 group-hover:scale-95 transition-transform duration-500" />
          
          {/* Main product image wrapper with gentle floating and parallax tilt */}
          <div
            className="w-full h-full max-w-[510px] sm:max-w-[585px] md:max-w-[690px] relative z-10 flex items-center justify-center"
          >
            <ImageWithFallback
              src={activeImg}
              alt={name}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>
      );
    }

    // Stacked visual counts (max 5 rendered modules to fit viewport perfectly)
    const visualStackCount = Math.min(unitCount, 5);
    const offsetStep = 24; // px offset
    const heightOffset = (visualStackCount - 1) * offsetStep;
    
    return (
      <div 
        className="relative w-full flex flex-col items-center justify-end group transition-all duration-300 pointer-events-auto"
        style={{ height: `${480 + heightOffset}px` }}
      >
        {/* Soft reflection of the bottom-most unit */}
        <div className="absolute -bottom-36 left-0 right-0 h-32 pointer-events-none overflow-hidden opacity-[0.06] select-none scale-y-[-1] blur-[1.5px] z-0 hidden md:block">
          <ImageWithFallback src={activeImg} className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/12 rounded-[100%] blur-xl opacity-90 group-hover:scale-95 transition-transform duration-500" />

        {/* Dynamic stacks */}
        <div className="relative w-full h-full max-w-[450px] sm:max-w-[525px] md:max-w-[630px] flex items-end justify-center">
          <AnimatePresence initial={false}>
            {Array.from({ length: visualStackCount }).map((_, idx) => {
              const yTranslate = idx * -offsetStep;
              const scaleFactor = 1 - (visualStackCount - 1 - idx) * 0.015; // perspective scale
              
              return (
                <motion.div
                  key={idx}
                  className="absolute w-full h-[330px] sm:h-[390px] md:h-[450px]"
                  style={{ 
                    zIndex: idx,
                    bottom: "0px"
                  }}
                  initial={{ opacity: 0, y: yTranslate - 40, scale: 0.85 }}
                  animate={{ opacity: 1, y: yTranslate, scale: scaleFactor }}
                  exit={{ opacity: 0, y: yTranslate + 40, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22, delay: idx * 0.04 }}
                >
                  <ImageWithFallback
                    src={activeImg}
                    alt={`${name} module ${idx + 1}`}
                    className="w-full h-full object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] transition-all duration-300"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Stack counter tag if selection exceeds the 5-limit visual stack */}
        {unitCount > 5 && (
          <span className="absolute bottom-2 right-2 bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm z-20 shadow-md">
            +{unitCount - 5} More Units in Stack
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      ref={sectionRef}
      id={`product-showcase-${product.id}`}
      className={`min-h-[90vh] md:min-h-screen py-20 md:py-32 relative flex items-center overflow-hidden border-b border-gray-100 ${
        SECTION_BG[product.id] || "bg-white"
      }`}
    >
      {/* Studio Radial Light Glow */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-[0.14] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" 
        style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Product Info & Key Details */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-start text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category Pill Tag */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${accent.text} ${accent.bg} ${accent.border}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {product.badge}
            </span>

            {/* Title / Name */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-1 font-sans">
              {name}
            </h2>

            {/* Model Subtitle */}
            <p className="text-md sm:text-lg font-semibold text-gray-400 tracking-wide mb-6">
              {model}
            </p>

            {/* PRODUCT STORYTELLING SEGMENTS */}
            {/* Short Story */}
            <p className="text-base sm:text-lg font-bold text-emerald-600 mb-5 max-w-xl font-sans tracking-wide leading-relaxed">
              "{story.shortStory}"
            </p>

            {/* Technical Highlights list */}
            {keyFeatures.length > 0 && (
              <div className="mb-8 w-full">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-3">
                  Technical Highlights
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl">
                  {keyFeatures.slice(0, 4).map((feat, featIdx) => (
                    <li key={featIdx} className="flex items-start gap-1.5 text-xs font-semibold text-gray-600">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Module Stack Selector (For Vaults) */}
            {product.hasVariants && variants.length > 0 && (
              <div className="w-full mb-8">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-3.5">
                  Customize Stack Configuration ({variants.length} options)
                </span>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, idx) => {
                    const label = v.capacityLabel.split(" (")[0];
                    const isActive = selectedVariantIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedVariantIdx(idx);
                          setActiveImgIdx(0);
                        }}
                        className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-gray-900 text-white shadow-lg shadow-gray-900/10 scale-105"
                            : "bg-gray-50/80 hover:bg-gray-100/90 text-gray-700 border border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Application Chips */}
            <div className="w-full mb-8">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-3.5">
                Target Applications
              </span>
              <div className="flex flex-wrap gap-2">
                {applications.map((app) => {
                  const IconComponent = APP_ICONS[app] || Zap;
                  return (
                    <span 
                      key={app} 
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-100 shadow-sm rounded-2xl text-xs font-bold text-gray-700"
                    >
                      <IconComponent className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {app}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Key Specifications Grid (Polished Spec Cards) */}
            <div className="w-full mb-8">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-3.5">
                Key Performance Specs
              </span>
              <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
                {specsList.map((spec, specIdx) => {
                  const SpecIcon = spec.icon;
                  return (
                    <div 
                      key={specIdx}
                      className="p-4 bg-white/70 border border-gray-200/50 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex items-start gap-3 hover:shadow-md hover:border-gray-300/40 transition-all duration-300 group"
                    >
                      <div className={`p-2.5 rounded-xl ${accent.bg} ${accent.text} group-hover:scale-105 transition-transform`}>
                        <SpecIcon className="h-4.5 w-4.5 stroke-[2.2]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                          {spec.label}
                        </span>
                        <span className="font-extrabold text-sm text-gray-900 mt-0.5 block">
                          {spec.value}
                        </span>
                        <span className="text-[10px] font-medium text-gray-500 leading-normal mt-1 block">
                          {spec.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full mt-4">
              <Link to={`/products/${product.id}`} className="shrink-0">
                <Button className="bg-gray-900 hover:bg-black text-white px-6 py-5 rounded-2xl text-xs font-bold flex items-center gap-2 group transition-all">
                  Explore Product
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to={`/contact?product=${product.id}`} className="shrink-0">
                <Button variant="outline" className="px-5 py-5 rounded-2xl text-xs font-bold border-gray-300 hover:border-gray-900 hover:bg-gray-50 flex items-center gap-1.5 transition-colors">
                  Request Quote
                </Button>
              </Link>

              {/* Compare Button */}
              <Button
                variant="ghost"
                onClick={() => {
                  if (compared) {
                    removeFromCompare(product.id);
                  } else {
                    addToCompare(product);
                  }
                }}
                className={`px-4 py-5 rounded-2xl text-xs font-bold flex items-center gap-2 border border-transparent transition-all select-none cursor-pointer ${
                  compared
                    ? "bg-emerald-50/80 border-emerald-200/50 text-emerald-600 hover:bg-emerald-100/80"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <GitCompare className="h-4 w-4" />
                <span>{compared ? "Compared" : "Compare"}</span>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase Render (Image & Interactive Hotspots) */}
          <motion.div 
            className="lg:col-span-6 relative flex flex-col items-center justify-center select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image Angles selector dots */}
            {images.length > 1 && (
              <div className="absolute top-0 right-0 z-20 flex gap-2.5 bg-gray-50/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-gray-100">
                {images.map((_, imgIdx) => (
                  <button
                    key={imgIdx}
                    onClick={() => setActiveImgIdx(imgIdx)}
                    className={`text-[9px] font-bold px-2 py-1 rounded-xl transition-all cursor-pointer ${
                      activeImgIdx === imgIdx 
                        ? "bg-gray-900 text-white scale-105" 
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    aria-label={`View angle ${imgIdx + 1}`}
                  >
                    Angle {imgIdx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Main Interactive visual wrapper */}
            <div className="relative w-full max-w-[480px] flex items-center justify-center p-8">
              




              {/* Stack / Single Visual Render */}
              {renderStackedVisual()}
            </div>

            {/* Mobile swipeable feature cards list */}
            <div className="w-full mt-6 block md:hidden">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-3 text-center">
                Key Features (Swipe to read)
              </span>
              <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x scrollbar-none">
                {callouts.map((c, idx) => (
                  <div
                    key={idx}
                    className="snap-center shrink-0 w-[240px] bg-white border border-gray-100 shadow-md p-4 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 mb-2 text-left">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                      <span className="font-extrabold text-xs text-gray-800">{c.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-normal font-medium text-left">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

