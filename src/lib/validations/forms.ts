import { z } from "zod";

export const portraitOrderSchema = z.object({
  customer_name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  style: z.string().min(1, "Select a style"),
  size: z.string().min(1, "Select a size"),
  frame: z.string().min(1, "Select frame option"),
  delivery_type: z.string().min(1, "Select delivery option"),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export type PortraitOrderInput = z.infer<typeof portraitOrderSchema>;

export const tattooBookingSchema = z.object({
  customer_name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  preferred_date: z.string().min(1, "Select a date"),
  preferred_time: z.string().min(1, "Select a time slot"),
  body_placement: z.string().min(2, "Body placement is required"),
  size: z.string().min(1, "Select tattoo size"),
  style: z.string().min(1, "Select tattoo style"),
  notes: z.string().optional(),
});

export type TattooBookingInput = z.infer<typeof tattooBookingSchema>;

export const classBookingSchema = z.object({
  customer_name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  class_type: z.string().min(1, "Select a class"),
  preferred_date: z.string().min(1, "Select a date"),
  preferred_time: z.string().min(1, "Select a time"),
  notes: z.string().optional(),
});

export type ClassBookingInput = z.infer<typeof classBookingSchema>;

export const inquirySchema = z.object({
  customer_name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  service_pillar: z.enum(["tattoo", "art", "zumba", "general"]),
  message: z.string().min(5, "Please write a short message"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
