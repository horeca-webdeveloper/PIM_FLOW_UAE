import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchCategories } from "./Api";

// Hook to fetch Categoires data
export const useFetchProductCategories = (params) => {
    return useQuery({
      queryKey: ["categories", params],
      queryFn: () => fetchCategories(params),
      enabled: !!params, // Ensures it only runs when params exist
    });
  };


  // Hook to fetch Categoires data
export const useFetchAllProductCategories = () => {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: () => fetchAllCategories(),
  });
};



 
