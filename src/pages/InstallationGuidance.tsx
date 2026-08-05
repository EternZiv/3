import { AlertTriangle, CheckCircle, Settings, Shield, FileText, PlayCircle, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function InstallationGuidance() {
  const installationSteps = [
    {
      step: "1",
      title: "Pre-Installation Assessment",
      description: "Evaluate your site and energy requirements",
      items: [
        "Assess available installation space and structural capacity",
        "Determine energy storage capacity requirements",
        "Review electrical infrastructure and compatibility",
        "Obtain necessary permits and approvals"
      ]
    },
    {
      step: "2",
      title: "Safety Preparation",
      description: "Ensure safe installation environment",
      items: [
        "Verify all electrical circuits are properly labeled",
        "Ensure adequate ventilation in installation area",
        "Check for proper grounding infrastructure",
        "Prepare emergency shutdown procedures"
      ]
    },
    {
      step: "3",
      title: "Mounting & Positioning",
      description: "Secure physical installation",
      items: [
        "Install mounting brackets using provided hardware",
        "Position battery modules ensuring proper clearances",
        "Verify level installation using spirit level",
        "Secure all units according to manufacturer specifications"
      ]
    },
    {
      step: "4",
      title: "Electrical Connections",
      description: "Connect system components safely",
      items: [
        "Connect battery modules in series/parallel configuration",
        "Wire inverter to battery management system",
        "Connect to main electrical panel with proper breakers",
        "Install monitoring and communication cables"
      ]
    },
    {
      step: "5",
      title: "System Configuration",
      description: "Configure and test the system",
      items: [
        "Power on the system following startup sequence",
        "Configure BMS parameters via control panel",
        "Set up monitoring app and network connectivity",
        "Verify all safety mechanisms are functioning"
      ]
    },
    {
      step: "6",
      title: "Testing & Commissioning",
      description: "Final verification and handover",
      items: [
        "Perform load testing and charge/discharge cycles",
        "Verify monitoring data accuracy",
        "Document all installation parameters",
        "Provide customer training on system operation"
      ]
    }
  ];

  const safetyRequirements = [
    {
      icon: Shield,
      title: "Certified Installer Required",
      description: "Installation must be performed by certified electricians with battery system experience."
    },
    {
      icon: AlertTriangle,
      title: "Safety Equipment",
      description: "Use proper PPE including insulated gloves, safety glasses, and non-conductive tools."
    },
    {
      icon: FileText,
      title: "Follow Local Codes",
      description: "Comply with all local electrical codes, building regulations, and safety standards."
    },
    {
      icon: Users,
      title: "Two-Person Installation",
      description: "Always have at least two qualified persons present during installation."
    }
  ];

  const tools = [
    "Torque wrench (calibrated)",
    "Digital multimeter",
    "Wire strippers and crimpers",
    "Spirit level",
    "Drill with appropriate bits",
    "Cable ties and management tools",
    "Insulated hand tools",
    "Safety equipment (PPE)"
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      {/* Hero Section: Premium Dark Carbon Grid */}
      <section className="relative py-24 bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(259,115,22,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(259,115,22,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        <div className="absolute -left-20 top-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-[80px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">
            Technical Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white">
            Installation Guidance
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Professional installation guidelines for Power2Go energy storage systems
          </p>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="bg-orange-50 border-l-4 border-orange-500 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Professional Installation Required</h3>
              <p className="text-gray-700">
                Power2Go energy storage systems must be installed by certified professionals. Improper installation may void warranty and create safety hazards. This guide is for reference only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Requirements */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">Safety First</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Safety Requirements
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyRequirements.map((req, index) => (
              <div
                key={index}
                className="bg-orange-50 border border-orange-200/60 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <req.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 mb-2 tracking-tight">{req.title}</h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border border-gray-200/50 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Required Tools & Equipment</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {tools.map((tool, index) => (
                <div key={index} className="flex items-center gap-3 bg-white border border-gray-200/50 p-3 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Installation Process
            </h2>
          </div>
          <div className="space-y-6">
            {installationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50/80 border border-gray-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1 tracking-tight">{step.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 font-medium">{step.description}</p>
                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorial CTA */}
      <section className="py-16 bg-[#08080a] border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Video Library</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Watch Installation Videos
              </h2>
              <p className="text-gray-400 text-base mb-6 font-medium">
                Access our comprehensive video library with step-by-step installation tutorials for all Power2Go systems.
              </p>
              <Link to="/support">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 text-sm tracking-wider rounded-2xl transition-all hover:scale-[1.02]">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  View Video Tutorials
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-auto">
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-800">
                <PlayCircle className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                <p className="text-center text-gray-400 text-sm font-medium">15+ Professional Installation Videos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 bg-[#08080a] border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3">Need Help?</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
            Need Installation Support?
          </h2>
          <p className="text-gray-400 mb-8 text-lg font-medium">
            Our certified installation partners are available to help with your Power2Go system installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 text-sm tracking-wider rounded-2xl transition-all hover:scale-[1.02]">
              Find Certified Installer
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 text-sm font-bold tracking-wider rounded-2xl">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}