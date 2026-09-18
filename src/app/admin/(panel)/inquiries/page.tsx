import { getInquiries } from "@/lib/data/queries";
import { InquiriesTable } from "@/components/admin/inquiries-table";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Inquiries
      </h1>
      <p className="mt-2 text-muted-foreground">{inquiries.length} total</p>
      <div className="mt-8">
        <InquiriesTable inquiries={inquiries} />
      </div>
    </div>
  );
}
