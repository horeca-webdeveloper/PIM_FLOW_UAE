import { AuthPermissionApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchManageAuthPermissions = async () => {
  return await apiCall("get", `${AuthPermissionApiPath}`, null);
};
