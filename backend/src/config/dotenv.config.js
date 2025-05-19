import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(path.resolve(), ".env"),
});

export default {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
