import {
  getPortraitOrders,
  getTattooBookings,
  getClassBookings,
  getInquiries,
} from "@/lib/data/queries";
import { LeadsInbox } from "@/components/admin/leads-inbox";

export default async function AdminLeadsPage() {
  const [orders, tattoos, classes, inquiries] = await Promise.all([
    getPortraitOrders(),
    getTattooBookings(),
    getClassBookings(),
    getInquiries(),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Leads Inbox
      </h1>
      <p className="mt-2 text-muted-foreground">
        All bookings & inquiries — filter by service or search phone
      </p>
      <div className="mt-8">
        <LeadsInbox
          orders={orders}
          tattoos={tattoos}
          classes={classes}
          inquiries={inquiries}
        />
      </div>
    </div>
  );
}
