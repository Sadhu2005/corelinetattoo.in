# Coreline Studio

Mobile-first multi-service studio site: **Tattoo · Drawing & Art · Zumba & Dance**.

Book or inquire on **WhatsApp only** — no online payments. Built with Next.js, Supabase, and Vercel (free tier).

Instagram: [@coreline__studios](https://www.instagram.com/coreline__studios/)

## Features

- Services hub (Tattoo / Art / Zumba)
- Portrait pricing & orders → WhatsApp
- Tattoo booking → WhatsApp
- Zumba class booking & inquiries → WhatsApp
- Admin leads inbox (orders, bookings, classes, inquiries)
- Instagram embeds (paste reel URLs in Admin)
- Mobile sticky CTA: Call | WhatsApp | Book
- Location SEO pages (Hassan / Bengaluru)

## Stack

- Next.js 16 + TypeScript + Tailwind + shadcn/ui + Framer Motion
- Supabase (Postgres, Auth, Storage)
- Vercel hosting + GitHub Actions CI

## Setup

```bash
npm install
cp .env.example .env.local
# fill Supabase + WhatsApp env vars
npm run dev
```

### Supabase

Run SQL in order:

1. `supabase/migrations/001_initial.sql`
2. `supabase/migrations/002_storage.sql`
3. `supabase/migrations/003_multiservice.sql`

Create admin user in Auth, then:

```sql
INSERT INTO profiles (id, role, full_name) VALUES ('<user-uuid>', 'admin', 'Coreline Admin');
```

### Instagram reels

Admin → Instagram → paste post/reel URLs from [@coreline__studios](https://www.instagram.com/coreline__studios/) and pick Home / Tattoo / Art / Zumba.

## Deploy

**Do not use GitHub Pages** — this app needs a Node server (bookings, admin, APIs). Host on **Vercel**.

1. Go to [vercel.com/new](https://vercel.com/new) and import `Sadhu2005/corelinetattoo.in`
2. Add env vars from `.env.example` (Supabase, WhatsApp, studio name, etc.)
3. Deploy — Vercel gives you a link like `https://corelinetattoo-in.vercel.app`

GitHub Actions (CI) only runs **lint + build** (green check ≠ live site). Your public URL comes from Vercel.

Push to `main` after Vercel is connected → auto-deploy on every push.

## Cost

₹0/month on free tiers (GitHub + Vercel + Supabase). Optional domain later.

## License

Private — Coreline Studio
