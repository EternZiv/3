import { Shield, Calendar, Hash, CheckCircle, Download, Printer } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import logo from "figma:asset/77747af3103ef2d86e83f2259cd8a89b07a206af.png";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

export default function WarrantyCard() {
  const [productCode, setProductCode] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [warrantyData, setWarrantyData] = useState({
    productCode: "",
    purchaseDate: "",
    expiryDate: "",
    warrantyNumber: ""
  });

  const generateWarrantyCard = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate expiry date (5 years from purchase)
    const purchase = new Date(purchaseDate);
    const expiry = new Date(purchase);
    expiry.setFullYear(expiry.getFullYear() + 5);

    // Generate warranty number
    const warrantyNumber = `WC-${productCode}-${Date.now().toString(36).toUpperCase()}`;

    setWarrantyData({
      productCode,
      purchaseDate: purchase.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      expiryDate: expiry.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      warrantyNumber
    });

    setShowCard(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const cardElement = document.getElementById('warranty-card');
    if (!cardElement) return;

    try {
      // Capture the element at high quality
      const dataUrl = await domtoimage.toPng(cardElement, {
        quality: 1,
        width: cardElement.scrollWidth * 2,
        height: cardElement.scrollHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left'
        }
      });

      // Load image to get actual dimensions
      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // A4 dimensions in mm (210 x 297)
      const a4Width = 210;
      const a4Height = 297;
      const margin = 15; // 15mm margin on all sides

      // Available space after margins
      const availableWidth = a4Width - (margin * 2);
      const availableHeight = a4Height - (margin * 2);

      // Create PDF with exact A4 size
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [210, 297] // Explicit A4 dimensions
      });

      // Convert image dimensions from pixels to mm (1px = 0.264583mm at 96 DPI)
      const imgWidthMM = img.width * 0.264583;
      const imgHeightMM = img.height * 0.264583;

      // Calculate scale to fit within available space
      let scaleWidth = availableWidth / imgWidthMM;
      let scaleHeight = availableHeight / imgHeightMM;
      let scale = Math.min(scaleWidth, scaleHeight);

      // Apply scale
      const finalWidth = imgWidthMM * scale;
      const finalHeight = imgHeightMM * scale;

      // Center on page
      const xPos = (a4Width - finalWidth) / 2;
      const yPos = (a4Height - finalHeight) / 2;

      // Add image to PDF
      pdf.addImage(dataUrl, 'PNG', xPos, yPos, finalWidth, finalHeight, undefined, 'FAST');

      // Save with A4 format
      pdf.save(`Power2Go_Warranty_Card_${warrantyData.warrantyNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try using the Print button instead.');
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-[#08080a] text-white print:hidden overflow-hidden border-b border-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-12 h-12 md:w-16 md:h-16" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Warranty Card</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Generate your official Power2Go 5-year warranty card
          </p>
        </div>
      </section>

      {/* Form Section */}
      {!showCard && (
        <section className="py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Register Your Warranty
                </h2>
                <p className="text-gray-600">
                  Enter your product details to generate your warranty card
                </p>
              </div>

              <form onSubmit={generateWarrantyCard} className="space-y-6">
                <div>
                  <label htmlFor="productCode" className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Product Code
                    </div>
                  </label>
                  <input
                    type="text"
                    id="productCode"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    placeholder="e.g., P2G-5KWH-2024"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Find your product code on the product label or packaging
                  </p>
                </div>

                <div>
                  <label htmlFor="purchaseDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Purchase
                    </div>
                  </label>
                  <input
                    type="date"
                    id="purchaseDate"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-1">5-Year Warranty Coverage</p>
                      <p>Your warranty will be valid for 5 years from the date of purchase, covering manufacturing defects and performance guarantees.</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg">
                  Generate Warranty Card
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Warranty Card Display */}
      {showCard && (
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mb-8 print:hidden">
              <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700">
                <Printer className="w-4 h-4 mr-2" />
                Print Card
              </Button>
              <Button onClick={handleDownload} className="bg-cyan-600 hover:bg-cyan-700">
                <Download className="w-4 h-4 mr-2" />
                Save as PDF
              </Button>
              <Button
                onClick={() => {
                  setShowCard(false);
                  setProductCode("");
                  setPurchaseDate("");
                }}
                variant="outline"
              >
                Generate New Card
              </Button>
            </div>

            {/* Warranty Card */}
            <style>{`
              @media print {
                body * { visibility: hidden; }
                #warranty-card, #warranty-card * { visibility: visible; }
                #warranty-card {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                @page {
                  size: A4;
                  margin: 0;
                }
              }
            `}</style>
            <div id="warranty-card" className="bg-white border-4 border-emerald-600 rounded-lg shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-emerald-700 text-white p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={logo} alt="Power2Go" className="h-16 object-contain bg-white px-2 py-1 rounded" />
                    <div>
                      <h2 className="text-3xl font-bold">WARRANTY CARD</h2>
                      <p className="text-gray-300">5-Year Comprehensive Coverage</p>
                    </div>
                  </div>
                  <Shield className="w-20 h-20 opacity-50" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 font-semibold mb-1">Warranty Number</div>
                      <div className="text-xl font-bold text-emerald-600">{warrantyData.warrantyNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-semibold mb-1">Product Code</div>
                      <div className="text-lg font-bold text-gray-900">{warrantyData.productCode}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 font-semibold mb-1">Date of Purchase</div>
                      <div className="text-lg font-bold text-gray-900">{warrantyData.purchaseDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-semibold mb-1">Warranty Expires</div>
                      <div className="text-lg font-bold text-red-600">{warrantyData.expiryDate}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Coverage Includes:</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Manufacturing defects",
                      "Performance guarantee (80% capacity)",
                      "Free parts replacement",
                      "Labor coverage included",
                      "24/7 technical support",
                      "Remote diagnostics",
                      "Annual system checkup",
                      "Mobile app monitoring"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Keep this warranty card for your records</li>
                    <li>• Warranty must be registered within 30 days of purchase</li>
                    <li>• Installation must be performed by certified professionals</li>
                    <li>• Annual maintenance required to maintain warranty validity</li>
                  </ul>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Contact Support:</p>
                      <p>Karachi: 111-P2G-247</p>
                      <p>Lahore: (042) 3591 1165-69</p>
                       <p>Email: warranty@power2go.energy</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Issued By:</p>
                      <p>Power2Go Energy Solutions</p>
                      <p>A division of Multinet Pakistan &</p>
                      <p>Orient Energy Engineering Limited</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-100 px-8 py-4 text-center text-sm text-gray-600">
                This warranty card was generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      {!showCard && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Register Your Warranty?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Shield className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Peace of Mind</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive 5-year coverage protects your investment
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Fast Claims</h3>
                <p className="text-gray-600 text-sm">
                  Pre-registered products enable faster warranty claim processing
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Calendar className="w-10 h-10 text-cyan-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Track Expiry</h3>
                <p className="text-gray-600 text-sm">
                  Never lose track of your warranty coverage period
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
