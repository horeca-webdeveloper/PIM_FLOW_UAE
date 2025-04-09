import { useMutation } from "@tanstack/react-query";
import { Login } from "./Api";

export const useLogin = () => {
    return useMutation({
      mutationFn: (credentials) => Login(credentials),
    });
  };