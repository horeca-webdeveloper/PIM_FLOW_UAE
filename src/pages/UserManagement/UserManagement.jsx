import React, { useState } from "react";
import Table from "./components/Table";
import UserManagementHeader from "./components/UserManagementHeader";
import { useDeleteUser, useFetchUsers } from "../../services/apis/Users/Hooks";
import CreateUserPopup from "./components/CreateUserPopup";
import UpdateUserPopup from "./components/UpdateUserPopup";
import DeleteUserPopup from "./components/DeleteUserPopup";
import toast from "react-hot-toast";
// import { ChevronRight, Search, Grid, Maximize, Edit, Trash } from "react-icons";

const UserManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [id, setId] = useState("");
  const { data, isLoading, error } = useFetchUsers();
  const {
    mutate,
    isLoading: deleteUserLoading,
    error: deleteUserError,
  } = useDeleteUser();

  const deleteUser = () => {
    setDeleteLoading(true);
    mutate(id, {
      onSuccess: (data) => {
        setDeleteLoading(false);
        console.log(data);
        toast.success("User Deleted Successfully");
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
      <UserManagementHeader setShowPopup={setShowPopup} heading={"User"} />
      <Table
        data={data}
        isLoading={isLoading}
        setEditData={setEditData}
        setShowEdit={setShowEdit}
        setId={setId}
        setShowDelete={setShowDelete}
      />
      {showPopup && <CreateUserPopup setShowPopup={setShowPopup} />}
      {showEdit && (
        <UpdateUserPopup editData={editData} setShowEdit={setShowEdit} />
      )}
      {showDelete && (
        <DeleteUserPopup
          setShowDelete={setShowDelete}
          deleteUser={deleteUser}
          title={"User"}
          deleteUserLoading={deleteUserLoading}
          deleteLoading={deleteLoading}
        />
      )}
    </>
  );
};

export default UserManagement;
