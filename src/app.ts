import cors from "cors";
import express from "express";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import errorHandler from "./middlewares/error-handler.js";
import notesRouter from "./routes/notes.routes.js";
import tagRouter from "./routes/tags.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "ok",
    message: "Notes service is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/notes", notesRouter);

app.use(errorHandler);

export default app;
