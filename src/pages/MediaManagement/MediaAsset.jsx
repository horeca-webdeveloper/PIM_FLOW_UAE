import React, { useEffect, useState } from "react";
import MediaManagementHeader from "./Components/MediaManagementHeader";
import Loader from "../../utils/Loader";
import FolderView from "./Components/FolderView";
import { useFetchMediaAsset } from "../../services/apis/BrandsManagement/Hooks";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrls } from "../../utils/apiWrapper";
import toast from "react-hot-toast";

const MediaAsset = () => {
  const location = useLocation();
  const id = location?.pathname?.split("/")[2];
  console.log(id);
  const { data, isLoading, error } = useFetchMediaAsset({
    id: id,
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${baseUrls}/products/${id}/media/download`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // 👈 Important for downloading files
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "media.zip"; // 👈 You can change this filename
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success("Download started!");
      } else {
        toast.error("Failed to download file.");
      }
    } catch (error) {
      toast.error("No Media Found");
      console.error("Download error:", error);
    }
  };

  const [assets, setAssets] = useState([]);
  useEffect(() => {
    setAssets(data?.data);
  }, [data]);
  console.log(data);
  return (
    <div className="min-h-[90vh]">
      <MediaManagementHeader handleSubmit={handleSubmit} title={"Download"} />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5">
          <FolderView
            type={"video"}
            title={"Videos"}
            data={data?.data?.video_path}
          />
          <FolderView
            type={"image"}
            title={"Images"}
            data={data?.data?.images}
          />
          <FolderView
            type={"document"}
            title={"Documents"}
            data={data?.data?.documents}
          />
        </div>
      )}
    </div>
  );
};

export default MediaAsset;
