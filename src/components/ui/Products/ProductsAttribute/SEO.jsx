import React, { useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";

const SEO = ({ seoData, setSeoData }) => {
  const [show, setShow] = useState(true);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let sanitizedValue;
    if (type === "number") {
      sanitizedValue = value.replace(/[eE+-]/g, "");
      sanitizedValue = sanitizedValue === "" ? "" : Number(sanitizedValue);
    } else if (type === "checkbox") {
      sanitizedValue = e.target.checked;
    } else {
      sanitizedValue = value;
    }

    setSeoData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  // ✅ Count the number of missing attributes
  const missingCount =
    (!seoData?.google_shopping_category ? 1 : 0) +
    (!seoData?.google_shopping_mpn ? 1 : 0);

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797] bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Google Shopping
        </h2>
        {missingCount > 0 && (
          <div className="text-sm text-red-500">
            <span className="mr-1 cursor-pointer">
              {missingCount} missing required attribute
              {missingCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {show && (
        <>
          <div className="flex items-center px-4 mt-[10px] mb-[20px] gap-4">
            <CommonInput
              label={"Google Shopping Category"}
              value={seoData?.google_shopping_category}
              name={"google_shopping_category"}
              onChange={handleChange}
            />
            <CommonInput
              label={"Google Shopping MPN"}
              value={seoData?.google_shopping_mpn}
              name={"google_shopping_mpn"}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SEO;
