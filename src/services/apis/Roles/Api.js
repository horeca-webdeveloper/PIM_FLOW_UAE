import { RolesApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchRolesNameId = async () => {
  return await apiCall("get", `${RolesApiPath}/names`, null);
};


export const fetchRoles = async (id) => {
  console.log(id.id)
  return await apiCall("get", `${RolesApiPath}/1/permissions`, null);
};


export const fetchAllRoles = async () => {
  return await apiCall("get", `${RolesApiPath}`, null);
};


export const createRoles = async (data) => {
  console.log(data)
    return await apiCall("post", `${RolesApiPath}`,  data );
  };
  

  export const deleteRoles= async (id) => {
    return await apiCall("delete", `${RolesApiPath}/${id}` );
  };
  