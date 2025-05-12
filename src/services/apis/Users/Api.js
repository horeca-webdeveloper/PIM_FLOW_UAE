import { UsersApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchUsers = async (data) => {
  const {page, length} = data
  return await apiCall("get", `${UsersApiPath}?page=${page}&length=${length}`, null);
};

export const createUser = async (data) => {
    return await apiCall("post", UsersApiPath,  data );
  };
  

  export const updateUser = async (data) => {
    const {id, ...restData} = data;
    return await apiCall("put", `${UsersApiPath}/${id}`,  restData );
  };
  


  export const deleteUser = async (id) => {
    return await apiCall("delete", `${UsersApiPath}/${id}` );
  };
  