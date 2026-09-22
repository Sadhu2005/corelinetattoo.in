"use client";

import { useEffect, useRef, useState } from "react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Card, CardContent } from "@/components/ui/card";

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
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      loadInstagramEmbedScript();
      const t = window.setTimeout(() => {
        if (ref.current && !ref.current.querySelector("iframe")) {
          setFailed(true);
        }
      }, 8000);
      return () => window.clearTimeout(t);
    } catch {
      setFailed(true);
    }
  }, [postUrl]);

  if (failed) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <InstagramIcon className="h-8 w-8 text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">View on Instagram</p>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm text-primary hover:underline"
          >
            @{accountHandle ?? "instagram"}
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
}
