import React from "react";
import { useNavigate } from "react-router-dom";
const ProductsHeading = ({ setShowPopup }) => {
  const navigate=useNavigate();
 const handleNavigation=(page)=>{
      navigate(page)
  }
  return (
    <div className="flex items-center pb-[20px] justify-between">
      <div className="flex items-center ">
        <p className="text-[20px] font-light leading-[25.2px]">Products</p>
        <p className="text-[20px] ml-[5px] font-light leading-[22.68px] text-[#26683A]">
          (500 Results)
        </p>
      </div>
      <div>
        <button onClick={()=>handleNavigation('/product/export')} className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
          Export
        </button>
        <button onClick={()=>handleNavigation('/product/import')} className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
          Import
        </button>
        <button
          onClick={() => setShowPopup(true)}
          className="text-[14px] leading-[17.64px] font-light text-[white] bg-[#26683A] px-[20px] rounded-[5px] py-[8px]"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsHeading;
