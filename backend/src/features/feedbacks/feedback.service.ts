import { db } from "@/utils/client";
import { model } from "@/utils/model";
import { z } from "zod";
import { createFeedbackSchema, getFeedbacksSchema } from "./feedback.schema";

const feedbackSchema = z.object({
    category: z.string().describe("The category of the feedback, e.g., 'Bug Report', 'Feature Request', 'General Query'."),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).describe("The priority of the feedback."),
    sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]).describe("The sentiment of the feedback."),
    team: z.string().describe("The team responsible for handling this, e.g., 'Engineering', 'Product', 'Support'."),
});

export class FeedbackService {
    static async createFeedback(data: z.infer<typeof createFeedbackSchema>["body"]) {
        const feedbackLlm = model.withStructuredOutput(feedbackSchema);

        const feedbackData = await feedbackLlm.invoke(
            `Analyze the following user feedback and extract the required metadata.\n\nFeedback: "${data.text}"`,
        );

        const feedbackDoc = {
            name: data.name,
            email: data.email,
            feedbackText: data.text,
            category: feedbackData.category,
            priority: feedbackData.priority,
            sentiment: feedbackData.sentiment,
            team: feedbackData.team,
            createdAt: new Date(),
        };

        const result = await db.collection("feedbacks").insertOne(feedbackDoc);

        return { _id: result.insertedId, ...feedbackDoc };
    }

    static async getFeedbacks(query: z.infer<typeof getFeedbacksSchema>["query"]) {
        const { search, category, priority } = query;

        let filter: any = {};

        if (search && typeof search === "string") {
            filter.name = { $regex: search, $options: "i" };
        }

        if (category && typeof category === "string") {
            filter.category = { $regex: category, $options: "i" };
        }

        if (priority && typeof priority === "string") {
            filter.priority = priority;
        }

        const feedbacks = await db.collection("feedbacks").find(filter).sort({ createdAt: -1 }).toArray();

        return feedbacks;
    }
}
