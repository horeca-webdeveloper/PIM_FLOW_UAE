import { DashbaordStatsApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchDashboardStats = async (data) => {
  const {range} = data
  
  return await apiCall("get", `${DashbaordStatsApiPath}?range=${range}`, null);
};
