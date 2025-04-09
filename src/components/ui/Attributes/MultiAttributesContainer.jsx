import React from "react";

const MultiAttributesContainer = ({ title, requiredField, children }) => {
  return (
    <div className="mt-[20px]  min-h-[300px] bg-white border-2 border-[#DFDFDF] rounded-lg ">
      {/* Header Section */}
      <div className="flex cursor-pointer rounded-t-md py-[5px] border-b-2 border-b-[#DFDFDF] bg-[#F9F9FB] px-4 justify-between items-center mb-4">
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          {title}
        </h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">{requiredField}</span>
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

      {/* Inputs Section */}
      <div className="space-y-4 pl-4">{children}</div>
    </div>
  );
};

export default MultiAttributesContainer;
