"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/lib/constants/site";

export function WhatsAppFab() {
  const message = `Hi ${siteConfig.name}! Thank you for contacting. I'd like to know more about your artwork.`;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
