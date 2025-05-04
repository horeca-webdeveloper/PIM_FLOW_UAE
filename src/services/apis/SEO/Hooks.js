import { useQuery } from "@tanstack/react-query";
import { fetchSEO } from "./Api";

export const useFetchSEO = (params) => {
    return useQuery({
      queryKey: ["SEO", params],
      queryFn: () => fetchSEO(params),
      enabled: !!params, // Ensures it only runs when params exist
    });
  };