"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/constants/site";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-background" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,0,51,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm uppercase tracking-[0.3em] text-primary"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-[family-name:var(--font-bebas)] text-5xl leading-none tracking-wide text-white sm:text-7xl md:text-8xl"
        >
          <span className="block">Your Story.</span>
          <span className="block text-glow text-primary">Your Tattoo.</span>
          <span className="block">Your Art.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Premium portrait sketches, blood art, and custom tattoos in Karnataka.
          From Instagram inspiration to ink on skin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <ButtonLink href="/book-tattoo" size="lg" className="neon-border min-w-[180px]">
            Book Tattoo
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href="/order-portrait"
            size="lg"
            variant="outline"
            className="min-w-[180px] border-primary/50 hover:bg-primary/10"
          >
            Order Portrait
          </ButtonLink>
          <ButtonLink href="/gallery" size="lg" variant="ghost" className="min-w-[180px]">
            Explore Gallery
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
