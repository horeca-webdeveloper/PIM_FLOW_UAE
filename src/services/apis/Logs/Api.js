
import { apiClient } from "../../../utils/apiWrapper";
import { notify } from "../../../utils/notify";


const transactionLogs = async (page, limit, module, action, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/transaction-logs?module=${module}&action=${action}&page=${page}&length=${limit}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}

const transactionLogsDetails = async (id, setLoader, setResponse) => {
    try {
        setLoader(true);
        const response = await apiClient.get(`/transaction-logs/${id}`);
        setResponse(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        notify(errorMessage)

    } finally {
        setLoader(false);
    }
}



export const Apis = {
    transactionLogs,
    transactionLogsDetails
}