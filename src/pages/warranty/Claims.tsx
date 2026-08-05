import { FileText, Upload, User, Mail, Phone, Hash, Calendar, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { createWarrantyClaim, lookupWarrantyBySerial } from "../../admin/adminApi";
import { toast } from "sonner";

export default function Claims() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    warrantyNumber: "",
    productCode: "",
    purchaseDate: "",
    claimType: "",
    issueDescription: "",
    attachments: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isWarrantyVerified, setIsWarrantyVerified] = useState(false);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleVerifyWarranty = async () => {
    const serial = formData.warrantyNumber.trim();
    if (!serial) {
      toast.error("Please enter your product serial number first.");
      return;
    }

    setIsVerifying(true);
    try {
      const warranty = await lookupWarrantyBySerial(serial);
      if (!warranty) {
        toast.error("Invalid Serial / Warranty Number", {
          description: "No registered warranty was found for this number. Please check the serial number on your product.",
        });
        setIsWarrantyVerified(false);
        return;
      }

      if (warranty.warranty_status !== "approved") {
        toast.error(`Warranty status is '${warranty.warranty_status}'`, {
          description: "Warranty claims can only be filed for registrations that have been approved by the admin.",
        });
        setIsWarrantyVerified(false);
        return;
      }

      // Pre-fill form fields with verified registry details
      setFormData((prev) => ({
        ...prev,
        fullName: warranty.full_name,
        email: warranty.email,
        phone: warranty.phone,
        productCode: warranty.product_model,
        purchaseDate: warranty.purchase_date || "",
      }));

      setIsWarrantyVerified(true);
      toast.success("Warranty verified successfully!", {
        description: "Registered details have been auto-filled into the form.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to verify warranty. Please try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.warrantyNumber || !formData.productCode || !formData.purchaseDate || !formData.claimType || !formData.issueDescription) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Direct on-submit validation: enforce that the warranty is registered and approved
      const warranty = await lookupWarrantyBySerial(formData.warrantyNumber.trim());
      if (!warranty) {
        toast.error("Warranty check failed", {
          description: "This warranty number is not registered. Please register first.",
        });
        setIsSubmitting(false);
        return;
      }

      if (warranty.warranty_status !== "approved") {
        toast.error("Warranty is not approved", {
          description: `This warranty is currently '${warranty.warranty_status}'. Claims can only be filed for approved warranties.`,
        });
        setIsSubmitting(false);
        return;
      }

      // Convert attachments to base64
      const base64Attachments = await Promise.all(
        formData.attachments.map((file) => convertFileToBase64(file))
      );

      await createWarrantyClaim({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serial_number: formData.warrantyNumber.trim(),
        product_model: formData.productCode,
        purchase_date: formData.purchaseDate,
        claim_type: formData.claimType,
        issue_description: formData.issueDescription,
        attachment_urls: base64Attachments,
      });

      toast.success("Warranty claim submitted successfully!", {
        description: "Our support team will contact you within 24-48 hours.",
      });

      // Reset Form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        warrantyNumber: "",
        productCode: "",
        purchaseDate: "",
        claimType: "",
        issueDescription: "",
        attachments: []
      });
      setIsWarrantyVerified(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit warranty claim. Please check details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachments: Array.from(e.target.files)
      });
    }
  };

  const claimTypes = [
    "Manufacturing Defect",
    "Performance Issue",
    "Battery Degradation",
    "BMS Failure",
    "Inverter Problem",
    "Physical Damage",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="w-12 h-12 md:w-16 md:h-16" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">File a Warranty Claim</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Submit your warranty claim and our support team will assist you promptly
          </p>
        </div>
      </section>

      {/* Claim Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Warranty Claim Form
              </h2>
              <p className="text-gray-600">
                Please provide the following information to process your warranty claim
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </div>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </div>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </div>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Product Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="warrantyNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Warranty / Serial Number *
                      </div>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="warrantyNumber"
                        required
                        value={formData.warrantyNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, warrantyNumber: e.target.value });
                          setIsWarrantyVerified(false);
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., P2G-LV-2026-001234"
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyWarranty}
                        disabled={isVerifying}
                        className={`px-4 py-3 text-white font-medium ${
                          isWarrantyVerified
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                      >
                        {isVerifying ? (
                          "Verifying..."
                        ) : isWarrantyVerified ? (
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" /> Verified
                          </span>
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Enter registered product serial number to verify active warranty.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="productCode" className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Product Code *
                      </div>
                    </label>
                    <input
                      type="text"
                      id="productCode"
                      required
                      value={formData.productCode}
                      onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., P2G-5KWH-2024"
                    />
                  </div>

                  <div>
                    <label htmlFor="purchaseDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date of Purchase *
                      </div>
                    </label>
                    <input
                      type="date"
                      id="purchaseDate"
                      required
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="claimType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Claim Type *
                    </label>
                    <select
                      id="claimType"
                      required
                      value={formData.claimType}
                      onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select claim type</option>
                      {claimTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Issue Description</h3>
                <div>
                  <label htmlFor="issueDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Describe the Issue *
                    </div>
                  </label>
                  <textarea
                    id="issueDescription"
                    required
                    rows={6}
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Please describe the issue you're experiencing in detail, including when it started and any error messages..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Include as much detail as possible to help us process your claim faster
                  </p>
                </div>
              </div>

              {/* Attachments */}
              <div className="pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Attachments (Optional)</h3>
                <div>
                  <label htmlFor="attachments" className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Photos or Documents
                    </div>
                  </label>
                  <input
                    type="file"
                    id="attachments"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Upload photos of the issue, warranty card, or purchase receipt (Max 5 files, 10MB each)
                  </p>
                  {formData.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-2">Before submitting:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Ensure all required fields are filled correctly</li>
                      <li>• Your warranty number and product code match your warranty card</li>
                      <li>• You have described the issue in detail</li>
                      <li>• Attachments (if any) are clear and relevant</li>
                    </ul>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg">
                  {isSubmitting ? "Submitting Claim..." : "Submit Warranty Claim"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <Phone className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-2">Karachi: 111-P2G-247</p>
              <p className="text-gray-600 text-sm">Lahore: (042) 3591 1165-69</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <Mail className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-2">warranty@power2go.energy</p>
              <p className="text-gray-600 text-sm">support@power2go.energy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
