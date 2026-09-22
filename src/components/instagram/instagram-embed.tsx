"use client";

import { useEffect, useRef } from "react";
import { InstagramIcon } from "@/components/icons/instagram-icon";

interface InstagramEmbedProps {
  postUrl: string;
  accountHandle?: string;
}

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function loadInstagramEmbedScript() {
  if (typeof window === "undefined") return;
  if (document.getElementById("instagram-embed-js")) {
    window.instgrm?.Embeds.process();
    return;
  }
  const script = document.createElement("script");
  script.id = "instagram-embed-js";
  script.async = true;
  script.src = "https://www.instagram.com/embed.js";
  script.onload = () => window.instgrm?.Embeds.process();
  document.body.appendChild(script);
}

export function InstagramEmbed({ postUrl, accountHandle }: InstagramEmbedProps) {
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    loadInstagramEmbedScript();
  }, [postUrl]);

  return (
    <div className="space-y-3">
      <blockquote
        ref={ref}
        className="instagram-media mx-auto w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{ minHeight: 420 }}
      >
        <a href={postUrl} target="_blank" rel="noopener noreferrer" className="sr-only">
          View post on Instagram
        </a>
      </blockquote>
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <InstagramIcon className="h-4 w-4" />
        @{accountHandle ?? "instagram"}
      </a>
    </div>
  );
}
