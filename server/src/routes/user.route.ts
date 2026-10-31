import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/register", UserController.REGISTER);
userRoute.post("/login", UserController.LOGIN);

export default userRoute;
