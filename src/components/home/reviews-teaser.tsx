"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types/database";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewsTeaserProps {
  testimonials: Testimonial[];
}

export function ReviewsTeaser({ testimonials }: ReviewsTeaserProps) {
  return (
    <section className="border-t border-border bg-card/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
            Client Love
          </h2>
          <p className="mt-2 text-muted-foreground">
            What our clients say about us
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-border bg-background">
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.review_text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-medium">{t.customer_name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/reviews" variant="outline">
            Read All Reviews
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
