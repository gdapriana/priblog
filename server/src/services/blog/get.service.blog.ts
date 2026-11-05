import z from "zod";
import { BlogValidation } from "../../validations/blog.validation.js";
import db from "../../configs/db.js";
import {
  Blog,
  BlogGetResponse,
  blogs,
  categories,
  users,
} from "../../db/schema.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { CRUD_MESSAGE } from "../../constants/status.message.constant.js";
import { eq, getColumns } from "drizzle-orm";

export const getServiceBlog = async ({
  query,
}: {
  query: any;
}): Promise<BlogGetResponse> => {
  const { by, value } = z.parse(BlogValidation.GET, query);
  if (by === "id") z.coerce.number().parse(value);

  const where =
    by === "id" ? eq(blogs.id, Number(value)) : eq(blogs.slug, value);

  const [blog] = await db
    .select({
      ...getColumns(blogs),
      category: {
        id: categories.id,
        title: categories.title,
        slug: categories.slug,
      },
      user: {
        id: users.id,
        email: users.email,
        name: users.name,
      },
    })
    .from(blogs)
    .where(where)
    .leftJoin(categories, eq(categories.id, blogs.categoryId))
    .leftJoin(users, eq(users.id, blogs.userId));
  if (!blog) throw ApiError.notFound(CRUD_MESSAGE.notFound("blog"));
  return blog;
};
