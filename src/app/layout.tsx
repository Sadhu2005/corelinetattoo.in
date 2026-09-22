import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Tattoo · Art · Dance · Karate · Aerobics`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Coreline Studio",
    "Tattoo Studio Bengaluru",
    "Tattoo RR Nagar",
    "Blood Art Portrait India",
    "Classical Dance Bengaluru",
    "Western Dance RR Nagar",
    "Shotokan Karate Bengaluru",
    "Aerobics Zumba RR Nagar",
    "Portrait Artist Karnataka",
  ],
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bebas.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen font-[family-name:var(--font-outfit)] antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
