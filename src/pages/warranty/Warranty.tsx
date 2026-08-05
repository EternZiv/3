import { Shield, CheckCircle, XCircle, Clock, AlertCircle, Phone, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export default function Warranty() {
  const warrantyPlans = [
    {
      name: "Residential Standard",
      duration: "10 Years",
      color: "blue",
      features: [
        "10-year product warranty",
        "Performance guarantee (80% capacity)",
        "Free parts replacement",
        "Labor coverage included",
        "Remote diagnostics",
        "Annual system checkup",
        "24/7 technical support",
        "Mobile app monitoring"
      ],
      systems: ["Residential Systems", "Portable Solutions"]
    },
    {
      name: "Commercial",
      duration: "5 Years",
      color: "cyan",
      features: [
        "5-year comprehensive warranty",
        "Performance guarantee (85% capacity)",
        "Priority parts replacement",
        "On-site service included",
        "Quarterly system inspections",
        "Preventive maintenance",
        "Dedicated account manager",
        "Advanced analytics"
      ],
      systems: ["Commercial Solutions"]
    },
    {
      name: "Industrial",
      duration: "5 Years",
      color: "purple",
      features: [
        "5-year industrial warranty",
        "Performance guarantee (85% capacity)",
        "4-hour response time",
        "Hot-swap component support",
        "Monthly system optimization",
        "Load testing and certification",
        "24/7 priority support line",
        "Predictive maintenance AI"
      ],
      systems: ["Industrial Solutions"]
    }
  ];

  const covered = [
    "Manufacturing defects in materials and workmanship",
    "Battery cell degradation below guaranteed capacity",
    "BMS (Battery Management System) failures",
    "Inverter and power electronics failures",
    "Mounting hardware and structural components",
    "Wiring and electrical connections",
    "Cooling and thermal management systems",
    "Software bugs and firmware issues"
  ];

  const notCovered = [
    "Damage from improper installation or unauthorized modifications",
    "Normal wear and tear from regular use",
    "Damage from extreme weather or natural disasters",
    "Improper maintenance or neglect",
    "Use beyond rated specifications",
    "Damage from grid voltage surges or lightning",
    "Cosmetic damage that doesn't affect function",
    "Third-party accessories or components"
  ];

  const claimProcess = [
    {
      step: "1",
      title: "Report the Issue",
      description: "Contact support via phone, email, or mobile app with your system serial number and issue description."
    },
    {
      step: "2",
      title: "Remote Diagnosis",
      description: "Our technical team performs remote diagnostics to identify the problem and determine if warranty service is applicable."
    },
    {
      step: "3",
      title: "Approval & Scheduling",
      description: "Once approved, we schedule service with a certified technician at your convenience, typically within 48-72 hours."
    },
    {
      step: "4",
      title: "Repair or Replacement",
      description: "Technician performs necessary repairs or component replacements. All work is verified and tested before completion."
    },
    {
      step: "5",
      title: "Documentation",
      description: "Service report is generated and stored in your account. System monitoring resumes to ensure proper operation."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-[#08080a] text-white overflow-hidden border-b border-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-12 h-12 md:w-16 md:h-16" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Warranty</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Comprehensive warranty coverage for peace of mind and long-term protection
          </p>
        </div>
      </section>

      {/* Warranty Plans */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warranty Coverage Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Industry-leading warranty protection for all Power2Go energy storage systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {warrantyPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                  plan.color === 'blue' ? 'bg-emerald-100 text-emerald-700' :
                  plan.color === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {plan.duration}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Applicable to: {plan.systems.join(", ")}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Extended Warranty Available</h4>
                <p className="text-gray-700">
                  Extend your warranty coverage up to 15 years for residential systems and 10 years for commercial/industrial systems. Contact our sales team for pricing and details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Covered / Not Covered */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Covered */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What's Covered</h3>
              </div>
              <ul className="space-y-3">
                {covered.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Covered */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What's Not Covered</h3>
              </div>
              <ul className="space-y-3">
                {notCovered.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to File a Warranty Claim
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple and straightforward warranty claim process
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {claimProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < claimProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-emerald-300 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-8">
            <div className="flex gap-4 mb-6">
              <Clock className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Important Information</h3>
                <p className="text-gray-700 mb-4">
                  Please read these important warranty terms and conditions:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-semibold min-w-[120px]">Registration:</span>
                    <span>Warranty must be registered within 30 days of installation to be valid.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold min-w-[120px]">Installation:</span>
                    <span>Must be installed by Power2Go certified professionals for warranty to apply.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold min-w-[120px]">Maintenance:</span>
                    <span>Annual professional servicing required to maintain warranty validity.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold min-w-[120px]">Transferability:</span>
                    <span>Warranty is transferable to new owners with proper documentation.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold min-w-[120px]">Response Time:</span>
                    <span>Residential: 48-72 hours, Commercial: 24-48 hours, Industrial: 4-24 hours.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Warranty Support?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our warranty support team is ready to assist you with claims, questions, and service requests.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Phone Support</div>
              <div className="text-gray-300">Karachi: 111-P2G-247</div>
              <div className="text-gray-300">Lahore: (042) 3591 1165-69</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Email Support</div>
              <div className="text-gray-300">warranty@power2go.energy</div>
              <div className="text-gray-300">support@power2go.energy</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/claims">
              <Button className="bg-white/10 text-white hover:bg-white/20 px-8 py-6 text-lg">
                File a Claim
              </Button>
            </Link>
            <Link to="/warranty-registration">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Warranty Registration
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Download Warranty Terms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
