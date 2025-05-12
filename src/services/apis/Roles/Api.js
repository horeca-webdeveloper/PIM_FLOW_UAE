import { RolesApiPath, RolesPermissionApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchRolesNameId = async () => {
  return await apiCall("get", `${RolesApiPath}`, null);
};


export const fetchRoles = async (id) => {
  console.log(id.id)
  return await apiCall("get", `${RolesApiPath}/1/permissions`, null);
};


export const fetchRolesPermission = async () => {
  return await apiCall("get", `${RolesPermissionApiPath}`, null);
};


export const fetchRolesPermissionById = async (id) => {
  return await apiCall("get", `${RolesApiPath}/${id}`, null);
};


export const fetchAllRoles = async (data) => {
  const {page, length}=data
  return await apiCall("get", `${RolesApiPath}?page=${page}&length=${length}`, null);
};


export const createRoles = async (data) => {
  console.log(data)
    return await apiCall("post", `${RolesApiPath}`,  data );
  };
  

  export const deleteRoles= async (id) => {
    return await apiCall("delete", `${RolesApiPath}/${id}` );
  };
  