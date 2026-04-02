import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category_id: z.string().min(1, "Category is required")
});
export type PostSchema = z.infer<typeof postSchema>;
export const updatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category_id: z.string().min(1, "Category is required")
});
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
