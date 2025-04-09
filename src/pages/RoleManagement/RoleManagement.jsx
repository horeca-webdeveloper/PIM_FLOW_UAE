import React, { useState } from "react";
import UserManagementHeader from "../UserManagement/components/UserManagementHeader";
import Table from "./components/Table";
import { useFetchUsers } from "../../services/apis/Users/Hooks";
import {
  useDeleteRole,
  useFetchAllRoles,
} from "../../services/apis/Roles/Hooks";
import CreateRolePopup from "../../components/ui/Popups/createProducts/CreateRolePopup";
import DeleteUserPopup from "../UserManagement/components/DeleteUserPopup";
import toast from "react-hot-toast";

const RoleManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [id, setId] = useState("");
  const { data, isLoading, error } = useFetchAllRoles();
  const {
    mutate,
    isLoading: createUserLoading,
    error: createUserError,
  } = useDeleteRole();

  const deleteUser = () => {
    setDeleteLoading(true);
    mutate(id, {
      onSuccess: (data) => {
        setDeleteLoading(false);
        toast.success("Role Deleted Successfully");
        window.location.reload();
      },
      onError: (err) => {
        setDeleteLoading(false);
        console.log(err);
      },
    });
  };
  return (
    <>
      <UserManagementHeader setShowPopup={setShowPopup} heading={"Roles"} />
      <Table
        data={data}
        isLoading={isLoading}
        setId={setId}
        setShowDelete={setShowDelete}
      />
      {showPopup && <CreateRolePopup setShowPopup={setShowPopup} />}
      {showDelete && (
        <DeleteUserPopup
          setShowDelete={setShowDelete}
          deleteUser={deleteUser}
          title={"Role"}
          deleteLoading={deleteLoading}
        />
      )}
    </>
  );
};

export default RoleManagement;
