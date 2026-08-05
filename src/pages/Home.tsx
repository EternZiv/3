import { Hero } from "../components/Hero";
import { AllProducts } from "../components/AllProducts";
import { ProductHotspots } from "../components/ProductHotspots";
import { Features } from "../components/Features";
import { CaseStudies } from "../components/CaseStudies";
import { TrustSection } from "../components/TrustSection";
import { EmotionalCTA } from "../components/EmotionalCTA";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="bg-white overflow-hidden relative w-full max-w-[100vw]">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      </motion.div>

      {/* Premium Scroll-driven Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <AllProducts />
      </motion.div>

      {/* Interactive Anatomy / Exploded Engineering Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProductHotspots />
      </motion.div>

      {/* Why Choose Us (Technical Highlights Grid) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Features />
      </motion.div>

      {/* Customer Success Stories Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <CaseStudies />
      </motion.div>

      {/* Trust & Operations Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <TrustSection />
      </motion.div>

      {/* Final Emotional CTA Parallax Sunset */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <EmotionalCTA />
      </motion.div>

    </div>
  );
}