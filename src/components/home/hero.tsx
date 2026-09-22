"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  siteConfig,
  studioImages,
  whatsappUrl,
  waMessages,
} from "@/lib/constants/site";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden sm:min-h-[92vh] sm:items-center">
      <Image
        src={studioImages.hero}
        alt="Coreline Studio — bright studio space"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f6f8] via-[#f5f6f8]/75 to-[#f5f6f8]/35 sm:bg-gradient-to-r sm:from-[#f5f6f8]/95 sm:via-[#f5f6f8]/70 sm:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,18,46,0.12),transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-[family-name:var(--font-bebas)] text-6xl leading-[0.92] tracking-wide text-foreground sm:text-7xl md:text-8xl"
          >
            <span className="block text-primary">{siteConfig.name}</span>
            <span className="mt-2 block text-2xl text-foreground/80 sm:text-3xl md:text-4xl">
              Tattoo · Art · Dance · Karate · Aerobics
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg"
          >
            RR Nagar CELLAR, Bengaluru. Book tattoos & art, or take a free trial
            class — all on WhatsApp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <ExternalButtonLink
              href={whatsappUrl(waMessages.freeTrial())}
              size="lg"
              className="neon-border"
              target="_blank"
              rel="noopener noreferrer"
            >
              Free Trial Class
              <ArrowRight className="ml-2 h-4 w-4" />
            </ExternalButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline">
              All Services
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
