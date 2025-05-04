import React, { useState } from "react";
import folderIcon from "../../../assets/icons/folderIcon.png";
import threeDot from "../../../assets/icons/threeDot.png";
import MainFolderIcon from "../../../assets/icons/MainFolderIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import axios from "axios";
import { baseUrls } from "../../../utils/apiWrapper";
import toast from "react-hot-toast";
import Loader from "../../../utils/Loader";

const SubMediaManageFolder = ({ data }) => {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const id = location?.pathname.split("/")[2];
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${baseUrls}/products/${id}/media/all/download`,
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
        setLoader(false);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "media.zip"; // 👈 You can change this filename
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success("Download started!");
      } else {
        toast.error("Failed to download file.");
        setLoader(false);
      }
    } catch (error) {
      toast.error("Product not found");
      setLoader(false);
      console.error("Download error:", error);
    }
  };

  return (
    <div
      key={data?.id}
      className="w-full cursor-pointer max-w-[250px] p-2 h-[250px] border border-gray-300 rounded-md bg-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-grow">
          <img src={folderIcon} alt="Folder" className="mr-2" />
          <span className="text-sm">{data?.sku}</span>
        </div>
        <div
          onClick={() => handleSubmit()}
          className="relative group inline-block"
        >
          {loader ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              <MdDownloadForOffline color="#444746" size={20} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 w-max bg-gray-600 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Download
              </div>
            </>
          )}
        </div>

        {/* <img src={threeDot} alt="Menu" className="ml-auto" /> */}
      </div>
      <div
        onClick={() => navigate(`/MediaAsset/${data?.id}`)}
        className="flex items-center justify-center flex-col h-[calc(100%-30px)] w-full bg-gray-100 mt-[10px] rounded-md"
      >
        <p className="mb-[10px] line-clamp-2 px-[4px] text-[14px] text-center">
          {data?.name}
        </p>
        <img
          src={MainFolderIcon}
          alt="Main Folder"
          className="max-h-full w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default SubMediaManageFolder;
