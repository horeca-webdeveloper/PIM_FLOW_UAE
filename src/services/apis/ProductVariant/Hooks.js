import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteListedVariant, fetchProductVariant } from "./Api";

export const useFetchProductVariant = (params) => {
    return useQuery({
      queryKey: ["fetchProductVariant",params],
      queryFn: () => fetchProductVariant(params),
    });
  };


      export const useDeleteListedVariant = () => {
      return useMutation({
        mutationFn: (data) => deleteListedVariant(data),
      });
    };