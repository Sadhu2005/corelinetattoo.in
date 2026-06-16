export const siteConfig = {
  name: process.env.NEXT_PUBLIC_STUDIO_NAME ?? "Ashwath Artist",
  tagline:
    process.env.NEXT_PUBLIC_STUDIO_TAGLINE ??
    "From Imagination to Skin & Canvas",
  description:
    "Blood art, pencil sketches, color portraits & custom tattoos by Ashwath Artist. Karnataka — courier available across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://corelinetattoo.in.vercel.app",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918494958165",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 84949 58165",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@corelinetattoo.in",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "Hassan & Bengaluru, Karnataka, India",
  googleMapsEmbed:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d76.6394!3d12.2958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE3JzQ0LjkiTiA3NsKwMzgnMjEuOCJF!5e0!3m2!1sen!2sin!4v1",
} as const;

export const bloodArtNote =
  "For blood art portraits, please provide 5ml blood in a purple tube. We will guide you on collection after you order.";

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
    label: "Custom Creative Painting — price on request",
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
  { href: "/gallery", label: "Gallery" },
  { href: "/tattoo-gallery", label: "Tattoo Designs" },
  { href: "/order-portrait", label: "Order Portrait" },
  { href: "/book-tattoo", label: "Book Tattoo" },
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
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
] as const;

export const orderStatuses = [
  { value: "received", label: "Order Received" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "delivered", label: "Delivered" },
] as const;

export function whatsappUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`;
}
