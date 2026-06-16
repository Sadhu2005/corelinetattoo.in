"use client";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { instagramAccounts } from "@/lib/constants/site";
import { ExternalButtonLink } from "@/components/ui/button-link";

export function InstagramFollow() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <InstagramIcon className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
          Follow Our Journey
        </h2>
        <p className="mt-2 text-muted-foreground">
          Daily tattoos, portraits & reels on Instagram
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {instagramAccounts.map((account) => (
            <ExternalButtonLink
              key={account.handle}
              href={account.url}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{account.handle}
            </ExternalButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
