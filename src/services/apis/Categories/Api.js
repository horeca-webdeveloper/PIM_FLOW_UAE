import { allCategoriesApiPath, categoriesApiPath } from "../../apiRoutes";
import {apiCall} from "../../AxiosFactory"



export const fetchCategories = async (params) => {
    const {type,parent_id}=params
    return await apiCall("get", `${categoriesApiPath}?type=${type}&parent_id=${parent_id}`, null);
  };

  export const fetchAllCategories = async () => {
    return await apiCall("get", `${allCategoriesApiPath}`, null);
  };