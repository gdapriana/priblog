import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const categoryRoute = Router();

categoryRoute.get("/query", CategoryController.QUERY);
categoryRoute.get("/get", CategoryController.GET);
categoryRoute.post("/", () => {});
categoryRoute.patch("/:categoryId", () => {});
categoryRoute.delete("/:categoryId", () => {});

export default categoryRoute;
