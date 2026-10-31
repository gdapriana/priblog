import { type Response, type Request } from "express";
import {
  clearSessionCookie,
  COOKIE_NAME,
  deleteSessionByToken,
} from "../../utils/session.util.js";
import { UserLogoutResponse } from "../../db/schema.js";

export const logoutServiceAuth = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) await deleteSessionByToken(token);
  clearSessionCookie(res);
};
