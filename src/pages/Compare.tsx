import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, GitCompare, Zap, Shield, TrendingUp, Battery, MessageSquare, Check, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export default function Compare() {
  const { comparedProducts, removeFromCompare, clearCompare } = useCompare();
  const [highlightDiff, setHighlightDiff] = useState(false);

  const checkDifference = (valExtractor: (p: any) => any) => {
    if (comparedProducts.length < 2) return false;
    const firstVal = JSON.stringify(valExtractor(comparedProducts[0]));
    return comparedProducts.some(p => JSON.stringify(valExtractor(p)) !== firstVal);
  };

  const specRows = [
    {
      label: "Category",
      icon: GitCompare,
      extract: (p: any) => p.category.charAt(0).toUpperCase() + p.category.slice(1),
    },
    {
      label: "Capacity",
      icon: Zap,
      extract: (p: any) => p.capacityLabel,
    },
    {
      label: "Max Power Output",
      icon: TrendingUp,
      extract: (p: any) => p.power.includes('kW') ? p.power : `${p.power}W`,
    },
    {
      label: "Nominal Voltage",
      icon: Battery,
      extract: (p: any) => p.voltage || "N/A",
    },
    {
      label: "Warranty Period",
      icon: Shield,
      extract: (p: any) => p.warranty,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/products" className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 mb-2">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to Products Catalog
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2.5">
              <GitCompare className="h-8 w-8 text-emerald-600" />
              Compare Energy Storage Systems
            </h1>
          </div>
          
          {comparedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              {comparedProducts.length >= 2 && (
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm cursor-pointer hover:bg-gray-50 select-none">
                  <input
                    type="checkbox"
                    checked={highlightDiff}
                    onChange={(e) => setHighlightDiff(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
                  />
                  Highlight differences
                </label>
              )}
              
              <Button
                variant="outline"
                onClick={clearCompare}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center gap-1.5 px-4 py-2.5 rounded-xl cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Clear Comparison
              </Button>
            </div>
          )}
        </div>

        {comparedProducts.length === 0 ? (
          /* Empty State */
          <Card className="p-16 text-center border-dashed border-2 border-gray-300 bg-white rounded-2xl">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <GitCompare className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products selected to compare</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Explore our battery products and toggle "Compare" on the models you are interested in to analyze their technical specs side-by-side.
            </p>
            <Link to="/products">
              <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-base font-bold">
                Go to Products
              </Button>
            </Link>
          </Card>
        ) : (
          /* Comparison Grid */
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left table-fixed min-w-[700px] md:min-w-none">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    {/* Header Columns */}
                    <th className="p-6 text-sm font-semibold text-gray-500 w-1/4">
                      Technical Specifications
                    </th>
                    {comparedProducts.map((product) => {
                      const imgUrl = Array.isArray(product.image) ? product.image[0] : product.image;
                      return (
                        <th key={product.id} className="p-6 relative group w-1/4 border-l border-gray-200">
                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute top-4 right-4 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 p-1.5 rounded-full transition"
                            title="Remove from comparison"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          
                          {/* Product Card Image & Info */}
                          <div className="flex flex-col items-center text-center mt-4">
                            <div className="w-28 h-28 bg-white border border-gray-100 rounded-xl overflow-hidden mb-4 shadow-sm">
                              <ImageWithFallback
                                src={imgUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm hover:text-emerald-600 transition">
                              <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{product.model}</p>
                          </div>
                        </th>
                      );
                    })}
                    {/* Filler columns if under 3 */}
                    {comparedProducts.length < 3 && 
                      Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                        <th key={idx} className="p-6 border-l border-gray-200 bg-gray-50/20 w-1/4">
                          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                            <GitCompare className="h-6 w-6 text-gray-300 mb-2" />
                            <p className="text-xs font-medium text-gray-400">Add another product</p>
                            <Link to="/products" className="text-[10px] font-bold text-emerald-600 hover:underline mt-2">
                              Browse Products
                            </Link>
                          </div>
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {/* Dynamic Spec Rows */}
                  {specRows.map((row, idx) => {
                    const isDiff = highlightDiff && checkDifference(row.extract);
                    return (
                      <tr key={idx} className={`border-b border-gray-200 transition ${isDiff ? "bg-amber-50/50" : ""}`}>
                        <td className="p-6 text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <row.icon className={`h-4 w-4 ${isDiff ? "text-amber-500" : "text-gray-400"}`} />
                          <span>{row.label}</span>
                        </td>
                        {comparedProducts.map((product) => (
                          <td key={product.id} className="p-6 text-sm text-gray-900 font-medium border-l border-gray-200">
                            {row.extract(product)}
                          </td>
                        ))}
                        {/* Filler cells */}
                        {comparedProducts.length < 3 && 
                          Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                            <td key={idx} className="p-6 border-l border-gray-200 bg-gray-50/10" />
                          ))
                        }
                      </tr>
                    );
                  })}
                  
                  {/* Key Features Row */}
                  <tr className={`border-b border-gray-200 ${highlightDiff && checkDifference(p => p.features) ? "bg-amber-50/50" : ""}`}>
                    <td className="p-6 text-sm font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-gray-400" />
                        <span>Key Features</span>
                      </div>
                    </td>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-6 text-xs text-gray-600 border-l border-gray-200">
                        <ul className="space-y-1.5 list-disc list-inside">
                          {product.features.map((feature: string, fIdx: number) => (
                            <li key={fIdx}>{feature}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {comparedProducts.length < 3 && 
                      Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                        <td key={idx} className="p-6 border-l border-gray-200 bg-gray-50/10" />
                      ))
                    }
                  </tr>

                  {/* Applications Row */}
                  <tr className={`border-b border-gray-200 ${highlightDiff && checkDifference(p => p.applications) ? "bg-amber-50/50" : ""}`}>
                    <td className="p-6 text-sm font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        <span>Best Applications</span>
                      </div>
                    </td>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-6 text-xs text-gray-600 border-l border-gray-200">
                        {product.applications && product.applications.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {product.applications.map((app: string, appIdx: number) => (
                              <span key={appIdx} className="px-2 py-1 bg-gray-100 border border-gray-200 text-gray-700 rounded-md text-[10px] font-semibold">
                                {app}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    ))}
                    {comparedProducts.length < 3 && 
                      Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                        <td key={idx} className="p-6 border-l border-gray-200 bg-gray-50/10" />
                      ))
                    }
                  </tr>

                  {/* Action Row */}
                  <tr>
                    <td className="p-6 text-sm font-semibold text-gray-700" />
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-6 border-l border-gray-200">
                        <Link to="/contact">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs py-2 shadow-sm font-bold">
                            Enquire About This
                          </Button>
                        </Link>
                      </td>
                    ))}
                    {comparedProducts.length < 3 && 
                      Array.from({ length: 3 - comparedProducts.length }).map((_, idx) => (
                        <td key={idx} className="p-6 border-l border-gray-200 bg-gray-50/10" />
                      ))
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
