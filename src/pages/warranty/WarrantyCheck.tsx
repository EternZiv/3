import { Search, Hash, Shield, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { lookupWarrantyBySerial } from "../../admin/adminApi";
import type { WarrantyRegistration } from "../../lib/types";

const statusConfig: Record<string, { label: string; bg: string; text: string; icon: typeof Clock }> = {
  pending: { label: "Pending Review", bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
  approved: { label: "Active", bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700", icon: XCircle },
};

export default function WarrantyCheck() {
  const [serialNumber, setSerialNumber] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [warrantyData, setWarrantyData] = useState<WarrantyRegistration | null>(null);
  const [searched, setSearched] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;
    setIsChecking(true);
    setWarrantyData(null);
    setSearched(true);

    try {
      const result = await lookupWarrantyBySerial(serialNumber.trim());
      if (result) {
        setWarrantyData(result);
        toast.success("Warranty found!");
      } else {
        toast.error("No warranty found for this serial number.");
      }
    } catch (error) {
      toast.error("Failed to check warranty. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  function getStatusBadge(status: string) {
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-4 w-4" />
        {config.label}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-12 h-12 md:w-16 md:h-16" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Check Warranty Status</h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Enter your product serial number to check warranty registration status and coverage details.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Serial Number Lookup</h2>
            <p className="text-gray-600 mb-6">
              Find the serial number on your product label or warranty card.
            </p>

            <form onSubmit={handleCheck} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-lg"
                    placeholder="e.g. P2G-LV-2026-001234"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isChecking}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg disabled:opacity-50"
                >
                  {isChecking ? "Checking..." : "Check Status"}
                </Button>
              </div>
            </form>

            {/* Result */}
            {searched && !warrantyData && !isChecking && (
              <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-800 mb-1">No Warranty Found</h3>
                    <p className="text-amber-700">
                      No warranty registration was found for serial number <strong>{serialNumber}</strong>.
                       Please check the number or <Link to="/warranty-registration" className="underline font-medium">register your warranty</Link>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {warrantyData && (
              <div className="mt-8 space-y-6">
                {/* Status Banner */}
                <div className={`p-6 rounded-lg border ${
                  warrantyData.warranty_status === "approved"
                    ? "bg-green-50 border-green-200"
                    : warrantyData.warranty_status === "rejected"
                    ? "bg-red-50 border-red-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-6 w-6" />
                    {getStatusBadge(warrantyData.warranty_status)}
                  </div>
                  <p className="text-sm text-gray-700">
                    {warrantyData.warranty_status === "approved"
                      ? "Your warranty is active and covers manufacturing defects for 5 years from the date of purchase."
                      : warrantyData.warranty_status === "rejected"
                      ? "This warranty registration has been rejected. Please contact support for more information."
                      : "Your warranty registration is pending review. This typically takes 1-2 business days."}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Customer Name", value: warrantyData.full_name },
                      { label: "Email", value: warrantyData.email },
                      { label: "Phone", value: warrantyData.phone },
                      { label: "City", value: warrantyData.city },
                      { label: "Address", value: warrantyData.address },
                      { label: "Product Model", value: warrantyData.product_model },
                      { label: "Serial Number", value: warrantyData.serial_number },
                      { label: "Purchase Date", value: warrantyData.purchase_date || "—" },
                      { label: "Dealer", value: warrantyData.dealer_name || "—" },
                      { label: "Dealer Location", value: warrantyData.dealer_location || "—" },
                      { label: "Registration Date", value: new Date(warrantyData.created_at).toLocaleDateString() },
                    ].map((field) => (
                      <div key={field.label}>
                        <span className="text-xs font-medium text-gray-500 uppercase">{field.label}</span>
                        <p className="text-sm text-gray-900 mt-0.5">{field.value || "—"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Links */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <Link to="/warranty-registration" className="block p-6 bg-emerald-50 border border-emerald-200 rounded-lg hover:shadow-md transition">
              <Shield className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Register Warranty</h3>
              <p className="text-sm text-gray-600">Register a new product warranty</p>
            </Link>
            <Link to="/claims" className="block p-6 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md transition">
              <AlertCircle className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">File a Claim</h3>
              <p className="text-sm text-gray-600">Submit a warranty claim for issues</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
