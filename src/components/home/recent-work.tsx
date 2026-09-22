"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/types/database";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";

interface RecentWorkProps {
  items: PortfolioItem[];
}

export function RecentWork({ items }: RecentWorkProps) {
  if (!items.length) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-foreground">
              Recent Works
            </h2>
            <p className="mt-2 text-muted-foreground">
              Latest tattoos, portraits & blood art
            </p>
          </div>
          <ButtonLink href="/gallery" variant="ghost" className="hidden sm:flex">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {items.slice(0, 6).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform group-hover:translate-y-0">
                <Badge variant="secondary" className="mb-2 capitalize">
                  {item.type.replace("_", " ")}
                </Badge>
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <ButtonLink href="/gallery" variant="outline">
            View All Works
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
