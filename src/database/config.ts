import mongoose, { ConnectOptions } from "mongoose";
import "dotenv/config";

const CLUSTER = process.env.MONGO_URL as string;

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions;

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(CLUSTER, option);

        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
