"use client";

import { useRef } from "react";
import { InstagramEmbed } from "@/components/instagram/instagram-embed";
import type { InstagramEmbed as InstagramEmbedType } from "@/lib/types/database";
import { ExternalButtonLink } from "@/components/ui/button-link";

interface InstagramStripProps {
  embeds: InstagramEmbedType[];
  title?: string;
  accountUrl?: string;
}

export function InstagramStrip({
  embeds,
  title = "From Instagram",
  accountUrl = "https://www.instagram.com/coreline__studios/",
}: InstagramStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!embeds.length) {
    return (
      <section className="border-y border-border py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Follow @coreline__studios — reels appear here when added in Admin.
          </p>
          <ExternalButtonLink
            href={accountUrl}
            variant="outline"
            className="mt-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Instagram
          </ExternalButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide sm:text-4xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Latest from @coreline__studios
            </p>
          </div>
          <ExternalButtonLink
            href={accountUrl}
            variant="ghost"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            Follow
          </ExternalButtonLink>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {embeds.map((embed) => (
            <div
              key={embed.id}
              className="w-[min(85vw,320px)] shrink-0 snap-center sm:w-[300px]"
            >
              <InstagramEmbed
                postUrl={embed.post_url}
                accountHandle={embed.account_handle}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
