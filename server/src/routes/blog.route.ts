import { Router } from "express";
import { BlogController } from "../controllers/blog.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const blogRoute = Router();

blogRoute.get("/get", BlogController.GET);
blogRoute.get("/query", BlogController.QUERY);
blogRoute.post("/", requireAuth, BlogController.CREATE);
blogRoute.patch("/:blogId", requireAuth, BlogController.UPDATE);
blogRoute.delete("/:blogId", requireAuth, BlogController.DELETE);

export default blogRoute;
