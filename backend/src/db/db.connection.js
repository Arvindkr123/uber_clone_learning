import mongoose from "mongoose";
import dotenvConfig from "../config/dotenv.config.js";

const connectionDBHandler = async () => {
  try {
    const conn = await mongoose.connect(dotenvConfig.MONGODB_URI);
    console.log("Database connection established at", conn.connection.host);
  } catch (error) {
    console.log("Error while connecting to database", error);
    process.exit(1);
  }
};

export default connectionDBHandler;
