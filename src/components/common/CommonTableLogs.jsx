import React, { useState } from "react";
import { FaEdit, FaFilter, FaSearch, FaTrash } from "react-icons/fa";

const CommonTableLogs = ({ tableHeading, datas, options, showFilter }) => {
   
  return (
    <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[-15px]">
      {/* Tabs */}
      <div className="flex px-4 items-center justify-between bg-white rounded-md">
        <div>
          {!!options &&
            options?.map((option, index) => (
              <button
                key={index}
                className="px-6 py-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] hover:bg-gray-200 transition-all"
              >
                {option}
              </button>
            ))}
        </div>
        {showFilter ? (
          <div className="flex justify-end my-3 space-x-2">
            <button className="p-2 border rounded text-gray-600 bg-white hover:bg-gray-200">
              <FaSearch />
            </button>
            <button className="p-2 border rounded text-gray-600 bg-white hover:bg-gray-200">
              <FaFilter />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white ">
        <table className="w-full  text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700 text-sm">
            <tr className="border border-[#BCBCBC]">
              {tableHeading.map((item, index) => {
                return (
                  <th
                    key={index}
                    className="p-3  text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC] whitespace-nowrap"
                  >
                    {item.title}
                  </th>
                );
              })}
            </tr>
          </thead>


          <tbody>
            {datas?.description ? (<>
            <tr className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
            >
              <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC] whitespace-nowrap">
                Total Count
              </td>
              <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
              {datas.description["Total Count"]}

              </td>
            </tr>
              <tr

                className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
              >
                <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC] whitespace-nowrap">
                  Success Count
                </td>
                <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                {datas.description["Success Count"]}

                </td>
              </tr>

              <tr

                className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
              >
                <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC] whitespace-nowrap">
                  Failed Count
                </td>
                <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                {datas.description["Failed Count"]}

                </td>
              </tr>
              <tr

                className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
              >
                <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC] align-top">
                  Errors
                </td>
                <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                {datas.description.Errors.map((item, index) => (
                      <div key={index} className="mb-2">
                        <strong>Row Number: {item["Row Number"]}</strong>
                        <ul className="list-disc pl-5">
                          {item.Error.map((error, i) => (
                            <li key={i}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                

                </td>
              </tr></>) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-4 text-center text-gray-500 border border-[#BCBCBC]"
                >
                  No Data Available
                </td>
              </tr>
            )}

          </tbody>


        </table>
      </div>
    </div>
  );
};

export default React.memo(CommonTableLogs);
