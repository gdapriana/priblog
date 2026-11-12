import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserInput } from "../data/type.data";
import { api } from "../utils/api.utils";
import { QUERY_KEYS } from "../constants/query.keys.constant";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ body }: { body: UpdateUserInput }) => {
      return api(`/api/auth`, { method: "PATCH", body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs.all });
    },
  });
};
