"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicePillars } from "@/lib/constants/site";
import { ButtonLink } from "@/components/ui/button-link";

export function ServicesGrid({
  title = "Our Services",
  subtitle = "Tattoo · Drawing & Art · Zumba & Dance — book or inquire on WhatsApp. No online payment.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {servicePillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={pillar.href}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary">
                  {pillar.short}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/services" className="w-full min-w-[160px] sm:w-auto">
            View all services
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            className="w-full min-w-[160px] sm:w-auto"
          >
            Call / Inquire
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
