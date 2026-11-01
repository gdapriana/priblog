import { defineRelations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

const defaultField = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const userRole = pgEnum("role", ["ADMIN", "USER"]);

export const users = pgTable(
  "users",
  {
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    hashedPassword: text("hashed_password").notNull(),
    role: userRole("role").default("USER").notNull(),
    ...defaultField,
  },
  (table) => [
    index("users_name_idx").on(table.name),
    uniqueIndex("users_email_idx").on(table.email),
  ],
);
export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: integer("user_id"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_expires_at_idx").on(table.expiresAt),
  ],
);
export const blogs = pgTable(
  "blogs",
  {
    userId: integer("user_id"),
    categoryId: integer("category_id"),
    slug: varchar("slug", { length: 500 }).unique(),
    title: varchar("title", { length: 300 }).notNull(),
    excerpt: text("excerpt"),
    ...defaultField,
  },
  (table) => [
    index("blogs_title_idx").on(table.title),
    uniqueIndex("blogs_slug_idx").on(table.slug),
  ],
);
export const categories = pgTable(
  "categories",
  {
    slug: varchar("slug", { length: 500 }).unique(),
    title: varchar("title", { length: 300 }).notNull(),
    ...defaultField,
  },
  (table) => [
    index("categories_title_idx").on(table.title),
    uniqueIndex("categories_slug_idx").on(table.slug),
  ],
);

export const relations = defineRelations(
  { users, blogs, categories, sessions },
  (r) => ({
    blogs: {
      user: r.one.users({
        from: r.blogs.userId,
        to: r.users.id,
      }),
      blogs: r.one.categories({
        from: r.blogs.categoryId,
        to: r.categories.id,
      }),
    },
    users: {
      blogs: r.many.blogs(),
      sessions: r.many.sessions(),
    },
    categories: {
      blogs: r.many.blogs(),
    },
    sessions: {
      users: r.one.users({
        from: r.sessions.userId,
        to: r.users.id,
      }),
    },
  }),
);

export type User = typeof users.$inferSelect;
export type UserRole = (typeof userRole.enumValues)[number];
export type Blog = typeof blogs.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type InsertBlog = typeof blogs.$inferInsert;
export type InsertCategory = typeof categories.$inferInsert;
export type InsertSession = typeof sessions.$inferInsert;

export type UserRegisterResponse = Omit<User, "hashedPassword">;
export type UserLoginResponse = Omit<User, "hashedPassword">;
export type UserLogoutResponse = Pick<User, "id">;
export type UserMeResponse = Pick<User, "id" | "name" | "email" | "role">;

export type CategoryCreateResponse = Pick<Category, "id">;
export type CategoryUpdateResponse = Pick<Category, "id">;
export type CategoryDeleteResponse = Pick<Category, "id">;

export type QueryResponse<T> = {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  totalData?: number;
};
