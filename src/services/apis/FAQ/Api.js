import { AiBenefitsFeaturesApiPath, AiFaqApiPath, AiReviewsApiPath, FaqApiPath, FaqCategoriesApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";
import { apiClient } from "../../../utils/apiWrapper";

export const fetchFAQs = async (params) => {
    const {search, page ,limit}=params
    return await apiCall("get", `${FaqApiPath}?search=${search}&limit=${limit}&page=${page}`, null);
  };


  export const fetchCategoriesFAQs = async () => {
    return await apiCall("get", `${FaqCategoriesApiPath}`, null);
  };



    export const addFaq = async (data) => {
      return await apiCall("post", `${FaqApiPath}`,data );
    };

    export const updateFaq = async (data) => {
      const {id, ...restData} = data;
      return await apiCall("put", `${FaqApiPath}/${id}`,restData );
    };
    

       export const deleteFaq = async (id) => {
          return await apiCall("delete", `${FaqApiPath}/${id}` );
        };
        


  const fetchFAQ = async (searchTerm, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`${FaqApiPath}?search=${searchTerm}`);
        setResponse(response?.data?.data);
        setLoader(false);
    } catch (error) {
        console.log("error", error);
    } finally {
        setLoader(false);
    }
}


const fetchFAQCategories = async (setResponse) => {
  try {
      const response = await apiClient.get(`${FaqCategoriesApiPath}`);
      setResponse(response)
  } catch (error) {
      console.log("error", error);
  } finally {
  }
}

export const AiFaqPathHook = async (data) => {
    return await apiCall("post", AiFaqApiPath,  data );
  };
  



export const AiReviewsPathHook = async (data) => {
  return await apiCall("post", AiReviewsApiPath,  data );
};




export const AiFaqFeaturesBenefitsHook = async (data) => {
  return await apiCall("post", AiBenefitsFeaturesApiPath,  data );
};



export const FaqApis = {
  fetchFAQ,
  fetchFAQCategories
}