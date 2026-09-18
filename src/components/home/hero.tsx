"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden sm:min-h-[90vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-background" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(255,0,51,0.2) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 text-xs uppercase tracking-[0.3em] text-primary sm:text-sm"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-[family-name:var(--font-bebas)] text-5xl leading-none tracking-wide text-white sm:text-7xl md:text-8xl"
        >
          <span className="block text-glow text-primary">{siteConfig.name}</span>
          <span className="mt-2 block text-3xl text-white/90 sm:text-5xl md:text-6xl">
            Tattoo · Art · Zumba
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-lg text-base text-muted-foreground sm:text-lg"
        >
          Book a tattoo, order a portrait, or join Zumba — discuss everything on
          WhatsApp. No online payments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <ButtonLink href="/services" size="lg" className="neon-border">
            Explore Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/tattoo/book" size="lg" variant="outline">
            Book Tattoo
          </ButtonLink>
          <ButtonLink href="/zumba/book" size="lg" variant="ghost">
            Book Class
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
