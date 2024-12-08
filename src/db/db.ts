import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (e) {
    console.log("Could not connect to aatabase");
    process.exit(1);
  }
};

export default connectDB;
