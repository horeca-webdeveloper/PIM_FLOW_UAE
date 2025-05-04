import React, { useEffect, useState } from "react";
import FAQTable from "./Components/FAQTable";
import FaqHeader from "./Components/FaqHeader";
import AddFaqPopup from "./Components/AddFaqPopup";
import EditFaqPopup from "./Components/EditFaqPopup";
import { useDeleteBrand } from "../../services/apis/BrandsManagement/Hooks";
import toast from "react-hot-toast";
import DeleteBrandPopup from "../BrandManagement/Component/DeleteBrandPopup";
import { useDeleteFaq, useFetchFAQs } from "../../services/apis/FAQ/Hooks";
import { Pagination } from "../../components/Pagination/Pagination";

const Faq = () => {
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [faqData, setFaqData] = useState([]);
  const [limit, setLimit] = useState("10");
  const [id, setId] = useState("");
  const [page, setPage] = useState("1");
  const { data, isLoading, error } = useFetchFAQs({
    search: "",
    page: page,
    limit: limit,
  });
  const {
    mutate,
    isLoading: deleteFaqLoading,
    error: deleteFaqError,
  } = useDeleteFaq();

  const deleteUser = () => {
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
    setFaqData(data?.data);
    console.log(data?.pagination);
  }, [data]);
  return (
    <div>
      <FaqHeader setAddPopup={setAddPopup} />
      <FAQTable
        faqData={faqData}
        setLimit={setLimit}
        isLoading={isLoading}
        setEditPopup={setEditPopup}
        setId={setId}
        setEditData={setEditData}
        setShowDelete={setShowDelete}
      />
      <div className="mt-[20px]">
        <Pagination
          paginationData={data?.pagination}
          setPage={setPage}
          page={page}
        />
      </div>
      {/* Pagination  */}
      {addPopup && <AddFaqPopup setAddPopup={setAddPopup} />}
      {editPopup && (
        <EditFaqPopup editData={editData} setEditPopup={setEditPopup} />
      )}
      {showDelete && (
        <DeleteBrandPopup
          setShowDelete={setShowDelete}
          deleteUser={deleteUser}
          title={"FAQ"}
          deleteFaqLoading={deleteFaqLoading}
          deleteLoading={deleteLoading}
        />
      )}
    </div>
  );
};

export default Faq;
