import { ClipboardCheck, User, Mail, Phone, Hash, Calendar, MapPin, Package, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { createWarrantyRegistration, lookupWarrantyBySerial } from "../../admin/adminApi";

export default function WarrantyRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    productModel: "",
    serialNumber: "",
    purchaseDate: "",
    dealerName: "Orient Power Pvt Ltd",
    dealerLocation: "10 Ali Block Garden Town Lahore"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkSerialNumber, setCheckSerialNumber] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [warrantyData, setWarrantyData] = useState<any | null>(null);

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

  const handleCheckWarranty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkSerialNumber.trim()) return;
    setIsChecking(true);
    setWarrantyData(null);

    try {
      // Step 1: Check Supabase database first (fast local query)
      const dbResult = await lookupWarrantyBySerial(checkSerialNumber.trim());
      if (dbResult) {
        setWarrantyData({
          ...dbResult,
          fullName: dbResult.full_name,
          productModel: dbResult.product_model,
          serialNumber: dbResult.serial_number,
          purchaseDate: dbResult.purchase_date,
          dealerName: dbResult.dealer_name,
          dealerLocation: dbResult.dealer_location,
          timestamp: dbResult.created_at,
        } as any);
        toast.success("Warranty found!");
        setIsChecking(false);
        return;
      }

      // Step 2: Fallback to legacy Google Script query if not found in database
      const url = `${GOOGLE_SCRIPT_URL}?action=check&serialNumber=${encodeURIComponent(checkSerialNumber.trim())}`;

      const response = await fetch(url);
      const responseText = await response.text();

      // Check if response is actually JSON
      if (responseText === "Success" || responseText.startsWith("Error:")) {
        toast.error("Server error - script returned: " + responseText);
        return;
      }

      const data = JSON.parse(responseText);

      if (data.found) {
        setWarrantyData(data.warranty);
        toast.success("Warranty found in sheet registry!");
      } else {
        toast.error("No warranty found for this serial number.");
      }
    } catch (error: any) {
      console.error("Warranty check error:", error);
      toast.error("Failed to check warranty.", {
        description: error?.message || "Please try again.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const timestamp = new Date().toISOString();

      // Build URL with query parameters
      const params = new URLSearchParams({
        timestamp: timestamp,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        productModel: formData.productModel,
        serialNumber: formData.serialNumber,
        purchaseDate: formData.purchaseDate,
        dealerName: formData.dealerName,
        dealerLocation: formData.dealerLocation
      });

      const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
      let googleSheetsSynced = false;

      try {
        // Check for duplicate by making a fetch request
        const response = await fetch(url);
        const result = await response.text();

        if (result === "DUPLICATE_SERIAL") {
          toast.error("This serial number is already registered! Each serial number can only be registered once.");
          setIsSubmitting(false);
          return;
        }

        if (result.startsWith("Error:")) {
          console.warn("Google Sheets registry script returned an error:", result);
        } else {
          googleSheetsSynced = true;
        }
      } catch (scriptErr) {
        console.warn("Google Sheets registry sync failed (likely CORS or ad-blocker blocking Google Apps Script):", scriptErr);
      }

      // Sync submission to Supabase warranty_registrations table for admin visibility
      await createWarrantyRegistration({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        product_model: formData.productModel,
        serial_number: formData.serialNumber,
        purchase_date: formData.purchaseDate,
        dealer_name: formData.dealerName,
        dealer_location: formData.dealerLocation,
      });

      if (googleSheetsSynced) {
        toast.success("Warranty registered successfully! Coverage is now active.");
      } else {
        toast.success("Warranty registered in database! (Sheet sync pending)");
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        productModel: "",
        serialNumber: "",
        purchaseDate: "",
        dealerName: "Orient Power Pvt Ltd",
        dealerLocation: "10 Ali Block Garden Town Lahore"
      });
    } catch (error: any) {
      console.error("Warranty registration error:", error);
      toast.error("Failed to submit warranty registration.", {
        description: error?.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const productModels = [
    "P2G HV Energy VAULT 75 - 7.5 kWh",
    "P2G HV Energy VAULT 75 - 15 kWh",
    "P2G HV Energy VAULT 75 - 22.5 kWh",
    "P2G HV Energy VAULT 75 - 30 kWh",
    "P2G HV Energy VAULT 75 - 37.5 kWh",
    "P2G HV Energy VAULT 75 - 45 kWh",
    "P2G HV Energy VAULT 75 - 52.5 kWh",
    "P2G HV Energy VAULT 75 - 60 kWh",
    "P2G HV Energy VAULT 75 - 67.5 kWh",
    "P2G HV Energy VAULT 75 - 75 kWh",
    "P2G LV Energy Vault 25 - 5 kWh",
    "P2G LV Energy Vault 25 - 10 kWh",
    "P2G LV Energy Vault 25 - 15 kWh",
    "P2G LV Energy Vault 25 - 20 kWh",
    "P2G LV Energy Vault 25 - 25 kWh",
    "P2G PULSE - 1000 Wh",
    "P2G Energy Monitoring System"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <ClipboardCheck className="w-12 h-12 md:w-16 md:h-16" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Warranty Registration</h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Register your Power2Go product to activate your 5-year warranty coverage and ensure hassle-free support.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Registration Form</h2>
            <p className="text-gray-600 mb-8">
              Please fill out all required fields to register your warranty. Registration must be completed within 30 days of purchase.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                        placeholder="+92 XXX XXXXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      placeholder="Karachi"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
                      placeholder="Enter your complete installation address"
                    />
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  Product Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Model *
                    </label>
                    <select
                      required
                      value={formData.productModel}
                      onChange={(e) => setFormData({ ...formData, productModel: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    >
                      <option value="">Select Product Model</option>
                      {productModels.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serial Number *
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                        placeholder="P2G-XXXX-XXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dealer Name
                    </label>
                    <input
                      type="text"
                      value={formData.dealerName}
                      onChange={(e) => setFormData({ ...formData, dealerName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      placeholder="Authorized Dealer Name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dealer Location
                    </label>
                    <input
                      type="text"
                      value={formData.dealerLocation}
                      onChange={(e) => setFormData({ ...formData, dealerLocation: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      placeholder="Dealer City/Area"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm that all information provided is accurate and I have read and agree to the{" "}
                    <Link to="/terms" className="text-emerald-600 hover:underline">
                      warranty terms and conditions
                    </Link>
                    . I understand that this warranty covers manufacturing defects for 5 years from the date of purchase.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Register Warranty"}
                </Button>
              </div>
            </form>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Warranty registration must be completed within 30 days of purchase</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Serial number can be found on the product label or packaging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Your registration data will be automatically sent to our warranty database</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                <span>Keep your proof of purchase for warranty claims</span>
              </li>
            </ul>
          </div>

          {/* Warranty Check Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Search className="w-8 h-8 text-emerald-600" />
              Check Warranty Status
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your product serial number to check your warranty registration status and details.
            </p>

            <form onSubmit={handleCheckWarranty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={checkSerialNumber}
                      onChange={(e) => setCheckSerialNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      placeholder="Enter serial number (e.g., P2G-XXXX-XXXX)"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isChecking}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isChecking ? "Checking..." : "Check Status"}
                  </Button>
                </div>
              </div>
            </form>

            {/* Warranty Details Display */}
            {warrantyData && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  ✓ Warranty Registered
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Customer Name:</span>
                    <p className="text-gray-900">{warrantyData.fullName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900">{warrantyData.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <p className="text-gray-900">{warrantyData.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">City:</span>
                    <p className="text-gray-900">{warrantyData.city}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Product Model:</span>
                    <p className="text-gray-900">{warrantyData.productModel}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Serial Number:</span>
                    <p className="text-gray-900">{warrantyData.serialNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Purchase Date:</span>
                    <p className="text-gray-900">{warrantyData.purchaseDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Registration Date:</span>
                    <p className="text-gray-900">{new Date(warrantyData.timestamp).toLocaleDateString()}</p>
                  </div>
                  {warrantyData.dealerName && (
                    <div>
                      <span className="font-medium text-gray-700">Dealer:</span>
                      <p className="text-gray-900">{warrantyData.dealerName}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-900">{warrantyData.address}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded border border-green-300">
                  <p className="text-sm text-gray-700">
                    <strong>Warranty Status:</strong> Active - 5 Year Warranty Coverage
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
