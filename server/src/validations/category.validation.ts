import z from "zod";
import {
  deleteValidation,
  getValidation,
  queryValidation,
} from "./global.validation.js";
import { createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";
import { categories } from "../db/schema.js";

export class CategoryValidation {
  static QUERY = z.object({
    search: z.string().min(1).max(200).optional(),
    ...queryValidation({ sortEnum: ["name", "created_at"] }),
  });
  static GET = getValidation({ by: ["id"] });
  static CREATE = createInsertSchema(categories);
  static UPDATE = createUpdateSchema(categories);
  static DELETE = deleteValidation({ by: ["id"] });
}
