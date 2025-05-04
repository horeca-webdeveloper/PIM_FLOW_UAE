import React, { useState } from "react";
import CommonMultiKeywordInput from "../../../common/CommonMultiKeywordInput";
import SeoComponent from "../../../common/SeoComponent";

const SEONEW = ({ SEO }) => {
  const [show, setShow] = useState(true);
  const [secondaryKeywords, setSecondaryKeywords] = useState([
    "Keyword One",
    "Keyword Two",
  ]);

  return (
    <div className="border p-0 rounded-lg mt-[20px] shadow bg-white">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          SEO Attributes
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
        <div className="grid grid-cols-2 p-4 gap-4 w-[50%]">
          <div>
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Primary Keyword
            </label>
            <input
              type="text"
              className="w-full border border-[#A8A4A4] border-[#A8A4A4] p-2 rounded"
              placeholder="Text Field"
            />
          </div>

          <div>
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Monthly Search Volume
            </label>
            <input
              type="number"
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="Numeric"
            />
          </div>

          <SeoComponent />

          <div>
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Monthly Search Volume
            </label>
            <input
              type="number"
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="Numeric"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              URL Slug
            </label>
            <input
              type="text"
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="Text Field"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Title Tag
            </label>
            <input
              type="text"
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="Text Field"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Meta Title
            </label>
            <input
              type="text"
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="Text Field (Limit 60)"
            />
            <label className="block text-sm font-medium pt-4">
              Meta Description
            </label>
            <textarea
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="Text Field (Limit 160)"
            ></textarea>
          </div>

          <div className="col-span-2">
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Schema Markup Code (JSON-LD)
            </label>
            <input
              type="url"
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="URL"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Internal Links
            </label>
            <input
              type="url"
              className="w-full border border-[#A8A4A4] p-2 rounded"
              placeholder="URL"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
              Indexing
            </label>
            <select className="w-full border p-2 rounded">
              <option value="">Single Select</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEONEW;
