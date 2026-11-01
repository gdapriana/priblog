import { eq } from "drizzle-orm";
import db from "../../configs/db.js";
import { categories, CategoryUpdateResponse } from "../../db/schema.js";
import { CategoryValidation } from "../../validations/category.validation.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { CRUD_MESSAGE } from "../../constants/status.message.constant.js";
import { slugOptions } from "../../utils/slugify.util.js";
import slugify from "slugify";

export const updateServiceCategory = async ({
  id,
  body,
}: {
  id: string;
  body: any;
}): Promise<CategoryUpdateResponse> => {
  let { id: i, ...dataWithoutId } = CategoryValidation.UPDATE.parse({
    id,
    ...body,
  });
  if (dataWithoutId.title)
    dataWithoutId.slug = slugify(dataWithoutId.title, slugOptions);
  const [category] = await db
    .update(categories)
    .set(dataWithoutId)
    .where(eq(categories.id, i))
    .returning({ id: categories.id });
  if (!category) throw ApiError.notFound(CRUD_MESSAGE.notFound("category"));
  return category;
};
