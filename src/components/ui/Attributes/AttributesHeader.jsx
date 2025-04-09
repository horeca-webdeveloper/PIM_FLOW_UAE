import React from "react";
import { Link } from "react-router-dom";

const AttributesHeader = ({ setShowModal, setUpdateDatas, totalRecords }) => {
  const handleCreateBtn = () => {
    setShowModal(true);
    setUpdateDatas(null)
  };
  return (
    <>
      <div className="flex items-center pb-[8px] justify-between">
        <div className="flex items-center ">
          <p className="text-[20px] font-light leading-[25.2px] font-medium">Attributes</p>
          <p className="text-[20px] ml-[5px] font-light leading-[22.68px] text-[#26683A]">
            ({totalRecords} Results)
          </p>
        </div>
        <div>
          <Link to="/export">
          <button className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
            Export
          </button>
          </Link>
          <Link to="/import">
          <button className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
            Import
          </button>
          </Link>
          <button
            onClick={handleCreateBtn}
            className="text-[14px] leading-[17.64px] font-light text-[white] bg-[#26683A] px-[20px] rounded-[5px] py-[8px]"
          >
            Add Attributes
          </button>
        </div>
      </div>
      <p className="text-[16px] text-[#282828] leading-[21.82px] font-light">
        Attributes sets allow you to define groups of related attributes that
        can then be used in multiples schemas. Changes to the attributes set are
        automatically reflected in the schemas that reference them.
      </p>
    </>
  );
};

export default AttributesHeader;
