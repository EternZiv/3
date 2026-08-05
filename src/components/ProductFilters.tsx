import { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductFiltersProps {
  filters: {
    category: string;
    capacity: string;
    sortBy: string;
    search?: string;
  };
  setFilters: (filters: any) => void;
}

export function ProductFilters({ filters, setFilters }: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    capacity: true,
    application: true,
    technology: true,
    availability: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const FilterSection = ({ title, id, children }: { title: string, id: string, children: React.ReactNode }) => (
    <div className="mb-2">
      <button 
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between py-3 px-4 bg-gray-50/50 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <span className="font-bold text-gray-900 text-sm tracking-tight">{title}</span>
        {openSections[id] ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      <AnimatePresence>
        {openSections[id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <Card className="flex flex-col h-full bg-white border-gray-200/60 shadow-lg lg:sticky lg:top-24 rounded-2xl overflow-hidden">
      
      {/* Advanced Search */}
      <div className="p-6 bg-gray-50/50 border-b border-gray-100">
        <h2 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight hidden lg:block">Discover</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, capacity..."
            value={filters.search || ""}
            onChange={updateSearch}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        {/* Category Accordion */}
        <FilterSection title="Category" id="category">
          <RadioGroup value={filters.category} onValueChange={(val) => updateFilter("category", val)} className="space-y-3">
            {[
              { id: "all", label: "All Products" },
              { id: "residential", label: "Residential Storage" },
              { id: "commercial", label: "Commercial Storage" },
              { id: "industrial", label: "Industrial Storage" },
              { id: "portable", label: "Portable Power Stations" },
              { id: "monitoring", label: "Smart Monitoring" }
            ].map(item => (
              <div key={item.id} className="flex items-center space-x-3 group">
                <RadioGroupItem value={item.id} id={`cat-${item.id}`} className="text-emerald-600" />
                <Label htmlFor={`cat-${item.id}`} className="text-sm font-medium text-gray-600 group-hover:text-gray-900 cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>

        {/* Capacity Accordion */}
        <FilterSection title="Capacity" id="capacity">
          <RadioGroup value={filters.capacity} onValueChange={(val) => updateFilter("capacity", val)} className="space-y-3">
            {[
              { id: "all", label: "All Capacities" },
              { id: "portable", label: "Portable (1 kWh)" },
              { id: "small", label: "Low Voltage (5 - 25 kWh)" },
              { id: "medium", label: "Medium HV (30 - 67.5 kWh)" },
              { id: "large", label: "Industrial HV (96 - 240 kWh)" }
            ].map(item => (
              <div key={item.id} className="flex items-center space-x-3 group">
                <RadioGroupItem value={item.id} id={`cap-${item.id}`} className="text-emerald-600" />
                <Label htmlFor={`cap-${item.id}`} className="text-sm font-medium text-gray-600 group-hover:text-gray-900 cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>

        {/* Application Accordion */}
        <FilterSection title="Application" id="application">
          <div className="space-y-3">
            {[
              { id: "solar", label: "Solar Integration" },
              { id: "backup", label: "Emergency Backup" },
              { id: "ev", label: "EV Charging" },
              { id: "grid", label: "Grid Services" },
              { id: "mfg", label: "Manufacturing" }
            ].map(item => (
              <div key={item.id} className="flex items-center space-x-3 group">
                <input type="checkbox" id={`app-${item.id}`} className="text-emerald-600 rounded w-4 h-4 border-gray-300 focus:ring-emerald-500" />
                <Label htmlFor={`app-${item.id}`} className="text-sm font-medium text-gray-600 group-hover:text-gray-900 cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Technology Accordion */}
        <FilterSection title="Technology" id="technology">
          <div className="space-y-3">
            {[
              { id: "lifepo4", label: "LiFePO4 Chemistry" },
              { id: "ai", label: "AI BMS System" },
              { id: "modular", label: "Modular Design" },
              { id: "smart", label: "Smart Monitoring" }
            ].map(item => (
              <div key={item.id} className="flex items-center space-x-3 group">
                <input type="checkbox" id={`tech-${item.id}`} className="text-emerald-600 rounded w-4 h-4 border-gray-300 focus:ring-emerald-500" />
                <Label htmlFor={`tech-${item.id}`} className="text-sm font-medium text-gray-600 group-hover:text-gray-900 cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Availability Accordion */}
        <FilterSection title="Availability" id="availability">
          <div className="space-y-3">
            {[
              { id: "instock", label: "In Stock" },
              { id: "new", label: "New Arrivals" },
              { id: "featured", label: "Featured" }
            ].map(item => (
              <div key={item.id} className="flex items-center space-x-3 group">
                <input type="checkbox" id={`avail-${item.id}`} className="text-emerald-600 rounded w-4 h-4 border-gray-300 focus:ring-emerald-500" />
                <Label htmlFor={`avail-${item.id}`} className="text-sm font-medium text-gray-600 group-hover:text-gray-900 cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </div>
        </FilterSection>

      </div>
    </Card>
  );
}