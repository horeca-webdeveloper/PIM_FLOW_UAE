import React, { useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import CommonOption from "../../../common/MultiAttributes/CommonOption";
import CommonTrueFalse from "../../../common/MultiAttributes/CommonTrueFalse";

const ShippinDimension = ({ shippingDimension, setShippingDimension }) => {
  const [show, setShow] = useState(true);

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

    setShippingDimension((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Dimensions
        </h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">
            13 missing required attribute
          </span>
          <button className="ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {show && (
        <form className="space-y-4  px-4">
          <div className="flex  gap-4 w-[full] pb-[15px]">
            <div className="flex flex-col w-[50%] pr-[20px] border-r border-[#A8A4A4]">
              <h1 className="text-[20px] text-[#4A4A4A] mb-[20px] leading-[27.28px] font-normal">
                Product Dimension
              </h1>
              <CommonOption
                label="Product Unit"
                name="length_unit_value"
                value={shippingDimension?.length_unit_value}
                options={shippingDimension?.length_unit || []}
                onChange={handleChange}
              />
              <CommonInput
                label={"Product Length"}
                name={"length"}
                type={"Number"}
                value={shippingDimension?.length}
                onChange={handleChange}
              />
              <CommonInput
                label={"Product Width"}
                name={"width"}
                type={"Number"}
                value={shippingDimension?.width}
                onChange={handleChange}
              />
              <CommonInput
                label={"Product Height"}
                type={"Number"}
                name={"height"}
                value={shippingDimension?.height}
                onChange={handleChange}
              />
              <CommonInput
                label={"Product Depth"}
                name={"depth"}
                type={"Number"}
                value={shippingDimension?.depth}
                onChange={handleChange}
              />
              <CommonOption
                label="Product Weight unit"
                name="weight_unit_id"
                value={shippingDimension?.weight_unit_id || ""}
                options={shippingDimension?.weight_unit || []}
                onChange={handleChange}
              />
              <CommonInput
                label={"Product Weight "}
                value={shippingDimension?.weight}
                name={"weight"}
                type={"Number"}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-[50%]">
              <h1 className="text-[20px] text-[#4A4A4A] mb-[20px] leading-[27.28px] font-normal">
                Shipping Dimension
              </h1>
              <CommonOption
                label="Shipping Unit"
                name="shipping_length_value"
                value={shippingDimension?.shipping_length_value || ""}
                options={shippingDimension?.shipping_length || []}
                onChange={handleChange}
              />
              <CommonInput
                label={"Shipping Weight"}
                value={shippingDimension?.shipping_weight}
                name={"shipping_weight"}
                type={"Number"}
                onChange={handleChange}
              />
              <CommonInput
                label={"Shipping Width"}
                value={shippingDimension?.shipping_width}
                name={"shipping_width"}
                type={"Number"}
                onChange={handleChange}
              />
              <CommonInput
                label={"Shipping Height"}
                value={shippingDimension?.shipping_height}
                name={"shipping_height"}
                type={"Number"}
                onChange={handleChange}
              />
              <CommonInput
                label={"Shipping Depth"}
                value={shippingDimension?.shipping_depth}
                name={"shipping_depth"}
                type={"Number"}
                onChange={handleChange}
              />
              <CommonOption
                label="Shipping Weight Option"
                name="shipping_weight_option_value"
                value={
                  shippingDimension?.shipping_weight_option_value.toLowerCase() ||
                  ""
                }
                options={shippingDimension?.shipping_weight_option || []}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippinDimension;
