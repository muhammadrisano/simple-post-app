import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 6 characters"),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 6 characters"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;