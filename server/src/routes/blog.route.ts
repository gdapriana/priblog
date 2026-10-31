import { Router } from "express";

const blogRoute = Router();

blogRoute.get("/get");
blogRoute.query("/query");
blogRoute.post("/");
blogRoute.patch("/:blogId");
blogRoute.delete("/:blogId");

export default blogRoute;
