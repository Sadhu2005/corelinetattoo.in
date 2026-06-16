import { getInstagramEmbeds } from "@/lib/data/queries";
import { InstagramManager } from "@/components/admin/instagram-manager";

export default async function AdminInstagramPage() {
  const embeds = await getInstagramEmbeds();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Instagram
      </h1>
      <p className="mt-2 text-muted-foreground">
        Feature Instagram posts on the homepage
      </p>
      <div className="mt-8">
        <InstagramManager embeds={embeds} />
      </div>
    </div>
  );
}
