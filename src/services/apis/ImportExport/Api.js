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

const fetchStores = async (setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/stores`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}
const exportData = async (datas, setLoader, setResponse, url, fileName) => {
    const fileNames = fileName;
    const urls = url;
    let extension;
    if(urls==='/products/export'){
        extension='csv';
    }else{
        extension='xlsx';
    }
    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post(urls,
            data,
            { responseType: 'blob', }
        );

        // Check if response contains a file
        const blob = new Blob([response.data]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Try to get the filename from headers
        const contentDisposition = response.headers["content-disposition"];
        const fileName = contentDisposition
            ? contentDisposition.split("filename=")[1]?.replace(/['"]/g, "")
            : `${fileNames}.${extension}`; // Default filename

        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)


    } finally {
        setLoader(false)
    }
}

const importData = async (datas, setLoader, setResponse, url) => {

    const data = datas
    try {
        setLoader(true);
        const response = await apiClient.post(url,
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
    fetchCategories,
    exportData,
    importData,
    fetchBrands,
    fetchStores

}