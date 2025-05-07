import React from "react";
import folderIcon from "../../../assets/icons/folderIcon.png";
import threeDot from "../../../assets/icons/threeDot.png";
import MainFolderIcon from "../../../assets/icons/MainFolderIcon.png";
import { useNavigate } from "react-router-dom";
import { FaFolder } from "react-icons/fa";

const MediaManagementFolder = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/sub-media-management/${data?.id}`)}
      className="w-full cursor-pointer max-w-[250px] p-2 h-[250px] border border-gray-300 rounded-md bg-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-grow">
          <FaFolder className="text-[#26683A] hover:text-green-700 text-xl mr-[4px] mb-[2px]" />
          <span className="text-sm">{data?.name}</span>
        </div>
        {/* <img src={threeDot} alt="Menu" className="ml-auto" /> */}
      </div>
      <div className="flex items-center justify-center h-[calc(100%-30px)] w-full bg-gray-100 mt-[10px] rounded-md">
        <img
          src={MainFolderIcon}
          alt="Main Folder"
          className="max-h-full w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default MediaManagementFolder;
