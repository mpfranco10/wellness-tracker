import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createWeight,
  DEV_USER_ID,
  getWeights,
} from "../services/weightService";

const weightKeys = {
  all: ["weights"] as const,
  byUser: (userId: string) => ["weights", userId] as const,
};

export const useWeights = () => {
  return useQuery({
    queryKey: weightKeys.byUser(DEV_USER_ID),
    queryFn: getWeights,
  });
};

export const useCreateWeight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWeight,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: weightKeys.byUser(DEV_USER_ID),
      }),
  });
};
