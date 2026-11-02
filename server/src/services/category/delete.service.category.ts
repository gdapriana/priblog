import z from "zod";
import { CategoryValidation } from "../../validations/category.validation.js";
import { categories, CategoryDeleteResponse } from "../../db/schema.js";
import db from "../../configs/db.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../../utils/api.error.response.util.js";
import { CRUD_MESSAGE } from "../../constants/status.message.constant.js";

export const deleteServiceCategory = async ({
  id,
}: {
  id: string;
}): Promise<CategoryDeleteResponse> => {
  const { schemaId: validCategoryId } = z.parse(CategoryValidation.DELETE, {
    schemaId: id,
  });
  const [category] = await db
    .delete(categories)
    .where(eq(categories.id, validCategoryId))
    .returning({ id: categories.id });
  if (!category) throw ApiError.notFound(CRUD_MESSAGE.notFound("category"));
  return category;
};
