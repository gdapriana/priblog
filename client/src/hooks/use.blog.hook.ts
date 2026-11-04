import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query.keys.constant";
import { buildQuery } from "../utils/query.utils";
import type { ApiResponse, Blog } from "../data/type.data";

export interface FilterBlog {
  search?: string;
  userId?: number;
  take?: number;
  cursor?: string;
  withTotal?: "true" | "false";
  sortBy?: "id" | "title" | "createdAt";
  orderBy?: "desc" | "asc";
}

export interface BlogsQueryResponse {
  items: Blog[];
  nextCursor: string | null;
  hasMore: boolean;
}

export const useBlogsQuery = ({
  filter,
}: {
  filter?: FilterBlog;
}): UseQueryResult<ApiResponse<BlogsQueryResponse>, Error> => {
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
