import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { siteConfig, navLinks, instagramAccounts } from "@/lib/constants/site";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-primary">
              {siteConfig.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {siteConfig.address}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              {instagramAccounts.map((account) => (
                <a
                  key={account.handle}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @{account.handle}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Tattoo · Art · Dance · Karate · Aerobics · RR Nagar CELLAR</p>
        </div>
      </div>
    </footer>
  );
}
