import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, deleteRole, deleteUser, fetchUsers, updateUser } from "./Api";

export const useFetchUsers = () => {
    return useQuery({
      queryKey: ["fetchUsers"],
      queryFn: () => fetchUsers(),
    });
  };


  export const useCreateUser = () => {
    return useMutation({
      mutationFn: (data) => createUser(data),
    });
  };

  export const useUpdateUser = () => {
    return useMutation({
      mutationFn: (data) => updateUser(data),
    });
  };

  export const useDeleteUser = () => {
    return useMutation({
      mutationFn: (data) => deleteUser(data),
    });
  };

