# Coreline Art & Tattoo Booking Platform

Dark luxury booking website for portrait sketches, blood art, and custom tattoos. Built with Next.js, Supabase, and Vercel — **100% free tier**.

## Features (V1)

- Home page with hero, stats, recent work, reviews
- Gallery & tattoo design catalog (Pinterest-style)
- Portrait order form with photo upload
- Tattoo booking with calendar
- WhatsApp integration for instant orders
- Instagram embeds & follow links
- Admin panel for orders, bookings, content

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui + Framer Motion
- **Supabase** (Postgres, Auth, Storage)
- **Vercel** hosting (free)

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/Sadhu2005/corelinetattoo.in.git
cd corelinetattoo.in
npm install
```

### 2. Supabase setup (free)

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/migrations/001_initial.sql` in the SQL Editor
3. Create Storage buckets: `portfolio`, `designs`, `uploads`, `testimonials` (public except `uploads`)
4. Create an admin user in Authentication → Users
5. Insert admin profile: `INSERT INTO profiles (id, role, full_name) VALUES ('<user-uuid>', 'admin', 'Your Name');`

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (CI/CD)

This repo uses **GitHub + Vercel** for automatic deployments:

| Event | What happens |
|-------|----------------|
| Push to `main` | Vercel deploys **production** automatically |
| Pull request | Vercel creates a **preview** URL |
| Push / PR | GitHub Actions runs **lint + build** (`.github/workflows/ci.yml`) |

### One-time Vercel setup

1. Push this repo to GitHub (see below)
2. [vercel.com](https://vercel.com) → **Add New Project** → import `Sadhu2005/corelinetattoo.in`
3. Framework: **Next.js** (auto-detected)
4. Add **Environment Variables** (copy from `.env.example` / your `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_STUDIO_NAME`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_PHONE`
   - `NEXT_PUBLIC_ADDRESS`
   - `HEALTH_PING_SECRET` (optional, for weekly Supabase ping)
5. Click **Deploy**

After that, every `git push origin main` redeploys the live site — no manual steps.

### Optional: GitHub Action secrets (health ping)

In GitHub → **Settings → Secrets → Actions**, add:

- `SITE_URL` — e.g. `https://corelinetattoo.in.vercel.app`
- `HEALTH_PING_SECRET` — same value as in Vercel env

This keeps Supabase active via `.github/workflows/health-ping.yml`.

## Admin Panel

Visit `/admin/login` with your Supabase admin credentials.

## Cost

| Service | Cost |
|---------|------|
| GitHub | ₹0 |
| Vercel | ₹0 |
| Supabase | ₹0 (free forever, not a trial) |
| Custom domain (optional) | ₹500–1000/year |

## Phase 2 (coming soon)

- Virtual tattoo try-on
- Order tracking page
- AI tattoo generator
- Customer accounts

## License

Private — Coreline Studio
