import z from "zod";
import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  ilike,
  lt,
  or,
} from "drizzle-orm";
import db from "../../configs/db.js";
import { categories, type Category, type QueryResponse } from "../../db/schema.js";
import { CategoryValidation } from "../../validations/category.validation.js";
import { ApiError } from "../../utils/api.error.response.util.js";

type SortBy = "id" | "title" | "createdAt";

const sortColumns = {
  id: categories.id,
  title: categories.title,
  createdAt: categories.createdAt,
} as const;

const CursorSchema = z.object({
  v: z.union([z.string(), z.number()]),
  id: z.number().int(),
});

const escapeLike = (value: string) => value.replace(/[\\%_]/g, "\\$&");

const encodeCursor = (row: Category, sortBy: SortBy): string => {
  const raw = row[sortBy];
  const v = raw instanceof Date ? raw.toISOString() : raw;
  return Buffer.from(JSON.stringify({ v, id: row.id })).toString("base64url");
};

const decodeCursor = (cursor: string, sortBy: SortBy) => {
  const invalid = () => ApiError.badRequest("Invalid cursor");
  let parsed: z.infer<typeof CursorSchema>;
  try {
    parsed = CursorSchema.parse(
      JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")),
    );
  } catch {
    throw invalid();
  }

  if (sortBy === "id") {
    if (typeof parsed.v !== "number") throw invalid();
    return { value: parsed.v, id: parsed.id };
  }
  if (typeof parsed.v !== "string") throw invalid();
  if (sortBy === "createdAt") {
    const date = new Date(parsed.v);
    if (Number.isNaN(date.getTime())) throw invalid();
    return { value: date, id: parsed.id };
  }
  return { value: parsed.v, id: parsed.id };
};

export const queryServiceCategory = async (
  query: unknown,
): Promise<QueryResponse<Category>> => {
  const { search, withTotal, take, cursor, sortBy, orderBy } = z.parse(
    CategoryValidation.QUERY,
    query,
  );

  const sortColumn = sortColumns[sortBy];
  const direction = orderBy === "asc" ? asc : desc;
  const compare = orderBy === "asc" ? gt : lt;

  const pattern = search ? `%${escapeLike(search)}%` : undefined;
  const searchCondition = pattern
    ? or(ilike(categories.title, pattern), ilike(categories.slug, pattern))
    : undefined;

  let cursorCondition: any;
  if (cursor) {
    const { value, id } = decodeCursor(cursor, sortBy);
    cursorCondition =
      sortBy === "id"
        ? compare(categories.id, id)
        : or(
            compare(sortColumn, value),
            and(eq(sortColumn, value), compare(categories.id, id)),
          );
  }

  const [rows, totalRows] = await Promise.all([
    db
      .select()
      .from(categories)
      .where(and(searchCondition, cursorCondition))
      .orderBy(direction(sortColumn), direction(categories.id))
      .limit(take + 1),
     withTotal && !cursor
      ? db.select({ total: count() }).from(categories).where(searchCondition)
      : null,
  ]);

  const hasMore = rows.length > take;
  const data = hasMore ? rows.slice(0, take) : rows;
  const last = data.at(-1);

  return {
    items: data,
    hasMore,
    nextCursor: hasMore && last ? encodeCursor(last, sortBy) : null,
    ...(totalRows && { totalData: totalRows[0]?.total ?? 0 }),
  };
};
