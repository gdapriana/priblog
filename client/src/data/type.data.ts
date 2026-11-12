export interface Category {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  cover?: string;
  _count?: { blog?: number };
}

export interface BlogUser {
  id: number;
  email: string;
  name: string;
}

export interface Blog {
  id: number;
  userId: number;
  categoryId: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  category: Pick<Category, "id" | "title" | "slug">;
  user: BlogUser;
  cover?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  statusCode: number;
  data: T;
}

export interface QueryResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  totalData?: number;
}

export type UserRole = "ADMIN" | "USER";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface ValidationIssue {
  path: string;
  message: string;
  code: string;
}

export interface ApiFailure {
  success: false;
  message: string;
  statusCode: number;
  errors?: ValidationIssue[];
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateBlogInput {
  title: string;
  categoryId?: number;
  excerpt?: string | null | undefined;
  content?: string | null | undefined;
}

export interface UpdateUserInput {
  name?: string;
}
