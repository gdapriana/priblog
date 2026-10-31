import { NextFunction, Request, Response } from "express";
import {
  UserLogoutResponse,
  UserMeResponse,
  UserRegisterResponse,
} from "../db/schema.js";
import { UserService } from "../services/user/user.service.js";
import { ApiResponse } from "../utils/api.response.util.js";
import {
  AUTH_MESSAGE,
  CRUD_MESSAGE,
} from "../constants/status.message.constant.js";

export class UserController {
  static SCHEMA = "user";
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
      const result: UserRegisterResponse = await UserService.LOGIN(
        req,
        res,
        body,
      );
      ApiResponse.Success(res, AUTH_MESSAGE.LOGIN_SUCCESS, result);
    } catch (e) {
      next(e);
    }
  };
  static LOGOUT = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.LOGOUT(req, res);
      ApiResponse.Success(res, AUTH_MESSAGE.LOGOUT_SUCCESS);
    } catch (e) {
      next(e);
    }
  };
  static ME = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: UserMeResponse = await UserService.ME(req);
      ApiResponse.Success(res, CRUD_MESSAGE.fetched(this.SCHEMA), result);
    } catch (e) {
      next(e);
    }
  };
}
