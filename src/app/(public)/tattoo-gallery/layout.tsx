import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tattoo Design Gallery",
  description:
    "Browse 1000+ tattoo design references. Minimal, anime, religious, tribal & custom styles.",
};

export default function TattooGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
