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

export interface QueryResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}
