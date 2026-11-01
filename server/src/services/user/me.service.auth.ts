import { type Request } from "express";
import { UserMeResponse } from "../../db/schema.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { AUTH_MESSAGE } from "../../constants/status.message.constant.js";

export const meServiceAuth = async (req: Request): Promise<UserMeResponse> => {
   if (!req.user) throw ApiError.unauthorized(AUTH_MESSAGE.UNAUTHORIZED);
  return req.user;
};
