import { AiBenefitsFeaturesApiPath, AiFaqApiPath, AiReviewsApiPath, FaqApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";
import { apiClient } from "../../../utils/apiWrapper";

export const fetchFAQs = async (params) => {
    const {search}=params
    return await apiCall("get", `${FaqApiPath}?search=${search}`, null);
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
  fetchFAQ
}