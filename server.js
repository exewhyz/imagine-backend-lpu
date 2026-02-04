import express from "express";
import userRouter from "./routes/user.routes.js"

const PORT = Number(process.env.PORT) || 4000;

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Health is OK!",
  });
});

app.use("/api/auth", userRouter)



app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});
