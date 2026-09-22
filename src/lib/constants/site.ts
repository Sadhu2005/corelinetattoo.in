export const siteConfig = {
  name: process.env.NEXT_PUBLIC_STUDIO_NAME ?? "Coreline Studio",
  tagline:
    process.env.NEXT_PUBLIC_STUDIO_TAGLINE ??
    "Studio of Tattoo | Art | Dance | Karate | Aerobics",
  description:
    "Coreline Studio Bengaluru — tattoos & piercings, blood art & portraits, classical & western dance, Shotokan karate, aerobics & Zumba. Book or free trial on WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://corelinetattoo.in.vercel.app",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918494958165",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 84949 58165",
  /** All studio WhatsApp / call numbers from flyer */
  phones: [
    { label: "WhatsApp 1", number: "8494958165", wa: "918494958165" },
    { label: "WhatsApp 2", number: "6361627945", wa: "916361627945" },
    { label: "WhatsApp 3", number: "9008710265", wa: "919008710265" },
  ] as const,
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@corelinetattoo.in",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ??
    "'ALPHA', Kenchena Halli Main Road, BEML 5th Stage, Near The Nachiyar Cafe, RR Nagar (Double Road), Bengaluru — CELLAR",
  addressShort: "RR Nagar, Bengaluru",
  /** Google Maps place — Coreline Studio (dance school listing) */
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ??
    "https://www.google.com/maps?ftid=0x3bae3f0002feeeed:0xd7a2871dc90e8c36",
  googleMapsEmbed:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ??
    "https://www.google.com/maps?ftid=0x3bae3f0002feeeed:0xd7a2871dc90e8c36&output=embed",
} as const;

/** Flyer service pillars — Tattoo, Art, Classes */
export const servicePillars = [
  {
    id: "tattoo",
    title: "Tattoo Studio",
    href: "/tattoo",
    short: "Custom ink · piercings · all India",
    description:
      "Custom tattoos, flash, cover-ups & touch-ups, body piercings. Safe, hygienic work with expert precision. Book a consultation on WhatsApp.",
    cta: "Book Tattoo",
    ctaHref: "/tattoo/book",
    items: [
      "Custom Tattoos",
      "Flash Tattoos",
      "Cover-ups & Touch-ups",
      "Body Piercings",
    ],
    instagram: "@coreline_art_tattoos",
    image: "/images/service-tattoo.jpg",
  },
  {
    id: "art",
    title: "Art Works",
    href: "/art",
    short: "Blood art · sketches · canvas",
    description:
      "Blood art, pencil sketches, portrait & wall painting, creative canvas. Perfect gifts — delivered across India. Order on WhatsApp.",
    cta: "Order Art",
    ctaHref: "/art/order",
    items: [
      "Blood Art",
      "Pencil Sketch",
      "Portrait Painting",
      "Wall Painting",
      "Creative Canvas Painting",
    ],
    instagram: "@_ashwath_art_gowda_",
    image: "/images/service-art.jpg",
  },
  {
    id: "zumba",
    title: "Classes & Studio",
    href: "/zumba",
    short: "Dance · karate · Zumba · art",
    description:
      "Classical dance, western dance, Shotokan karate, aerobics & Zumba, art & drawing classes. Free trial available — book on WhatsApp.",
    cta: "Free Trial Class",
    ctaHref: "/zumba/book",
    items: [
      "Classical Dance",
      "Western Dance",
      "Shotokan Karate",
      "Aerobics & Zumba",
      "Art & Drawing",
    ],
    instagram: "@coreline__studios",
    image: "/images/service-classes.jpg",
  },
] as const;

export const studioImages = {
  hero: "/images/hero-studio.jpg",
  flyer: "/images/flyer.jpg",
  tattoo: "/images/service-tattoo.jpg",
  art: "/images/service-art.jpg",
  classes: "/images/service-classes.jpg",
} as const;

export type ServicePillarId = (typeof servicePillars)[number]["id"];

/** All bookable class types from flyer */
export const studioClasses = [
  {
    id: "classical-dance",
    name: "Classical Dance",
    category: "Dance",
    level: "All levels",
    schedule: "Batches on request",
    duration: "45–60 min",
    feeNote: "Free trial available — confirm on WhatsApp",
  },
  {
    id: "western-dance",
    name: "Western Dance",
    category: "Dance",
    level: "All levels",
    schedule: "Batches on request",
    duration: "45–60 min",
    feeNote: "Free trial available — confirm on WhatsApp",
  },
  {
    id: "shotokan-karate",
    name: "Shotokan Karate",
    category: "Martial Arts",
    level: "All levels",
    schedule: "Batches on request",
    duration: "45–60 min",
    feeNote: "Free trial available — confirm on WhatsApp",
  },
  {
    id: "aerobics-zumba",
    name: "Aerobics & Zumba",
    category: "Fitness",
    level: "All levels",
    schedule: "Batches on request",
    duration: "45–60 min",
    feeNote: "Free trial available — confirm on WhatsApp",
  },
  {
    id: "art-drawing",
    name: "Art & Drawing Classes",
    category: "Art",
    level: "Kids & adults",
    schedule: "Batches on request",
    duration: "45–60 min",
    feeNote: "Free trial available — confirm on WhatsApp",
  },
] as const;

/** @deprecated use studioClasses — kept for imports */
export const zumbaClasses = studioClasses;

export const zumbaWeeklySchedule = [
  { day: "Monday–Saturday", slots: ["Classical Dance", "Western Dance", "Karate", "Aerobics & Zumba", "Art & Drawing"] },
  { day: "Sunday", slots: ["Special / private sessions on request"] },
] as const;

export const bloodArtNote =
  "For blood art portraits, please provide 5ml blood in a purple tube. We will guide you on collection after you order via WhatsApp.";

export const portraitProducts = [
  {
    id: "blood-art-a3",
    label: "Blood Art — A3 size (with frame)",
    priceInr: 4000,
    style: "Blood Art",
    size: "A3",
    frame: "With Frame",
    isBloodArt: true,
  },
  {
    id: "blood-art-a2",
    label: "Blood Art — A2 size (with frame)",
    priceInr: 5000,
    style: "Blood Art",
    size: "A2",
    frame: "With Frame",
    isBloodArt: true,
  },
  {
    id: "blood-art-couple",
    label: "Blood Art — Couple portrait (with frame)",
    priceInr: 8000,
    style: "Blood Art",
    size: "Couple",
    frame: "With Frame",
    isBloodArt: true,
  },
  {
    id: "pencil-sketch",
    label: "Pencil Sketch (with frame)",
    priceInr: 3500,
    style: "Pencil Sketch",
    size: "Standard",
    frame: "With Frame",
    isBloodArt: false,
  },
  {
    id: "pencil-sketch-couple",
    label: "Pencil Sketch — Couple portrait (with frame)",
    priceInr: 7000,
    style: "Pencil Sketch",
    size: "Couple",
    frame: "With Frame",
    isBloodArt: false,
  },
  {
    id: "color-portrait",
    label: "Portrait Painting (canvas)",
    priceInr: 8000,
    style: "Portrait Painting",
    size: "Standard",
    frame: "Canvas",
    isBloodArt: false,
  },
  {
    id: "color-portrait-couple",
    label: "Portrait Painting — Couple (canvas)",
    priceInr: 16000,
    style: "Portrait Painting",
    size: "Couple",
    frame: "Canvas",
    isBloodArt: false,
  },
  {
    id: "wall-painting",
    label: "Wall Painting — discuss on WhatsApp",
    priceInr: null,
    style: "Wall Painting",
    size: "Custom",
    frame: "As discussed",
    isBloodArt: false,
  },
  {
    id: "custom-creative",
    label: "Creative Canvas Painting — discuss on WhatsApp",
    priceInr: null,
    style: "Creative Canvas Painting",
    size: "Custom",
    frame: "As discussed",
    isBloodArt: false,
  },
] as const;

export const courierAddresses = [
  {
    city: "Bengaluru (Studio)",
    contact: "Coreline Studio",
    phone: "+91 84949 58165",
    lines: [
      "'ALPHA', Kenchena Halli Main Road",
      "BEML 5th Stage, Near The Nachiyar Cafe",
      "RR Nagar (Double Road), Bengaluru — CELLAR",
    ],
  },
  {
    city: "Hassan (Courier)",
    contact: "Ashwath HM",
    phone: "+91 84949 58165",
    lines: [
      "Vishal Mart, near Ring Road",
      "Hassan City",
      "Hassan — 573201, Karnataka",
    ],
  },
] as const;

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const instagramAccounts = [
  {
    handle: "coreline__studios",
    url: "https://www.instagram.com/coreline__studios/",
    label: "Coreline Studio",
  },
  {
    handle: "coreline_art_tattoos",
    url: "https://www.instagram.com/coreline_art_tattoos/",
    label: "Tattoo Studio",
  },
  {
    handle: "_ashwath_art_gowda_",
    url: "https://www.instagram.com/_ashwath_art_gowda_/",
    label: "Art Works",
  },
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/tattoo", label: "Tattoo" },
  { href: "/art", label: "Art" },
  { href: "/zumba", label: "Classes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export const portraitStyles = [
  "Blood Art",
  "Pencil Sketch",
  "Portrait Painting",
  "Wall Painting",
  "Creative Canvas Painting",
] as const;

export const portraitSizes = ["A3", "A2", "Couple", "Standard", "Custom"] as const;

export const frameOptions = ["With Frame", "Canvas", "As discussed"] as const;

export const deliveryOptions = ["Courier (Pan India)", "Studio Pickup"] as const;

export const tattooSizes = [
  "Small (2-4 inch)",
  "Medium (4-6 inch)",
  "Large (6+ inch)",
  "Half Sleeve",
  "Full Sleeve",
  "Piercing",
] as const;

export const tattooStyles = [
  "Custom Tattoo",
  "Flash Tattoo",
  "Cover-up / Touch-up",
  "Body Piercing",
  "Minimal",
  "Anime",
  "Religious",
  "Tribal",
] as const;

export const tattooCategories = [
  { value: "minimal", label: "Minimal" },
  { value: "anime", label: "Anime" },
  { value: "couple", label: "Couple" },
  { value: "name", label: "Name Tattoo" },
  { value: "religious", label: "Religious" },
  { value: "sleeve", label: "Sleeve" },
  { value: "tribal", label: "Tribal" },
  { value: "custom", label: "Custom" },
] as const;

export const timeSlots = [
  "7:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
] as const;

export const classTypes = [
  "Classical Dance",
  "Western Dance",
  "Shotokan Karate",
  "Aerobics & Zumba",
  "Art & Drawing Classes",
  "Free Trial Class",
  "Other / Private",
] as const;

export const orderStatuses = [
  { value: "received", label: "Received" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "delivered", label: "Delivered" },
] as const;

export const inquiryStatuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
] as const;

export function whatsappUrl(message: string, waNumber?: string) {
  const num = waNumber ?? siteConfig.whatsapp;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone?: string) {
  const p = phone ?? siteConfig.phone;
  return `tel:${p.replace(/\s/g, "")}`;
}

export const waMessages = {
  general: () =>
    `Hi ${siteConfig.name}! I'd like to know more about Tattoo / Art / Dance / Karate / Zumba.`,
  freeTrial: () =>
    `Hi ${siteConfig.name}! I want to take a FREE TRIAL CLASS at RR Nagar studio.\n\nPlease share available batches.`,
  tattooBook: (data: {
    name: string;
    phone: string;
    date: string;
    time: string;
    placement: string;
    size: string;
    style: string;
    bookingNumber?: string;
  }) =>
    `Hi ${siteConfig.name}! Tattoo / piercing booking.\n\n` +
    `${data.bookingNumber ? `Booking: ${data.bookingNumber}\n` : ""}` +
    `Name: ${data.name}\nPhone: ${data.phone}\nDate: ${data.date}\nTime: ${data.time}\n` +
    `Placement: ${data.placement}\nSize: ${data.size}\nStyle: ${data.style}\n\nPlease confirm on WhatsApp.`,
  artOrder: (data: {
    name: string;
    phone: string;
    style: string;
    size: string;
    frame: string;
    delivery: string;
    orderNumber?: string;
  }) =>
    `Hi ${siteConfig.name}! Art order.\n\n` +
    `${data.orderNumber ? `Order: ${data.orderNumber}\n` : ""}` +
    `Name: ${data.name}\nPhone: ${data.phone}\nStyle: ${data.style}\n` +
    `Size: ${data.size}\nFrame: ${data.frame}\nDelivery: ${data.delivery}\n\nPlease confirm on WhatsApp.`,
  zumbaBook: (data: {
    name: string;
    phone: string;
    classType: string;
    date: string;
    time: string;
    bookingNumber?: string;
  }) =>
    `Hi ${siteConfig.name}! Class booking / free trial.\n\n` +
    `${data.bookingNumber ? `Booking: ${data.bookingNumber}\n` : ""}` +
    `Name: ${data.name}\nPhone: ${data.phone}\nClass: ${data.classType}\n` +
    `Preferred date: ${data.date}\nTime: ${data.time}\n\nStudio: RR Nagar CELLAR. Please confirm.`,
  inquire: (data: {
    name: string;
    phone: string;
    pillar: string;
    message: string;
  }) =>
    `Hi ${siteConfig.name}! Inquiry about ${data.pillar}.\n\n` +
    `Name: ${data.name}\nPhone: ${data.phone}\n\n${data.message}\n\nPlease call or reply on WhatsApp.`,
} as const;
