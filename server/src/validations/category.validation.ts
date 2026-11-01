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
     search: z.string().trim().min(1).max(200).optional(),
     withTotal: z.enum(["true", "false"]).default("false").transform((v) => v === "true"),
     ...queryValidation({ sortEnum: ["id", "title", "createdAt"] }),
   });
  static GET = getValidation({ by: ["id", "slug"] });
  static CREATE = createInsertSchema(categories);
  static UPDATE = createUpdateSchema(categories);
  static DELETE = deleteValidation({ by: ["id"] });
}

export type CategoryValidationCreate = z.infer<typeof CategoryValidation.CREATE>
