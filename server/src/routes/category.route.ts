import { Router } from "express";

const categoryRoute = Router();

categoryRoute.get("/get");
categoryRoute.query("/query");
categoryRoute.post("/");
categoryRoute.patch("/:categoryId");
categoryRoute.delete("/:categoryId");

export default categoryRoute;
