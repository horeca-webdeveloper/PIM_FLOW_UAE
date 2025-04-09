import { useMutation, useQuery } from "@tanstack/react-query";
import { AiFaqFeaturesBenefitsHook, AiFaqPathHook, AiReviewsPathHook, fetchCategories, fetchFAQs } from "./Api";

// Hook to fetch Categoires data
export const useFetchFAQs = (params) => {
    return useQuery({
      queryKey: ["FAQs", params],
      queryFn: () => fetchFAQs(params),
      enabled: !!params, // Ensures it only runs when params exist
    });
  };


  export const useAiFaqPath = () => {
    return useMutation({
      mutationFn: (data) => AiFaqPathHook(data),
    });
  };


  export const useAiReviewsPath = () => {
    return useMutation({
      mutationFn: (data) => AiReviewsPathHook(data),
    });
  };

  export const useAiFeaturesAndBenefitsPath = () => {
    return useMutation({
      mutationFn: (data) => AiFaqFeaturesBenefitsHook(data),
    });
  };