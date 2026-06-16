import { createClient } from "@/lib/supabase/server";
import type {
  InstagramEmbed,
  PortfolioItem,
  SiteStat,
  TattooBooking,
  TattooDesign,
  Testimonial,
  PortraitOrder,
} from "@/lib/types/database";

const defaultStats: SiteStat[] = [
  { id: "1", label: "Portraits", value: "500+", sort_order: 1 },
  { id: "2", label: "Tattoos", value: "300+", sort_order: 2 },
  { id: "3", label: "Years Experience", value: "4+", sort_order: 3 },
  { id: "4", label: "Happy Clients", value: "1000+", sort_order: 4 },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    customer_name: "Priya S.",
    photo_url: null,
    review_text:
      "Amazing blood art portrait! Captured every detail perfectly. Highly recommend Coreline Studio.",
    rating: 5,
    service_type: "portrait",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    customer_name: "Rahul K.",
    photo_url: null,
    review_text:
      "Best tattoo experience in Mysore. Clean studio, professional artist, stunning minimal design.",
    rating: 5,
    service_type: "tattoo",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    customer_name: "Ananya M.",
    photo_url: null,
    review_text:
      "Got a couple portrait as anniversary gift. My husband was speechless. True artist!",
    rating: 5,
    service_type: "portrait",
    featured: true,
    created_at: new Date().toISOString(),
  },
];

const placeholderImages = [
  "https://images.unsplash.com/photo-1598371839696-5c5bb00c9325?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1611501275019-89932998388?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1562962230-16e4623d36e?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1590246814883-05c672a2d0cc?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1612178537259-b815f2a12678?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop",
];

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getSiteStats(): Promise<SiteStat[]> {
  if (!isSupabaseConfigured()) return defaultStats;
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_stats")
    .select("*")
    .order("sort_order");
  return data?.length ? data : defaultStats;
}

export async function getFeaturedPortfolio(
  limit = 6
): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured()) {
    return placeholderImages.slice(0, limit).map((url, i) => ({
      id: String(i),
      title: `Featured Work ${i + 1}`,
      type: i % 2 === 0 ? "tattoo" : "portrait",
      category: "custom",
      image_url: url,
      video_url: null,
      instagram_url: null,
      featured: true,
      sort_order: i,
      created_at: new Date().toISOString(),
    }));
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("featured", true)
    .order("sort_order")
    .limit(limit);
  if (data?.length) return data;
  const { data: all } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return all ?? [];
}

export async function getPortfolioItems(
  type?: string
): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured()) {
    return placeholderImages.map((url, i) => ({
      id: String(i),
      title: `Gallery ${i + 1}`,
      type: (["tattoo", "portrait", "blood_art"] as const)[i % 3],
      category: "custom",
      image_url: url,
      video_url: null,
      instagram_url: null,
      featured: i < 3,
      sort_order: i,
      created_at: new Date().toISOString(),
    }));
  }
  const supabase = await createClient();
  let query = supabase.from("portfolio_items").select("*").order("sort_order");
  if (type && type !== "all") {
    query = query.eq("type", type);
  }
  const { data } = await query;
  return data ?? [];
}

export async function getTattooDesigns(
  category?: string
): Promise<TattooDesign[]> {
  if (!isSupabaseConfigured()) {
    return placeholderImages.map((url, i) => ({
      id: String(i),
      title: `Design ${i + 1}`,
      category: (
        ["minimal", "anime", "religious", "tribal", "custom", "sleeve"] as const
      )[i % 6],
      image_url: url,
      tags: [],
      is_premium: false,
      price_inr: null,
      sort_order: i,
      created_at: new Date().toISOString(),
    }));
  }
  const supabase = await createClient();
  let query = supabase.from("tattoo_designs").select("*").order("sort_order");
  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  const { data } = await query;
  return data ?? [];
}

export async function getTestimonials(
  featuredOnly = false
): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return defaultTestimonials;
  const supabase = await createClient();
  let query = supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (featuredOnly) query = query.eq("featured", true);
  const { data } = await query;
  return data?.length ? data : defaultTestimonials;
}

export async function getInstagramEmbeds(): Promise<InstagramEmbed[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("instagram_embeds")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getPortraitOrders(): Promise<PortraitOrder[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("portrait_orders")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getTattooBookings(): Promise<TattooBooking[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("tattoo_bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getDashboardCounts() {
  const [orders, bookings] = await Promise.all([
    getPortraitOrders(),
    getTattooBookings(),
  ]);
  return {
    pendingOrders: orders.filter((o) => o.status === "received").length,
    pendingBookings: bookings.filter((b) => b.status === "received").length,
    totalOrders: orders.length,
    totalBookings: bookings.length,
  };
}
