import { config } from "@/config";
import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(config.databaseUrl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const connect = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
};

export const db = client.db();
