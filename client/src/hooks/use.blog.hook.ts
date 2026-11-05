import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query.keys.constant";
import { buildQuery } from "../utils/query.utils";
import type { ApiResponse, Blog, QueryResponse } from "../data/type.data";
import type { orderBy } from "../utils/hook.utils";

export const blogSortBy = ["createdAt", "id", "title"] as const;

export interface FilterBlog {
  search?: string;
  userId?: number;
  take?: number;
  cursor?: string;
  withTotal?: "true" | "false";
  sortBy?: (typeof blogSortBy)[number];
  orderBy?: (typeof orderBy)[number];
}

export const useBlogsQuery = ({
  filter,
}: {
  filter?: FilterBlog;
} = {}): UseQueryResult<ApiResponse<QueryResponse<Blog>>, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.all,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/blogs/query?${buildQuery(filter)}`,
        {
          method: "GET",
        },
      );
      return res.json();
    },
  });
};
