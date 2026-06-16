import { getDashboardCounts, getSiteStats } from "@/lib/data/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteStatsEditor } from "@/components/admin/site-stats-editor";

export default async function AdminDashboardPage() {
  const [counts, stats] = await Promise.all([
    getDashboardCounts(),
    getSiteStats(),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide">
        Dashboard
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage orders, bookings & content
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {counts.pendingOrders}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {counts.pendingBookings}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{counts.totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{counts.totalBookings}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold">Homepage Stats</h2>
        <p className="text-sm text-muted-foreground">
          Edit the numbers shown on the homepage hero section
        </p>
        <SiteStatsEditor stats={stats} />
      </div>
    </div>
  );
}
