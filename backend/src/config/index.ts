import dotenv from "dotenv";

dotenv.config();

export const config = {
    // Server
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "5000", 10),

    // CORS
    corsOrigin: process.env.CORS_ORIGIN!,

    // Database
    databaseUrl: process.env.DATABASE_URL!,

    // JWT
    jwtSecret: process.env.JWT_SECRET!,

    // GEMINI
    geminiApiKey: process.env.GEMINI_API_KEY!,
} as const;

// Validate required environment variables
const requiredEnvVars = ["CORS_ORIGIN", "DATABASE_URL", "JWT_SECRET", "GEMINI_API_KEY"];

export const validate = (): void => {
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
    }
};
