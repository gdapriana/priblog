import z from "zod";
import {
  deleteValidation,
  getValidation,
  queryValidation,
} from "./global.validation.js";
import { createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";
import { blogs } from "../db/schema.js";

export class BlogValidation {
  static QUERY = z.object({
    search: z.string().trim().min(1).max(200).optional(),
    userId: z.coerce.number().optional(),
    withTotal: z
      .enum(["true", "false"])
      .default("false")
      .transform((v) => v === "true"),
    ...queryValidation({ sortEnum: ["id", "title", "createdAt"] }),
  });
  static GET = getValidation({ by: ["id", "slug"] });
  static CREATE = createInsertSchema(blogs)
    .extend({
      userId: z.number(),
    })
    .strict();
  static UPDATE = createUpdateSchema(blogs).extend({
    blogId: z.coerce.number(),
    userId: z.coerce.number(),
  });
  static DELETE = deleteValidation.extend({
    userId: z.coerce.number(),
  });
}
