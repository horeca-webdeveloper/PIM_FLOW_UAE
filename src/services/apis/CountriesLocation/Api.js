import { FetchAllCountriesApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchCountriesLocation = async () => {
  return await apiCall("get", `${FetchAllCountriesApiPath}`, null);
};