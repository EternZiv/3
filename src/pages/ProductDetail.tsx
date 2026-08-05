import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Share2,
  Zap,
  Shield,
  TrendingUp,
  Battery,
  CheckCircle,
  ArrowLeft,
  CloudDownload,
  X,
  Download,
  GitCompare,
  Cpu,
  Smartphone,
  Activity
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useCompare } from "../context/CompareContext";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { AnimatedProductImage } from "../components/AnimatedProductImage";
import { toast } from "sonner";
import { getProductById } from "../data/products";
import { supabase } from "../lib/supabase";
import type { Product } from "../lib/types";



export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCapacity, setSelectedCapacity] = useState<string>("1-unit");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showCapacitySelection, setShowCapacitySelection] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(() => getProductById(Number(id)) || null);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data fetching logic
  useEffect(() => {
    async function loadProductDetails() {
      if (!id) return;
      setLoading(true);
      try {
        const { data: dbProduct, error } = await supabase
          .from("products")
          .select("*")
          .eq("product_id", Number(id))
          .single();

        if (!error && dbProduct) {
          const { data: dbVariants } = await supabase
            .from("product_variants")
            .select("*")
            .eq("product_id", dbProduct.id)
            .order("sort_order", { ascending: true });

          const mappedVariants = dbVariants ? dbVariants.map((v: any) => ({
            capacity: v.capacity,
            capacityLabel: v.capacity_label,
            model: v.model,
            power: v.power,
            voltage: v.voltage,
            features: v.features || [],
            description: v.description,
            specifications: v.specifications || {},
            keyFeatures: v.key_features || [],
            applications: v.applications || [],
          })) : [];

          const mappedProduct: Product = {
            id: dbProduct.product_id,
            name: dbProduct.name,
            model: dbProduct.model,
            category: dbProduct.category,
            image: dbProduct.image_data ? [dbProduct.image_data] : (dbProduct.image_url ? [dbProduct.image_url] : []),
            capacity: Number(dbProduct.capacity),
            capacityLabel: dbProduct.capacity_label,
            power: dbProduct.power,
            voltage: dbProduct.voltage,
            warranty: dbProduct.warranty,
            badge: dbProduct.badge,
            features: dbProduct.features || [],
            animationInterval: 5000,
            description: dbProduct.description,
            specifications: dbProduct.specifications,
            keyFeatures: dbProduct.detailed_key_features,
            applications: dbProduct.applications,
            what_included: dbProduct.what_included,
            warranty_support: dbProduct.warranty_support,
            hasVariants: dbProduct.has_variants,
            variants: mappedVariants,
          };

          setActiveProduct(mappedProduct);
        }
      } catch (err) {
        console.error("Failed to load product details from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProductDetails();
  }, [id]);

  // Variables mapping logic
  const product = activeProduct;
  const { isCompared, addToCompare, removeFromCompare } = useCompare();
  const compared = product ? isCompared(product.id) : false;



  if (loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mb-4" />
          <p className="text-gray-400 font-medium">Initializing systems...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">Return to Fleet</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.hasVariants && product.variants
    ? product.variants.find((v) => v.capacity === selectedCapacity)
    : null;

  const displayModel = currentVariant?.model || product.model;
  const displayPower = currentVariant?.power || product.power;
  const displayVoltage = currentVariant?.voltage || product.voltage;
  const displayCapacityLabel = currentVariant?.capacityLabel || product.capacityLabel;
  const displayDescription = currentVariant?.description || product.description;
  const displaySpecifications = currentVariant?.specifications || product.specifications;
  const displayKeyFeatures = currentVariant?.keyFeatures || product.keyFeatures;

  const displayFeatures = currentVariant?.features || product.features;

  const handleExploreMore = () => navigate("/contact");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        const input = document.createElement('input');
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        toast.success("Link copied!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-emerald-500/30">
      {/* Back Button Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-24 left-8 z-50"
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white/60 hover:text-white hover:bg-white/10 backdrop-blur-md rounded-full px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </motion.div>

      {/* 1. Cinematic Hero */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#050505] z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center z-0 p-20 opacity-80 scale-105 transform origin-center">
          <AnimatedProductImage
            images={product.image}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(16,185,129,0.2)]"
            animationInterval={product.animationInterval}
          />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-end h-full pb-32 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {product.badge && (
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1 text-sm tracking-widest uppercase rounded-full backdrop-blur-sm">
                {product.badge}
              </Badge>
            )}
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide mb-8 max-w-2xl mx-auto">
              {displayModel}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Glassmorphism Specs Bar */}
      <div className="sticky top-[70px] z-40 px-4 py-2 -mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="flex flex-col items-center text-center">
            <Zap className="h-4 w-4 text-emerald-400 mb-1" />
            <span className="text-xl md:text-2xl font-bold text-white mb-0.5">{displayCapacityLabel}</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Capacity</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="h-4 w-4 text-emerald-400 mb-1" />
            <span className="text-xl md:text-2xl font-bold text-white mb-0.5">{displayPower}</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Power Output</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Battery className="h-4 w-4 text-emerald-400 mb-1" />
            <span className="text-xl md:text-2xl font-bold text-white mb-0.5">{displayVoltage}</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Voltage</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="h-4 w-4 text-emerald-400 mb-1" />
            <span className="text-xl md:text-2xl font-bold text-white mb-0.5">{product.warranty}</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Warranty</span>
          </div>
        </motion.div>
      </div>

      {/* Product Description & Capacity */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-2xl text-white/80 leading-relaxed font-light">
            {displayDescription}
          </p>
        </div>

        {product.hasVariants && product.variants && (
          <div className="max-w-4xl mx-auto mb-20">
            <h3 className="text-center text-sm uppercase tracking-[0.3em] text-white/40 mb-8">Select Configuration</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.variants.map((variant) => (
                <button
                  key={variant.capacity}
                  onClick={() => setSelectedCapacity(variant.capacity)}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    selectedCapacity === variant.capacity
                      ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className={`text-xl font-bold mb-1 ${selectedCapacity === variant.capacity ? "text-emerald-400" : "text-white"}`}>
                      {variant.capacityLabel}
                    </span>
                  </div>
                  {selectedCapacity === variant.capacity && (
                    <motion.div layoutId="capacity-active" className="absolute inset-0 bg-emerald-500/10 backdrop-blur-3xl z-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. Feature Highlights with Alternating Blocks */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-[clamp(2.25rem,5vw,3rem)] font-bold mb-4">Uncompromising Performance.</h2>
            <p className="text-xl text-white/50 font-light">Engineered for the most demanding environments.</p>
          </div>

          <div className="space-y-32">
            {/* Block 1 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 order-2 md:order-1">
                <div className="aspect-square bg-gradient-to-br from-white/5 to-white/0 rounded-[3rem] border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Activity className="w-32 h-32 text-emerald-400/50 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm">
                  <Cpu className="w-4 h-4" /> Advanced Architecture
                </div>
                <h3 className="text-[clamp(1.875rem,4vw,2.25rem)] font-bold">Intelligent Power Management</h3>
                <p className="text-lg text-white/50 leading-relaxed font-light">
                  Our proprietary algorithms continuously optimize energy distribution, ensuring maximum efficiency and prolonging battery life. It learns from your usage patterns to deliver power exactly when you need it.
                </p>
                <ul className="space-y-4">
                  {(displayKeyFeatures ?? []).slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-emerald-500" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Block 2 (Reversed) */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm">
                  <Shield className="w-4 h-4" /> Rugged Durability
                </div>
                <h3 className="text-[clamp(1.875rem,4vw,2.25rem)] font-bold">Built to Outlast</h3>
                <p className="text-lg text-white/50 leading-relaxed font-light">
                  Constructed with aerospace-grade materials, this unit is designed to withstand extreme temperatures, impacts, and environmental stress. Peace of mind comes standard.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {displayFeatures.map((feature, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-square bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-[3rem] border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group">
                  <Shield className="w-32 h-32 text-white/20 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Smart Monitoring Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.25rem,5vw,3rem)] font-bold mb-4">Total Control. Anywhere.</h2>
          <p className="text-xl text-white/50 font-light">Monitor your energy ecosystem in real-time with the companion app.</p>
        </div>

        <div className="relative rounded-[3rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-8 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-emerald-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Live Analytics</h4>
                  <p className="text-white/50">Track generation, consumption, and storage metrics in absolute real-time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-emerald-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Remote Access</h4>
                  <p className="text-white/50">Configure settings, update firmware, and receive critical alerts on your device.</p>
                </div>
              </div>
            </div>

            {/* Fake Dashboard UI */}
            <div className="relative z-10 bg-[#050505] rounded-3xl border border-white/10 p-6 shadow-2xl transform rotate-1 md:hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-sm">System Online</span>
                </div>
                <span className="text-xs text-white/40">Updated just now</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <span className="block text-xs text-white/40 mb-1">Current Charge</span>
                  <span className="text-3xl font-bold text-emerald-400">92%</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <span className="block text-xs text-white/40 mb-1">Output</span>
                  <span className="text-3xl font-bold">2.4<span className="text-sm text-white/40">kW</span></span>
                </div>
              </div>

              <div className="h-32 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-xl border border-emerald-500/20 flex items-end p-4">
                <div className="w-full flex justify-between items-end gap-1 h-full pt-4">
                  {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                    <div key={i} className="w-full bg-emerald-500/50 rounded-t-sm transition-all hover:bg-emerald-400" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Specs Sheet */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-[clamp(1.875rem,5vw,3rem)] font-bold mb-16 text-center">Tech Specs</h2>
          
          <div className="space-y-4">
            {Object.entries(displaySpecifications ?? {}).map(([key, value], idx) => (
              <div key={idx} className="group border-b border-white/10 pb-4">
                <div className="flex justify-between items-center py-4 cursor-pointer">
                  <span className="text-lg text-white/70 group-hover:text-white transition-colors">{key}</span>
                  <span className="text-lg font-medium text-right text-emerald-400/90 max-w-[60%]">{value as React.ReactNode}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Downloads / Manuals */}
          <div className="mt-20 pt-16 border-t border-white/10 flex flex-wrap gap-4 justify-center">
            {product.id === 3 || product.id === 1 ? (
              <>
                <Button
                  onClick={() => setShowDownloadModal(true)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 h-14 px-8 rounded-full"
                >
                  <CloudDownload className="mr-2 h-5 w-5" />
                  Technical Documents
                </Button>
                <Button
                  onClick={() => {
                    setShowDownloadModal(false);
                    setShowCapacitySelection(true);
                  }}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 h-14 px-8 rounded-full"
                >
                  <CloudDownload className="mr-2 h-5 w-5" />
                  User Manual
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* 5. Sticky Buy/Quote Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
              <div className="hidden md:flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl p-2 flex items-center justify-center">
                   {product.image.length > 0 && (
                     <img src={product.image[0]} alt="thumbnail" className="w-full h-full object-contain" />
                   )}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-sm text-white/50">{displayCapacityLabel}</p>
                </div>
              </div>
              
              <div className="flex-1 md:flex-none flex items-center justify-end gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (product) {
                      if (compared) removeFromCompare(product.id);
                      else addToCompare(product);
                    }
                  }}
                  className={`h-12 px-6 rounded-full border transition ${
                    compared
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                      : "bg-transparent border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  <GitCompare className="h-4 w-4 mr-2" />
                  {compared ? "Added to Compare" : "Compare"}
                </Button>

                <Button
                  onClick={handleShare}
                  className="h-12 w-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center hidden sm:flex"
                >
                  <Share2 className="h-4 w-4" />
                </Button>

                <Button
                  onClick={handleExploreMore}
                  className="h-12 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reusing original Modals with updated dark styling */}
      {showDownloadModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setShowDownloadModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl max-w-2xl w-full"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Technical Documents</h3>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition rounded-2xl">
                  <button
                    onClick={() => {
                      const link = product.id === 3
                        ? 'https://drive.google.com/drive/folders/1zbn1PjXWvzrIupGpi6zjYM5cYAkoku24?usp=sharing'
                        : product.id === 1
                        ? 'https://drive.google.com/drive/folders/1xxaDZhqEdoLXhXmQU_8Eyq2RjagVTQ14?usp=sharing'
                        : null;
                      if (link) window.open(link, '_blank');
                      setShowDownloadModal(false);
                    }}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <Download className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Installation Guide</h4>
                        <p className="text-white/50 text-sm">Step-by-step instructions and wiring diagrams</p>
                      </div>
                    </div>
                  </button>
                </Card>
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition rounded-2xl">
                  <button
                    onClick={() => {
                      const link = product.id === 3
                        ? 'https://drive.google.com/drive/folders/1hFXKtCVxs6sPICFNbnmv8EX7YdWQ9vK-?usp=sharing'
                        : product.id === 1
                        ? 'https://drive.google.com/drive/folders/1zajqoydmo37DF_zPrKg1AwNIKpgZemfo?usp=sharing'
                        : null;
                      if (link) window.open(link, '_blank');
                      setShowDownloadModal(false);
                    }}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <Download className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Product Brochure</h4>
                        <p className="text-white/50 text-sm">Essential setup and operation instructions</p>
                      </div>
                    </div>
                  </button>
                </Card>
            </div>
          </motion.div>
        </div>
      )}

      {showCapacitySelection && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setShowCapacitySelection(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl max-w-md w-full"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Select Configuration</h3>
              <button
                onClick={() => setShowCapacitySelection(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition rounded-2xl">
                <button
                  onClick={() => {
                    const link = product.id === 1
                      ? 'https://drive.google.com/drive/folders/1sAUwvNpwMtZ_oHYN98tvfHQ20NFAseqW?usp=sharing'
                      : 'https://drive.google.com/drive/folders/1LKdtj2bgnLqLTQRbNG-t7suh6A3DKZN9?usp=sharing';
                    window.open(link, '_blank');
                    setShowCapacitySelection(false);
                  }}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <Download className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{product.id === 1 ? '7.5kWh Manual' : '5 kWh Manual'}</h4>
                    </div>
                  </div>
                </button>
              </Card>
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition rounded-2xl">
                <button
                  onClick={() => {
                    const link = product.id === 1
                      ? 'https://drive.google.com/drive/folders/1lQoxj3om4vxL1jVmJa_uhnYDN7aUNfKC?usp=sharing'
                      : 'https://drive.google.com/drive/folders/1eVPxrfmW5ya0-GicQE5hCmOBYYGkcOTo?usp=sharing';
                    window.open(link, '_blank');
                    setShowCapacitySelection(false);
                  }}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <Download className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{product.id === 1 ? '75kWh Manual' : '25 kWh Manual'}</h4>
                    </div>
                  </div>
                </button>
              </Card>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
