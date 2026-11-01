import z from "zod"
import { CategoryValidation } from "../../validations/category.validation.js"
import db from "../../configs/db.js";
import { Category } from "../../db/schema.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { CRUD_MESSAGE } from "../../constants/status.message.constant.js";

export const getServiceCategory = async (query: any): Promise<Category> => {
   const { by, value } = z.parse(CategoryValidation.GET, query);
   if (by === "id") z.coerce.number().parse(value);
   const category = await db.query.categories.findFirst({
      where: {
         [by]: by === "id" ? Number(value) : value
      }
   })
   if (!category) throw ApiError.notFound(CRUD_MESSAGE.notFound('category'));
   return category;
}
