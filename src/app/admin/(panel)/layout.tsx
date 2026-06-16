import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
