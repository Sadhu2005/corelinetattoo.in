export const siteConfig = {
  name: process.env.NEXT_PUBLIC_STUDIO_NAME ?? "Coreline Studio",
  tagline:
    process.env.NEXT_PUBLIC_STUDIO_TAGLINE ??
    "From Imagination to Skin & Canvas",
  description:
    "Coreline Studio — tattoos, custom portraits & drawings, and Zumba dance classes in Karnataka. Book or inquire on WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://corelinetattoo.in.vercel.app",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918494958165",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 84949 58165",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@corelinetattoo.in",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "Hassan & Bengaluru, Karnataka, India",
  googleMapsEmbed:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d76.6394!3d12.2958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE3JzQ0LjkiTiA3NsKwMzgnMjEuOCJF!5e0!3m2!1sen!2sin!4v1",
} as const;

/** Service pillars for Coreline Studio */
export const servicePillars = [
  {
    id: "tattoo",
    title: "Tattoo",
    href: "/tattoo",
    short: "Custom ink, designs & sessions",
    description:
      "Minimal, anime, religious, sleeves and custom tattoos. Book a session — pricing finalized on WhatsApp.",
    cta: "Book Tattoo",
    ctaHref: "/tattoo/book",
  },
  {
    id: "art",
    title: "Drawing & Art",
    href: "/art",
    short: "Blood art, sketches & paintings",
    description:
      "Blood art, pencil sketches and color portraits. Order online — courier available. Discuss details on WhatsApp.",
    cta: "Order Portrait",
    ctaHref: "/art/order",
  },
  {
    id: "zumba",
    title: "Zumba & Dance",
    href: "/zumba",
    short: "Fitness dance classes",
    description:
      "Zumba and dance fitness classes. Book a spot or inquire — fees and timings confirmed on WhatsApp.",
    cta: "Book Class",
    ctaHref: "/zumba/book",
  },
] as const;

export type ServicePillarId = (typeof servicePillars)[number]["id"];

/** Display-only Zumba / dance offerings (fees discussed on WhatsApp) */
export const zumbaClasses = [
  {
    id: "zumba-morning",
    name: "Zumba Morning Batch",
    level: "All levels",
    schedule: "Mon · Wed · Fri — 7:00 AM",
    duration: "45–60 min",
    feeNote: "Monthly fee on request",
  },
  {
    id: "zumba-evening",
    name: "Zumba Evening Batch",
    level: "All levels",
    schedule: "Mon · Wed · Fri — 6:30 PM",
    duration: "45–60 min",
    feeNote: "Monthly fee on request",
  },
  {
    id: "dance-fitness",
    name: "Dance Fitness",
    level: "Beginner friendly",
    schedule: "Tue · Thu — 6:00 PM",
    duration: "45 min",
    feeNote: "Trial class available — ask on WhatsApp",
  },
  {
    id: "weekend-zumba",
    name: "Weekend Zumba",
    level: "All levels",
    schedule: "Saturday — 9:00 AM",
    duration: "60 min",
    feeNote: "Drop-in option — ask on WhatsApp",
  },
] as const;

/** Weekly schedule for Premium UI */
export const zumbaWeeklySchedule = [
  { day: "Monday", slots: ["7:00 AM Zumba", "6:30 PM Zumba"] },
  { day: "Tuesday", slots: ["6:00 PM Dance Fitness"] },
  { day: "Wednesday", slots: ["7:00 AM Zumba", "6:30 PM Zumba"] },
  { day: "Thursday", slots: ["6:00 PM Dance Fitness"] },
  { day: "Friday", slots: ["7:00 AM Zumba", "6:30 PM Zumba"] },
  { day: "Saturday", slots: ["9:00 AM Weekend Zumba"] },
  { day: "Sunday", slots: ["Rest / private sessions on request"] },
] as const;

/** Placeholder IG URLs — replace in Admin with real @coreline__studios reels */
export const seedInstagramUrls = [
  {
    post_url: "https://www.instagram.com/coreline__studios/",
    account_handle: "coreline__studios",
    media_type: "reel" as const,
    featured_on: "home" as const,
  },
];

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
    label: "Color Painting Portrait (canvas paint)",
    priceInr: 8000,
    style: "Color Painting",
    size: "Standard",
    frame: "Canvas",
    isBloodArt: false,
  },
  {
    id: "color-portrait-couple",
    label: "Color Painting — Couple portrait (canvas paint)",
    priceInr: 16000,
    style: "Color Painting",
    size: "Couple",
    frame: "Canvas",
    isBloodArt: false,
  },
  {
    id: "custom-creative",
    label: "Custom Creative Painting — discuss on WhatsApp",
    priceInr: null,
    style: "Custom Creative",
    size: "Custom",
    frame: "As discussed",
    isBloodArt: false,
  },
] as const;

export const courierAddresses = [
  {
    city: "Bengaluru",
    contact: "Ashwath HM",
    phone: "+91 84949 58165",
    lines: [
      "Gnana Bharati, Bengaluru University",
      "PG 3, Bengaluru",
      "PIN 560056, Karnataka",
    ],
  },
  {
    city: "Hassan",
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
    handle: "coreline_art_and_tattoo",
    url: "https://www.instagram.com/coreline_art_and_tattoo/",
    label: "Coreline Art & Tattoo",
  },
  {
    handle: "_ashwath_art_gowda_",
    url: "https://www.instagram.com/_ashwath_art_gowda_/",
    label: "Ashwath Artist",
  },
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/tattoo", label: "Tattoo" },
  { href: "/art", label: "Art" },
  { href: "/zumba", label: "Zumba" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export const portraitStyles = [
  "Blood Art",
  "Pencil Sketch",
  "Color Painting",
  "Custom Creative",
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
] as const;

export const tattooStyles = [
  "Minimal",
  "Anime",
  "Realism",
  "Traditional",
  "Religious",
  "Tribal",
  "Custom",
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
] as const;

export const classTypes = [
  "Zumba Morning Batch",
  "Zumba Evening Batch",
  "Dance Fitness",
  "Weekend Zumba",
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

export function whatsappUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`;
}

export function telHref() {
  return `tel:${siteConfig.phone.replace(/\s/g, "")}`;
}

/** Unified WhatsApp message templates — no payment language */
export const waMessages = {
  general: () =>
    `Hi ${siteConfig.name}! I'd like to know more about your services (Tattoo / Art / Zumba).`,
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
    `Hi ${siteConfig.name}! I want to book a tattoo session.\n\n` +
    `${data.bookingNumber ? `Booking: ${data.bookingNumber}\n` : ""}` +
    `Name: ${data.name}\nPhone: ${data.phone}\nDate: ${data.date}\nTime: ${data.time}\n` +
    `Placement: ${data.placement}\nSize: ${data.size}\nStyle: ${data.style}\n\nPlease confirm details on WhatsApp.`,
  artOrder: (data: {
    name: string;
    phone: string;
    style: string;
    size: string;
    frame: string;
    delivery: string;
    orderNumber?: string;
  }) =>
    `Hi ${siteConfig.name}! I want to order a portrait.\n\n` +
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
    `Hi ${siteConfig.name}! I want to book a Zumba / dance class.\n\n` +
    `${data.bookingNumber ? `Booking: ${data.bookingNumber}\n` : ""}` +
    `Name: ${data.name}\nPhone: ${data.phone}\nClass: ${data.classType}\n` +
    `Preferred date: ${data.date}\nTime: ${data.time}\n\nPlease confirm fees & seat on WhatsApp.`,
  inquire: (data: {
    name: string;
    phone: string;
    pillar: string;
    message: string;
  }) =>
    `Hi ${siteConfig.name}! Inquiry about ${data.pillar}.\n\n` +
    `Name: ${data.name}\nPhone: ${data.phone}\n\n${data.message}\n\nPlease call or reply on WhatsApp.`,
} as const;
