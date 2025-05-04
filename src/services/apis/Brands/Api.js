
import { apiClient } from "../../../utils/apiWrapper";
import { notify } from "../../../utils/notify";

const fetchBrands = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brands`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}
// brand first page api
const fetchBrandFirstPage = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brand-temp-1`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}

const deleteBrandFirst = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.delete(`/brand-temp-1/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
const fetchBrandFirstPageById = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brand-temp-1/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
const createFirstBrandPage = async (datas, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/brand-temp-1',
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
const updateFirstBrandPage = async (datas,id, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post(`/brand-temp-1/${id}`,
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
// end brand first page api


// brand second api
const fetchBrandSecondPage = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brand-temp-2`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}

const deleteBrandSecond = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.delete(`/brand-temp-2/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
const fetchBrandSecondPageById = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brand-temp-2/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
const createSecondBrandPage = async (datas, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/brand-temp-2',
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
const updateSecondBrandPage = async (datas,id, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post(`/brand-temp-2/${id}`,
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
// end brand second page
// end brand first page api


// brand third api
const fetchBrandThirdPage = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brand-temp-3`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}

const deleteBrandThird = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.delete(`/brand-temp-3/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
const fetchBrandThirdPageById = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brand-temp-3/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
const createThirdBrandPage = async (datas, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/brand-temp-3',
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
const updateThirdBrandPage = async (datas,id, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post(`/brand-temp-3/${id}`,
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
// end brand second page
const fetchProductByCategory= async (catid,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/products/category/${catid}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}
const fetchCategoryByBrandId= async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/brands/${id}/categories`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}


const filterCategoryByCategoryId= async (catid,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/products/filtered-category/${catid}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}

const filterCategoryByCategoryIdFirst= async (catid,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/products/filtered-category-bd1/${catid}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}
const filterCategoryByCategoryIdThird= async (catid,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/products/filtered-category-bd3/${catid}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}
export const Apis = {
    
    fetchBrands,
    // third
    fetchBrandThirdPage,
    deleteBrandThird,
    fetchBrandThirdPageById,
    createThirdBrandPage,
    updateThirdBrandPage,
 // second
    fetchBrandSecondPage,
    deleteBrandSecond,
    fetchBrandSecondPageById,
    createSecondBrandPage,
    updateSecondBrandPage,
 // first
    fetchBrandFirstPage,
    deleteBrandFirst,
    fetchBrandFirstPageById,
    createFirstBrandPage,
    updateFirstBrandPage,
    fetchProductByCategory,
    fetchCategoryByBrandId,
    
    filterCategoryByCategoryId,
    filterCategoryByCategoryIdFirst,
    filterCategoryByCategoryIdThird


}