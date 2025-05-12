import React, { useContext, useEffect, useState } from "react";
import { useFetchUsers } from "../../services/apis/Users/Hooks";
import Heading from "./Components/Heading";
import Table from "./Components/Table";
import {
  useDeleteVendor,
  useFetchManagePreEvaluateVendorList,
} from "../../services/apis/BrandsManagement/Hooks";
import DeleteVendorValuationPopup from "./Components/DeleteVendorValuationPopup";
import AddVendorValuationPopup from "./Components/AddVendorValuationPopup";
import AddSecondVendorValuationPopup from "./Components/AddSecondVendorValuationPopup";
import UpdateVendorValuationPopup from "./Components/UpdateVendorValuationPopup";
import UpdateSecondVendorValuationPopup from "./Components/UpdateSecondVendorValuationPopup";
import UploadVendorValuationFile from "./Components/UploadVendorValuationFile";
import { useFetchManageAllCountriesList } from "../../services/apis/CountriesLocation/Hooks";
import toast from "react-hot-toast";
import axios from "axios";
import { basePath } from "../../services/apiRoutes";
import { PreVendorManagementContext } from "./PreVendorManagementContext";
import { Pagination } from "./Components/Pagination";
import PaginationComponent from "../../components/common/PaginationComponent";
import { useDebounce } from "use-debounce";

const PreVendorManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [secondShowEdit, setSecondShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [createPayloadData, setCreatePayloadData] = useState([]);
  const [editData, setEditData] = useState({});
  const [updateData, setUpdateData] = useState([]);
  const [id, setId] = useState("");
  const [brandsData, setBrandsData] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const [sort, setSort] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [searchVendor, setSearhVendor] = useState("");
  const [searchquery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  // loading to fetch data for update
  const [debouncedSearchVendor] = useDebounce(searchVendor, 300);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true); // true initially
  const { data, isLoading, error } = useFetchManagePreEvaluateVendorList({
    page: page,
    length: limit,
    type: "global",
    query: debouncedSearchVendor,
    sort_dir: sort,
    sort_by: sortBy,
  });

  const [uploadShow, setUploadShow] = useState(false);
  const {
    data: allCountriesList,
    isLoading: countriesLoading,
    error: countriesError,
  } = useFetchManageAllCountriesList();

  const {
    mutate,
    isLoading: deleteVendorLoading,
    error: deleteVendorError,
  } = useDeleteVendor();

  const deleteVendor = () => {
    setDeleteLoading(true);
    mutate(id, {
      onSuccess: (data) => {
        setDeleteLoading(false);
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

  const { setPerformance } = useContext(PreVendorManagementContext);

  // Fetch cities when country changes
  useEffect(() => {
    setFetchLoading(true);
    if (id) {
      const token = localStorage.getItem("token");
      axios
        .get(`${basePath}/pre-onboarding-vendors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setPerformance((prev) => ({
            ...prev,
            score: res?.data?.data?.score,
          }));
          setFetchLoading(false);
          setFetchData(res.data?.data || []);
          console.log(res);
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
  
  useEffect(() => {
    if (showPopup || showEdit) {
        document.body.style.overflow = "hidden"; // Lock scroll
    } else {
        document.body.style.overflow = "auto"; // Restore scroll
    }
  
     return () => {
        document.body.style.overflow = "auto"; // Cleanup on unmount
     };
  }, [showPopup,showEdit]);

  return (
    <div className="bg-[#f1f1f1] sm:max-w-[75vw] md:max-w-[79vw] 2xl:max-w-[90vw] min-h-[90vh]">
      <Heading setShowPopup={setShowPopup} />
      <Table
        brandsData={brandsData}
        searchquery={searchquery}
        setShowDelete={setShowDelete}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setShouldFetch={setShouldFetch}
        setSort={setSort}
        setLimit={setLimit}
        isLoading={isLoading}
        setSearchQuery={setSearchQuery}
        setId={setId}
        setSearhVendor={setSearhVendor}
        setEditData={setEditData}
        setShowEdit={setShowEdit}
        setUploadShow={setUploadShow}
      />
      {showPopup && (
        <AddVendorValuationPopup
          setShowSecondPopup={setShowSecondPopup}
          setShowPopup={setShowPopup}
          setCreatePayloadData={setCreatePayloadData}
          allCountriesList={allCountriesList}
        />
      )}
      {showSecondPopup && (
        <AddSecondVendorValuationPopup
          createPayloadData={createPayloadData}
          setShowPopup={setShowPopup}
          setShowSecondPopup={setShowSecondPopup}
        />
      )}
      {showEdit && (
        <UpdateVendorValuationPopup
          setShowEdit={setShowEdit}
          setSecondShowEdit={setSecondShowEdit}
          allCountriesList={allCountriesList}
          editData={editData}
          setUpdateData={setUpdateData}
          fetchLoading={fetchLoading}
          setUpdatePayloadData={setEditData}
          vendorData={fetchData}
        />
      )}
      {secondShowEdit && (
        <UpdateSecondVendorValuationPopup
          setShowEdit={setShowEdit}
          updateData={updateData}
          fetchData={fetchData}
          updateId={id}
          setSecondShowEdit={setSecondShowEdit}
          updatePayloadData={editData}
        />
      )}
      {uploadShow && (
        <UploadVendorValuationFile setUploadShow={setUploadShow} />
      )}
      {showDelete && (
        <DeleteVendorValuationPopup
          setShowDelete={setShowDelete}
          deleteVendor={deleteVendor}
          title={"Vendor"}
          deleteUserLoading={deleteVendorLoading}
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
    </div>
  );
};

export default PreVendorManagement;
