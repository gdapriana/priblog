import express, {type Request, type Response } from "express";
import db from "./configs/db.js";
import { apiReference } from '@scalar/express-api-reference'
import cors from "cors";
import { ApiResponse } from "./utils/api.response.util.js";
import { CRUD_MESSAGE } from "./constants/status.message.constant.js";
import openApiDocument from "./utils/openapi.json" with {type: 'json'};


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true
  })
);

app.get("/api/docs/openapi.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(openApiDocument);
  });

  app.use(
    "/api/docs",
    apiReference({
      spec: {
        content: openApiDocument
      },
      theme: "purple",
      pageTitle: "FinanCare API Reference"
    })
  );


app.get("/", (_req, res) => {
  res.send("Hello Express!");
});

app.get("/blogs", async (req: Request, res: Response) => {
   const users = await db.query.users.findMany({
      with: {
         blogs: true
      }
   })
   ApiResponse.Success(res, CRUD_MESSAGE.fetched('blogs'), users)
})

export default app;
