import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";
import { GitCompare, X, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CompareBar() {
  const { comparedProducts, removeFromCompare, clearCompare } = useCompare();

  if (comparedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-[95vw] md:max-w-2xl bg-white/95 border border-gray-200/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-md p-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Selected Products Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mr-2 shrink-0">
            <GitCompare className="h-4 w-4 text-emerald-600 animate-pulse" />
            <span>Compare ({comparedProducts.length}/3)</span>
          </div>
          <div className="flex gap-2">
            {comparedProducts.map((product) => {
              const imgUrl = Array.isArray(product.image) ? product.image[0] : product.image;
              return (
                <div key={product.id} className="relative group flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 pr-6 max-w-[120px] md:max-w-[150px] shrink-0">
                  <div className="w-8 h-8 rounded bg-white overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={imgUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-gray-700 ml-1.5 truncate">
                    {product.name}
                  </span>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded p-0.5"
                    aria-label={`Remove ${product.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
          <button
            onClick={clearCompare}
            className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-red-500 hover:bg-gray-50 px-2 py-1.5 rounded-lg transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
          
          <Link to="/compare" className="flex-1 sm:flex-initial">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 w-full"
              disabled={comparedProducts.length < 2}
            >
              Compare {comparedProducts.length < 2 ? "(Select 2+)" : "Now"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
