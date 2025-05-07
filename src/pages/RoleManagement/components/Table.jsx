import React, { useState } from "react";
import Loader from "../../../utils/Loader";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteRole } from "../../../services/apis/Roles/Hooks";
// import { ChevronRight, Search, Grid, Maximize, Edit, Trash } from "react-icons";

const Table = ({ data, isLoading, setId, setShowDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg border border-gray-200 w-full overflow-hidden">
      {/* Top navigation */}
      <div className="flex items-center border-b border-gray-200">
        <div className="flex-1 flex h-[50px]">
          {["Option One", "Option Two", "Option Three", "Option Four"].map(
            (option, index) => (
              <button
                key={index}
                className="font-semibold px-[10px] text-[14px] leading-[100%] text-[#4A4A4A]"
              >
                {option}
              </button>
            )
          )}
        </div>
        <div className="flex px-2">
          <button className="p-2 text-gray-400">
            <FaSearchLocation size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-50 h-[50px]">
                <th className="w-10 p-2 border border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </th>
                {["User Role", "Description", "Action"].map((header, index) => (
                  <th
                    key={index}
                    className="px-3 py-2 text-xs font-medium text-gray-600 border border-gray-200"
                  >
                    <div className="flex items-center">
                      <p className="font-semibold text-[14px] cursor-pointer leading-[100%] text-[#616161]">
                        {header}
                      </p>
                      {header !== "Action" && <span className="ml-1">▼</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 text-center border h-[50px] border-gray-200">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/user-general-setting", {
                        state: { roleData: item },
                      });
                    }}
                    className="px-3 py-4 cursor-pointer text-sm text-[#303030] font-normal border border-gray-200"
                  >
                    {item?.name}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.description}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() =>
                          navigate("/update-permission", {
                            state: { roleData: item },
                          })
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
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
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setShowDelete(true);
                          document.body.style.overflow = "hidden";
                          setId(item?.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
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
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
