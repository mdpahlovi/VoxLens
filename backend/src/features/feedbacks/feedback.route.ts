import { validate } from "@/middleware/validate.middleware";
import { Router } from "express";
import { FeedbackController } from "./feedback.controller";
import { createFeedbackSchema, getFeedbacksSchema } from "./feedback.schema";

export const router = Router();

router.post("/", validate(createFeedbackSchema), FeedbackController.createFeedback);
router.get("/", validate(getFeedbacksSchema), FeedbackController.getFeedbacks);

export const feedbackRoutes = router;
