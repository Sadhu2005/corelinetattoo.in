"use client";

import { motion } from "framer-motion";
import type { SiteStat } from "@/lib/types/database";

interface StatsProps {
  stats: SiteStat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="border-y border-border bg-card py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-primary sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
