import React from "react";
import { useNavigate } from "react-router-dom";
const ProductsHeading = ({ setShowPopup, setStatFilter, statFilter }) => {
  const navigate = useNavigate();
  const handleNavigation = (page) => {
    navigate(page);
  };
  return (
    <div className="flex items-center pb-[20px] justify-between">
      <div className="flex items-center ">
        <p className="text-[20px] font-light leading-[25.2px]">Products</p>
        <p className="text-[20px] ml-[5px] font-light leading-[22.68px] text-[#26683A]"></p>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <select
            onChange={(e) => setStatFilter(e.target.value)}
            className="px-[15px] py-[8px] rounded-md bg-[#E3E3E3] text-[14px] leading-[17.64px] font-light "
            name=""
            value={statFilter}
          >
            <option value="15_days">Last 15 days</option>
            <option value="30_days">Last 30 days</option>
            <option value="2_months">Last 2 months</option>
            <option value="3_months">Last 3 months</option>
            <option value="6_months">Last 6 months</option>
            <option value="lifetime">Life Time</option>
          </select>
        </div>
        <div>
          {/* <button
          onClick={() => handleNavigation("/product/export")}
          className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          Export
        </button>
        <button
          onClick={() => handleNavigation("/product/import")}
          className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          Import
        </button> */}
          <button
            onClick={() => {
              setShowPopup(true);
              document.body.style.overflow = "hidden";
            }}
            className="text-[14px] leading-[17.64px] font-light text-[white] bg-[#26683A] px-[20px] rounded-[5px] py-[8px]"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeading;
