import React, { useState } from "react";
import folderIcon from "../../../assets/icons/folderIcon.png";
import MainFolderIcon from "../../../assets/icons/MainFolderIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
import { MdDownloadForOffline } from "react-icons/md";
import axios from "axios";
import { baseUrls } from "../../../utils/apiWrapper";
import toast from "react-hot-toast";

const VendorFolderView = ({ data, title, type, vendorId, vendorName }) => {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const id = location?.pathname.split("/")[2];
  const handleSubmit = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${baseUrls}/vendors/${id}/documents/download?type=${type}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // 👈 Important for downloading files
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/zip" });
        setLoader(false);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${vendorName}.zip`; // 👈 You can change this filename
        a.click();
        window.URL.revokeObjectURL(url);

        toast.success("Downloaded Successfully!");
      } else {
        toast.error("Failed to download file.");
        setLoader(false);
      }
    } catch (error) {
      toast.error(`${title} not found`);
      setLoader(false);
      console.error("Download error:", error);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="w-full cursor-pointer max-w-[250px] p-2 h-[250px] border border-gray-300 rounded-md bg-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-grow">
          <img src={folderIcon} alt="Folder" className="mr-2" />
          <span className="text-sm">{title}</span>
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
        onClick={() =>
          navigate("/VendorMediaFiles", {
            state: { file: data, type: type, vendorId: vendorId },
          })
        }
        className="flex items-center justify-center flex-col h-[calc(100%-30px)] w-full bg-[#F6F6F6] mt-[10px] rounded-md"
      >
        <img
          src={MainFolderIcon}
          alt="Main Folder"
          className="max-h-full w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default VendorFolderView;
