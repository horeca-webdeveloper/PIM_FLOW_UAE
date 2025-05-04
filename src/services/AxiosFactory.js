import axios from "axios";
import toast from "react-hot-toast";

export const apiCall = async (method, url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;

    const config = {
      method,
      url,
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...(isFormData ? {  "Content-Type": "multipart/form-data",} : { "Content-Type": "application/json" }),
        ...headers,
      },
    };

    const response = await axios(config);

    if (response.data.success === true) {
      return response.data;
    } else {
      // toast.error(response.data.message);
      return response.data;
    }
  } catch (err) {
    if (err.response) {
      if (
        err.response.data.success === true ||
        err.response.data.success === false
      ) {
        // toast.error(err.response.data.message);
        return err.response.data;
      } else {
        // toast.error("No Response From Server");
        return {
          success: false,
          message: "No Response From Server",
        };
      }
    } else {
      toast.error("No Response From Server");
      return {
        success: false,
        message: "No Response From Server",
      };
    }
  }
};
