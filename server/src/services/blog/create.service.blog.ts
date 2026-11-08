import db from "../../configs/db.js";
import { CRUD_MESSAGE } from "../../constants/status.message.constant.js";
import { BlogCreateResponse, blogs } from "../../db/schema.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { slugOptions } from "../../utils/slugify.util.js";
import { BlogValidation } from "../../validations/blog.validation.js";
import slugify from "slugify";

export const createServiceBlog = async ({
  body,
  userId,
}: {
  body: any;
  userId?: number;
}): Promise<BlogCreateResponse> => {
  const validatedBody = BlogValidation.CREATE.parse({ userId, ...body });

  const category = await db.query.categories.findFirst({
    where: { id: validatedBody.categoryId },
    columns: { id: true },
  });
  if (!category) throw ApiError.notFound(CRUD_MESSAGE.notFound("category"));
  const [blog] = await db
    .insert(blogs)
    .values({
      ...validatedBody,
      slug: slugify(
        validatedBody.title + new Date().getTime().toString(),
        slugOptions,
      ),
    })
    .onConflictDoNothing()
    .returning({ id: blogs.id });
  if (!blog) throw ApiError.notFound(CRUD_MESSAGE.notFound("user"));
  return blog;
};
