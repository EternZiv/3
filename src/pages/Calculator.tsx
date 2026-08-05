import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Lightbulb,
  Tv,
  Laptop,
  Wind,
  Refrigerator,
  Calculator,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  icon: any;
  description: string;
}

const APPLIANCES: Appliance[] = [
  {
    id: "led_light",
    name: "LED Light Bulb",
    wattage: 15,
    icon: Lightbulb,
    description: "Standard energy saving LED light",
  },
  {
    id: "ceiling_fan",
    name: "Ceiling Fan",
    wattage: 80,
    icon: Wind,
    description: "Standard household ceiling fan",
  },
  {
    id: "led_tv",
    name: "LED TV",
    wattage: 100,
    icon: Tv,
    description: "32 to 55 inch LED TV screen",
  },
  {
    id: "laptop",
    name: "Laptop / Computer",
    wattage: 80,
    icon: Laptop,
    description: "Standard office laptop or PC monitor",
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    wattage: 250,
    icon: Refrigerator,
    description: "Compressor load (average cooling power)",
  },
  {
    id: "inverter_ac",
    name: "Inverter AC (1.5 Ton)",
    wattage: 1200,
    icon: Wind,
    description: "1.5 Ton Inverter AC at optimal temperature",
  },
  {
    id: "water_pump",
    name: "Water Pump (1 HP)",
    wattage: 750,
    icon: Flame,
    description: "Standard residential suction motor pump",
  },
];

export default function CalculatorPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    led_light: 4,
    ceiling_fan: 3,
    led_tv: 1,
    laptop: 1,
    refrigerator: 1,
    inverter_ac: 0,
    water_pump: 0,
  });
  const [backupHours, setBackupHours] = useState<number>(4);

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const handleReset = () => {
    setQuantities({
      led_light: 0,
      ceiling_fan: 0,
      led_tv: 0,
      laptop: 0,
      refrigerator: 0,
      inverter_ac: 0,
      water_pump: 0,
    });
    setBackupHours(4);
  };

  const activeLoad = useMemo(() => {
    return APPLIANCES.reduce((total, app) => {
      return total + app.wattage * (quantities[app.id] || 0);
    }, 0);
  }, [quantities]);

  const energyNeeded = useMemo(() => {
    return activeLoad * backupHours;
  }, [activeLoad, backupHours]);

  const recommendation = useMemo(() => {
    if (activeLoad === 0) return null;

    if (activeLoad <= 500 && energyNeeded <= 1000) {
      return {
        id: 11,
        name: "Power2Go PULSE 320 Portable Power Station",
        unitsText: "1 Unit",
        capacityLabel: "1.0 kWh",
        powerLabel: "500W Continuous",
        tagline: "Ultra-portable 1000 Wh LiFePO4 backup station perfect for light appliances and digital devices.",
        image: "figma:asset/ea529c31d35fcbf1a139a1bce88295e077160b2b.png",
      };
    }

    const lvUnitsByPower = Math.ceil(activeLoad / 2500);
    const lvUnitsByCapacity = Math.ceil(energyNeeded / 5000);
    const lvUnits = Math.max(lvUnitsByPower, lvUnitsByCapacity);

    if (lvUnits <= 5) {
      return {
        id: 4,
        name: "Power2Go LV Energy Vault 25 System",
        unitsText: `${lvUnits} Module${lvUnits > 1 ? "s" : ""}`,
        capacityLabel: `${lvUnits * 5.12} kWh`,
        powerLabel: `${lvUnits * 5} kW`,
        tagline: `Modular residential energy storage configuration to cover your home's total backup load of ${activeLoad}W.`,
        image: "figma:asset/d302be08e4e938ad503ae31569661716ec3fc738.png",
      };
    }

    const hvUnitsByPower = Math.ceil(activeLoad / 7500);
    const hvUnitsByCapacity = Math.ceil(energyNeeded / 7500);
    const hvUnits = Math.min(8, Math.max(hvUnitsByPower, hvUnitsByCapacity));

    return {
      id: 7,
      name: "Power2Go HV Energy Vault 60 System",
      unitsText: `${hvUnits} Module${hvUnits > 1 ? "s" : ""}`,
      capacityLabel: `${hvUnits * 7.5} kWh`,
      powerLabel: `${hvUnits * 7.5} kW`,
      tagline: `High-voltage commercial energy storage stack ideal for heavy commercial and high-capacity backup.`,
      image: "figma:asset/b513ab30d1b02dbe05d9d52d7e3e8a9aae208341.png",
    };
  }, [activeLoad, energyNeeded]);

  const annualSavings = useMemo(() => {
    if (activeLoad === 0) return 0;
    const dailyOffsetKwh = Math.min(15, energyNeeded / 1000);
    return Math.round(dailyOffsetKwh * 300 * 60);
  }, [activeLoad, energyNeeded]);

  const contactLink = useMemo(() => {
    const applianceSummary = APPLIANCES.filter((a) => quantities[a.id] > 0)
      .map((a) => `${a.name} x${quantities[a.id]}`)
      .join(", ");
    const text = `Hi, I used the sizing calculator. Total active load: ${activeLoad}W. Desired backup: ${backupHours} hours. Recommended system: ${recommendation?.name} (${recommendation?.unitsText}). Selected items: ${applianceSummary}. Please send me a custom quote.`;
    return `/contact?message=${encodeURIComponent(text)}`;
  }, [quantities, activeLoad, backupHours, recommendation]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold mb-3">
            <Calculator className="h-4 w-4" />
            Smart Sizer & Savings Estimator
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Calculate Your Energy Storage Requirements
          </h1>
          <p className="text-gray-500 mt-2 text-base md:text-lg">
            Add your regular home appliances to calculate your total active load and match the ideal Power2Go battery storage setup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900">1. Select Appliances</h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset all
                </button>
              </div>

              <div className="space-y-4">
                {APPLIANCES.map((app) => {
                  const qty = quantities[app.id] || 0;
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3.5 border border-gray-100 rounded-xl hover:border-gray-200 transition bg-white"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                          <app.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm md:text-base leading-tight">
                            {app.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px] md:max-w-md">
                            {app.description} ({app.wattage}W)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(app.id, -1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition active:scale-90 select-none cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-gray-900 text-sm md:text-base">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(app.id, 1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition active:scale-90 select-none cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900">2. Select Backup Hours</h2>
                <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  <Clock className="h-4 w-4" />
                  <span>{backupHours} Hours Backup</span>
                </div>
              </div>

              <div className="space-y-4 py-4">
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={backupHours}
                  onChange={(e) => setBackupHours(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-xs font-semibold text-gray-400 px-1">
                  <span>1 Hour</span>
                  <span>4 Hrs</span>
                  <span>8 Hrs</span>
                  <span>12 Hours</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 sticky top-24">
            {activeLoad === 0 ? (
              <Card className="p-8 text-center border-dashed border-2 border-gray-300 bg-white rounded-2xl">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">No Active Load</h3>
                <p className="text-xs text-gray-400">
                  Select at least one appliance above to see real-time power metrics and battery recommendations.
                </p>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="p-6 md:p-8 bg-slate-900 text-white border-0 rounded-2xl shadow-xl">
                  <h3 className="text-base font-semibold text-slate-400 tracking-wider uppercase mb-6">
                    Sizing Summary
                  </h3>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-xs font-medium text-slate-400">Total Active Load</p>
                      <p className="text-2xl md:text-3xl font-extrabold text-white mt-1 flex items-baseline gap-1">
                        {activeLoad >= 1000 ? (activeLoad / 1000).toFixed(2) : activeLoad}
                        <span className="text-sm text-slate-400 font-medium">{activeLoad >= 1000 ? "kW" : "W"}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Backup Storage Energy</p>
                      <p className="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1 flex items-baseline gap-1">
                        {(energyNeeded / 1000).toFixed(2)}
                        <span className="text-sm text-slate-400 font-medium">kWh</span>
                      </p>
                    </div>
                  </div>

                  {recommendation && (
                    <div className="border-t border-slate-800 pt-6">
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                        💡 Recommended System
                      </p>
                      
                      <div className="flex gap-4 items-start mb-6">
                        <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                          <img
                            src={recommendation.image}
                            alt={recommendation.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-base md:text-lg">
                            {recommendation.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Required capacity: <span className="font-bold text-white">{recommendation.unitsText} ({recommendation.capacityLabel})</span>
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Combined Output: <span className="font-bold text-white">{recommendation.powerLabel}</span>
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 rounded-xl p-3 border border-slate-800 mb-6">
                        {recommendation.tagline}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <Link to={`/products/${recommendation.id}`} className="w-full">
                          <Button variant="outline" className="w-full h-11 text-xs border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white cursor-pointer">
                            View Details
                          </Button>
                        </Link>
                        <Link to={contactLink} className="w-full">
                          <Button className="w-full h-11 text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center cursor-pointer font-bold">
                            <span>Get Sizing Quote</span>
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </Card>

                {annualSavings > 0 && (
                  <Card className="p-6 md:p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-xl text-green-700 shrink-0">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-green-900 text-base">
                          Estimated Annual Savings
                        </h4>
                        <p className="text-2xl font-extrabold text-green-700 mt-1">
                          PKR {annualSavings.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600 mt-1 leading-relaxed">
                          Based on peak load shedding shifting and offsetting grid consumption at PKR 60/unit.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
