"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappUrl, waMessages } from "@/lib/constants/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl(waMessages.general())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 lg:bottom-6 lg:right-6"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
