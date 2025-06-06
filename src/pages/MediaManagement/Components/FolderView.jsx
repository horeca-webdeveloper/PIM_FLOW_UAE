import React, { useState } from "react";
import folderIcon from "../../../assets/icons/folderIcon.png";
import threeDot from "../../../assets/icons/threeDot.png";
import MainFolderIcon from "../../../assets/icons/MainFolderIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
import { MdDownloadForOffline } from "react-icons/md";
import axios from "axios";
import { baseUrls } from "../../../utils/apiWrapper";
import toast from "react-hot-toast";
import { FaFolder } from "react-icons/fa";

const FolderView = ({ data, title, type }) => {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const id = location?.pathname.split("/")[2];
  const handleSubmit = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${baseUrls}/products/${id}/media/${type}/download`,
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
          <FaFolder className="text-[#26683A] hover:text-green-700 text-xl mr-[4px] mb-[2px]" />
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
          navigate("/MediaFiles", { state: { file: data, type: title } })
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

export default FolderView;
