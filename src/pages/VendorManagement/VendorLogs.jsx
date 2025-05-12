import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../utils/FullScreenLoader";
import CollapseComponent from "../../components/common/CollapseComponent";
import { Apis } from "../../services/apis/Logs/Api";
import LogsTable from "../../components/ui/Logs/LogsTable";
const VendorLogs = ({ module, action, showLogs }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    Apis.transactionLogs(page, limit, module, action, setLoader, setResponse);
  }, [showLogs]);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= response?.total_records) {
      setPage(newPage);
    }
  };
  const fetchErrorLogs = (id) => {
    navigate(`/log-details/${id}`);
  };

  useEffect(() => {
    Apis.transactionLogs(page, limit, module, action, setLoader, setResponse);
  }, [page]);

  const th = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Module",
      key: "module",
    },
    {
      title: "Action",
      key: "action",
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Identifier",
      key: "identifier",
    },
    {
      title: "Created By",
      key: "created_by",
    },
    {
      title: "Created At",
      key: "created_at",
    },
  ];

  return (
    <>
      {loader ? <FullScreenLoader bgTransparent={true} /> : ""}
      <CollapseComponent title="Import History">
        {response && response?.data?.length > 0 ? (
          <LogsTable
            totalPages={!!response && response?.total_pages}
            changePage={changePage}
            setPage={setPage}
            currentPage={page}
            tableHeading={th}
            totalRecords={!!response && response?.total_records}
            datas={!!response && response?.data}
            fetchErrorLogs={fetchErrorLogs}
            showFilter={true}
            disableDelete={true}
            disableEdit={true}
            disableView={false}
          />
        ) : (
          ""
        )}
      </CollapseComponent>
    </>
  );
};

export default React.memo(VendorLogs);
