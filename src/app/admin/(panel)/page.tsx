import { getDashboardCounts, getSiteStats } from "@/lib/data/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteStatsEditor } from "@/components/admin/site-stats-editor";
import { ButtonLink } from "@/components/ui/button-link";

export default async function AdminDashboardPage() {
  const [counts, stats] = await Promise.all([
    getDashboardCounts(),
    getSiteStats(),
  ]);

  const cards = [
    { label: "Pending Art Orders", value: counts.pendingOrders, href: "/admin/orders" },
    { label: "Pending Tattoos", value: counts.pendingBookings, href: "/admin/bookings" },
    { label: "Pending Classes", value: counts.pendingClasses, href: "/admin/classes" },
    { label: "New Inquiries", value: counts.newInquiries, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Dashboard
      </h1>
      <p className="mt-2 text-muted-foreground">
        Leads from WhatsApp bookings — no online payments
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {c.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{c.value}</p>
              <ButtonLink href={c.href} variant="ghost" size="sm" className="mt-2 px-0">
                View
              </ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <ButtonLink href="/admin/leads" className="neon-border">
          Open Leads Inbox
        </ButtonLink>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold">Homepage Stats</h2>
        <SiteStatsEditor stats={stats} />
      </div>
    </div>
  );
}
