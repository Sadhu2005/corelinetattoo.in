import { ServicesGrid } from "@/components/home/services-grid";
import { siteConfig } from "@/lib/constants/site";

export const metadata = {
  title: "Services",
  description: `Tattoo, drawing & art, Zumba dance classes at ${siteConfig.name}. Book or inquire on WhatsApp.`,
};

export default function ServicesPage() {
  return (
    <div className="py-8">
      <ServicesGrid
        title="All Services"
        subtitle="Pick a pillar — then book or inquire. Final details always on WhatsApp. No online payment."
      />
    </div>
  );
}
