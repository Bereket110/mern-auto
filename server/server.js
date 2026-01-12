import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieparser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { authRouter } from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

// Connect to MongoDB
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
// process.env.PORT ||
// Middleware

const allowedOrigins = ["https://mern-auto-szs2.vercel.app"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(cookieparser());
app.use(express.json());

//API Endpoints
app.get("/", (req, res) => {
  res.send("Hello from the MERN Auto server!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
``;
