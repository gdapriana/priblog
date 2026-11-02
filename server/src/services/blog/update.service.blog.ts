import { eq } from "drizzle-orm";
import db from "../../configs/db.js";
import { blogs, BlogUpdateResponse } from "../../db/schema.js";
import { slugOptions } from "../../utils/slugify.util.js";
import { BlogValidation } from "../../validations/blog.validation.js";
import slugify from "slugify";
import { ApiError } from "../../utils/api.error.response.util.js";
import {
  AUTH_MESSAGE,
  CRUD_MESSAGE,
} from "../../constants/status.message.constant.js";

export const updateServiceBlog = async ({
  blogId,
  userId,
  body,
}: {
  body: any;
  blogId?: string;
  userId?: number;
}): Promise<BlogUpdateResponse> => {
  let {
    blogId: validBlogId,
    userId: validUserId,
    ...updateData
  } = BlogValidation.UPDATE.parse({ blogId, userId, ...body });
  const blogExist = await db.query.blogs.findFirst({
    where: { id: validBlogId },
    columns: { id: true, userId: true },
  });
  if (!blogExist) throw ApiError.notFound(CRUD_MESSAGE.notFound("blog"));
  if (blogExist.userId !== validUserId)
    throw ApiError.forbidden(AUTH_MESSAGE.FORBIDDEN);
  if (updateData.title)
    updateData.slug = slugify(
      updateData.title + new Date().getTime().toString(),
      slugOptions,
    );
  const [updatedBlog] = await db
    .update(blogs)
    .set(updateData)
    .where(eq(blogs.id, validBlogId))
    .returning({ id: blogs.id });
  return updatedBlog;
};
