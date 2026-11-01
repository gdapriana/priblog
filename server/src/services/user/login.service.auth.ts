import z from "zod";
import { UserValidation } from "../../validations/user.validaion.js";
import db from "../../configs/db.js";
import { UserLoginResponse, users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../../utils/api.error.response.util.js";
import { AUTH_MESSAGE } from "../../constants/status.message.constant.js";
import { verify } from "@node-rs/argon2";
import { createSession } from "../../utils/session.util.js";
import { type Request, type Response } from "express";

export const loginServiceAuth = async (
  req: Request,
  res: Response,
  body: unknown,
): Promise<UserLoginResponse> => {
  const { email, password } = z.parse(UserValidation.LOGIN, body);
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user || !(await verify(user.hashedPassword, password)))
    throw ApiError.badRequest(AUTH_MESSAGE.INVALID_CREDENTIALS);
  const { hashedPassword: _, ...safeData } = user;
  await createSession(res, user.id, {
    userAgent: req.get("user-agent"),
    ipAddress: req.ip,
  });
  return safeData;
};
