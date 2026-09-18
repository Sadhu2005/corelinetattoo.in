"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  portraitOrderSchema,
  tattooBookingSchema,
  classBookingSchema,
  inquirySchema,
  type PortraitOrderInput,
  type TattooBookingInput,
  type ClassBookingInput,
  type InquiryInput,
} from "@/lib/validations/forms";
import { whatsappUrl, waMessages } from "@/lib/constants/site";

function generateNumber(prefix: string) {
  const date = new Date();
  const ymd =
    String(date.getFullYear()).slice(2) +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");
  const seq = Math.floor(Math.random() * 900000 + 100000);
  return `${prefix}-${ymd}-${seq}`;
}

async function uploadReferenceImage(
  file: File | null,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(path, file, { upsert: false });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("uploads").getPublicUrl(path);
  return data.publicUrl;
}

export async function submitPortraitOrder(
  data: PortraitOrderInput,
  formData: FormData
) {
  const parsed = portraitOrderSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message };
  }

  const file = formData.get("reference_image") as File | null;
  const referenceImageUrl = await uploadReferenceImage(file, "portraits");
  const orderNumber = generateNumber("POR");

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const { error } = await supabase.from("portrait_orders").insert({
      order_number: orderNumber,
      customer_name: parsed.data.customer_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      style: parsed.data.style,
      size: parsed.data.size,
      frame: parsed.data.frame,
      delivery_type: parsed.data.delivery_type,
      address: parsed.data.address || null,
      reference_image_url: referenceImageUrl,
      notes: parsed.data.notes || null,
      status: "received",
    });

    if (error) {
      return { success: false as const, error: error.message };
    }
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin/leads");

  const message = waMessages.artOrder({
    name: parsed.data.customer_name,
    phone: parsed.data.phone,
    style: parsed.data.style,
    size: parsed.data.size,
    frame: parsed.data.frame,
    delivery: parsed.data.delivery_type,
    orderNumber,
  });

  return {
    success: true as const,
    orderNumber,
    whatsappLink: whatsappUrl(message),
  };
}

export async function submitTattooBooking(
  data: TattooBookingInput,
  formData: FormData
) {
  const parsed = tattooBookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message };
  }

  const file = formData.get("reference_image") as File | null;
  const referenceImageUrl = await uploadReferenceImage(file, "tattoos");
  const bookingNumber = generateNumber("TAT");

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const { error } = await supabase.from("tattoo_bookings").insert({
      booking_number: bookingNumber,
      customer_name: parsed.data.customer_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      preferred_date: parsed.data.preferred_date,
      preferred_time: parsed.data.preferred_time,
      body_placement: parsed.data.body_placement,
      size: parsed.data.size,
      style: parsed.data.style,
      reference_image_url: referenceImageUrl,
      notes: parsed.data.notes || null,
      status: "received",
    });

    if (error) {
      return { success: false as const, error: error.message };
    }
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/leads");

  const message = waMessages.tattooBook({
    name: parsed.data.customer_name,
    phone: parsed.data.phone,
    date: parsed.data.preferred_date,
    time: parsed.data.preferred_time,
    placement: parsed.data.body_placement,
    size: parsed.data.size,
    style: parsed.data.style,
    bookingNumber,
  });

  return {
    success: true as const,
    bookingNumber,
    whatsappLink: whatsappUrl(message),
  };
}

export async function submitClassBooking(data: ClassBookingInput) {
  const parsed = classBookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message };
  }

  const bookingNumber = generateNumber("CLS");

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const { error } = await supabase.from("class_bookings").insert({
      booking_number: bookingNumber,
      customer_name: parsed.data.customer_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      class_type: parsed.data.class_type,
      preferred_date: parsed.data.preferred_date,
      preferred_time: parsed.data.preferred_time,
      notes: parsed.data.notes || null,
      status: "received",
    });

    if (error) {
      return { success: false as const, error: error.message };
    }
  }

  revalidatePath("/admin/classes");
  revalidatePath("/admin/leads");

  const message = waMessages.zumbaBook({
    name: parsed.data.customer_name,
    phone: parsed.data.phone,
    classType: parsed.data.class_type,
    date: parsed.data.preferred_date,
    time: parsed.data.preferred_time,
    bookingNumber,
  });

  return {
    success: true as const,
    bookingNumber,
    whatsappLink: whatsappUrl(message),
  };
}

export async function submitInquiry(data: InquiryInput) {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message };
  }

  const inquiryNumber = generateNumber("INQ");

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").insert({
      inquiry_number: inquiryNumber,
      customer_name: parsed.data.customer_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      service_pillar: parsed.data.service_pillar,
      message: parsed.data.message,
      status: "new",
    });

    if (error) {
      return { success: false as const, error: error.message };
    }
  }

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/leads");

  const message = waMessages.inquire({
    name: parsed.data.customer_name,
    phone: parsed.data.phone,
    pillar: parsed.data.service_pillar,
    message: parsed.data.message,
  });

  return {
    success: true as const,
    inquiryNumber,
    whatsappLink: whatsappUrl(message),
  };
}

export async function updateOrderStatus(
  id: string,
  status: string,
  type: "portrait" | "tattoo" | "class"
) {
  const supabase = await createClient();
  const table =
    type === "portrait"
      ? "portrait_orders"
      : type === "tattoo"
        ? "tattoo_bookings"
        : "class_bookings";
  const { error } = await supabase.from(table).update({ status }).eq("id", id);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/admin/orders");
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/classes");
  revalidatePath("/admin/leads");
  return { success: true as const };
}

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/leads");
  return { success: true as const };
}

export async function adminLogin(email: string, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false as const, error: error.message };
  return { success: true as const };
}

export async function adminLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true as const };
}

export async function addInstagramEmbed(
  postUrl: string,
  accountHandle: string,
  mediaType: string = "post",
  featuredOn: string = "home"
) {
  const supabase = await createClient();
  const { error } = await supabase.from("instagram_embeds").insert({
    post_url: postUrl,
    account_handle: accountHandle,
    media_type: mediaType,
    featured_on: featuredOn,
    active: true,
    sort_order: 0,
  });
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/");
  revalidatePath("/tattoo");
  revalidatePath("/art");
  revalidatePath("/zumba");
  revalidatePath("/admin/instagram");
  return { success: true as const };
}

export async function deleteInstagramEmbed(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("instagram_embeds").delete().eq("id", id);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/instagram");
  return { success: true as const };
}

export async function updateSiteStat(id: string, value: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("site_stats").update({ value }).eq("id", id);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true as const };
}

export async function addTestimonial(data: {
  customer_name: string;
  review_text: string;
  rating: number;
  service_type: string;
  featured: boolean;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(data);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/reviews");
  revalidatePath("/admin/testimonials");
  return { success: true as const };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/reviews");
  revalidatePath("/admin/testimonials");
  return { success: true as const };
}

export async function addPortfolioItem(data: {
  title: string;
  type: string;
  category?: string;
  image_url: string;
  featured?: boolean;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_items").insert({
    ...data,
    featured: data.featured ?? false,
    sort_order: 0,
  });
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/gallery");
  revalidatePath("/admin/portfolio");
  return { success: true as const };
}

export async function deletePortfolioItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/gallery");
  revalidatePath("/admin/portfolio");
  return { success: true as const };
}

export async function addTattooDesign(data: {
  title: string;
  category: string;
  image_url: string;
  is_premium?: boolean;
  price_inr?: number;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("tattoo_designs").insert({
    ...data,
    is_premium: data.is_premium ?? false,
    sort_order: 0,
    tags: [],
  });
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/tattoo-gallery");
  revalidatePath("/admin/designs");
  return { success: true as const };
}

export async function deleteTattooDesign(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("tattoo_designs").delete().eq("id", id);
  if (error) return { success: false as const, error: error.message };
  revalidatePath("/tattoo-gallery");
  revalidatePath("/admin/designs");
  return { success: true as const };
}

export async function uploadAdminImage(
  formData: FormData,
  bucket: "portfolio" | "designs" | "testimonials"
) {
  const file = formData.get("file") as File | null;
  if (!file) return { success: false as const, error: "No file provided" };

  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "webp";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) return { success: false as const, error: error.message };

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { success: true as const, url: data.publicUrl };
}
