import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, deleteProduct, fetchAllProducts, fetchBrands, fetchCategoriesAttributes, fetchStores, updateProduct } from "./Api";

export const useCreateProduct = () => {
    return useMutation({
      mutationFn: (newProduct) => createProduct(newProduct),
    });
  };


  export const useUpdateProduct = () => {
    return useMutation({
      mutationFn: (productData) => updateProduct(productData.id, productData),
    });
  };


export const useFetchCategoriesAttributes = (params) => {
    return useQuery({
      queryKey: ["categoriesAttributes", params],
      queryFn: () => fetchCategoriesAttributes(params),
      enabled: !!params, // Ensures it only runs when params exist
    });
  };


export const useDeleteProduct = () => {
    return useMutation({
    mutationFn: (data) => deleteProduct(data),
  });
};
        

  export const useFetchProducts = (params) => {
    return useQuery({
      queryKey: ["fetchAllProducts",params],
      queryFn: () => fetchAllProducts(params),
      enabled: !!params, // Ensures it only runs when params exist
    });
  };


  export const useFetchBrands = () => {
    return useQuery({
      queryKey: ["fetchBrands"],
      queryFn: () => fetchBrands(),
    });
  };


  export const useFetchStore = () => {
    return useQuery({
      queryKey: ["fetchStore"],
      queryFn: () => fetchStores(),
    });
  };
