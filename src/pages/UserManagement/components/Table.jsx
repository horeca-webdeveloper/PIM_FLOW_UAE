import React, { useState } from "react";
import Loader from "../../../utils/Loader";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { ChevronRight, Search, Grid, Maximize, Edit, Trash } from "react-icons";

const Table = ({
  data,
  isLoading,
  setShowEdit,
  setLimit,
  setEditData,
  setShowDelete,
  setId,
}) => {
  return (
    <div className="bg-white h-[70vh] rounded-lg border border-gray-200 w-full">
      {/* Top navigation */}
      <div className="flex items-center border-b border-gray-200">
        <div className="flex-1 flex h-[50px]"></div>

        {/* <div className="flex px-2">
          <button className="p-2 text-gray-400">
            <FaSearchLocation size={16} />
          </button>
        </div> */}
        <div className="flex items-center mr-[10px] justify-center">
          <span>Limit :</span>
          <select
            onChange={(e) => setLimit(e.target.value)}
            className="w-[110px] border border-[#BCBCBC] rounded-md p-[5px] ml-[10px] text-[14px]"
          >
            <option value={"10"}>10 Results</option>
            <option value={"20"}>20 Results</option>
            <option value={"50"}>50 Results</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[calc(70vh-50px-50px)]">
        {" "}
        {/* Adjust height based on header & nav */}
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left">
            {/* Table Header */}
            <thead>
              <tr className="sticky top-0 bg-gray-50 h-[50px]">
                <th className="w-10 p-2 border border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </th>
                {[
                  "First Name",
                  "Last Name",
                  "User Name",
                  "Email",
                  "Profile Img",
                  "Role Name",
                  "Action",
                ].map((header, index) => (
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
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.first_name}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.last_name}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.username}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.email}
                  </td>

                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.profile_img}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.role_name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => {
                          setShowEdit(true);
                          document.body.style.overflow = "hidden";
                          setEditData(item);
                        }}
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
