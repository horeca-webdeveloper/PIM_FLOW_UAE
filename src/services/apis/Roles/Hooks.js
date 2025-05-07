import { useMutation, useQuery } from "@tanstack/react-query";
import { createRoles, deleteRoles, fetchAllRoles, fetchRoles, fetchRolesNameId, fetchRolesPermission, fetchRolesPermissionById, fetchUsers } from "./Api";

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

  export const useFetchRolesPermission = () => {
    return useQuery({
      queryKey: ["fetchRolesPermission"],
      queryFn: () => fetchRolesPermission(),
    });
  };

  export const useFetchRolesPermissionById = (id) => {
    return useQuery({
      queryKey: ["fetchRolesPermissionById",id],
      queryFn: () => fetchRolesPermissionById(id),
    });
  };

  export const useFetchAllRoles = (params)=>{
    return useQuery({
      queryKey: ["fetchAllRoles",params],
      queryFn: () => fetchAllRoles(params)
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