import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query.keys.constant";
import { buildQuery } from "../utils/query.utils";
import type { ApiResponse, Blog, QueryResponse } from "../data/type.data";
import type { orderBy } from "../utils/hook.utils";
import { api } from "../utils/api.utils";

export const blogSortBy = ["createdAt", "title"] as const;

export interface FilterBlog {
  search?: string;
  userId?: number;
  categoryId?: number;
  take?: number;
  cursor?: string;
  withTotal?: "true" | "false";
  sortBy?: (typeof blogSortBy)[number];
  orderBy?: (typeof orderBy)[number];
}

export const useQueryBlog = ({
  filter,
  enabled,
}: {
  filter?: FilterBlog;
  enabled?: boolean;
} = {}): UseQueryResult<QueryResponse<Blog>, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.blogs.all, filter],
    queryFn: async () => {
      const res = await api<ApiResponse<Blog>>(
        `/api/blogs/query?${buildQuery(filter)}`,
        {
          method: "GET",
        },
      );
      return res;
    },
    enabled,
  });
};

export const useGetBlog = ({
  by,
  value,
}: {
  by: "id" | "slug";
  value: string;
}): UseQueryResult<ApiResponse<Blog>, Error> => {
  return useQuery({
    queryKey: [by, value],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/blogs/get?${buildQuery({ by, value })}`,
        {
          method: "GET",
        },
      );
      return res.json();
    },
  });
};
