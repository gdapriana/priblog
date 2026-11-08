import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query.keys.constant";
import { buildQuery } from "../utils/query.utils";
import { api } from "../utils/api.utils";
import type { Category, QueryResponse } from "../data/type.data";

export const categorySortBy = ["createdAt", "title"] as const;

export interface FilterCategory {
  search?: string;
  take?: number;
  cursor?: string;
  withTotal?: "true" | "false";
  sortBy?: "id" | "title" | "createdAt";
  orderBy?: "desc" | "asc";
}

export const useQueryCategory = ({
  filter,
}: {
  filter?: FilterCategory;
} = {}): UseQueryResult<QueryResponse<Category>, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.categories.all, filter],
    queryFn: async () => {
      const res = await api<QueryResponse<Category>>(
        `/api/categories/query?${buildQuery(filter)}`,
      );
      return res;
    },
  });
};
