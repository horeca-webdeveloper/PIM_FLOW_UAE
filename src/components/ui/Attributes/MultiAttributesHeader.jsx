import React from "react";
import { Link } from "react-router-dom";

const MultiAttributesHeader = ({ type }) => {
  
  return (
    <>
      {" "}
      <div className="flex items-center pb-[0px] justify-between">
        <div className="flex items-center ">
          <p className="text-[20px] font-light leading-[25.2px]">Attribute Validations</p>
          <p className="text-[20px] ml-[5px] font-light leading-[22.68px] text-[#26683A]">
            {/* (500 Results) */}
          </p>
        </div>
        <div>
          <Link to="/export">
          <button type="button" className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px] hover:text-white  group hover:bg-[#26683A]">
            Export
          </button>
          </Link>
          <Link to="/import">
          <button type="button" className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px] hover:text-white  group hover:bg-[#26683A]">
            Import
          </button>
          </Link>
          <button type="submit"  className="text-[14px] leading-[17.64px] font-light text-[white] bg-[#26683A] px-[20px] rounded-[5px] py-[8px]">
            Save
          </button>
        </div>
      </div>
      <p className="text-[14px] text-[#282828] leading-[21.82px] text-[#616161] font-semibold capitalize">
        Attribute Type : <span className="text-[green]">{type}</span>
      </p>
      <p className="text-[14px] text-[#282828] leading-[21.82px] text-[#616161] mt-[5px] font-semibold">
        Quality Score : ABCDE
      </p>
    </>
  );
};

export default MultiAttributesHeader;
