"use client";

import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Card, CardContent } from "@/components/ui/card";

interface InstagramEmbedProps {
  postUrl: string;
  accountHandle?: string;
}

interface OEmbedData {
  html?: string;
  author_name?: string;
  thumbnail_url?: string;
}

export function InstagramEmbed({ postUrl, accountHandle }: InstagramEmbedProps) {
  const [data, setData] = useState<OEmbedData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/instagram/oembed?url=${encodeURIComponent(postUrl)}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError(true));
  }, [postUrl]);

  if (error) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <InstagramIcon className="h-8 w-8 text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            View on Instagram
          </p>
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

  if (!data?.html) {
    return (
      <Card className="border-border animate-pulse">
        <CardContent className="aspect-square p-8" />
      </Card>
    );
  }

  return (
    <div
      className="instagram-embed overflow-hidden rounded-lg border border-border [&_iframe]:!w-full"
      dangerouslySetInnerHTML={{ __html: data.html }}
    />
  );
}
