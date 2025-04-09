import React, { useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";

const Other = ({ other, setOther }) => {
  const [show, setShow] = useState(true);
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
    setOther((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };
  return (
    <div className="mt-[20px] bg-white border-2 border-[#DFDFDF]  rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Other
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
        <>
          <div className="flex items-center px-4  gap-4">
            <CommonInput
              label={"Order"}
              value={other?.order}
              name={"order"}
              type="Number"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center px-4 mt-[10px] mb-[20px] gap-4"></div>
        </>
      )}
    </div>
  );
};

export default Other;
