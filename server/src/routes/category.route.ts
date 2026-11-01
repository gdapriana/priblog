import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const categoryRoute = Router();

categoryRoute.get("/query", CategoryController.QUERY);
categoryRoute.get("/get", CategoryController.GET);
categoryRoute.post(
  "/",
  requireAuth,
  requireRole(["ADMIN"]),
  CategoryController.CREATE,
);
categoryRoute.patch(
  "/:categoryId",
  requireAuth,
  requireRole(["ADMIN"]),
  CategoryController.UPDATE,
);
categoryRoute.delete(
  "/:categoryId",
  requireAuth,
  requireRole(["ADMIN"]),
  CategoryController.DELETE,
);

export default categoryRoute;
