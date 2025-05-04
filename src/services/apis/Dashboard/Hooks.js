import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "./Api";

export const useFetchDashboardStatusList = (data) => {
    return useQuery({
      queryKey: ["fetchDashboardStats",data],
      queryFn: () => fetchDashboardStats(data),
    });
  };
