import { getPortfolioItems } from "@/lib/data/queries";
import { PortfolioManager } from "@/components/admin/portfolio-manager";

export default async function AdminPortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Portfolio
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage gallery images
      </p>
      <div className="mt-8">
        <PortfolioManager items={items} />
      </div>
    </div>
  );
}
