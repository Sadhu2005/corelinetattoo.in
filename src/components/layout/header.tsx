"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/constants/site";
import { ButtonLink } from "@/components/ui/button-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-white group-hover:text-primary transition-colors">
            {siteConfig.name}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/book-tattoo" size="sm" className="ml-2 neon-border">
            Book Now
          </ButtonLink>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "lg:hidden"
            )}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-background">
            <SheetTitle className="font-[family-name:var(--font-bebas)] text-xl tracking-wider">
              Menu
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <ButtonLink href="/book-tattoo" className="mt-4" onClick={() => setOpen(false)}>
                Book Tattoo
              </ButtonLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
