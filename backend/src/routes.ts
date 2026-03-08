import { Router } from "express";
import { feedbackRoutes } from "./features/feedbacks/feedback.route";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

// Feature routes
router.use("/feedbacks", feedbackRoutes);

export { router as apiRoutes };
