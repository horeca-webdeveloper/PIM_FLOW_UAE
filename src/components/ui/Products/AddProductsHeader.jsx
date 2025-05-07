import React from "react";
import Loader from "../../../utils/Loader";
import saveIcon from "../../../../src/assets/icons/saveIcon.png";
const AddProductsHeader = ({
  handleCreateProduct,
  updateProductLoading,
  general,
  data,
  setGeneralData,
}) => {
  const countryMap = {
    1: "United States",
    2: "United Arab Emirates",
    3: "Saudi Arabia",
  };

  const countryString = general?.websites; // or "3", or "1,2"

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Remove `e`, `E`, `+`, and `-` from the input value
    // Handle different input types
    let sanitizedValue;
    if (type === "number") {
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
    <div className="sticky top-0 z-50 pt-[15px] pb-[10px] border-b border-[#26683A] bg-[#F1F1F1] flex justify-between items-start">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Product Icon */}
        <div className="flex  items-center justify-center h-[120px] w-[120px] border rounded-[6px]">
          <img
            className="border-[5px] w-full rounded-[7px] border-white p-[20px]"
            src={data?.product?.images[0]}
            alt={data?.product?.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-between  h-[100px] justify-between">
          <div className="flex ">
            <h3 className="text-[18px] whitespace-nowrap font-medium text-[#303030]">
              Product Name :
            </h3>
            <h3 className="text-[18px] ml-[10px] whitespace-nowrap font-medium text-[#303030]">
              {data?.product?.name
                ? data?.product.name.substring(0, 55) + "..."
                : ""}
            </h3>
          </div>
          <div className="flex items-center">
            <div>
              <p className="text-[16px] text-[#616161]">
                Website:{" "}
                <span className="text-[#26683A] cursor-pointer">
                  {countryString
                    ?.split(",")
                    ?.map((id) => countryMap[id.trim()])
                    ?.filter(Boolean)
                    ?.join(", ")}
                </span>
                &nbsp; | &nbsp; Lifecycle Stage:{" "}
                <span className="text-[#8E0B21] cursor-pointer">
                  Marketing (30%) ▼
                </span>
              </p>
            </div>
          </div>

          {/* Quality Score */}
          <div className="flex items-center ">
            <div className="flex items-center text-[16px] mt-1">
              <span className="text-[#616161]">Quality Score:</span>
              <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded">
                A
              </span>
              <span className="ml-1 bg-yellow-400 text-white px-2 py-0.5 rounded">
                B
              </span>
              <span className="ml-1 bg-gray-400 text-white px-2 py-0.5 rounded">
                C
              </span>
              <span className="ml-1 bg-orange-500 text-white px-2 py-0.5 rounded">
                D
              </span>
              <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded">
                E
              </span>
            </div>
            <div className="flex items-center mt-[5px] ml-[20px]">
              <span className="text-[16px] text-[#616161] ml-[5px]">
                Status
              </span>
              <select
                value={general?.status_value || "draft"}
                onChange={(e) => handleChange(e)}
                name="status_value"
                className="ml-[8px] border rounded-md px-[10px] py-[3px]"
              >
                {general?.status?.map((item) => {
                  return <option value={item?.value}>{item?.value}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Buttons) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          Export
        </button>
        <button
          type="button"
          className="text-[14px] leading-[17.64px] font-light text-[#303030] bg-[#E2E2E2] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          Import
        </button>
        <button
          onClick={() => handleCreateProduct()}
          // type="submit"
          className="flex text-[14px] leading-[17.64px] font-light text-[white] bg-[#26683A] px-[20px] rounded-[5px] mr-[10px] py-[8px]"
        >
          {updateProductLoading ? (
            ""
          ) : (
            <img className="mr-[5px]" src={saveIcon} alt="Save" />
          )}
          {updateProductLoading ? <Loader /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddProductsHeader;
