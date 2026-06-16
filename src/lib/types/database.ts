export type OrderStatus = "received" | "in_progress" | "completed" | "delivered";

export type PortfolioType =
  | "tattoo"
  | "portrait"
  | "blood_art"
  | "before_after"
  | "video";

export type TattooCategory =
  | "minimal"
  | "anime"
  | "couple"
  | "name"
  | "religious"
  | "sleeve"
  | "tribal"
  | "custom";

export interface SiteStat {
  id: string;
  label: string;
  value: string;
  sort_order: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: PortfolioType;
  category: TattooCategory | null;
  image_url: string;
  video_url: string | null;
  instagram_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface TattooDesign {
  id: string;
  title: string;
  category: TattooCategory;
  image_url: string;
  tags: string[];
  is_premium: boolean;
  price_inr: number | null;
  sort_order: number;
  created_at: string;
}

export interface PortraitOrder {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  style: string;
  size: string;
  frame: string;
  delivery_type: string;
  address: string | null;
  reference_image_url: string | null;
  notes: string | null;
  status: OrderStatus;
  created_at: string;
}

export interface TattooBooking {
  id: string;
  booking_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  preferred_date: string;
  preferred_time: string;
  body_placement: string;
  size: string;
  style: string;
  reference_image_url: string | null;
  notes: string | null;
  status: OrderStatus;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  photo_url: string | null;
  review_text: string;
  rating: number;
  service_type: string;
  featured: boolean;
  created_at: string;
}

export interface InstagramEmbed {
  id: string;
  post_url: string;
  account_handle: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}
