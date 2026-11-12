import z from "zod";
import { users, UserUserUpdateResponse } from "../../db/schema.js";
import { UserValidation } from "../../validations/user.validaion.js";
import db from "../../configs/db.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { AUTH_MESSAGE } from "../../constants/status.message.constant.js";
import { eq } from "drizzle-orm";

export const updateServiceUser = async ({
  body,
  userId,
}: {
  body: any;
  userId: number;
}): Promise<UserUserUpdateResponse> => {
  const { name, userId: id } = z.parse(UserValidation.UPDATE, {
    ...body,
    userId,
  });

  const user = await db.query.users.findFirst({ where: { id } });
  if (!user) throw ApiError.forbidden(AUTH_MESSAGE.FORBIDDEN);
  const [updatedUser] = await db
    .update(users)
    .set({ name })
    .where(eq(users.id, id))
    .returning({ id: users.id });

  return updatedUser;
};
