import cors from "cors";
import express from "express";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import errorHandler from "./middlewares/error-handler";
import tagRouter from "./routes/tags.routes";

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

app.use("/tags", tagRouter);

app.use(errorHandler);

export default app;
