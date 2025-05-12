import { basePath, ManageConfirmVendorListApiPath, ProductVariantApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const fetchProductVariant = async (data) => {
  const {page, length,type,query,sort_dir,sort_by} = data
  return await apiCall("get", `${ProductVariantApiPath}?page=${page}&sort_by=${sort_by}&sort_dir=${sort_dir}&per_page=${length}&search=${query}`, null);
};


   export const deleteListedVariant = async (data) => {
    const {parentId, variantId} = data
    console.log(data)
      return await apiCall("delete", `${basePath}/product-groups/${parentId}/items/${variantId}/parent` );
    };