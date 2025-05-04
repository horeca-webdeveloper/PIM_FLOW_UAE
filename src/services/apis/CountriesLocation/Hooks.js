import { useQuery } from "@tanstack/react-query";
import { fetchCountriesLocation } from "./Api";

export const useFetchManageAllCountriesList = () => {
    return useQuery({
      queryKey: ["fetchAllCountriesList"],
      queryFn: () => fetchCountriesLocation(),
    });
  };
