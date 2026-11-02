import z from "zod";
import { BlogValidation } from "../../validations/blog.validation.js";
import db from "../../configs/db.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import {
  AUTH_MESSAGE,
  CRUD_MESSAGE,
} from "../../constants/status.message.constant.js";
import { BlogDeleteResponse, blogs } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const deleteServiceBlog = async ({
  blogId,
  userId,
}: {
  blogId: string;
  userId?: number;
}): Promise<BlogDeleteResponse> => {
  const { schemaId: validBlogId, userId: validUserId } = z.parse(
    BlogValidation.DELETE,
    { schemaId: blogId, userId },
  );
  const blogExist = await db.query.blogs.findFirst({
    where: { id: validBlogId },
    columns: { userId: true },
  });
  if (!blogExist) throw ApiError.notFound(CRUD_MESSAGE.notFound("blog"));
  if (blogExist.userId !== validUserId)
    throw ApiError.forbidden(AUTH_MESSAGE.FORBIDDEN);
  const [deletedBlog] = await db
    .delete(blogs)
    .where(eq(blogs.id, validBlogId))
    .returning({ id: blogs.id });
  if (!deletedBlog) throw ApiError.notFound(CRUD_MESSAGE.notFound("blog"));
  return deletedBlog;
};
