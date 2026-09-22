"use client";

import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig, whatsappUrl, waMessages, telHref } from "@/lib/constants/site";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-1 px-2 py-2">
        <a
          href={telHref()}
          className="flex flex-col items-center justify-center gap-0.5 rounded-lg py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <Phone className="h-5 w-5" />
          Call
        </a>
        <a
          href={whatsappUrl(waMessages.general())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-lg bg-[#25D366]/15 py-2 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/25"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
        <a
          href={whatsappUrl(waMessages.freeTrial())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-lg py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <Sparkles className="h-5 w-5" />
          Free Trial
        </a>
      </div>
      <p className="sr-only">
        Contact {siteConfig.name} by call, WhatsApp, or free trial class
      </p>
    </div>
  );
}
