import { useMutation, useQuery } from "@tanstack/react-query";
import { createRoles, deleteRoles, fetchAllRoles, fetchRoles, fetchRolesNameId, fetchUsers } from "./Api";

export const useFetchRolesId = () => {
    return useQuery({
      queryKey: ["fetchRolesNameId"],
      queryFn: () => fetchRolesNameId(),
    });
  };


  export const useFetchRoles = (id) => {
    return useQuery({
      queryKey: ["fetchRolesName",id],
      queryFn: () => fetchRoles(id),
    });
  };

  export const useFetchAllRoles = ()=>{
    return useQuery({
      queryKey: ["fetchAllRoles"],
      queryFn: () => fetchAllRoles()
    });
  }

  export const useCreateRoles = () => {
    return useMutation({
      mutationFn: (data) => createRoles(data),
    });
  };


  export const useDeleteRole = () => {
    return useMutation({
      mutationFn: (data) => deleteRoles(data),
    });
  };