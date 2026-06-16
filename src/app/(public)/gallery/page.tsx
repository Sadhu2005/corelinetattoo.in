import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { getPortfolioItems } from "@/lib/data/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Gallery",
  description:
    "Browse tattoos, portrait sketches, blood art, and before/after transformations.",
};

export default async function GalleryPage() {
  const allItems = await getPortfolioItems();

  const filters = [
    { value: "all", label: "All" },
    { value: "tattoo", label: "Tattoos" },
    { value: "portrait", label: "Portraits" },
    { value: "blood_art", label: "Blood Art" },
    { value: "before_after", label: "Before/After" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">
          Gallery
        </h1>
        <p className="mt-4 text-muted-foreground">
          Tattoos, portraits, blood art & transformations
        </p>
      </div>

      <Tabs defaultValue="all" className="mt-12">
        <TabsList className="mx-auto flex w-full max-w-xl flex-wrap justify-center bg-secondary">
          {filters.map((f) => (
            <TabsTrigger key={f.value} value={f.value} className="capitalize">
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {filters.map((f) => (
          <TabsContent key={f.value} value={f.value} className="mt-8">
            <GalleryGrid
              items={
                f.value === "all"
                  ? allItems
                  : allItems.filter((i) => i.type === f.value)
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
