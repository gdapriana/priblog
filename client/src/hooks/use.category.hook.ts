import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query.keys.constant";
import { buildQuery } from "../utils/query.utils";
import type { ApiResponse, Category, QueryResponse } from "../data/type.data";

export interface FilterCategory {
  search?: string;
  take?: number;
  cursor?: string;
  withTotal?: "true" | "false";
  sortBy?: "id" | "title" | "createdAt";
  orderBy?: "desc" | "asc";
}

export const useCategoriesQuery = ({
  filter,
}: {
  filter?: FilterCategory;
} = {}): UseQueryResult<ApiResponse<QueryResponse<Category>>, Error> => {
  return useQuery({
    queryKey: QUERY_KEYS.categories.all,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/categories/query?${buildQuery(filter)}`,
        {
          method: "GET",
        },
      );
      return res.json();
    },
  });
};
