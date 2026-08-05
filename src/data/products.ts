import type { Product } from "../lib/types";

// Official Product Images from /images directory
const imgLV5 = "/images/LV 5.png";
const imgLVWallMount = "/images/5kWh.png";
const imgLV16 = "/images/LV 16.png";
const imgHV75 = "/images/HV 7.5.png";
const imgHV75_2 = "/images/HV-60.jpeg";   // swapped: was HV 75.png, now HV-60.jpeg
const imgHV60_jpeg = "/images/HV 75.png"; // swapped: was HV-60.jpeg, now HV 75.png
const imgHV240 = "/images/HV 240.png";
const imgLV25_1 = "/images/LV 25.png";
const imgLV25_2 = "/images/LV 25 (2).png";
const imgPulse320_1 = "/images/PULSE 320.jpeg";
const imgPulse320_2 = "/images/PULSE 320 (2).jpeg";
const imgMonitoring = "/images/SEM.jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Power2Go LV 5 Energy Storage Module",
    model: "LV 5",
    category: "residential",
    image: [imgLV5],
    capacity: 5.12,
    capacityLabel: "5.12 kWh",
    power: "5.12 kW",
    voltage: "51.2V",
    warranty: "5 Years",
    badge: "Residential Rack",
    features: [
      "Lithium Iron Phosphate (Cobalt-Free)",
      "≥6000 Cycle Life",
      "100A Max Continuous Output",
      "CAN / RS485 Communication",
      "Stackable up to 25 kWh",
      "≥95% Round-trip Efficiency"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go LV 5 is a premium 5.12 kWh Low Voltage rack-mountable battery module built with safest cobalt-free Lithium Iron Phosphate (LFP) cell technology. Engineered for everyday home energy storage, it supports high continuous discharge and seamlessly expands up to 25 kWh.",
    specifications: {
      "Nominal Voltage": "51.2V",
      "Capacity": "5.12 kWh (100 Ah)",
      "Battery Cell Technology": "Lithium Iron Phosphate (LFP, Cobalt-free)",
      "Max Output Current": "100 A",
      "Peak Output Current": "170 A (3s)",
      "Dimensions (H/W/D)": "155 x 442 x 503 mm",
      "Weight": "50 kg",
      "Cycle Life": "≥ 6000 cycles",
      "Round-trip Efficiency": "≥ 95%",
      "Operating Temperature": "0°C to +45°C",
      "Enclosure Protection": "IP21",
      "Communication": "CAN / RS485",
      "Certifications": "CE, UN38.3",
      "Applications": "On Grid / On Grid + Backup / Off Grid",
      "Inverter Compatibility": "DEYE, Solis, GoodWe, Growatt, Megarevo, TBEA, Pylotech",
      "Warranty": "Max 5 Years"
    },
    keyFeatures: [
      "Safest cobalt-free LFP chemistry proven in millions of electric vehicles",
      "High discharge performance with 100A continuous & 170A surge power",
      "Rack-mountable design suitable for tailored indoor storage cabinets",
      "Plug-and-play communication compatible with leading hybrid inverters",
      "Long service life exceeding 6000 cycles at 100% Depth of Discharge",
      "Comprehensive multi-tier battery management system (BMS) protection"
    ],
    applications: [
      "Residential Homes",
      "Solar Self-Consumption",
      "Emergency Power Backup",
      "Peak Load Shifting",
      "Small Office & Retail"
    ]
  },
  {
    id: 2,
    name: "Power2Go LV Wall Mount 5 Energy Vault",
    model: "LV Wall Mount 5",
    category: "residential",
    image: [imgLVWallMount],
    capacity: 5.12,
    capacityLabel: "5.12 kWh Wall Mount",
    power: "5.12 kW",
    voltage: "51.2V",
    warranty: "5 Years",
    badge: "Wall Mounted",
    features: [
      "Ultra-Slim Wall-Mount Chassis",
      "IP21 Protection Rating",
      "100A Max Discharge",
      "CAN / RS485 Multi-Protocol",
      "Compact 155mm Depth",
      "Zero Maintenance LFP"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "Designed for sleek indoor wall installations, the Power2Go LV Wall Mount 5 offers 5.12 kWh of high-efficiency energy backup in an space-saving enclosure. It integrates seamlessly with home solar systems to provide reliable backup during load shedding.",
    specifications: {
      "Nominal Voltage": "51.2V",
      "Capacity": "5.12 kWh",
      "Battery Chemistry": "Lithium Iron Phosphate (Cobalt-free)",
      "Max Output Current": "100 A",
      "Peak Output Current": "170 A (3s)",
      "Dimensions (H/W/D)": "155 x 442 x 503 mm",
      "Weight": "50 kg",
      "Cycle Life": "≥ 6000 cycles",
      "Round-trip Efficiency": "≥ 95%",
      "Operating Temperature": "0°C to +45°C",
      "Protection Rating": "IP21",
      "Communication": "CAN / RS485",
      "Certifications": "CE, UN38.3",
      "Applications": "On Grid / On Grid + Backup / Off Grid",
      "Warranty": "Max 5 Years"
    },
    keyFeatures: [
      "Space-optimized wall-mountable form factor for modern residential spaces",
      "Cobalt-free LFP chemistry for maximum thermal and chemical stability",
      "Rapid 0.5C charging and discharging capability for quick turnaround",
      "Instantaneous 170A peak surge power to start motor loads and compressors",
      "Universal inverter compatibility supporting all major hybrid brands",
      "5-year official P2G manufacturer warranty"
    ],
    applications: [
      "Apartments & Urban Homes",
      "Solar Energy Storage",
      "Load Shedding Backup",
      "Off-Grid Cabins"
    ]
  },
  {
    id: 3,
    name: "Power2Go LV 16 High-Capacity Module",
    model: "LV 16",
    category: "residential",
    image: [imgLV16],
    capacity: 16.0,
    capacityLabel: "16.0 kWh",
    power: "16.0 kW",
    voltage: "51.2V",
    warranty: "5 Years",
    badge: "High Capacity LV",
    features: [
      "314A Max Continuous Output",
      "514A Surge Capacity (3s)",
      "16 kWh Single Module Energy",
      "Heavy-Duty Indoor Cabinet",
      "≥95% Efficiency",
      "CAN / RS485 Communication"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go LV 16 is a heavy-duty 16.0 kWh low-voltage storage unit capable of delivering an outstanding 314A continuous discharge current. Built for large homes and commercial sites requiring high surge output at 51.2V nominal voltage.",
    specifications: {
      "Nominal Voltage": "51.2V",
      "Capacity": "16.0 kWh",
      "Battery Cell Technology": "Lithium Iron Phosphate (Cobalt-free)",
      "Max Output Current": "314 A",
      "Peak Output Current": "514 A (3s)",
      "Dimensions (H/W/D)": "900 x 435 x 240 mm",
      "Weight": "130 kg",
      "Cycle Life": "≥ 6000 cycles",
      "Round-trip Efficiency": "≥ 95%",
      "Operating Temperature": "0°C to +45°C",
      "Enclosure Rating": "IP21",
      "Communication": "CAN / RS485",
      "Certifications": "CE, UN38.3",
      "Applications": "On Grid / On Grid + Backup / Off Grid",
      "Warranty": "Max 5 Years"
    },
    keyFeatures: [
      "Massive 314A continuous discharge power ideal for heavy inductive loads",
      "Extremely high surge capability of 514A for starting heavy air conditioners and pumps",
      "16 kWh energy capacity in a single compact 900mm floor-standing chassis",
      "Built-in active balancing intelligent BMS for long-term cell health",
      "Full compatibility with commercial low-voltage inverter arrays",
      "5-Year limited warranty backed by Power2Go regional service network"
    ],
    applications: [
      "Large Residences & Villas",
      "Commercial Offices",
      "Medical Clinics & Labs",
      "Restaurants & Commercial Kitchens"
    ]
  },
  {
    id: 4,
    name: "Power2Go LV Energy Vault 25 System",
    model: "LV Energy Vault 25",
    category: "residential",
    image: [imgLV25_1, imgLV25_2],
    capacity: 25.0,
    capacityLabel: "5 - 25 kWh Modular",
    power: "25.0 kW",
    voltage: "51.2V",
    warranty: "5 Years",
    badge: "Modular Stack",
    features: [
      "Modular 1 to 5 Battery Stack",
      "5 kWh to 25 kWh Capacity Range",
      "500A Max Continuous Output",
      "850A Peak Output Surge",
      "Customized Indoor Rack",
      "CAN / RS485 Connectivity"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go LV Energy Vault 25 is a flagship modular residential energy storage system. Housing up to five 5 kWh battery modules inside a custom engineered indoor rack cabinet (1056mm height), it delivers expandable backup power from 5 kWh up to 25 kWh with 500A output capability.",
    specifications: {
      "System Nominal Voltage": "51.2V",
      "Module Type": "P2G LV Energy Vault Module (5 kWh)",
      "Number of Modules": "1 to 5 Modules",
      "Capacity Range": "5 kWh / 10 kWh / 15 kWh / 20 kWh / 25 kWh",
      "Rack Dimensions (H/W/D)": "1056 x 587 x 637 mm",
      "Weight Range": "50 kg to 250 kg",
      "Max Output Current": "500 A",
      "Peak Output Current": "850 A (3s)",
      "Battery Technology": "Lithium Iron Phosphate (Cobalt-free)",
      "Cycle Life": "≥ 6000 cycles",
      "Round-trip Efficiency": "≥ 95%",
      "Operating Temperature": "0°C to +45°C",
      "Communication": "CAN / RS485",
      "Certifications": "CE, UN38.3",
      "Warranty": "Max 5 Years"
    },
    keyFeatures: [
      "Tailored modular cabinet allowing smooth capacity upgrades from 5 to 25 kWh",
      "Delivers up to 500A continuous current to power whole-home circuits effortlessly",
      "Industry-leading 850A peak surge tolerance for instant heavy equipment start",
      "Cobalt-free LFP chemistry for maximum fire and thermal protection",
      "Centralized master BMS for single-point cloud monitoring and diagnostics",
      "Seamless integration with Solis, DEYE, GoodWe, Growatt and Megarevo inverters"
    ],
    applications: [
      "Whole-Home Backup",
      "Luxury Estates",
      "Small Commercial Buildings",
      "Microgrid Energy Storage"
    ],
    variants: [
      {
        capacity: "1-unit",
        capacityLabel: "5 kWh (1 Module)",
        model: "Vault 25 - 5kWh",
        power: "5 kW",
        voltage: "51.2V",
        features: ["1 Module", "50kg Weight", "Expandable"],
        description: "1-Module configuration providing 5 kWh usable capacity in the Vault 25 enclosure.",
        specifications: {
          "Modules": "1 x 5kWh Module",
          "Usable Energy": "5 kWh",
          "Nominal Voltage": "51.2 V",
          "Total Weight": "50 kg",
          "Max Discharge": "100 A",
          "Rack Size": "1056 x 587 x 637 mm"
        },
        keyFeatures: ["Entry level 5 kWh storage", "Easily upgradeable by adding modules"],
        applications: ["Small Homes", "Essential Circuits"]
      },
      {
        capacity: "2-units",
        capacityLabel: "10 kWh (2 Modules)",
        model: "Vault 25 - 10kWh",
        power: "10 kW",
        voltage: "51.2V",
        features: ["2 Modules", "100kg Weight", "Expandable"],
        description: "2-Module configuration providing 10 kWh usable capacity.",
        specifications: {
          "Modules": "2 x 5kWh Modules",
          "Usable Energy": "10 kWh",
          "Nominal Voltage": "51.2 V",
          "Total Weight": "100 kg",
          "Max Discharge": "200 A",
          "Rack Size": "1056 x 587 x 637 mm"
        },
        keyFeatures: ["10 kWh capacity for standard residential loads", "200A continuous power"],
        applications: ["Medium Family Homes", "Solar Storage"]
      },
      {
        capacity: "3-units",
        capacityLabel: "15 kWh (3 Modules)",
        model: "Vault 25 - 15kWh",
        power: "15 kW",
        voltage: "51.2V",
        features: ["3 Modules", "150kg Weight", "Expandable"],
        description: "3-Module configuration delivering 15 kWh capacity for extended backup.",
        specifications: {
          "Modules": "3 x 5kWh Modules",
          "Usable Energy": "15 kWh",
          "Nominal Voltage": "51.2 V",
          "Total Weight": "150 kg",
          "Max Discharge": "300 A",
          "Rack Size": "1056 x 587 x 637 mm"
        },
        keyFeatures: ["15 kWh for heavy load shedding regions", "300A continuous power"],
        applications: ["Full-Home Backup", "Air Conditioning Backup"]
      },
      {
        capacity: "4-units",
        capacityLabel: "20 kWh (4 Modules)",
        model: "Vault 25 - 20kWh",
        power: "20 kW",
        voltage: "51.2V",
        features: ["4 Modules", "200kg Weight", "Expandable"],
        description: "4-Module configuration offering 20 kWh capacity.",
        specifications: {
          "Modules": "4 x 5kWh Modules",
          "Usable Energy": "20 kWh",
          "Nominal Voltage": "51.2 V",
          "Total Weight": "200 kg",
          "Max Discharge": "400 A",
          "Rack Size": "1056 x 587 x 637 mm"
        },
        keyFeatures: ["20 kWh capacity for high power consumers", "400A discharge rate"],
        applications: ["Luxury Villas", "Commercial Support"]
      },
      {
        capacity: "5-units",
        capacityLabel: "25 kWh (5 Modules)",
        model: "Vault 25 - 25kWh",
        power: "25 kW",
        voltage: "51.2V",
        features: ["5 Modules (Full Stack)", "250kg Weight", "Maximum Capacity"],
        description: "Full 5-Module stack delivering maximum 25 kWh energy capacity inside the Vault 25 cabinet.",
        specifications: {
          "Modules": "5 x 5kWh Modules",
          "Usable Energy": "25 kWh",
          "Nominal Voltage": "51.2 V",
          "Total Weight": "250 kg",
          "Max Discharge": "500 A",
          "Rack Size": "1056 x 587 x 637 mm"
        },
        keyFeatures: ["Full 25 kWh storage capacity", "Maximum 500A discharge output"],
        applications: ["Estates", "Heavy Commercial", "Full Off-Grid"]
      }
    ]
  },
  {
    id: 6,
    name: "Power2Go HV 7.5 High Voltage Module",
    model: "HV 7.5",
    category: "commercial",
    image: [imgHV75],
    capacity: 7.5,
    capacityLabel: "7.5 kWh High Voltage",
    power: "7.5 kW",
    voltage: "87.6V",
    warranty: "5 Years",
    badge: "High Voltage",
    features: [
      "87.6V High Voltage Output",
      "CAN / RS485 / Modbus TCP",
      "IEC62619 & UL Standards",
      "315 kg Heavy-Duty Build",
      "≥95% Round-trip Efficiency",
      "Cobalt-Free LFP Chemistry"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go HV 7.5 is a dedicated High Voltage (87.6V) battery module engineered for commercial and industrial hybrid inverter coupling. Built to rigorous IEC62619 and UL safety standards, it delivers fast charge/discharge rates with Modbus TCP enterprise integration.",
    specifications: {
      "Nominal Voltage": "87.6V",
      "Capacity": "7.5 kWh",
      "Battery Cell Technology": "Lithium Iron Phosphate (Cobalt-free)",
      "Max Output Current": "100 A",
      "Peak Output Current": "170 A (3s)",
      "Dimensions (H/W/D)": "153 x 420 x 803 mm",
      "Weight": "315 kg",
      "Cycle Life": "≥ 6000 cycles",
      "Round-trip Efficiency": "≥ 95%",
      "Operating Temperature": "0°C to +45°C",
      "Protection Rating": "IP21",
      "Communication": "CAN / RS485 / Modbus TCP",
      "Certifications": "CE / UN 38.3 / IEC62040 / IEC62619",
      "Applications": "On Grid / On Grid + Backup / Off Grid",
      "Warranty": "Max 5 Years"
    },
    keyFeatures: [
      "87.6V high-voltage architecture reduces line loss and optimizes inverter conversion",
      "Modbus TCP communication protocol for integration with SCADA & EMS platforms",
      "Certified under stringent IEC62619 & IEC62040 international storage standards",
      "Heavy industrial build weighing 315 kg for maximum structural stability",
      "Cobalt-free chemistry for non-hazardous, safe commercial operation",
      "Supported by P2G official 5-year commercial warranty"
    ],
    applications: [
      "Commercial Buildings",
      "HV Hybrid Inverter Systems",
      "Microgrid Energy Storage",
      "Industrial Backup Power"
    ]
  },
  {
    id: 7,
    name: "Power2Go HV Energy Vault 60 System",
    model: "HV Energy Vault 60",
    category: "commercial",
    image: [imgHV75_2, imgHV60_jpeg],
    capacity: 60.0,
    capacityLabel: "30 - 60 kWh HV Stack",
    power: "60.0 kW",
    voltage: "307V - 614.4V",
    warranty: "5 Years",
    badge: "HV Commercial",
    features: [
      "4 to 8 HV Module Stack",
      "30 kWh to 60 kWh Energy Range",
      "307V to 614.4V High Voltage",
      "93% Round-trip Efficiency",
      "Sungrow, DEYE & Solis Compatible",
      "100A Max Discharge Current"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go HV Energy Vault 60 is a modular High Voltage battery system configurable from 4 to 8 modules (30 kWh to 60 kWh). Delivering operating voltages up to 710V, it integrates directly with high-voltage commercial inverters like Sungrow, DEYE, Solis, and Megarevo.",
    specifications: {
      "Module Type": "P2G HV Energy Vault Module (60 kWh series)",
      "Number of Modules": "4 to 8 Modules",
      "Energy Range": "30 kWh / 37.5 kWh / 45 kWh / 52.5 kWh / 60 kWh",
      "Nominal Voltage Range": "307 V to 614.4 V",
      "Operating Voltage Range": "259 V to 710 V",
      "Module Dimensions (H/W/D)": "155 x 483 x 800 mm",
      "Weight Range": "300 kg to 600 kg",
      "Max Output Current": "100 A",
      "Peak Output Current": "170 A (3s)",
      "Battery Cell Technology": "Lithium Iron Phosphate (Cobalt-free)",
      "Round-trip Efficiency": "≥ 93%",
      "Certifications": "CE / UN 38.3",
      "Applications": "On Grid / On Grid + Backup / Off Grid",
      "Inverter Compatibility": "TBEA, Solis, DEYE, Sungrow, GoodWe, Growatt, Megarevo",
      "Warranty": "5 Years"
    },
    keyFeatures: [
      "Wide high-voltage range (307V to 614.4V) optimized for commercial HV hybrid inverters",
      "Flexible capacity scaling from 30 kWh to 60 kWh via stackable HV boxes",
      "Compatible with leading commercial inverter brands including Sungrow & DEYE",
      "Thermal-optimized modular architecture ensuring stable round-trip efficiency (93%)",
      "Integrated High Voltage Control Box (HV BOX) for intelligent string management",
      "5-Year comprehensive commercial warranty"
    ],
    applications: [
      "Commercial Complex & Malls",
      "Manufacturing Plants",
      "PV + Storage Projects",
      "Peak Shaving & Demand Charge Reduction"
    ],
    variants: [
      {
        capacity: "4-units",
        capacityLabel: "30 kWh (307V)",
        model: "HV Vault 60 - 30kWh",
        power: "30 kW",
        voltage: "307V",
        features: ["4 Modules", "300kg Weight", "307V Nominal"],
        description: "30 kWh High Voltage stack operating at 307V nominal voltage.",
        specifications: { "Energy": "30 kWh", "Nominal Voltage": "307 V", "Operating Voltage": "259-355 V", "Weight": "300 kg" },
        keyFeatures: ["Entry level 30 kWh HV system"],
        applications: ["Small Commercial HV"]
      },
      {
        capacity: "5-units",
        capacityLabel: "37.5 kWh (384V)",
        model: "HV Vault 60 - 37.5kWh",
        power: "37.5 kW",
        voltage: "384V",
        features: ["5 Modules", "375kg Weight", "384V Nominal"],
        description: "37.5 kWh High Voltage stack operating at 384V nominal voltage.",
        specifications: { "Energy": "37.5 kWh", "Nominal Voltage": "384 V", "Operating Voltage": "324-444 V", "Weight": "375 kg" },
        keyFeatures: ["37.5 kWh HV system"],
        applications: ["Medium Commercial HV"]
      },
      {
        capacity: "6-units",
        capacityLabel: "45 kWh (460.8V)",
        model: "HV Vault 60 - 45kWh",
        power: "45 kW",
        voltage: "460.8V",
        features: ["6 Modules", "450kg Weight", "460.8V Nominal"],
        description: "45 kWh High Voltage stack operating at 460.8V nominal voltage.",
        specifications: { "Energy": "45 kWh", "Nominal Voltage": "460.8 V", "Operating Voltage": "389-532 V", "Weight": "450 kg" },
        keyFeatures: ["45 kWh HV system"],
        applications: ["Commercial & Office Plazas"]
      },
      {
        capacity: "7-units",
        capacityLabel: "52.5 kWh (537.6V)",
        model: "HV Vault 60 - 52.5kWh",
        power: "52.5 kW",
        voltage: "537.6V",
        features: ["7 Modules", "525kg Weight", "537.6V Nominal"],
        description: "52.5 kWh High Voltage stack operating at 537.6V nominal voltage.",
        specifications: { "Energy": "52.5 kWh", "Nominal Voltage": "537.6 V", "Operating Voltage": "453-621 V", "Weight": "525 kg" },
        keyFeatures: ["52.5 kWh HV system"],
        applications: ["Industrial Facilities"]
      },
      {
        capacity: "8-units",
        capacityLabel: "60 kWh (614.4V)",
        model: "HV Vault 60 - 60kWh",
        power: "60 kW",
        voltage: "614.4V",
        features: ["8 Modules", "600kg Weight", "614.4V Nominal"],
        description: "Full 60 kWh High Voltage stack operating at 614.4V nominal voltage.",
        specifications: { "Energy": "60 kWh", "Nominal Voltage": "614.4 V", "Operating Voltage": "518-710 V", "Weight": "600 kg" },
        keyFeatures: ["Max 60 kWh capacity in HV 60 series"],
        applications: ["Heavy Industrial", "Large Commercial Projects"]
      }
    ]
  },
  {
    id: 8,
    name: "Power2Go HV Energy Vault 75 System",
    model: "HV Energy Vault 75",
    category: "commercial",
    image: [imgHV60_jpeg],
    capacity: 67.5,
    capacityLabel: "30 - 67.5 kWh Extended",
    power: "67.5 kW",
    voltage: "307V - 691V",
    warranty: "5 Years",
    badge: "Extended HV Stack",
    features: [
      "4 to 9 HV Module Stack",
      "30 kWh to 67.5 kWh Energy Capacity",
      "Up to 691V Nominal Voltage",
      "CAN / RS485 / Modbus TCP",
      "93% Round-trip Efficiency",
      "6000+ Cycles at 100% DOD"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go HV Energy Vault 75 expands high-voltage storage up to 67.5 kWh across 9 module configurations. Built with Modbus TCP protocols for microgrid integration, it supports voltages up to 799V for seamless connection to utility-grade solar inverters.",
    specifications: {
      "Module Type": "P2G HV Energy Vault Module (67.5 kWh series)",
      "Number of Modules": "4 to 9 Modules",
      "Energy Range": "30 kWh to 67.5 kWh",
      "Nominal Voltage Range": "307 V to 691 V",
      "Operating Voltage Range": "259 V to 799 V",
      "Dimensions (H/W/D)": "155 x 483 x 800 mm",
      "Weight Range": "300 kg to 675 kg",
      "Max Output Current": "100 A",
      "Peak Output Current": "170 A (3s)",
      "Battery Chemistry": "Lithium Iron Phosphate (Cobalt-free)",
      "Communication": "CAN / RS485 / Modbus TCP",
      "Certifications": "CE / UN 38.3",
      "Warranty": "5 Years"
    },
    keyFeatures: [
      "Extended 9-module stacking reaching 67.5 kWh total usable energy",
      "Modbus TCP, CAN & RS485 triple-protocol communication interface",
      "High voltage operation up to 799V max for maximum solar array yield",
      "Cobalt-free LFP chemistry engineered for long cycle life (≥6000 cycles)",
      "Smart High Voltage Control Box for automatic over-voltage/current protection",
      "5-Year manufacturer warranty with enterprise service level agreements"
    ],
    applications: [
      "Commercial & Industrial Solar Storage",
      "Hospital Backup Systems",
      "High-Voltage Microgrids",
      "Demand Response & Peak Shaving"
    ],
    variants: [
      {
        capacity: "4-units",
        capacityLabel: "30 kWh (307V)",
        model: "HV Vault 75 - 30kWh",
        power: "30 kW",
        voltage: "307V",
        features: ["4 Modules", "300kg Weight"],
        description: "30 kWh HV setup.",
        specifications: { "Energy": "30 kWh", "Nominal Voltage": "307V", "Weight": "300 kg" },
        keyFeatures: ["30 kWh storage"],
        applications: ["Commercial"]
      },
      {
        capacity: "9-units",
        capacityLabel: "67.5 kWh (691V)",
        model: "HV Vault 75 - 67.5kWh",
        power: "67.5 kW",
        voltage: "691V",
        features: ["9 Modules (Full Stack)", "675kg Weight"],
        description: "Maximum 67.5 kWh HV setup at 691V nominal.",
        specifications: { "Energy": "67.5 kWh", "Nominal Voltage": "691V", "Weight": "675 kg" },
        keyFeatures: ["Max 67.5 kWh capacity"],
        applications: ["Heavy Industrial"]
      }
    ]
  },
  {
    id: 9,
    name: "Power2Go HV Energy Vault 240 Industrial Tower",
    model: "HV Energy Vault 240",
    category: "industrial",
    image: [imgHV240],
    capacity: 240.0,
    capacityLabel: "96 - 240 kWh Utility",
    power: "240.0 kW",
    voltage: "307.2V - 768V",
    warranty: "5 Years",
    badge: "Industrial Utility Scale",
    features: [
      "4 to 10 Heavy HV Modules",
      "96 kWh to 240 kWh Energy Tower",
      "314A Max Continuous Current",
      "514A Peak Surge Current (3s)",
      "CAN / RS485 / Modbus TCP",
      "95% High Efficiency"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go HV Energy Vault 240 is our flagship industrial high-voltage energy storage tower. Housing 4 to 10 heavy-duty battery modules in a 1.96-meter enclosure, it provides scalable industrial energy from 96 kWh up to 240 kWh with a massive 314A continuous discharge capability.",
    specifications: {
      "Module Type": "P2G HV Energy Vault Module (240 kWh series)",
      "Number of Modules": "4 to 10 Modules",
      "Usable Energy Range": "96 kWh / 120 kWh / 144 kWh / 168 kWh / 192 kWh / 216 kWh / 240 kWh",
      "Nominal Voltage Range": "307.2 V to 768 V",
      "Operating Voltage": "400 V DC nominal system",
      "Tower Dimensions (H/W/D)": "1960 x 596 x 803 mm",
      "Weight Range": "300 kg to 750 kg",
      "Max Output Current": "314 A",
      "Peak Output Current": "514 A (3s)",
      "Battery Chemistry": "Lithium Iron Phosphate (Cobalt-free)",
      "Cycle Life": "≥ 6000 cycles",
      "Round-trip Efficiency": "≥ 95%",
      "Communication": "CAN / RS485 / Modbus TCP",
      "Certifications": "CE / UN 38.3",
      "Applications": "On Grid / On Grid + Backup / Off Grid",
      "Warranty": "Max 5 Years"
    },
    keyFeatures: [
      "Industrial utility tower delivering up to 240 kWh storage in a single footprint",
      "High current output of 314A continuous and 514A surge for industrial motor start",
      "Nominal voltage scaling up to 768V for high-voltage industrial grid tie-in",
      "Modbus TCP & CAN bus industrial SCADA system interface",
      "Ultra-high round-trip efficiency (≥95%) minimizing energy conversion losses",
      "5-Year official Power2Go industrial warranty"
    ],
    applications: [
      "Factories & Heavy Manufacturing",
      "Utility Grid Support & Microgrids",
      "Solar Farms & Renewable Parks",
      "Data Centers & Infrastructure"
    ],
    variants: [
      {
        capacity: "4-units",
        capacityLabel: "96 kWh (307.2V)",
        model: "HV Vault 240 - 96kWh",
        power: "96 kW",
        voltage: "307.2V",
        features: ["4 Modules", "96 kWh Capacity", "300kg Weight"],
        description: "96 kWh entry setup for industrial tower.",
        specifications: { "Energy": "96 kWh", "Voltage": "307.2 V", "Weight": "300 kg" },
        keyFeatures: ["96 kWh capacity"],
        applications: ["Small Industrial Plants"]
      },
      {
        capacity: "7-units",
        capacityLabel: "168 kWh (537.6V)",
        model: "HV Vault 240 - 168kWh",
        power: "168 kW",
        voltage: "537.6V",
        features: ["7 Modules", "168 kWh Capacity", "525kg Weight"],
        description: "168 kWh mid setup for industrial tower.",
        specifications: { "Energy": "168 kWh", "Voltage": "537.6 V", "Weight": "525 kg" },
        keyFeatures: ["168 kWh capacity"],
        applications: ["Manufacturing Facilities"]
      },
      {
        capacity: "10-units",
        capacityLabel: "240 kWh (768V)",
        model: "HV Vault 240 - 240kWh",
        power: "240 kW",
        voltage: "768V",
        features: ["10 Modules (Full Tower)", "240 kWh Capacity", "750kg Weight"],
        description: "Maximum 240 kWh full tower setup operating at 768V nominal.",
        specifications: { "Energy": "240 kWh", "Voltage": "768 V", "Weight": "750 kg", "Max Current": "314 A" },
        keyFeatures: ["Maximum 240 kWh capacity", "314A Continuous output"],
        applications: ["Utility Projects", "Heavy Industrial Grids"]
      }
    ]
  },
  {
    id: 11,
    name: "Power2Go PULSE 320 Portable Power Station",
    model: "PULSE 320",
    category: "portable",
    image: [imgPulse320_1, imgPulse320_2],
    capacity: 1.0,
    capacityLabel: "1000 Wh (1.0 kWh)",
    power: "500W Continuous / 1000W Peak",
    voltage: "12V / 25.6V",
    warranty: "5 Years",
    badge: "Portable Station",
    features: [
      "1000 Wh LiFePO4 Battery",
      "500W Pure Sine Wave Output",
      "AC, USB-A, USB-C & DC Ports",
      "Fast 4-5 Hour AC Charge",
      "Lightweight 3.5 kg Chassis",
      "Integrated LED Flashlight"
    ],
    animationInterval: 5000,
    hasVariants: false,
    description: "The Power2Go PULSE 320 is an ultra-portable 1000 Wh LiFePO4 battery power station designed for outdoor power, mobile workspaces, emergency load shedding backup, and field operations. Featuring pure sine wave AC output and multi-port fast charging.",
    specifications: {
      "Energy Capacity": "1000 Wh (25.6V, 39Ah)",
      "Power Output": "500W continuous, 1000W peak surge",
      "Battery Type": "Lithium Iron Phosphate (LiFePO4)",
      "AC Adapter Charge Time": "4 - 5 hours",
      "Cycle Life": "2000+ cycles",
      "Operating Temperature": "0°C to 40°C",
      "Dimensions (L/W/H)": "230 x 140 x 180 mm",
      "Weight": "3.5 kg",
      "Output Ports": "2x AC Outlets, 3x USB-A, 2x USB-C PD, 1x 12V DC",
      "Display": "Digital LED indicator screen",
      "Warranty": "5 Years"
    },
    keyFeatures: [
      "Ultra-portable 3.5 kg compact build with ergonomic carry handle",
      "Safe LiFePO4 battery chemistry delivering over 2000 charge cycles",
      "Pure sine wave AC inverter to safely run sensitive electronics",
      "Multiple simultaneous outputs including USB-C Power Delivery",
      "Fast AC wall charging and solar panel input compatibility",
      "5-Year manufacturer warranty"
    ],
    applications: [
      "Outdoor Camping & Off-Grid Travel",
      "Mobile Office & Drone Charging",
      "Emergency Home Lighting & Wifi Backup",
      "Medical Device Field Backup"
    ]
  },
  {
    id: 12,
    name: "Power2Go P2G Energy Monitoring System (SEM Cloud)",
    model: "SEM-PRO Cloud",
    category: "monitoring",
    image: [imgMonitoring],
    capacity: 0,
    capacityLabel: "Cloud Telemetry",
    power: "Real-Time Telemetry",
    voltage: "Cloud API",
    warranty: "3 Years",
    badge: "Smart Analytics",
    features: [
      "Real-Time 1-Second Telemetry",
      "CAN / RS485 / Modbus Integration",
      "Mobile App & Web Dashboard",
      "Automated Health & Safety Alerts",
      "Unlimited Cloud Historical Data",
      "RESTful API & SCADA Support"
    ],
    animationInterval: 0,
    hasVariants: false,
    description: "The Power2Go Smart Energy Monitoring (SEM-PRO) platform provides real-time telemetry, AI battery health diagnostics, performance analytics, and remote control for all Power2Go LV, HV, and Container storage systems.",
    specifications: {
      "System Type": "Cloud-Based EMS / BMS Monitoring",
      "Connectivity": "Wi-Fi, Ethernet, 4G LTE Gateway",
      "Data Resolution": "Real-time (1-second sampling)",
      "Data Storage": "Unlimited Cloud History",
      "Hardware Interface": "CAN, RS485, Modbus TCP",
      "Alert Channels": "Email, SMS, Push Notifications",
      "Dimensions": "120 x 80 x 30 mm",
      "Weight": "150 g",
      "Operating Voltage": "5V DC USB or 12V DC",
      "Warranty": "3 Years"
    },
    keyFeatures: [
      "Live cell voltage, state of charge (SoC), temperature & health (SoH) monitoring",
      "Predictive AI analytics for energy cost savings and peak shaving optimization",
      "Universal dashboard accessible on iOS, Android, and Desktop web browsers",
      "Instant push alerts for thermal anomaly, over-current, or grid outages",
      "Remote firmware update over-the-air (OTA) support",
      "3-Year warranty with complimentary software upgrades"
    ],
    applications: [
      "Residential Battery Fleet Monitoring",
      "Commercial Microgrid Energy Management",
      "Industrial Asset Protection",
      "Installer & EPC Remote Maintenance"
    ]
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export const FEATURED_DISPLAY_ORDER = [1, 4, 7, 9, 11];