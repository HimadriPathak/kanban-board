import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  column: z.enum(["todo", "in-progress", "done"]),
  tags: z
    .string()
    .min(1, "At least one tag is required")
    .transform((val) => val.split(",").map((tag) => tag.trim())),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
