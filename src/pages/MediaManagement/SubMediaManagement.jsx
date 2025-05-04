import React, { useEffect, useState } from "react";
import MediaManagementHeader from "./Components/MediaManagementHeader";
import MediaManagementFolder from "./Components/MediaManagementFolder";
import { useFetchSubBrandProduct } from "../../services/apis/BrandsManagement/Hooks";
import Loader from "../../utils/Loader";
import SubMediaManageFolder from "./Components/SubMediaManageFolder";
import { useLocation } from "react-router-dom";

const SubMediaManagement = () => {
  const location = useLocation();
  const id = location?.pathname?.split("/")[2];
  const { data, isLoading, error } = useFetchSubBrandProduct({
    id: id,
  });
  const [subBrandData, setSubBrandsData] = useState([]);
  useEffect(() => {
    setSubBrandsData(data?.data);
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
          {subBrandData?.length > 0 ? (
            subBrandData?.map((item, index) => {
              return <SubMediaManageFolder data={item} />;
            })
          ) : (
            <div>No Products Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubMediaManagement;
