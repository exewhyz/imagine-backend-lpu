import "dotenv/config";

import express from "express";
import userRouter from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";
import { verifyUser } from "./midllewares/verify-user.js";

import cors from "cors";

import connectDB from "./lib/db.js";

const PORT = Number(process.env.PORT) || 4000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Health is OK!",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/images", verifyUser, imageRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is started on http://localhost:${PORT}`);
});
