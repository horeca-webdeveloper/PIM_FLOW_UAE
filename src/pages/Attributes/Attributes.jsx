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
const Attributes = () => {
  const navigate = useNavigate();
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
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const updateAttributeTypes = (data) => {
    setUpdateDatas(data)
    setShowModal(true);
  }
  useEffect(() => {
    Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
  }, []);

  useEffect(() => {
    if (getResponse.success) {
      notify(getResponse.message);

      window.location.href = `/MutliAttributes/${getResponse.data.id}`

      setShowModal(false);
    }

  }, [getResponse]);

  const deleteAttributes = (id) => {
    Apis.deleteAttributes(id, setAttrLoader, setDeleteResponse);

  }
  useEffect(() => {
    if (getDeleteResponse.success) {
      notify(getDeleteResponse.message);
      Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
    }
  }, [getDeleteResponse]);

  const th = [
    { title: "ID", key: "id" },
    { title: "Attribute Name", key: "name" },
    { title: "Code", key: "code" },
    { title: "Data Type", key: "type" },
    { title: "Group", key: "group" },
    { title: "Last Updated", key: "updated_at" },

  ];

  useEffect(() => {
    if (getAttributes.success) {
      setTotalPages(getAttributes.total_pages)
      setTotalRecords(getAttributes.total_records)
    }
  }, [getAttributes]);

  useEffect(() => {
    Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
  }, [page]);


  return (
    <>
      <div className="">

        {fetchAttloader ? <FullScreenLoader bgTransparent={true} /> :
          <><AttributesHeader
            totalRecords={totalRecords}
            setShowModal={setShowModal}
            setUpdateDatas={setUpdateDatas}
          />



            <AttributesTable
           
              updateAttributeTypes={updateAttributeTypes}
              totalPages={totalPages}
              changePage={changePage}
              setPage={setPage}
              currentPage={page}
              deleteAttribute={deleteAttributes}
              datas={!!getAttributes && getAttributes.data}
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


            <CreateAttributes
              loader={loader}
              setLoader={setLoader}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              setResponse={setResponse}
              getResponse={getResponse}
              updateDatas={updateDatas && updateDatas}
              setType={setType}
            /></>}

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

export default Attributes;
