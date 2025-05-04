import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchMediaAsset } from "../../../services/apis/BrandsManagement/Hooks";
import MediaManagementHeader from "../../MediaManagement/Components/MediaManagementHeader";
import FolderView from "../../MediaManagement/Components/FolderView";
import axios from "axios";
import { baseUrls } from "../../../utils/apiWrapper";
import toast from "react-hot-toast";
import Loader from "../../../utils/Loader";
import VendorFolderView from "./VendorFolderView";
import VendorManagementHeader from "./VendorManagementHeader";
import { VendorManagementContext } from "../VendorManagementContext";

const VendorAsset = () => {
  const location = useLocation();
  const id = location?.pathname?.split("/")[2];
  const [loader, setLoader] = useState(false);
  const { vendorName } = useContext(VendorManagementContext);

  const handleSubmit = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${baseUrls}/vendors/${id}/documents/download`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // 👈 Important for downloading files
        }
      );
      setLoader(false);
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${vendorName}.zip`; // 👈 You can change this filename
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success("Downloaded Successfully!");
      } else {
        toast.error("Failed to download file.");
      }
    } catch (error) {
      toast.error("No Media Found");
      setLoader(false);
      console.error("Download error:", error);
    }
  };

  return (
    <div className="min-h-[90vh]">
      <VendorManagementHeader
        handleSubmit={handleSubmit}
        loader={loader}
        title={"Download All"}
      />
      {false ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5">
          <VendorFolderView
            vendorName={vendorName}
            type={"video"}
            title={"Videos"}
            vendorId={id}
          />
          <VendorFolderView
            vendorName={vendorName}
            type={"image"}
            title={"Images"}
            vendorId={id}
          />
          <VendorFolderView
            vendorName={vendorName}
            type={"file"}
            title={"Documents"}
            vendorId={id}
          />
        </div>
      )}
    </div>
  );
};

export default VendorAsset;
