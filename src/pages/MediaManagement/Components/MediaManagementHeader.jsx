import React from "react";
import { urls } from "../../../config/baseUrls";
import AddHeaderIcon from "../../../assets/icons/AddHeaderIcon.png";
import importIcon from "../../../assets/icons/importIcon.png";

const MediaManagementHeader = ({ title, handleSubmit }) => {
  return (
    <div className=" border-b-2 border-[#26683A] pb-[10px] p-0 mb-[20px] flex justify-between items-start">
      {/* Right Section (Buttons) */}
      <div className="flex items-center">
        <p className="font-normal text-[20px] leading-[100%] text-[#303030]">
          {title ? title : "Media Library Management"}
        </p>
        <p className="ml-[10px] font-normal text-[18px] leading-[100%] text-[#26683A]"></p>
      </div>
      <div className="flex items-center gap-2">
        {/* <button className="flex items-center  text-[14px] leading-[17.64px] font-normal h-[38px] text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
          <img src={importIcon} />
          <span className="font-Outfit ml-[5px] text-[14px] font-light">
            Import
          </span>
        </button>
        <button className="flex items-center  text-[14px] leading-[17.64px] font-normal h-[38px] text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
          <img src={importIcon} />
          <span className="font-Outfit ml-[5px] text-[14px] font-light">
            Export
          </span>
        </button> */}
        {/* <button
          onClick={() => title && handleSubmit()}
          className="flex items-center  text-[14px] leading-[17.64px] font-normal h-[38px] text-[white] bg-[#26683A] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          <img src={AddHeaderIcon} />
          <span className="ml-[5px] text-[14px] font-light text-white">
            {title || " Add Media"}
          </span>
        </button> */}
      </div>
    </div>
  );
};

export default MediaManagementHeader;
