import z from "zod";
import {
  and,
  asc,
  count,
  desc,
  eq,
  getColumns,
  getColumnTable,
  getTableSchema,
  gt,
  ilike,
  lt,
  or,
} from "drizzle-orm";
import db from "../../configs/db.js";
import {
  Blog,
  BlogQueryResponse,
  blogs,
  categories,
  users,
  type QueryResponse,
} from "../../db/schema.js";
import { ApiError } from "../../utils/api.error.response.util.js";
import { BlogValidation } from "../../validations/blog.validation.js";

type SortBy = "id" | "title" | "createdAt";

const sortColumns = {
  id: blogs.id,
  title: blogs.title,
  createdAt: blogs.createdAt,
} as const;

const CursorSchema = z.object({
  v: z.union([z.string(), z.number()]),
  id: z.number().int(),
});

const escapeLike = (value: string) => value.replace(/[\\%_]/g, "\\$&");

const encodeCursor = (row: BlogQueryResponse, sortBy: SortBy): string => {
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

export const queryServiceBlog = async (
  query: unknown,
): Promise<QueryResponse<BlogQueryResponse>> => {
  const { search, userId, withTotal, take, cursor, sortBy, orderBy } = z.parse(
    BlogValidation.QUERY,
    query,
  );

  const sortColumn = sortColumns[sortBy];
  const direction = orderBy === "asc" ? asc : desc;
  const compare = orderBy === "asc" ? gt : lt;

  const pattern = search ? `%${escapeLike(search)}%` : undefined;
  const searchCondition = pattern
    ? or(ilike(blogs.title, pattern), ilike(blogs.slug, pattern))
    : undefined;

  let cursorCondition: any;
  if (cursor) {
    const { value, id } = decodeCursor(cursor, sortBy);
    cursorCondition =
      sortBy === "id"
        ? compare(blogs.id, id)
        : or(
            compare(sortColumn, value),
            and(eq(sortColumn, value), compare(blogs.id, id)),
          );
  }

  const [rows, totalRows] = await Promise.all([
    db
      .select({
        ...getColumns(blogs),
        category: {
          id: categories.id,
          title: categories.title,
          slug: categories.slug,
        },
        user: {
          id: users.id,
          email: users.email,
          name: users.name,
        },
      })
      .from(blogs)
      .where(
        and(
          searchCondition,
          cursorCondition,
          userId ? eq(blogs.userId, userId) : undefined,
        ),
      )
      .orderBy(direction(sortColumn), direction(blogs.id))
      .limit(take + 1)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .leftJoin(users, eq(blogs.userId, users.id)),
    withTotal && !cursor
      ? db.select({ total: count() }).from(blogs).where(searchCondition)
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
