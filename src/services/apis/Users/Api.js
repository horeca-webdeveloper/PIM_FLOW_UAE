import { UsersApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchUsers = async () => {
  return await apiCall("get", `${UsersApiPath}`, null);
};

export const createUser = async (data) => {
    return await apiCall("post", UsersApiPath,  data );
  };
  

  export const updateUser = async (data) => {
    console.log(data)
    const {id, ...restData} = data;
    console.log(restData)
    return await apiCall("post", `${UsersApiPath}/${id}`,  restData );
  };
  


  export const deleteUser = async (id) => {
    return await apiCall("delete", `${UsersApiPath}/${id}` );
  };
  