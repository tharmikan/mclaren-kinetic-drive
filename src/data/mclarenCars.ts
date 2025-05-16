
export interface CarSpec {
  label: string;
  value: string;
}

export interface CarType {
  id: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  price: string;
  year: number;
  type: string;
  slug: string;
  specs: CarSpec[];
  gallery?: string[];
  features?: string[];
}

export const mclarenCars: CarType[] = [
  {
    id: 1,
    name: "McLaren 720S",
    tagline: "Raise Your Limits",
    description: "The McLaren 720S embodies our relentless quest to push the limits of possibility. Born of the track but created for the road, this is a car that delivers on every level.",
    imageUrl: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1632&auto=format&fit=crop",
    price: "$299,000",
    year: 2023,
    type: "Supercar",
    slug: "mclaren-720s",
    specs: [
      { label: "Power", value: "720 HP" },
      { label: "0-100 km/h", value: "2.9s" },
      { label: "Top Speed", value: "341 km/h" },
      { label: "Weight", value: "1,419 kg" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1617496739467-861719a0450b?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628875986390-15280f9865e7?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591105866500-b4d3457044e3?q=80&w=1632&auto=format&fit=crop"
    ],
    features: [
      "Monocage II carbon-fiber chassis",
      "Active aerodynamics",
      "Proactive Chassis Control II",
      "Variable Drift Control",
      "Folding driver display"
    ]
  },
  {
    id: 2,
    name: "McLaren Artura",
    tagline: "The Full Force of Progress",
    description: "The Artura marks the beginning of a new chapter for McLaren as our first high-performance hybrid supercar, offering all the performance, dynamism and engagement for which we are renowned.",
    imageUrl: "https://images.unsplash.com/photo-1580274437636-1c384e617d45?q=80&w=1633&auto=format&fit=crop",
    price: "$225,000",
    year: 2022,
    type: "Hybrid Supercar",
    slug: "mclaren-artura",
    specs: [
      { label: "Power", value: "671 HP" },
      { label: "0-100 km/h", value: "3.0s" },
      { label: "Top Speed", value: "330 km/h" },
      { label: "EV Range", value: "30 km" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503575021232-d272bf56f3ac?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577248143120-c3a1a2907820?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573696376488-e84f0070c915?q=80&w=1632&auto=format&fit=crop"
    ],
    features: [
      "High-performance hybrid powertrain",
      "McLaren Carbon Lightweight Architecture (MCLA)",
      "All-new V6 twin-turbocharged engine",
      "E-motor with torque-infill",
      "Ethernet-based electrical architecture"
    ]
  },
  {
    id: 3,
    name: "McLaren P1",
    tagline: "Maximum Attack",
    description: "The McLaren P1™ represents the ultimate expression of our technological expertise. This is a car that rewrites the rulebook and redefines what is possible.",
    imageUrl: "https://images.unsplash.com/photo-1573950940509-d924ee3fd345?q=80&w=1696&auto=format&fit=crop",
    price: "$1,150,000",
    year: 2013,
    type: "Ultimate Series",
    slug: "mclaren-p1",
    specs: [
      { label: "Power", value: "903 HP" },
      { label: "0-100 km/h", value: "2.8s" },
      { label: "Top Speed", value: "350 km/h" },
      { label: "Weight", value: "1,395 kg" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533559662493-65ccee148898?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544700219-922e55245188?q=80&w=1632&auto=format&fit=crop"
    ],
    features: [
      "IPAS (Instant Power Assist System)",
      "DRS (Drag Reduction System)",
      "MonoCage carbon fiber chassis",
      "RaceActive Chassis Control",
      "Akebono carbon ceramic brakes"
    ]
  },
  {
    id: 4,
    name: "McLaren Senna",
    tagline: "Legalize Performance",
    description: "Named after the legendary Formula 1 driver Ayrton Senna, this is the most track-focused road car we have ever built. It is the ultimate McLaren track car, legalized for the road.",
    imageUrl: "https://images.unsplash.com/photo-1626409325900-31965771d82a?q=80&w=1632&auto=format&fit=crop",
    price: "$958,966",
    year: 2019,
    type: "Ultimate Series",
    slug: "mclaren-senna",
    specs: [
      { label: "Power", value: "789 HP" },
      { label: "0-100 km/h", value: "2.8s" },
      { label: "Downforce", value: "800 kg" },
      { label: "Weight", value: "1,198 kg" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607603750959-d9f8747b6e9a?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611651338412-8487d274ac52?q=80&w=1632&auto=format&fit=crop"
    ],
    features: [
      "Active aerodynamics",
      "RaceActive Chassis Control II",
      "Monocage III carbon structure",
      "Ultra-lightweight construction",
      "Bespoke Pirelli P Zero™ Trofeo R tires"
    ]
  },
  {
    id: 5,
    name: "McLaren GT",
    tagline: "Redefining Grand Touring",
    description: "The McLaren GT challenges the conventions of grand touring. It is lighter, faster, more engaging, and more usable than any car in its class.",
    imageUrl: "https://images.unsplash.com/photo-1566024484339-0933bbe16cd8?q=80&w=1632&auto=format&fit=crop",
    price: "$210,000",
    year: 2022,
    type: "Grand Tourer",
    slug: "mclaren-gt",
    specs: [
      { label: "Power", value: "612 HP" },
      { label: "0-100 km/h", value: "3.2s" },
      { label: "Luggage", value: "570L" },
      { label: "Range", value: "676 km" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1608506375591-b90e1f955e2f?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479255-7f22c21ede3e?q=80&w=1632&auto=format&fit=crop"
    ],
    features: [
      "Proactive Damping Control",
      "Luxurious interior craftsmanship",
      "Bespoke luggage space",
      "Panoramic electrochromic glass roof",
      "Bowers & Wilkins audio system"
    ]
  },
  {
    id: 6,
    name: "McLaren Elva",
    tagline: "A McLaren Like No Other",
    description: "The McLaren Elva is the lightest road car we've ever built. With no roof, no windscreen, and a bespoke carbon fiber chassis, it delivers the purest driving experience.",
    imageUrl: "https://images.unsplash.com/photo-1627662168223-7df99068099a?q=80&w=1632&auto=format&fit=crop",
    price: "$1,690,000",
    year: 2021,
    type: "Ultimate Series",
    slug: "mclaren-elva",
    specs: [
      { label: "Power", value: "804 HP" },
      { label: "0-100 km/h", value: "<3.0s" },
      { label: "0-200 km/h", value: "6.7s" },
      { label: "Weight", value: "<1,300 kg" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621364525332-f9c381f6fb25?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223523-92032bede8a1?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620536858661-693151029e97?q=80&w=1632&auto=format&fit=crop"
    ],
    features: [
      "McLaren Active Air Management System",
      "Open-cockpit design",
      "Bespoke carbon fiber body",
      "Seamless blend of exterior and interior",
      "Limited production of 149 units"
    ]
  }
];
