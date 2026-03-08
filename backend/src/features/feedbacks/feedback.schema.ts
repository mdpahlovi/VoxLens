import { z } from "zod";

export const createFeedbackSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Provide your name"),
        email: z.email("Provide a valid email"),
        text: z.string().min(1, "Provide your feedback"),
    }),
});

export const getFeedbacksSchema = z.object({
    query: z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        priority: z.string().optional(),
    }),
});
