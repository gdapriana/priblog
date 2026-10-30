import express, {type Request, type Response } from "express";
import db from "./configs/db.js";
import { blogs } from "./db/schema.js";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello Express!");
});

app.get("/blogs", async (req: Request, res: Response) => {
   const data = await db.select().from(blogs)
   res.status(200).json({data})
})

export default app;
