import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service";

export class FeedbackController {
    static createFeedback = asyncHandler(async (req: Request, res: Response) => {
        const result = await FeedbackService.createFeedback(req.body);
        ApiResponse.created(res, result, "Feedback created successfully");
    });

    static getFeedbacks = asyncHandler(async (req: Request, res: Response) => {
        const result = await FeedbackService.getFeedbacks(req.query);
        ApiResponse.success(res, result, "Feedbacks fetched successfully");
    });
}
