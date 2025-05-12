import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import UserManagementHeader from "./components/UserManagementHeader";
import { useDeleteUser, useFetchUsers } from "../../services/apis/Users/Hooks";
import CreateUserPopup from "./components/CreateUserPopup";
import UpdateUserPopup from "./components/UpdateUserPopup";
import DeleteUserPopup from "./components/DeleteUserPopup";
import toast from "react-hot-toast";
import PaginationComponent from "../../components/common/PaginationComponent";
// import { ChevronRight, Search, Grid, Maximize, Edit, Trash } from "react-icons";

const UserManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [totalPages, setTotalPage] = useState(1);
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const [id, setId] = useState("");
  const { data, isLoading, error } = useFetchUsers({
    page: page,
    length: limit,
  });

  const {
    mutate,
    isLoading: deleteUserLoading,
    error: deleteUserError,
  } = useDeleteUser();

  useEffect(() => {
    setTotalPage(data?.total_pages);
  }, [data]);

  const deleteUser = () => {
    setDeleteLoading(true);
    mutate(id, {
      onSuccess: (data) => {
        setDeleteLoading(false);
        toast.success("User Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      onError: (err) => {
        setDeleteLoading(false);
      },
    });
  };
  return (
    <>
      <UserManagementHeader setShowPopup={setShowPopup} heading={"Users"} />
      <Table
        data={data?.data}
        isLoading={isLoading}
        setEditData={setEditData}
        setShowEdit={setShowEdit}
        setLimit={setLimit}
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
      <div className="flex items-center justify-center mt-[10px]">
        <PaginationComponent
          setPage={setPage}
          totalPages={totalPages}
          changePage={changePage}
          currentPage={page}
        />
      </div>
    </>
  );
};

export default UserManagement;
