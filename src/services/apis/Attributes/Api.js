
import { apiClient } from "../../../utils/apiWrapper";
import { notify } from "../../../utils/notify";
const fetchAttributes = async (page, limit, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/attributes?page=${page}&length=${limit}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const deleteAttributes = async (id, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.delete(`/attributes/${id}`);
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
        const response = await apiClient.post('/attributes',
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
        const response = await apiClient.put(`/attributes/${data.id}`,
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

const handleFetchAttributeById = async (id, setLoader, setResponse) => {

    try {
        setLoader(true);
        const response = await apiClient.get(`/attributes/${id}`);
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

const fetchCategoryAttributeGroups = async (id, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/products/${id}}/product-category-attribute-groups`);
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
    fetchAttributes,
    deleteAttributes,
    handleUpdate,
    handleFetchAttributeById,
    fetchAttributeGroups,
    fetchCategoryAttributeGroups


}