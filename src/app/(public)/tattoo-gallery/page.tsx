"use client";

import { useEffect, useState } from "react";
import { TattooMasonry } from "@/components/gallery/tattoo-masonry";
import { tattooCategories } from "@/lib/constants/site";
import type { TattooDesign } from "@/lib/types/database";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function TattooGalleryPage() {
  const [designs, setDesigns] = useState<TattooDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/designs")
      .then((r) => r.json())
      .then(setDesigns)
      .finally(() => setLoading(false));
  }, []);

  const categories = [{ value: "all", label: "All" }, ...tattooCategories];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4 border-primary text-primary">
          1000+ References
        </Badge>
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
          Tattoo Design Gallery
        </h1>
        <p className="mt-4 text-muted-foreground">
          Pinterest-style inspiration — book your favorite style
        </p>
      </div>

      {loading ? (
        <p className="py-20 text-center text-muted-foreground">Loading designs...</p>
      ) : (
        <Tabs defaultValue="all" className="mt-12">
          <TabsList className="mx-auto flex w-full max-w-3xl flex-wrap justify-center bg-secondary h-auto gap-1 p-1">
            {categories.map((c) => (
              <TabsTrigger key={c.value} value={c.value} className="capitalize">
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((c) => (
            <TabsContent key={c.value} value={c.value} className="mt-8">
              <TattooMasonry
                designs={
                  c.value === "all"
                    ? designs
                    : designs.filter((d) => d.category === c.value)
                }
              />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
