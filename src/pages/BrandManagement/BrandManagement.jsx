import React, { useEffect, useState } from "react";
import Heading from "./Component/Heading";
import Table from "./Component/Table";
import { useDeleteUser, useFetchUsers } from "../../services/apis/Users/Hooks";
import AddBrandPopup from "./Component/AddBrandPopup";
import {
  useDeleteBrand,
  useFetchManageBrandList,
} from "../../services/apis/BrandsManagement/Hooks";
import DeleteBrandPopup from "./Component/DeleteBrandPopup";
import toast from "react-hot-toast";
import UpdateBrandPopup from "./Component/UpdateBrandPopup";
import { Pagination } from "../../components/Pagination/Pagination";
import { useDebounce } from "use-debounce";

const BrandManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [id, setId] = useState("");
  const [sort, setSort] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const [brandsData, setBrandsData] = useState([]);
  const [limit, setLimit] = useState("10");
  const [searchBrand, setSearchBrand] = useState("");
  const [brandSearch] = useDebounce(searchBrand, 300);
  const { data, isLoading, error } = useFetchManageBrandList({
    search: brandSearch,
    status: "",
    sort_order: sort,
    per_page: limit,
    page: page,
  });
  const {
    mutate,
    isLoading: deleteBrandLoading,
    error: deleteBrandError,
  } = useDeleteBrand();

  const deleteBrand = () => {
    setDeleteLoading(true);
    mutate(id, {
      onSuccess: (data) => {
        setDeleteLoading(false);
        console.log(data);
        toast.success("Brand Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      onError: (err) => {
        setDeleteLoading(false);
        console.log(err);
      },
    });
  };

  useEffect(() => {
    setBrandsData(data?.data);
  }, [data]);
  return (
    <div className="bg-[#f1f1f1] min-h-[80vh] max-w-[82vw]">
      <Heading setShowPopup={setShowPopup} />
      <Table
        brandsData={brandsData}
        isLoading={isLoading}
        setLimit={setLimit}
        setId={setId}
        setSort={setSort}
        setSortBy={setSortBy}
        setSearchBrand={setSearchBrand}
        setShowEdit={setShowEdit}
        setEditData={setEditData}
        setShowDelete={setShowDelete}
      />
      {showPopup && <AddBrandPopup setShowPopup={setShowPopup} />}
      {showEdit && (
        <UpdateBrandPopup editData={editData} setShowEdit={setShowEdit} />
      )}
      {showDelete && (
        <DeleteBrandPopup
          setShowDelete={setShowDelete}
          deleteBrand={deleteBrand}
          title={"Brand"}
          deleteUserLoading={deleteBrandLoading}
          deleteLoading={deleteLoading}
        />
      )}
      <div className="mt-[10px]">
        <Pagination
          paginationData={data?.pagination}
          setPage={setPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default BrandManagement;
