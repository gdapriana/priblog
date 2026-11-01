import { CategoryValidation } from "../../validations/category.validation.js"
import db from "../../configs/db.js";
import { categories } from "../../db/schema.js";

export const createServiceCategory = async (body: unknown) => {
   const validatedBody = CategoryValidation.CREATE.parse(body)
   const category = await db.insert(categories).values(validatedBody)
}
