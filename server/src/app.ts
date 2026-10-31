import express, { type Request, type Response } from "express";
import { apiReference } from "@scalar/express-api-reference";
import cors from "cors";
import cookieParser from "cookie-parser";
import openApiDocument from "./utils/openapi.json" with { type: "json" };
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not.found.middleware.js";
import setupRoutes from "./routes/setup.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  }),
);

app.get("/api/docs/openapi.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openApiDocument);
});

app.use(
  "/api/docs",
  apiReference({
    spec: {
      content: openApiDocument,
    },
    theme: "purple",
    pageTitle: "FinanCare API Reference",
  }),
);

app.get("/", (_req, res) => {
  res.send("Hello Express!");
});

setupRoutes(app);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
