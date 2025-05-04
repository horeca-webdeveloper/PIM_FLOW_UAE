import React, { useEffect, useState } from "react";
import MediaManagementHeader from "./Components/MediaManagementHeader";
import { useFetchManageBrandList } from "../../services/apis/BrandsManagement/Hooks";
import Loader from "../../utils/Loader";
import SubMediaManageFolder from "./Components/SubMediaManageFolder";
import MediaManagementFolder from "./Components/MediaManagementFolder";
import { Pagination } from "../../components/Pagination/Pagination";

const MediaManagement = () => {
  // This is our main page for brands section media management
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetchManageBrandList({
    search: "",
    status: "",
    sort_order: "desc",
    per_page: 20,
    page: page,
  });

  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    setBrandsData(data?.data);
  }, [data]);
  return (
    <div className="min-h-[90vh]">
      <MediaManagementHeader />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5">
          {brandsData?.map((item, index) => (
            <MediaManagementFolder key={index} data={item} />
          ))}
        </div>
      )}
      <div className="mt-[20px]">
        <Pagination
          paginationData={data?.pagination}
          setPage={setPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default MediaManagement;
