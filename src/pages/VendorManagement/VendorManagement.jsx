import React, { useEffect, useState } from "react";
import { useFetchUsers } from "../../services/apis/Users/Hooks";
import Heading from "./Components/Heading";
import Table from "./Components/Table";
import AddVendorPopup from "./Components/AddVendorPopup";
import { useDebounce } from "use-debounce";

import {
  useDeleteListedVendor,
  useFetchManageFinalVendorList,
} from "../../services/apis/BrandsManagement/Hooks";
import AddSecondVendorPopup from "./Components/AddSecondVendorPopup";
import DeleteVendorPopup from "./Components/DeleteVendorPopup";
import UpdateVendorPopup from "./Components/UpdateVendorPopup";
import UpdateSecondVendorPopup from "./Components/UpdateSecondVendorPopup";
import UploadVendorFile from "./Components/UploadVendorFile";
import { useFetchManageAllCountriesList } from "../../services/apis/CountriesLocation/Hooks";
import toast from "react-hot-toast";
import axios from "axios";
import { basePath } from "../../services/apiRoutes";
import { Pagination } from "./Components/Pagination";
import PaginationComponent from "../../components/common/PaginationComponent";

const VendorManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [secondShowEdit, setSecondShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [id, setId] = useState("");
  const [brandsData, setBrandsData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVendor, setSearhVendor] = useState("");
  const [uploadShow, setUploadShow] = useState(false);
  const [searchquery, setSearchQuery] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [limit, setLimit] = useState("10");
  const [sort, setSort] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const [debouncedSearchVendor] = useDebounce(searchVendor, 300);
  const { data, isLoading, error } = useFetchManageFinalVendorList({
    page: page,
    length: limit,
    type: "global",
    query: debouncedSearchVendor,
    sort_dir: sort,
    sort_by: sortBy,
  });
  const {
    mutate,
    isLoading: deleteVendorLoading,
    error: deleteVendorError,
  } = useDeleteListedVendor();

  const deleteVendor = () => {
    setDeleteLoading(true);
    mutate(id, {
      onSuccess: (data) => {
        setDeleteLoading(false);
        console.log(data);
        toast.success("Vendor Deleted Successfully");
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

  const {
    data: allCountriesList,
    isLoading: countriesLoading,
    error: countriesError,
  } = useFetchManageAllCountriesList();

  // Fetch cities when country changes
  useEffect(() => {
    setFetchLoading(true);
    if (id) {
      const token = localStorage.getItem("token");
      axios
        .get(`${basePath}/vendors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFetchLoading(false);
          setFetchData(res?.data?.data || []);
        })
        .catch((err) => {
          console.error("City error:", err);
          setFetchLoading(false);
          setFetchData([]);
        })
        .finally(() => setFetchLoading(false));
    } else {
      setFetchData([]);
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setBrandsData(data?.data);
  }, [data]);

  const [totalPages, setTotalPage] = useState(1);
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    setTotalPage(data?.total_pages);
  }, [data]);

 

  return (
    <div className="bg-[#f1f1f1] min-h-[90vh] w-[82vw]">
      <Heading setShowPopup={setShowPopup} />
      <Table
        brandsData={brandsData}
        setLimit={setLimit}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setShowDelete={setShowDelete}
        isLoading={isLoading}
        setSearhVendor={setSearhVendor}
        setId={setId}
        setSort={setSort}
        searchquery={searchquery}
        setEditData={setEditData}
        setShowEdit={setShowEdit}
        setSearchQuery={setSearchQuery}
        setUploadShow={setUploadShow}
      />
      {showPopup && (
        <AddVendorPopup
          setShowSecondPopup={setShowSecondPopup}
          setShowPopup={setShowPopup}
        />
      )}
      {uploadShow && <UploadVendorFile id={id} setUploadShow={setUploadShow} />}
      {showSecondPopup && (
        <AddSecondVendorPopup
          setShowPopup={setShowPopup}
          setShowSecondPopup={setShowSecondPopup}
          allCountriesList={allCountriesList}
        />
      )}
      {showEdit && (
        <UpdateVendorPopup
          fetchLoading={fetchLoading}
          fetchData={fetchData}
          setShowEdit={setShowEdit}
          setSecondShowEdit={setSecondShowEdit}
        />
      )}
      {secondShowEdit && (
        <UpdateSecondVendorPopup
          setShowEdit={setShowEdit}
          fetchData={fetchData}
          id={id}
          setSecondShowEdit={setSecondShowEdit}
          allCountriesList={allCountriesList}
        />
      )}
      {showDelete && (
        <DeleteVendorPopup
          setShowDelete={setShowDelete}
          deleteUser={deleteVendor}
          title={"Vendor"}
          deleteUserLoading={deleteVendorLoading}
          deleteLoading={deleteLoading}
        />
      )}
      <div className="flex items-center justify-center mt-[40px]">
        <PaginationComponent
          setPage={setPage}
          totalPages={totalPages}
          changePage={changePage}
          currentPage={page}
        />
      </div>
      <div></div>
    </div>
  );
};

export default VendorManagement;
