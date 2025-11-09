export type DesignBlock = {
  title: string;
  description: string;
  items: string[];
};

export type BillOfMaterialsItem = {
  name: string;
  value: string;
  purpose: string;
  cost: string;
};

export type DesignPlan = {
  summary: string;
  productCategory: string;
  positioning: string[];
  coreController: {
    name: string;
    reason: string;
  };
  sensors: BillOfMaterialsItem[];
  connectivity: BillOfMaterialsItem[];
  powerStrategy: DesignBlock;
  hmi: DesignBlock;
  expansion: DesignBlock;
  firmwareStrategy: string[];
  validationPlan: string[];
  billOfMaterials: BillOfMaterialsItem[];
  blocks: DesignBlock[];
  manufacturingNotes: string[];
  risks: string[];
};

type KeywordRule<T> = {
  keywords: string[];
  value: T;
  score?: number;
};

const normalizeText = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const keywordMatch = (text: string, keywords: string[]) =>
  keywords.some((keyword) => text.includes(keyword));

const categoryRules: KeywordRule<string>[] = [
  { keywords: ["wearable", "fitness", "health"], value: "Wearable Health Tracker" },
  { keywords: ["home", "smart", "automation"], value: "Smart Home Controller" },
  { keywords: ["robot", "robotics", "autonomous"], value: "Robotics Platform" },
  { keywords: ["industrial", "factory", "manufacturing"], value: "Industrial Monitoring Node" },
  { keywords: ["agri", "farming", "greenhouse"], value: "Precision Agriculture Monitor" },
  { keywords: ["education", "learning", "edtech"], value: "STEM Education Kit" },
  { keywords: ["medical", "clinic"], value: "Point-of-Care Diagnostic Device" },
];

const defaultCategory = "Embedded IoT Reference Design";

const controllerRules: KeywordRule<{ name: string; reason: string }>[] = [
  {
    keywords: ["edge ai", "machine learning", "vision", "camera"],
    value: {
      name: "NVIDIA Jetson Orin Nano",
      reason:
        "Provides CUDA-accelerated AI inference with room for vision and ML workloads while supporting Linux BSPs.",
    },
  },
  {
    keywords: ["audio", "bluetooth", "portable", "low power", "wearable"],
    value: {
      name: "Nordic nRF5340",
      reason:
        "Dual-core Bluetooth LE and LE Audio support, ultra-low-power sleep modes, and certified reference designs.",
    },
  },
  {
    keywords: ["wifi", "cloud", "mqtt", "web"],
    value: {
      name: "Espressif ESP32-S3",
      reason:
        "Wi-Fi + BLE combo SoC with rich dev tools, TensorFlow Lite support, and inexpensive module options.",
    },
  },
  {
    keywords: ["industrial", "modbus", "ethernet", "real-time"],
    value: {
      name: "STM32H743 with Ethernet PHY",
      reason:
        "Cortex-M7 with industrial connectivity, deterministic RTOS support, and plenty of IO for automation protocols.",
    },
  },
  {
    keywords: ["battery", "solar", "remote", "field"],
    value: {
      name: "Silicon Labs EFR32FG + external PMIC",
      reason:
        "Sub-GHz long-range radio with aggressive low-power performance and energy-friendly development kits.",
    },
  },
];

const defaultController = {
  name: "Raspberry Pi Compute Module 4",
  reason: "Balanced CPU performance, connectivity, and community support for rapid prototyping.",
};

const sensorRules: KeywordRule<BillOfMaterialsItem>[] = [
  {
    keywords: ["temperature", "heat", "therm"],
    value: {
      name: "Texas Instruments TMP117",
      value: "±0.1°C digital temperature sensor",
      purpose: "High-accuracy ambient measurements",
      cost: "$3.90",
    },
  },
  {
    keywords: ["humidity", "moisture"],
    value: {
      name: "Sensirion SHTC3",
      value: "Humidity + temperature sensor",
      purpose: "Environmental tracking",
      cost: "$2.40",
    },
  },
  {
    keywords: ["motion", "imu", "acceleration", "gesture", "wearable"],
    value: {
      name: "Bosch BMI270",
      value: "6-axis IMU",
      purpose: "Motion & gesture sensing",
      cost: "$2.10",
    },
  },
  {
    keywords: ["gps", "gnss", "location", "tracking"],
    value: {
      name: "u-blox MAX-M10S",
      value: "Multi-band GNSS receiver",
      purpose: "Asset localization",
      cost: "$12.00",
    },
  },
  {
    keywords: ["air quality", "voc", "co2"],
    value: {
      name: "Sensirion SGP40 + SCD41",
      value: "VOC and CO₂ combo",
      purpose: "Indoor air quality monitoring",
      cost: "$18.50",
    },
  },
  {
    keywords: ["heart", "spo2", "pulse", "health"],
    value: {
      name: "Analog Devices ADPD4101",
      value: "Optical front-end",
      purpose: "PPG sensing for heart metrics",
      cost: "$6.80",
    },
  },
  {
    keywords: ["pressure", "altitude"],
    value: {
      name: "Bosch BMP390",
      value: "Barometric pressure sensor",
      purpose: "Altitude or environmental monitoring",
      cost: "$2.60",
    },
  },
];

const connectivityRules: KeywordRule<BillOfMaterialsItem>[] = [
  {
    keywords: ["wifi", "cloud", "internet"],
    value: {
      name: "Murata Type 1DX",
      value: "Wi-Fi/BLE combo module",
      purpose: "Secure wireless connectivity",
      cost: "$6.20",
    },
  },
  {
    keywords: ["lorawan", "long range", "agriculture"],
    value: {
      name: "Semtech SX1262",
      value: "LoRa transceiver",
      purpose: "Low-power long-range telemetry",
      cost: "$5.90",
    },
  },
  {
    keywords: ["cellular", "lte", "nb-iot"],
    value: {
      name: "Quectel BG95",
      value: "LTE Cat M1/NB-IoT + GNSS",
      purpose: "Global cellular uplink",
      cost: "$12.80",
    },
  },
  {
    keywords: ["bluetooth", "ble", "wearable"],
    value: {
      name: "Nordic nRF52840 Module",
      value: "Bluetooth LE 5.3",
      purpose: "Smartphone companion connectivity",
      cost: "$4.20",
    },
  },
  {
    keywords: ["ethernet", "poe"],
    value: {
      name: "WIZnet W5500",
      value: "Ethernet controller",
      purpose: "Deterministic wired networking",
      cost: "$3.15",
    },
  },
];

const hmiRules: KeywordRule<DesignBlock>[] = [
  {
    keywords: ["display", "screen", "ui", "touch"],
    value: {
      title: "Human-Machine Interface",
      description: "User facing controls and status feedback.",
      items: [
        "4\" IPS capacitive touch display driven via SPI",
        "Ambient light sensor for adaptive brightness",
        "Capacitive touch or rotary encoder for redundant input",
      ],
    },
  },
  {
    keywords: ["voice", "assistant", "microphone"],
    value: {
      title: "Voice Interaction",
      description: "Hands-free interaction layer.",
      items: [
        "Dual MEMS microphone array with beamforming",
        "Keyword spotting model running on low-power DSP core",
        "Speaker amplifier with 8Ω micro-speaker",
      ],
    },
  },
  {
    keywords: ["indicator", "led", "status"],
    value: {
      title: "Visual Status Indicators",
      description: "Low-power status feedback.",
      items: [
        "RGB status LED for multistate feedback",
        "Bicolor LED for charging or fault diagnostics",
        "Diffused light pipes for enclosure-friendly indicators",
      ],
    },
  },
];

const genericHMI: DesignBlock = {
  title: "Interaction Layer",
  description: "Simple feedback and user input touchpoints.",
  items: [
    "Tri-color LED array for status",
    "Tactile switch or capacitive button for essential control",
    "USB-C debug/configuration access",
  ],
};

const blockTemplates: DesignBlock[] = [
  {
    title: "Sensing",
    description: "Capture physical world signals aligned with requirements.",
    items: [
      "Use 12-bit+ ADC channels for analog sensors",
      "Isolate noisy sensor front-ends with RC filtering and ground planes",
      "Provide test points on critical sensor nets",
    ],
  },
  {
    title: "Compute & Control",
    description: "Central intelligence, real-time control, and scheduling.",
    items: [
      "Run Zephyr RTOS or FreeRTOS with modular drivers",
      "Isolate blocking tasks with message queues",
      "Expose debug SWD header and boot recovery pads",
    ],
  },
  {
    title: "Connectivity & Cloud",
    description: "Link device to companion apps, dashboards, or services.",
    items: [
      "Implement secure boot and signed firmware updates",
      "Use MQTT with device twin abstraction",
      "Provision unique keys in manufacturing via secure element",
    ],
  },
  {
    title: "Power & Battery",
    description: "Stable power rails and energy management.",
    items: [
      "Segment rails (digital/analog/RF) with LC filtering",
      "Size battery capacity for 1.5× peak daily usage",
      "Integrate fuel gauge for precise SOC reporting",
    ],
  },
];

const manufacturingInsights = [
  "Design for Design for Manufacture (DFM) by keeping component availability verified through Octopart or Sourcengine.",
  "Add in-circuit test pads for every power rail and communication bus.",
  "Plan enclosure tolerances early; align connector placement with mechanical CAD.",
  "Document programming and calibration at end-of-line to keep CM ramp smooth.",
];

const baselineValidationPlan = [
  "Electrical bring-up with staged power enabling and current monitoring.",
  "Firmware smoke tests covering boot, connectivity, sensing, and data logging.",
  "Environmental stress screening aligned with target deployment climate.",
  "Functional testing against user stories with automated logging where possible.",
];

const baselineRisks = [
  "Component lead-time volatility — secure alternates for all ICs and passives.",
  "Thermal budget creep when packing RF, compute, and batteries in tight spaces.",
  "Firmware complexity — allocate time for integration, OTA, and diagnostics.",
];

const defaultBOM: BillOfMaterialsItem[] = [
  {
    name: "STM32 Power Management IC",
    value: "Multi-rail buck + LDO",
    purpose: "Regulate MCU, sensors, and RF rails",
    cost: "$2.50",
  },
  {
    name: "Secure Element",
    value: "Microchip ATECC608",
    purpose: "Hardware root of trust and key store",
    cost: "$0.90",
  },
  {
    name: "16 MB QSPI Flash",
    value: "Winbond W25Q128",
    purpose: "Firmware images, ML models, data logging",
    cost: "$1.10",
  },
];

const expansionIdeas: KeywordRule<DesignBlock>[] = [
  {
    keywords: ["modular", "scalable", "expansion", "plug"],
    value: {
      title: "Expansion & Modularity",
      description: "Design for extendibility and SKU variations.",
      items: [
        "Expose high-speed expansion via board-to-board mezzanine connector",
        "Support mikroBUS/Qwiic headers for rapid prototyping add-ons",
        "Provide spare GPIO/UART/I2C pins on castellated edges",
      ],
    },
  },
  {
    keywords: ["cloud", "dashboard", "analytics"],
    value: {
      title: "Data & Cloud Platform",
      description: "Ensure data pipeline and application integrations from day one.",
      items: [
        "Stream normalized telemetry to Timescale or InfluxDB",
        "Provide REST/Webhook interface for downstream services",
        "Define JSON or protobuf schema for telemetry and commands",
      ],
    },
  },
];

const defaultExpansion: DesignBlock = {
  title: "Scalability Hooks",
  description: "Allow extending functionality without respinning the core board.",
  items: [
    "Reserve I²C and UART headers for accessory boards",
    "Expose SWD/JTAG and battery test points externally",
    "Keep enclosure-friendly slot for future radio modules",
  ],
};

const firmwareStrategies: KeywordRule<string[]>[] = [
  {
    keywords: ["linux", "jetson", "nvidia", "edge ai"],
    value: [
      "Use Yocto or NVIDIA JetPack for BSP with containerized services.",
      "Run high-level orchestration in Docker, keep real-time loops on microcontroller co-processor.",
      "Integrate OTA with RAUC or Mender for robust field updates.",
    ],
  },
  {
    keywords: ["rtos", "deterministic", "low latency"],
    value: [
      "Adopt Zephyr RTOS with device tree-based hardware abstraction.",
      "Use workqueues for sensor fusion pipelines and asynchronous networking.",
      "Add unit tests with twister harness and hardware-in-loop smoke tests.",
    ],
  },
  {
    keywords: ["prototype", "quick", "fast"],
    value: [
      "Start with PlatformIO and Arduino frameworks for rapid iteration.",
      "Encapsulate business logic in portable C++ libraries for future migration.",
      "Add hardware abstraction interfaces to simplify board swaps.",
    ],
  },
];

const defaultFirmwareStrategy = [
  "Adopt Zephyr RTOS for modular drivers and modern build tooling.",
  "Implement continuous integration with hardware-in-the-loop smoke tests.",
  "Separate application logic from drivers to prepare for SKU variants.",
];

const powerStrategies: KeywordRule<DesignBlock>[] = [
  {
    keywords: ["battery", "portable", "mobile"],
    value: {
      title: "Power Strategy",
      description: "Optimized for battery-backed, portable designs.",
      items: [
        "3.7V Li-Ion pack with buck-boost regulation for 3.3V and 5V rails",
        "Fuel gauge (MAX17262) with host alerts for low battery events",
        "Sleep current budget <100 µA through aggressive peripheral gating",
      ],
    },
  },
  {
    keywords: ["mains", "plug", "wall", "120v", "230v"],
    value: {
      title: "Power Strategy",
      description: "For stationary, mains-powered installations.",
      items: [
        "Isolated flyback PSU with 90-264VAC input range and medical-grade creepage clearances",
        "Supercap-backed RTC supply to ride through brownouts",
        "Surge and ESD protection on all external interfaces",
      ],
    },
  },
  {
    keywords: ["solar", "remote", "outdoor"],
    value: {
      title: "Power Strategy",
      description: "Harvest-enabled remote deployment.",
      items: [
        "Solar + MPPT controller sized for winter irradiance minimums",
        "LiFePO₄ pack for temperature-tolerant storage",
        "Low-power watchdog and brownout monitoring for unattended uptime",
      ],
    },
  },
];

const defaultPowerStrategy: DesignBlock = {
  title: "Power Strategy",
  description: "Baseline regulated power architecture.",
  items: [
    "12V input to wide-input buck regulators for 5V and 3.3V rails",
    "Low-noise LDO for analog/RF domains, digital on switching regulators",
    "Inline transient and reverse polarity protection",
  ],
};

export function analyzeRequirements(rawInput: string): DesignPlan {
  const processed = normalizeText(rawInput);
  const empty = processed.length === 0;

  const productCategory =
    categoryRules.find((rule) => keywordMatch(processed, rule.keywords))?.value ||
    defaultCategory;

  const controller =
    controllerRules.find((rule) => keywordMatch(processed, rule.keywords))?.value ||
    defaultController;

  const sensors = sensorRules
    .filter((rule) => keywordMatch(processed, rule.keywords))
    .map((rule) => rule.value);

  const connectivity = connectivityRules
    .filter((rule) => keywordMatch(processed, rule.keywords))
    .map((rule) => rule.value);

  const hmi =
    hmiRules.find((rule) => keywordMatch(processed, rule.keywords))?.value || genericHMI;

  const expansion =
    expansionIdeas.find((rule) => keywordMatch(processed, rule.keywords))?.value ||
    defaultExpansion;

  const firmware =
    firmwareStrategies.find((rule) => keywordMatch(processed, rule.keywords))?.value ||
    defaultFirmwareStrategy;

  const powerStrategy =
    powerStrategies.find((rule) => keywordMatch(processed, rule.keywords))?.value ||
    defaultPowerStrategy;

  const blockList = blockTemplates.map((block) => ({
    ...block,
  }));

  const positioning: string[] = [];
  if (keywordMatch(processed, ["low cost", "affordable", "cheap"])) {
    positioning.push("Optimize BOM for <$50 retail by favoring high-availability ICs.");
  }
  if (keywordMatch(processed, ["premium", "high end", "flagship"])) {
    positioning.push("Deliver a premium experience with industrial design and advanced UX.");
  }
  if (keywordMatch(processed, ["fast to market", "urgent", "mvp"])) {
    positioning.push("Prioritize module-based design to achieve a <10 week EVT timeline.");
  }
  if (keywordMatch(processed, ["scalable", "mass production", "manufacturing"])) {
    positioning.push("Design for 10k unit production with CM-friendly DFM and DFT features.");
  }
  if (positioning.length === 0) {
    positioning.push(
      "Balance innovation with manufacturability; anchor decisions in user journeys and unit economics."
    );
  }

  const billOfMaterials = [
    controller
      ? {
          name: controller.name,
          value: "Main compute module",
          purpose: controller.reason,
          cost: "—",
        }
      : null,
    ...sensors,
    ...connectivity,
    ...defaultBOM,
  ].filter((item): item is BillOfMaterialsItem => item !== null);

  const summary = empty
    ? "Describe the product goals, environment, and constraints to generate a tailored electronic design concept."
    : `High-level concept for a ${productCategory.toLowerCase()} built around the ${controller.name}.`;

  const validationPlan = [
    ...baselineValidationPlan,
    ...(keywordMatch(processed, ["wearable", "body", "health"])
      ? ["Perform biocompatibility and skin-contact certification (ISO 10993)."]
      : []),
    ...(keywordMatch(processed, ["outdoor", "weather", "rugged"])
      ? ["Run IP54/IP67 ingress testing and UV endurance validation."]
      : []),
  ];

  const risks = [
    ...baselineRisks,
    ...(keywordMatch(processed, ["custom enclosure", "aesthetic"])
      ? ["Custom industrial design may extend tooling lead times to 14+ weeks."]
      : []),
    ...(keywordMatch(processed, ["cellular", "certification"])
      ? ["Regulatory approvals (PTCRB, carrier) can add cost and schedule risk."]
      : []),
  ];

  return {
    summary,
    productCategory,
    positioning,
    coreController: controller,
    sensors,
    connectivity,
    powerStrategy,
    hmi,
    expansion,
    firmwareStrategy: firmware,
    validationPlan,
    billOfMaterials,
    blocks: blockList,
    manufacturingNotes: manufacturingInsights,
    risks,
  };
}
