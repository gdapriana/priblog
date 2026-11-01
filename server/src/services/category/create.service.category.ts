import { CategoryValidation } from "../../validations/category.validation.js";
import db from "../../configs/db.js";
import { categories, CategoryCreateResponse } from "../../db/schema.js";
import slugify from "slugify";
import { slugOptions } from "../../utils/slugify.util.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { CRUD_MESSAGE } from "../../constants/status.message.constant.js";

export const createServiceCategory = async (
  body: unknown,
): Promise<CategoryCreateResponse> => {
  const validatedBody = CategoryValidation.CREATE.parse(body);
  const [category] = await db
    .insert(categories)
    .values({
      ...validatedBody,
      slug: slugify(validatedBody.title, slugOptions),
    })
    .onConflictDoNothing({ target: categories.slug })
    .returning({ id: categories.id });
  if (!category)
    throw ApiError.conflict(CRUD_MESSAGE.alreadyExists("category"));
  return category;
};
