import React from "react";
import DummyImage from "../../../assets/icons/DummyImage.png";
import Loader from "../../../utils/Loader";
 
import saveIcon from "../../../../src/assets/icons/saveIcon.png"

const BrandHeader = ({
  handleCreateProduct,
  updateProductLoading,
  general,
  setGeneralData,
  data,
}) => {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Remove `e`, `E`, `+`, and `-` from the input value
    // Handle different input types
    let sanitizedValue;
    if (type == "number") {
      // Remove non-numeric characters except decimal point
      sanitizedValue = value.replace(/[eE+-]/g, "");
      // Convert to number or 0 if empty
      sanitizedValue = sanitizedValue === "" ? "" : Number(sanitizedValue);
    } else if (type === "checkbox") {
      sanitizedValue = e.target.checked;
    } else {
      sanitizedValue = value;
    }

    setGeneralData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };
  return (
    <div className=" border-b border-[#26683A] pb-[10px] p-0 flex justify-between items-start">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Product Icon */}
        <div className="flex  items-center justify-center h-[120px] w-[120px] border rounded-[6px]">
          <img
            className="border-[5px] w-full rounded-[7px] border-white p-[20px]"
            src={DummyImage}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-between  h-[100px] ">
          <div className="flex">
            <h3 className="text-[18px] font-medium text-[#303030]">
             Home Page:
            </h3>
            <br/>
    
          </div>
          <div>
          <p className="text-[16px] text-[#616161]">
                Website:{" "}
                <span className="text-[#26683A] cursor-pointer">
                  United Arab Emirates ▼
                </span>
              
              
              </p>
          </div>
         
          
        </div>
      </div>

      {/* Right Section (Buttons) */}
      <div className="flex items-center gap-2">
        <button className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
          Export
        </button>
        <button className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]">
          Import
        </button>
        <button
          onClick={() => handleCreateProduct()}
          className="flex text-[14px] leading-[17.64px] font-light text-[white] bg-[#26683A] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          {updateProductLoading ? (
            ""
          ) : (
            <img className="mr-[5px]" src={saveIcon} />
          )}
          {updateProductLoading ? <Loader /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default BrandHeader;
