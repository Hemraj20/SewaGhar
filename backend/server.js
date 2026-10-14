import express from "express";
import dotenv from "dotenv";
import db from "./Config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoute.js";
import vendorRouter from "./routes/vendorRoute.js";
import postRouter from "./routes/postRoutes.js";
import serviceRouter from "./routes/serviceRouter.js";
const app = express();
dotenv.config({
  path: "./Config/config.env",
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/service", serviceRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(
    `the server is running in ${process.env.NODE_ENV} on port ${PORT}`,
  );
});
