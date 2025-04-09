import {  BrandsApiPath, ProductsApiPath, StoreApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const createProduct = async (productData) => {
  return await apiCall("post", ProductsApiPath, productData);
};


export const updateProduct = async (productId ,productData) => {
  const {id, ...rest}=productData
  return await apiCall("PUT", `${ProductsApiPath}/${productId}`, rest);
};



export const getProductAttributes = async (productData) => {
  return await apiCall("post", ProductsApiPath, productData);
};

export const fetchAllProducts = async (params) => {
  const {page, per_page} = params;
  return await apiCall("get", `${ProductsApiPath}?page=${page}&per_page=${per_page}`, null);
};

export const fetchCategoriesAttributes = async (params) => {
  const {id,attr_type}=params
  return await apiCall("get", `${ProductsApiPath}/${id}?attr_type=${attr_type}`, null);
};

export const fetchBrands = async () => {
  return await apiCall("get", `${BrandsApiPath}`, null);
};

export const fetchStores = async () => {
  return await apiCall("get", `${StoreApiPath}`, null);
};