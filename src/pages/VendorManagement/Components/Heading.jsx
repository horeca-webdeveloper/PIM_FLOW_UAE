import React from "react";
import { useNavigate } from "react-router-dom";

const Heading = ({ setShowPopup }) => {
  const navigate = useNavigate();
  return (
    <div className=" border-b-2 border-[#26683A] pb-[10px] p-0 mb-[20px] flex justify-between items-start">
      {/* Right Section (Buttons) */}
      <div className="flex items-center">
        <p className="font-normal text-[20px] mt-[8px] leading-[100%] text-[#303030]">
          {"On Board Vendors"}
        </p>
        <p className="ml-[10px] font-normal text-[18px] leading-[100%] text-[#26683A]"></p>
      </div>
      <div className="flex items-center gap-2">
        {/* <button
          onClick={() => navigate("/vendor-import")}
          className="text-[14px] leading-[17.64px] font-normal h-[38px] text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          Import
        </button> */}
        <button
          onClick={() => setShowPopup(true)}
          className="text-[14px] leading-[17.64px] font-normal h-[38px] text-[white] bg-[#26683A] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          Add Vendor
        </button>
      </div>
    </div>
  );
};

export default Heading;
