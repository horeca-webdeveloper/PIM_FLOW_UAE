import { AddBrandApiPath, BrandsApiPath, BrandsBrandApiPath, DeleteBrandApiPath, ManageBrandsListApiPath, ManageConfirmVendorListApiPath, ManagePreEvaluationVendorListApiPath, ManageVendorListApiPath, ProductsApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchManageBrandsList = async (data) => {
  console.log("media management",data)
  const {page,per_page,search,sort_order,status,}=data
  return await apiCall("get", `${ManageBrandsListApiPath}?search=${search}&status=${status}&sort_by=created_at&sort_order=${sort_order}&per_page=${per_page}&page=${page}`, null);
};


export const fetchManageSubBrandsProductList = async (data) => {
  const {id}=data
  return await apiCall("get", `${BrandsApiPath}/${id}/sku`, null);
};



export const fetchManageMediaAssetList = async (data) => {
  const {id}=data
  return await apiCall("get", `${ProductsApiPath}/${id}/media`, null);
};

export const downloadMediaAssetList = async (data) => {
  const {id}=data
  return await apiCall("get", `${ProductsApiPath}/${id}/media/download`, null);
};



export const fetchManageVendorsList = async () => {
  
  return await apiCall("get", `${ManageVendorListApiPath}`, null);
};



export const fetchManageFinalVendorsList = async (data) => {
  const {page, length,type,query,sort_dir,sort_by} = data
  return await apiCall("get", `${ManageConfirmVendorListApiPath}?page=${page}&sort_by=${sort_by}&sort_dir=${sort_dir}&length=${length}&${type}=${query}`, null);
};


export const fetchManagePreEvaluateVendorsList = async (data) => {
  const{page,length,type,query,sort_dir,sort_by} = data
  return await apiCall("get", `${ManagePreEvaluationVendorListApiPath}?page=${page}&sort_by=${sort_by}&sort_dir=${sort_dir}&length=${length}&${type}=${query}`, null);
};


  export const addBrand = async (data) => {
    return await apiCall("post", `${BrandsBrandApiPath}`,data );
  };
  

   export const deleteBrand = async (id) => {
      return await apiCall("delete", `${BrandsBrandApiPath}/${id}` );
    };
    

    export const deleteVendor = async (id) => {
      return await apiCall("delete", `${ManagePreEvaluationVendorListApiPath}/${id}` );
    };

    export const deleteListedVendor = async (id) => {
      return await apiCall("delete", `${ManageConfirmVendorListApiPath}/${id}` );
    };
    


      export const updateBrand = async (data) => {
        const {id, ...restData} = data;
        return await apiCall("put", `${BrandsBrandApiPath}/${id}`,  restData );
      };
      