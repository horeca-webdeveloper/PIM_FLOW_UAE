
import { apiClient } from "../../../utils/apiWrapper";
import { notify } from "../../../utils/notify";
const fetchFamilies = async (page, limit, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/attribute-groups?page=${page}&length=${limit}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const deleteFamily = async (id, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.delete(`/attribute-groups/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const handleCreate = async (datas, setLoader, setResponse) => {
   
    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/attribute-groups',
            data
        );
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
      
    
    } finally {
        setLoader(false)
    }
}

const handleUpdate = async (datas, setLoader, setResponse) => {
    
    const data = datas
   
    try {
        setLoader(true);
        const response = await apiClient.put(`/attribute-groups/${data.id}`,
            data
        );
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
        
    } finally {
        setLoader(false)
    }
}

const handleFetchFamilyById = async (id, setLoader, setResponse) => {
   
    try {
        setLoader(true);
        const response = await apiClient.get(`/attribute-groups/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
        
    } finally {
        setLoader(false)
    }
}

const fetchCategories = async (page, limit, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/categories?type=Leaf%20Child`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
       
    } finally {
        setLoader(false);
    }
}
 
const fetchAttributes = async (setLoader, setResponse,has_group) => {
    try {
        setLoader(true);
        let response;
        if(has_group!=null){
              response = await apiClient.get(`/attributes?has_group=${has_group}`);
        }else{
              response = await apiClient.get(`/attributes`);
        }
      
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const fetchCategoryAttributes = async (page, limit, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/category-attributes?page=${page}&length=${limit}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const handleFetchCategoryAttrById = async (id, setLoader, setResponse) => {
   
    try {
        setLoader(true);
        const response = await apiClient.get(`/category-attributes/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
       
    } finally {
        setLoader(false)
    }
}

const handleUpdateCategoryAttr = async (datas, setLoader, setResponse) => {
    
    const data = datas
  
    try {
        setLoader(true);
        const response = await apiClient.post(`/category-attributes/${data.id}/add-attribute`,
            data
        );
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
       
    } finally {
        setLoader(false)
    }
}

const fetchAttributeGroups = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/attribute-groups`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
export const Apis = {
    handleCreate,
    fetchFamilies,
    deleteFamily,
    handleUpdate,
    handleFetchFamilyById,
    fetchCategories,
    fetchAttributes,
    fetchCategoryAttributes,
    handleFetchCategoryAttrById,
    handleUpdateCategoryAttr,
    fetchAttributeGroups
     
}