import { useMutation, useQuery } from "@tanstack/react-query";
import { addBrand, deleteBrand, deleteListedVendor, deleteVendor, downloadMediaAssetList, fetchManageBrandsList, fetchManageFinalVendorsList, fetchManageMediaAssetList, fetchManagePreEvaluateVendorsList, fetchManageSubBrandsProductList, fetchManageVendorsList, updateBrand } from "./Api";

export const useFetchManageBrandList = (params) => {
    return useQuery({
      queryKey: ["fetchManageBrandsList",params],
      queryFn: () => fetchManageBrandsList(params),
    });
  };


  export const useFetchSubBrandProduct = (params) => {
    return useQuery({
      queryKey: ["fetchManageSubBrandsProductList",params],
      queryFn: () => fetchManageSubBrandsProductList(params),
    });
  };

  export const useFetchMediaAsset = (params) => {
    return useQuery({
      queryKey: ["useFetchMediaAsset",params],
      queryFn: () => fetchManageMediaAssetList(params),
    });
  };


  export const useDownloadMediaAsset = (params) => {
    return useQuery({
      queryKey: ["useDownloadMediaAsset",params],
      queryFn: () => downloadMediaAssetList(params),
    });
  };


  export const useFetchManageVendorList = (params) => {
    return useQuery({
      queryKey: ["fetchManageVendorsList",params],
      queryFn: () => fetchManageVendorsList(params),
    });
  };

  export const useFetchManageFinalVendorList = (params) => {
    return useQuery({
      queryKey: ["fetchManageFinalVendorsList",params],
      queryFn: () => fetchManageFinalVendorsList(params),
    });
  };


  export const useFetchManagePreEvaluateVendorList = (params) => {
    return useQuery({
      queryKey: ["fetchManagePreEvaluateVendorsList",params],
      queryFn: () => fetchManagePreEvaluateVendorsList(params),
    });
  };

  export const useAddBrands = () => {
    return useMutation({
      mutationFn: (data) => addBrand(data),
    });
  };

  export const useUpdateBrands = () => {
      return useMutation({
        mutationFn: (data) => updateBrand(data),
      });
    };


    export const useDeleteBrand = () => {
      return useMutation({
        mutationFn: (data) => deleteBrand(data),
      });
    };

    export const useDeleteVendor = () => {
      return useMutation({
        mutationFn: (data) => deleteVendor(data),
      });
    };


    export const useDeleteListedVendor = () => {
      return useMutation({
        mutationFn: (data) => deleteListedVendor(data),
      });
    };
  