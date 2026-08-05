import { Zap, Shield, ArrowRight, GitCompare, Cpu, Leaf, Battery, Download } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import type { Product } from "../lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isCompared, addToCompare, removeFromCompare } = useCompare();
  const compared = isCompared(product.id);
  const imageUrl = Array.isArray(product.image) ? (product.image[1] || product.image[0]) : product.image;

  // Premium specs chips logic
  const getChips = () => {
    const chips = [
      { icon: Battery, label: product.capacityLabel, tooltip: "Total capacity" },
      { icon: Cpu, label: "AI BMS", tooltip: "Smart Battery Management" },
      { icon: Shield, label: product.warranty, tooltip: "Warranty coverage" },
    ];
    if (product.category === "residential") {
      chips.push({ icon: Leaf, label: "LiFePO4", tooltip: "Safe chemistry" });
    } else {
      chips.push({ icon: Zap, label: "High Vol", tooltip: "High voltage system" });
    }
    return chips.slice(0, 4);
  };

  return (
    <Card className="relative overflow-hidden group bg-white border-gray-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl flex flex-col h-full">
      
      {/* Top Image Section */}
      <div className="relative h-48 sm:h-56 xl:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors duration-500 z-10" />
        
        <ImageWithFallback
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-2xl transition-all duration-700 ease-out z-0 relative"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.badge && (
            <Badge className="bg-emerald-600 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 border-0 shadow-lg shadow-emerald-600/30">
              {product.badge}
            </Badge>
          )}
          <Badge className="bg-white/90 text-gray-800 text-[10px] uppercase tracking-widest px-2.5 py-1 backdrop-blur-md border border-white/40 shadow-sm">
            {product.category}
          </Badge>
        </div>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center gap-3">
          <Link to={`/products/${product.id}`}>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white w-36 sm:w-40 rounded-xl font-bold shadow-lg shadow-emerald-900/20 text-sm py-2 sm:py-2.5">
              View Details
            </Button>
          </Link>
          <Button variant="secondary" className="bg-white hover:bg-gray-50 text-gray-900 w-36 sm:w-40 rounded-xl font-bold text-sm py-2 sm:py-2.5">
            Request Quote
          </Button>
          <button className="text-white text-xs font-medium flex items-center gap-1 hover:text-emerald-300 transition-colors mt-2">
            <Download className="w-3 h-3" /> Download Datasheet
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="group/link block mb-4">
          <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-1 group-hover/link:text-emerald-600 transition-colors tracking-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium line-clamp-1">{product.model}</p>
        </Link>

        {/* Premium Specification Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {getChips().map((chip, idx) => (
            <div key={idx} className="group/chip relative flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-100 rounded-lg hover:bg-emerald-50 hover:border-emerald-100 transition-colors cursor-help">
              <chip.icon className="w-3.5 h-3.5 text-gray-400 group-hover/chip:text-emerald-600 transition-colors" />
              <span className="text-xs font-semibold text-gray-700 group-hover/chip:text-emerald-700">{chip.label}</span>
              
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/chip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {chip.tooltip}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (compared) {
                  removeFromCompare(product.id);
                } else {
                  addToCompare(product);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm ${
                compared
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              <GitCompare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{compared ? "Compared" : "Compare"}</span>
            </Button>

            <Link to={`/products/${product.id}`} className="flex-1">
              <Button className="w-full bg-gray-900 hover:bg-black text-white py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300 text-xs sm:text-sm">
                Details <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
