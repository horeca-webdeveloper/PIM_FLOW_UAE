import { useQuery } from "@tanstack/react-query";
import { fetchManageAuthPermissions } from "./Api";

export const useFetchManageAuthPermissions = () => {
    return useQuery({
      queryKey: ["fetchManageAuthPermissions"],
      queryFn: () => fetchManageAuthPermissions(),
    });
  };
