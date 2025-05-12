import React, { useEffect, useState } from "react";
import AttributesHeader from "../../components/ui/Attributes/AttributesHeader";
import AttributesTable from "../../components/ui/Attributes/AttributesTable";
import CreateAttributes from "../../components/ui/Popups/createAttributes/CreateAttributes";
import { notify } from "../../utils/notify";
import { Apis } from "../../services/apis/Attributes/Api";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import PaginationComponent from "../../components/common/PaginationComponent";
import ProductVariantsTable from "../../components/ui/Products/ProductVariantsTable";
import ProductsHeading from "../../components/ui/Products/ProductsHeading";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";
import UpdateVariantPopup from "../../components/ui/Popups/createProducts/UpdateVariantPopup";
import { useFetchProductVariant } from "../../services/apis/ProductVariant/Hooks";
const ProductVariants = () => {
  const navigate = useNavigate();
  const [TableData, setTableData] = useState([]);
  const [type, setType] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  const { data, isLoading, error } = useFetchProductVariant({
    page: page,
    length: limit,
    query: query,
    sort_dir: sort,
    sort_by: sortBy,
  });

  console.log("---->>>>>>", data?.data);
  const buttons = [
    {
      label: "Import",
      link: "",
      icon: "",
      type: "button",
      bgColor: "#E2E2E2",
      icon: "icons/import.png",
      textColor: COLORS.darkCharcoal,
      fontSize: "14px",
      fontWeight: "normal",
    },
    {
      label: "Create Variants ",
      popup: true,
      icon: "icons/download.png",
      type: "button",
      bgColor: COLORS.bgPrimary,
      textColor: "white",
      textSize: "14px",
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
    setTableData(data?.data);
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

  useEffect(() => {
    setTotalPages(data?.meta?.total);
    //  Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
  }, [data]);

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
              results={limit}
              setShow={setShowModal}
              span={`20 (Results)`}
            />

            <ProductVariantsTable
              searchPlaceholder="Search Variants"
              updateAttributeTypes={updateAttributeTypes}
              totalPages={totalPages}
              changePage={changePage}
              setPage={setPage}
              currentPage={page}
              deleteAttribute={deleteAttributes}
              datas={data?.data}
              setShowModal={setShowModal}
              setUpdateDatas={setUpdateDatas}
              setLimit={setLimit}
              setSortBy={setSortBy}
              sortBy={sortBy}
              setShowDelete={setShowDelete}
              isLoading={isLoading}
              setSearchQuery={setSearchQuery}
              setId={setId}
              setSort={setSort}
              searchquery={searchquery}
              setEditData={setEditData}
              setShowEdit={setShowEdit}
            />

            {/* <UpdateVariantPopup
                        title="Update Product Variant"
                            loader={loader}
                            setLoader={setLoader}
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            setResponse={setResponse}
                            getResponse={getResponse}
                            updateDatas={updateDatas && updateDatas}
                            setType={setType}
                        /> */}
          </>
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
    </>
  );
};

export default ProductVariants;
