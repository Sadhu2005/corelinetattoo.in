"use client";

import { useMemo, useState } from "react";
import { TattooMasonry } from "@/components/gallery/tattoo-masonry";
import { tattooCategories } from "@/lib/constants/site";
import type { TattooDesign } from "@/lib/types/database";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function TattooDesignsBrowser({ designs }: { designs: TattooDesign[] }) {
  const [active, setActive] = useState("all");
  const categories = useMemo(
    () => [{ value: "all", label: "All" }, ...tattooCategories],
    []
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4 border-primary text-primary">
          Design references
        </Badge>
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
          Tattoo Designs
        </h1>
        <p className="mt-4 text-muted-foreground">
          Pick a style, then book — finalize on WhatsApp
        </p>
      </div>

      <Tabs
        value={active}
        onValueChange={(v) => {
          if (typeof v === "string") setActive(v);
        }}
        className="mt-12"
      >
        <TabsList className="mx-auto flex h-auto w-full max-w-3xl flex-wrap justify-center gap-1 bg-secondary p-1">
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
    </div>
  );
}
