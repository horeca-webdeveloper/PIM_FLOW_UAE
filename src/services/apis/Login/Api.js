import { LoginApiPath } from "../../apiRoutes";
import { apiCall } from "../../AxiosFactory";

export const Login = async (credentials) => {
    const { email, password } = credentials?.formData;
    const data={
        "email": email,
        "password": password
      }
    return await apiCall("post", LoginApiPath,  data );
  };
  