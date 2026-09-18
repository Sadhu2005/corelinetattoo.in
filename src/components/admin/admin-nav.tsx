"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Palette,
  Calendar,
  ShoppingBag,
  MessageSquare,
  LogOut,
  Inbox,
  Dumbbell,
  HelpCircle,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { adminLogout } from "@/lib/actions/orders";
import { siteConfig } from "@/lib/constants/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads Inbox", icon: Inbox },
  { href: "/admin/orders", label: "Portrait Orders", icon: ShoppingBag },
  { href: "/admin/bookings", label: "Tattoo Bookings", icon: Calendar },
  { href: "/admin/classes", label: "Class Bookings", icon: Dumbbell },
  { href: "/admin/inquiries", label: "Inquiries", icon: HelpCircle },
  { href: "/admin/portfolio", label: "Portfolio", icon: Image },
  { href: "/admin/designs", label: "Tattoo Designs", icon: Palette },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/instagram", label: "Instagram", icon: InstagramIcon },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-card md:w-64">
      <div className="border-b border-border p-4 md:p-6">
        <Link
          href="/admin"
          className="font-[family-name:var(--font-bebas)] text-xl tracking-wider text-primary"
        >
          Admin
        </Link>
        <p className="text-xs text-muted-foreground">{siteConfig.name}</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
