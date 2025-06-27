import express from "express";
import dotenvConfig from "./src/config/dotenv.config.js";
import connectionDBHandler from "./src/db/db.connection.js";
import authRoutes from "./src/routes/users.routes.js";
import captionsRoutes from "./src/routes/captions.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = dotenvConfig.PORT;

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/users", authRoutes);
app.use("/captions", captionsRoutes);

connectionDBHandler()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server listening at http://localhost:" + PORT);
    });
  })
  .catch(() => { });
