"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import type { TattooDesign } from "@/lib/types/database";

interface TattooMasonryProps {
  designs: TattooDesign[];
}

export function TattooMasonry({ designs }: TattooMasonryProps) {
  if (!designs.length) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        No designs found. Check back soon!
      </p>
    );
  }

  return (
    <div className="masonry">
      {designs.map((design) => (
        <div key={design.id} className="masonry-item">
          <div className="group relative overflow-hidden rounded-lg border border-border">
            <Image
              src={design.image_url}
              alt={design.title}
              width={400}
              height={500}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <Badge className="mb-2 w-fit capitalize">{design.category}</Badge>
              <p className="text-sm font-medium text-white">{design.title}</p>
              {design.is_premium && design.price_inr && (
                <p className="text-xs text-primary">₹{design.price_inr}</p>
              )}
              <ButtonLink
                href={`/book-tattoo?style=${encodeURIComponent(design.category)}`}
                size="sm"
                className="mt-3 w-full"
              >
                Book This Style
              </ButtonLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
