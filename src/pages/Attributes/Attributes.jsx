import React, { useEffect, useState } from "react";
import AttributesHeader from "../../components/ui/Attributes/AttributesHeader";
import AttributesTable from "../../components/ui/Attributes/AttributesTable";
import CreateAttributes from "../../components/ui/Popups/createAttributes/CreateAttributes";
import { notify } from "../../utils/notify";
import { Apis } from "../../services/apis/Attributes/Api";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { useNavigate } from "react-router-dom";
const Attributes = () => {
  const navigate = useNavigate();
  const [type, setType] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fetchAttloader, setAttrLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [getResponse, setResponse] = useState([]);
  const [getDeleteResponse, setDeleteResponse] = useState([]);
  const [getAttributes, setAttibutes] = useState([]);
  const [updateDatas, setUpdateDatas] = useState([]);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
  }, []);

  useEffect(() => {
    if (getResponse.success) {
      notify(getResponse.message);
      navigate("/MutliAttributes", {
        state: { datas: getResponse.data.id },
      });
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
  const options = ["Option One", "Option Two", "Option Three", "Option Four"];
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

            {/* <CommonTable  deleteData={deleteAttributes} getDatafn={fetchAttrGroupByid} tableHeading={th} options={options}  datas={!!getAttributes && getAttributes.data}   showFilter={true} /> */}
            <AttributesTable
              totalPages={totalPages}
              changePage={changePage}
              setPage={setPage}
              currentPage={page}
              deleteAttribute={deleteAttributes}
              datas={!!getAttributes && getAttributes.data}
              setShowModal={setShowModal}
              setUpdateDatas={setUpdateDatas}
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

      </div>
    </>
  );
};

export default Attributes;
