import { ServicesGrid } from "@/components/home/services-grid";
import { siteConfig } from "@/lib/constants/site";

export const metadata = {
  title: "Services",
  description: `Tattoo, art works, classical & western dance, Shotokan karate, aerobics & Zumba at ${siteConfig.name}. Free trial — book on WhatsApp.`,
};

export default function ServicesPage() {
  return (
    <div className="py-8">
      <ServicesGrid
        title="All Services"
        subtitle="Tattoo · Art · Dance · Karate · Aerobics. Book or free trial on WhatsApp — no online payment."
      />
    </div>
  );
}
