import { useMutation, useQuery } from "@tanstack/react-query";
import { addFaq, AiFaqFeaturesBenefitsHook, AiFaqPathHook, AiReviewsPathHook, deleteFaq, fetchCategories, fetchCategoriesFAQs, fetchFAQs, updateFaq } from "./Api";

// Hook to fetch Categoires data
export const useFetchFAQs = (params) => {
    return useQuery({
      queryKey: ["FAQs", params],
      queryFn: () => fetchFAQs(params),
      enabled: !!params, // Ensures it only runs when params exist
    });
  };

  export const useFetchCategoriesFAQs = () => {
    return useQuery({
      queryKey: ["CategoriesFAQs"],
      queryFn: () => fetchCategoriesFAQs(),
    });
  };


  export const useAiFaqPath = () => {
    return useMutation({
      mutationFn: (data) => AiFaqPathHook(data),
    });
  };

  export const useAddFaqs = () => {
      return useMutation({
        mutationFn: (data) => addFaq(data),
      });
    };

    export const useUpdateFaqs = () => {
      return useMutation({
        mutationFn: (data) => updateFaq(data),
      });
    };


       export const useDeleteFaq = () => {
          return useMutation({
            mutationFn: (data) => deleteFaq(data),
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