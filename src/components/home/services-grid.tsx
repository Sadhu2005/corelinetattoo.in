"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicePillars } from "@/lib/constants/site";
import { ButtonLink } from "@/components/ui/button-link";

export function ServicesGrid({
  title = "Our Services",
  subtitle = "Tattoo · Art Works · Dance · Karate · Aerobics & Zumba · Art classes. Book or free trial on WhatsApp — no online payment.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-foreground sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {servicePillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={pillar.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_40px_-24px_rgba(23,24,28,0.35)] transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">
                    {pillar.short}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                  <ul className="mt-4 space-y-1 text-sm text-foreground/80">
                    {pillar.items.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center pt-5 text-sm font-medium text-primary">
                    {pillar.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/zumba/book"
            className="w-full min-w-[180px] neon-border sm:w-auto"
          >
            Free Trial Class
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            className="w-full min-w-[160px] sm:w-auto"
          >
            Call / WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
