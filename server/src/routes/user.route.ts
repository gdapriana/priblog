import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.post("/register", UserController.REGISTER);
userRoute.post("/login", UserController.LOGIN);
userRoute.delete("/logout", UserController.LOGOUT);
userRoute.patch("/", requireAuth, UserController.UPDATE);
userRoute.get("/me", requireAuth, UserController.ME);

export default userRoute;
