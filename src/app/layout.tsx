import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Tattoo & Portrait Artist Karnataka`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Tattoo Artist Mysore",
    "Tattoo Artist Coorg",
    "Tattoo Studio Karnataka",
    "Portrait Artist Karnataka",
    "Blood Art Portrait India",
    "Custom Sketch Artist India",
  ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} dark`}>
      <body className="min-h-screen font-[family-name:var(--font-inter)] antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
