import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query.keys.constant";
import { buildQuery } from "../utils/query.utils";
import type { Blog, CreateBlogInput, QueryResponse } from "../data/type.data";
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
      return api<QueryResponse<Blog>>(
        `/api/blogs/query?${buildQuery(filter)}`,
        {
          method: "GET",
        },
      );
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
}): UseQueryResult<Blog, Error> => {
  return useQuery({
    queryKey: [by, value],
    queryFn: async () => {
      return api<Blog>(`/api/blogs/get?${buildQuery({ by, value })}`);
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async ({ body }: { body: CreateBlogInput }) => {
      return api(`/api/blogs`, { method: "POST", body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs.all });
    },
  });
};
