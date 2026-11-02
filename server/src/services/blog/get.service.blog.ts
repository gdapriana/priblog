import z from "zod";
import { BlogValidation } from "../../validations/blog.validation.js";
import db from "../../configs/db.js";
import { Blog } from "../../db/schema.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { CRUD_MESSAGE } from "../../constants/status.message.constant.js";

export const getServiceBlog = async ({
  query,
}: {
  query: any;
}): Promise<Blog> => {
  const { by, value } = z.parse(BlogValidation.GET, query);
  if (by === "id") z.coerce.number().parse(value);
  const blog = await db.query.blogs.findFirst({
    where: {
      [by]: by === "id" ? Number(value) : value,
    },
  });
  if (!blog) throw ApiError.notFound(CRUD_MESSAGE.notFound("blog"));
  return blog;
};
