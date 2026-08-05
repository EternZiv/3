import { useMemo, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "../data/products";
import { supabase } from "../lib/supabase";
import type { Product } from "../lib/types";
import { Loader2, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface ProductGridProps {
  filters: {
    category: string;
    capacity: string;
    sortBy: string;
    search?: string;
  };
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadDbProducts() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped: Product[] = data.map((db: any) => ({
            id: db.product_id,
            name: db.name,
            model: db.model,
            category: db.category,
            image: db.image_data ? [db.image_data] : (db.image_url ? [db.image_url] : []),
            capacity: Number(db.capacity),
            capacityLabel: db.capacity_label,
            power: db.power,
            voltage: db.voltage,
            warranty: db.warranty,
            badge: db.badge,
            features: db.features || [],
            animationInterval: 5000,
            description: db.description,
            specifications: db.specifications,
            keyFeatures: db.detailed_key_features,
            applications: db.applications,
            what_included: db.what_included,
            warranty_support: db.warranty_support,
          }));
          setDbProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to load products from database:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDbProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const activeProducts = dbProducts.length > 0 ? dbProducts : products;
    let result = [...activeProducts];

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.capacity !== "all") {
      result = result.filter((p) => {
        if (filters.capacity === "portable") return p.capacity <= 1;
        if (filters.capacity === "small") return p.capacity > 1 && p.capacity <= 25;
        if (filters.capacity === "medium") return p.capacity > 25 && p.capacity <= 70;
        if (filters.capacity === "large") return p.capacity > 70 && p.capacity <= 500;
        if (filters.capacity === "utility") return p.capacity > 500;
        return true;
      });
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.model.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query) ||
          p.features.some(f => f.toLowerCase().includes(query))
      );
    }

    // Advanced Sorting
    if (filters.sortBy === "capacity") {
      result.sort((a, b) => b.capacity - a.capacity);
    } else if (filters.sortBy === "newest") {
      // Stub: in reality would use created_at, just reversing for now
      result.reverse();
    } else if (filters.sortBy === "popular") {
      // Stub: just keeping default sort order
    }

    return result;
  }, [filters, dbProducts]);

  if (isLoading && dbProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600 mb-4" />
        <span className="text-gray-500 font-bold tracking-widest uppercase text-xs">Loading Catalog...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm">
        <p className="text-gray-600 font-medium text-sm">
          Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "product" : "products"}
        </p>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500 hidden sm:block">Sort By:</span>
          <select 
            className="text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            value={filters.sortBy}
            onChange={() => {}}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="capacity">Capacity (High to Low)</option>
            <option value="popular">Most Popular</option>
            <option value="rated">Best Rated</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-200/60 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-900 font-extrabold text-2xl mb-2">No products found</p>
          <p className="text-gray-500 font-medium max-w-sm mx-auto">We couldn't find anything matching your current filters. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Consultation Banner below all products */}
          <div className="bg-gradient-to-r from-gray-900 to-[#08080a] text-white p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay" />
            <div className="relative z-10 max-w-xl mb-6 md:mb-0">
              <span className="text-emerald-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Not Sure?</span>
              <h3 className="text-2xl font-extrabold mb-2">Need Help Choosing the Right System?</h3>
              <p className="text-gray-400 font-medium text-sm md:text-base">Talk to an energy expert about your capacity requirements and future scalability needs.</p>
            </div>
            <div className="relative z-10 flex gap-4 w-full md:w-auto">
              <Link to="/contact">
                <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 px-8 rounded-xl transition-all hover:scale-105">
                  <Phone className="w-4 h-4 mr-2" /> Talk to TEAM
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
