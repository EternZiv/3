import { Book, Download, FileText, Video, Code } from "lucide-react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { jsPDF } from "jspdf";
import { useState } from "react";

export default function Documentation() {
  const [showResidentialOptions, setShowResidentialOptions] = useState(false);

  const handleDownload = (fileName: string, fileFormat: string) => {
    if (fileFormat === 'PDF') {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(fileName, 20, 30);
      doc.setFontSize(11);
      const lines = [
        "",
        "Document Contents:",
        "- Product Overview",
        "- Technical Specifications",
        "- Installation Instructions",
        "- Safety Guidelines",
        "- Maintenance Procedures",
        "- Troubleshooting Guide",
        "- Warranty Information",
        "",
        "For more information, visit www.power2go.energy",
        "Contact: support@power2go.energy",
        `© ${new Date().getFullYear()} Power2Go. All rights reserved.`,
      ];
      let y = 50;
      lines.forEach((line) => { doc.text(line, 20, y); y += 8; });
      doc.save(`${fileName.replace(/\s+/g, '_')}.pdf`);
    } else if (fileFormat === 'ZIP') {
      const blob = new Blob(['This would be a ZIP file with SDK documentation and examples.'], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName.replace(/\s+/g, '_')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else if (fileFormat === 'Video') {
      alert(`Video "${fileName}" would be downloaded in production.`);
    }
  };

  const documentSections = [
    {
      icon: Book,
      title: "User Manuals",
      description: "Comprehensive guides for all Power2Go products",
      documents: [
        { name: "Residential System User Manual", size: "2.4 MB", format: "PDF" },
        { name: "Commercial System User Manual", size: "3.1 MB", format: "PDF" },
        { name: "Industrial System User Manual", size: "4.2 MB", format: "PDF" },
        { name: "Portable System User Manual", size: "1.8 MB", format: "PDF" },
      ]
    },
    {
      icon: FileText,
      title: "Technical Specifications",
      description: "Detailed technical documentation and datasheets",
      documents: [
        { name: "Battery Specifications", size: "1.2 MB", format: "PDF" },
        { name: "Inverter Technical Specs", size: "1.5 MB", format: "PDF" },
        { name: "BMS Technical Documentation", size: "2.1 MB", format: "PDF" },
        { name: "System Architecture Guide", size: "3.4 MB", format: "PDF" },
      ]
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "Integration guides for developers",
      documents: [
        { name: "REST API Reference", size: "890 KB", format: "PDF" },
        { name: "Monitoring API Guide", size: "1.1 MB", format: "PDF" },
        { name: "Mobile App SDK", size: "2.7 MB", format: "ZIP" },
        { name: "Integration Examples", size: "540 KB", format: "PDF" },
      ]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      documents: [
        { name: "System Setup Tutorial", size: "45 min", format: "Video" },
        { name: "Mobile App Walkthrough", size: "18 min", format: "Video" },
        { name: "Maintenance Procedures", size: "32 min", format: "Video" },
        { name: "Troubleshooting Guide", size: "25 min", format: "Video" },
      ]
    },
  ];

  const quickLinks = [
    { title: "Getting Started Guide", category: "Beginner" },
    { title: "Safety Guidelines", category: "Important" },
    { title: "Software Updates", category: "Updates" },
    { title: "Certification Documents", category: "Compliance" },
    { title: "Product Comparisons", category: "Reference" },
    { title: "Release Notes", category: "Updates" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      {/* Hero Section: Premium Dark Carbon Grid */}
      <section className="relative py-24 bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(259,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(259,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/5 blur-[80px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">
            Technical Library
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold mb-6 tracking-tight text-white leading-tight">
            Documentation
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Everything you need to know about Power2Go energy storage systems.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-5">Quick Links</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="bg-gray-50/80 border border-gray-200/50 rounded-xl p-4 hover:border-emerald-400 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="text-[9px] text-emerald-600 font-extrabold uppercase tracking-widest mb-1">{link.category}</div>
                <div className="text-xs font-bold text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors">{link.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">Library</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Technical Resources</h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto font-medium">Download manuals, specs, video guides, and developer documentation.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {documentSections.map((section, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1 tracking-tight">{section.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{section.description}</p>
                  </div>
                </div>

                <div className="overflow-x-auto w-full">
                  <div className="space-y-2 min-w-[280px]">
                    {section.documents.map((doc, docIndex) => (
                      <div
                        key={docIndex}
                        className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl hover:bg-emerald-50 transition-colors group border border-transparent hover:border-emerald-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-gray-900 truncate">{doc.name}</div>
                            <div className="text-[10px] text-gray-400 font-semibold">
                              {doc.format} • {doc.size}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 hover:bg-emerald-50 flex-shrink-0 ml-2"
                          onClick={() => {
                            if (doc.name === "Residential System User Manual") {
                              setShowResidentialOptions(true);
                            } else {
                              handleDownload(doc.name, doc.format);
                            }
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#08080a] border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Support</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
            Need Additional Help?
          </h2>
          <p className="text-gray-400 mb-8 text-lg font-medium">
            Our support team is ready to assist you with any questions about our products and documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 text-sm tracking-wider rounded-2xl transition-all hover:scale-[1.02]">
              Contact Support
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 text-sm font-bold tracking-wider rounded-2xl">
              Live Chat
            </Button>
          </div>
        </div>
      </section>

      {/* Residential System Options Dialog */}
      <Dialog open={showResidentialOptions} onOpenChange={setShowResidentialOptions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select System Capacity</DialogTitle>
            <DialogDescription>
              Choose the capacity for your residential system user manual
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button
              className="w-full h-20 text-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl"
              onClick={() => {
                handleDownload("Residential System User Manual - 5kWh", "PDF");
                setShowResidentialOptions(false);
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold">5kWh</span>
                <span className="text-sm text-emerald-50">Residential System Manual</span>
              </div>
            </Button>
            <Button
              className="w-full h-20 text-lg bg-gray-800 hover:bg-gray-700 text-white font-extrabold rounded-xl border border-gray-700"
              onClick={() => {
                handleDownload("Residential System User Manual - 25kWh", "PDF");
                setShowResidentialOptions(false);
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold">25kWh</span>
                <span className="text-sm text-gray-300">Residential System Manual</span>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}