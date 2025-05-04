import { SeoManagementApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchSEO = async (params) => {
    const {id}=params
    return await apiCall("get", `${SeoManagementApiPath}/${id}`, null);
  };