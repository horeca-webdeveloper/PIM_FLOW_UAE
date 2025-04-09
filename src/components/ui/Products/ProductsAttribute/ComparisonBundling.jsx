import React, { useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import CommonMultiKeywordInput from "../../../common/CommonMultiKeywordInput";

const ComparisonBundling = ({ comparisonBundling, setComparisonBundling }) => {
  const [show, setShow] = useState(true);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComparisonBundling((prev) => ({ ...prev, [name]: value }));
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
          Comparison Bundling
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
        <div className="flex items-center px-4 mb-[20px] gap-4">
          <CommonMultiKeywordInput
            secondaryKeywords={comparisonBundling?.compare_type}
            setSecondaryKeywords={setComparisonBundling}
            fieldName="compare_type"
            label="Compare Type"
          />

          <CommonMultiKeywordInput
            secondaryKeywords={comparisonBundling?.compare_products}
            setSecondaryKeywords={setComparisonBundling}
            fieldName="compare_products"
            label="Compare Products"
          />
        </div>
      )}
    </div>
  );
};

export default ComparisonBundling;
