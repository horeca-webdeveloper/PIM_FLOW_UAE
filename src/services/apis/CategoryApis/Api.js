
import { apiClient } from "../../../utils/apiWrapper";
import { notify } from "../../../utils/notify";

 

const fetchCategories = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/categories`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}

const fetchInnerCategories = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/categories?type=All&parent_id=${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}


const fetchCategoriesPages = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/category-pages`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}
const fetchChildCategories = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/categories?type=Leaf Child`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

 
 
const getAttributesByCategory = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/category/getAttributesByCategory/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
const createSubCategory = async (datas, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/subcategories',
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

const createCategory = async (datas, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/category-pages',
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
const fetchSubCategories = async (page,limit,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/subcategories?page=${page}&limit=${limit}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const fetchSubCategoriesById = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/subcategories/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const updateSubCategory = async (datas,id, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post(`/subcategories/${id}`,
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
const updateCategory = async (datas,id, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post(`/category-pages/${id}`,
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

const deleteSubCategories = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.delete(`/subcategories/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const deleteCategories = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.delete(`/category-pages/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const productByCategory = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/products/category/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const fetchCategoriesById = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/products/category/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}
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

const fetchCategoriesPageById = async (id,setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/category-pages/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)
    } finally {
        setLoader(false);
    }
}

const allCategoriesTree = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/allcategories`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}

const createNewCategory = async (datas, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/categories',
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
const categoryReorder = async (datas, setLoader, setResponse) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post('/categories/reorder',
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
export const Apis = {
    fetchChildCategories,
    getAttributesByCategory,
    createSubCategory,
    fetchSubCategories,
    fetchSubCategoriesById,
    updateSubCategory,
    deleteSubCategories,
    fetchCategories,
    productByCategory,
    deleteCategories,
    fetchCategoriesPages,
    createCategory,
    updateCategory,
    fetchInnerCategories,
    fetchCategoriesById,
    fetchProductByCategory,
    fetchCategoriesPageById,
    allCategoriesTree,
    createNewCategory,
    categoryReorder


}