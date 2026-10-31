import type { Express } from "express";
import userRoute from "./user.route.js";
import blogRoute from "./blog.route.js";
import categoryRoute from "./category.route.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const setupRoutes = (app: Express) => {
  app.use("/api/auth", authenticate, userRoute);
  app.use("/api/blogs", authenticate, blogRoute);
  app.use("/api/categories", authenticate, categoryRoute);
};

export default setupRoutes;
