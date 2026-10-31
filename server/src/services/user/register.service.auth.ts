import z from "zod";
import { UserValidation } from "../../validations/user.validaion.js";
import db from "../../configs/db.js";
import { getTableColumns } from "drizzle-orm";
import { UserRegisterResponse, users } from "../../db/schema.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { AUTH_MESSAGE } from "../../constants/status.message.constant.js";
import { hash } from "@node-rs/argon2";

export const registerServiceAuth = async (
  body: unknown,
): Promise<UserRegisterResponse> => {
  const { email, name, password } = z.parse(UserValidation.REGISTER, body);
  const hashedPassword = await hash(password);
  const { hashedPassword: _, ...safeData } = getTableColumns(users);
  const [user] = await db
    .insert(users)
    .values({ email, name, hashedPassword })
    .onConflictDoNothing({ target: users.email })
    .returning(safeData);
  if (!user) throw ApiError.conflict(AUTH_MESSAGE.EMAIL_ALREADY_EXISTS);
  return user;
};
