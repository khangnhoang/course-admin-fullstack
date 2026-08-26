import express from "express";
import cors from "cors";
import { courseRouter } from "./modules/courses/course.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "course-admin-api",
  });
});

app.use("/api/courses", courseRouter);

app.use(errorHandler);

export { app };
