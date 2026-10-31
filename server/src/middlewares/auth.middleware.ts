import { NextFunction, Request, Response } from "express";
import { Session, UserRole } from "../db/schema.js";
import {
  clearSessionCookie,
  COOKIE_NAME,
  setSessionCookie,
  validateSession,
} from "../utils/session.util.js";
import { STATUS_CODES } from "../constants/status.code.constant.js";
import { AUTH_MESSAGE } from "../constants/status.message.constant.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number; name: string; email: string; role: UserRole };
    session?: Session;
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return next();
    if (typeof token !== "string" || token.length > 128) {
      clearSessionCookie(res);
      return next();
    }

    const result = await validateSession(token);
    if (!result) {
      clearSessionCookie(res);
      return next();
    }
    if (result.renewedExpiresAt) {
      setSessionCookie(res, token, result.renewedExpiresAt);
    }
    req.user = result.user;
    req.session = result.session;
    next();
  } catch (err) {
    next(err);
  }
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: AUTH_MESSAGE.UNAUTHORIZED,
      statusCode: STATUS_CODES.UNAUTHORIZED,
    });
  }
  next();
};

export const requireRole = (roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next();

    if (!roles.includes(req.user.role)) return next();
    next();
  };
};
