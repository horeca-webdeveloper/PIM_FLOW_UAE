import React, { useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import CommonOption from "../../../common/MultiAttributes/CommonOption";
import CommonTrueFalse from "../../../common/MultiAttributes/CommonTrueFalse";

const ProductVariation = ({ productVariation, setProductVariation }) => {
  const [show, setShow] = useState(true);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

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
    setProductVariation((prev) => ({
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
          Product Variation
        </h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">
            6 missing required attribute
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
        <form className="space-y-4 p-4">
          <div className="flex gap-4 w-[100%]">
            <CommonInput
              label={"Variation Grams"}
              value={productVariation?.variant_grams}
              name={"variant_grams"}
              type={"Number"}
              onChange={handleChange}
            />

            <CommonTrueFalse
              label={"Variation Require Shipping"}
              name={"variant_requires_shipping_Value"}
              value={productVariation?.variant_requires_shipping_Value}
              onChange={(e) => {
                setProductVariation((prev) => ({
                  ...prev,
                  variant_requires_shipping_Value: e.target.value === "Yes", // Convert to boolean
                }));
              }}
            />
          </div>
          <div className="flex gap-4 w-[100%]">
            <CommonInput
              label={"Variant Barcode"}
              value={productVariation?.variant_barcode}
              name={"variant_barcode"}
              onChange={handleChange}
            />
            <CommonInput
              label={"Variant Color title"}
              value={productVariation?.variant_color_title}
              name={"variant_color_title"}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 w-[100%]">
            <CommonTrueFalse
              label={"Is Variation"}
              name={"is_Variation_Value"}
              value={productVariation?.is_Variation_Value}
              onChange={(e) => {
                setProductVariation((prev) => ({
                  ...prev,
                  is_Variation_Value: e.target.value === "Yes", // Convert to boolean
                }));
              }}
            />
            <CommonInput
              label={"Variant Color Value"}
              value={productVariation?.variant_color_value}
              name={"variant_color_value"}
              onChange={handleChange}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductVariation;
