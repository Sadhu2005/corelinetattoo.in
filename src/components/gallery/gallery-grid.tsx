"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { PortfolioItem } from "@/lib/types/database";

interface GalleryGridProps {
  items: PortfolioItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  if (!items.length) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        Gallery coming soon!
      </p>
    );
  }

  return (
    <div className="masonry">
      {items.map((item) => (
        <div key={item.id} className="masonry-item group relative">
          <div className="overflow-hidden rounded-lg border border-border">
            <Image
              src={item.image_url}
              alt={item.title}
              width={400}
              height={500}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <Badge variant="secondary" className="mb-1 capitalize">
                {item.type.replace("_", " ")}
              </Badge>
              <p className="text-sm font-medium text-white">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
