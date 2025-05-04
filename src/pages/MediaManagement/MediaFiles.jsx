import React from "react";
import MediaManagementHeader from "./Components/MediaManagementHeader";
import MediaView from "./Components/MediaView";
import { useLocation } from "react-router-dom";

const MediaFiles = () => {
  const location = useLocation();
  const { file, type } = location.state || {};
  return (
    <div className="min-h-[90vh]">
      <MediaManagementHeader />
      <div className="grid grid-cols-5 gap-5">
        {file?.map((item, index) => {
          console.log(item);
          return <MediaView type={type} data={item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default MediaFiles;
