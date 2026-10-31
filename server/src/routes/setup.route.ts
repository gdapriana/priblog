import type { Express } from "express";
import userRoute from "./user.route.js";
import blogRoute from "./blog.route.js";
import categoryRoute from "./category.route.js";

const setupRoutes = (app: Express) => {
  app.use("/api/auth", userRoute);
  app.use("/api/blogs", blogRoute);
  app.use("/api/categories", categoryRoute);
};

export default setupRoutes;
