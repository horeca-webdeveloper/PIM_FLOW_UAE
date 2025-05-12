import React, { useEffect, useState } from "react";
import AttributesHeader from "../../components/ui/Attributes/AttributesHeader";
import AttributesTable from "../../components/ui/Attributes/AttributesTable";
import CreateAttributes from "../../components/ui/Popups/createAttributes/CreateAttributes";
import { notify } from "../../utils/notify";
import { Apis } from "../../services/apis/Attributes/Api";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import PaginationComponent from "../../components/common/PaginationComponent";
import ProductVariantsTable from "../../components/ui/Products/ProductVariantsTable";
import ProductsHeading from "../../components/ui/Products/ProductsHeading";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";
import ProductVariantsUpdateTable from "../../components/ui/Products/ProductVariantsUpdateTable";
import UpdateVariantPopup from "../../components/ui/Popups/createProducts/UpdateVariantPopup";
import axios from "axios";
import { basePath } from "../../services/apiRoutes";
import DeleteVendorPopup from "../VendorManagement/Components/DeleteVendorPopup";
import DeleteProductVariants from "./DeleteProductVariants";
import { useDeleteListedVendor } from "../../services/apis/BrandsManagement/Hooks";
import toast from "react-hot-toast";
import { useDeleteListedVariant } from "../../services/apis/ProductVariant/Hooks";
const UpdateProductVariants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const CategoryId = location?.pathname?.split("/")[2];

  const [updateData, setUpdateData] = useState([]);
  const [type, setType] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10000);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fetchAttloader, setAttrLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [getResponse, setResponse] = useState([]);
  const [getDeleteResponse, setDeleteResponse] = useState([]);
  const [getAttributes, setAttibutes] = useState([]);
  const [updateDatas, setUpdateDatas] = useState([]);
  const [id, setId] = useState("");
  const [parentId, setParentId] = useState("");
  const [editData, setEditData] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const [uploadShow, setUploadShow] = useState(false);
  const [searchquery, setSearchQuery] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [sort, setSort] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const [query] = useDebounce(searchquery, 300);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const buttons = [
    {
      label: "Auto Group ",
      popup: true,
      icon: "",
      type: "submit",
      bgColor: COLORS.bgPrimary,
      textColor: "white",
      textSize: "14px",
      fontWeight: "normal",
    },
    {
      label: "Assign Variants",
      link: "",
      icon: "",
      type: "button",
      bgColor: "#E2E2E2",
      icon: "",
      textColor: COLORS.darkCharcoal,
      fontSize: "14px",
      fontWeight: "normal",
    },
  ];
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const updateAttributeTypes = (data) => {
    setUpdateDatas(data);
    setShowModal(true);
  };
  useEffect(() => {
    //  Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
  }, []);

  useEffect(() => {
    if (getResponse.success) {
      notify(getResponse.message);

      window.location.href = `/MutliAttributes/${getResponse.data.id}`;

      setShowModal(false);
    }
  }, [getResponse]);

  const deleteAttributes = (id) => {
    // Apis.deleteAttributes(id, setAttrLoader, setDeleteResponse);
  };
  useEffect(() => {
    if (getDeleteResponse.success) {
      notify(getDeleteResponse.message);
      // Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
    }
  }, [getDeleteResponse]);

  useEffect(() => {
    if (getAttributes.success) {
      setTotalPages(getAttributes.total_pages);
      setTotalRecords(getAttributes.total_records);
    }
  }, [getAttributes]);

  const GenerateProductVariantData = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${basePath}/generate-groups`,
        {
          category_id: CategoryId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      setUpdateData(response.data?.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const getProductVariantData = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${basePath}/product-groups?category_id=${CategoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      console.log("Success:", response);
      setUpdateData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getProductVariantData();
  }, []);

  useEffect(() => {
    //  Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
  }, [page]);

  const {
    mutate,
    isLoading: deleteVariantLoading,
    error: deleteVariantError,
  } = useDeleteListedVariant();

  const deleteProductVariant = () => {
    const data = {
      parentId: parentId,
      variantId: id,
    };
    setDeleteLoading(true);
    mutate(data, {
      onSuccess: (data) => {
        setDeleteLoading(false);
        // toast.success("Variant Deleted Successfully");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      },
      onError: (err) => {
        setDeleteLoading(false);
      },
    });
  };

  return (
    <>
      <div className="">
        {fetchAttloader ? (
          <FullScreenLoader bgTransparent={true} />
        ) : (
          <>
            <HeaderComponent
              label="Product Variants"
              buttons={buttons}
              UpdateProductVariantData={GenerateProductVariantData}
              setShow={setShowModal}
              span={`20 (Results)`}
            />
            <ProductVariantsUpdateTable
              searchPlaceholder="Search Variants"
              updateAttributeTypes={updateAttributeTypes}
              totalPages={totalPages}
              setParentId={setParentId}
              changePage={changePage}
              updateData={updateData}
              setPage={setPage}
              currentPage={page}
              deleteAttribute={deleteAttributes}
              setShowModal={setShowModal}
              setUpdateDatas={setUpdateDatas}
              setLimit={setLimit}
              setSortBy={setSortBy}
              sortBy={sortBy}
              setShowDelete={setShowDelete}
              isLoading={loader}
              setSearchQuery={setSearchQuery}
              setId={setId}
              setSort={setSort}
              searchquery={searchquery}
              setEditData={setEditData}
              setShowEdit={setShowEdit}
            />

            <UpdateVariantPopup
              title="Update Product Variant"
              loader={loader}
              id={id}
              setLoader={setLoader}
              parentId={parentId}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              setResponse={setResponse}
              getResponse={getResponse}
              updateDatas={updateDatas && updateDatas}
              setType={setType}
            />

            {showDelete && (
              <DeleteProductVariants
                setShowDelete={setShowDelete}
                deleteVariant={deleteProductVariant}
                title={"Product Variant"}
                deleteUserLoading={deleteVariantLoading}
                deleteLoading={deleteLoading}
              />
            )}
          </>
        )}

        {/* <div className="flex items-center justify-center mt-[40px]">
                    <PaginationComponent
                      setPage={setPage}
                      totalPages={totalPages}
                      changePage={changePage}
                      currentPage={page}
                    />
                  </div> */}
      </div>
    </>
  );
};

export default UpdateProductVariants;
