import { NextFunction, Request, Response } from "express";
import { UserRegisterResponse } from "../db/schema.js";
import { UserService } from "../services/user/user.service.js";
import { ApiResponse } from "../utils/api.response.util.js";
import { AUTH_MESSAGE } from "../constants/status.message.constant.js";

export class UserController {
  static REGISTER = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: unknown = req.body as unknown;
      const result: UserRegisterResponse = await UserService.REGISTER(body);
      ApiResponse.Success(res, AUTH_MESSAGE.REGISTER_SUCCESS, result);
    } catch (e) {
      next(e);
    }
  };
  static LOGIN = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: unknown = req.body as unknown;
      const result: UserRegisterResponse = await UserService.LOGIN(req, res, body);
      ApiResponse.Success(res, AUTH_MESSAGE.LOGIN_SUCCESS, result);
    } catch (e) {
      next(e);
    }
  };
}
