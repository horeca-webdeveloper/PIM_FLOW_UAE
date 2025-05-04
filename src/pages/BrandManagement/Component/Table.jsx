import React, { useState } from "react";
import Loader from "../../../utils/Loader";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../config/baseUrls";

const Table = ({
  brandsData,
  isLoading,
  setSortBy,
  setLimit,
  setSort,
  setShowEdit,
  setSearchBrand,
  setEditData,
  setShowDelete,
  setId,
}) => {
  console.log(brandsData);
  return (
    <div className="bg-white  rounded-lg border  border-gray-200 w-[100%] overflow-x-scroll">
      <div className="flex items-center border-b border-gray-200">
        {/* <div className="flex-1 flex h-[50px]">
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
        </div> */}
        <div className="flex  items-center justify-between w-full p-2">
          <div>
            <input
              onChange={(e) => setSearchBrand(e.target.value)}
              placeholder="Search Brands"
              className="border py-[4px]  border-gray-400 px-[10px] w-[300px] rounded-md"
            />
            <button className="p-2 ml-[-30px] text-gray-400">
              <FaSearchLocation size={16} />
            </button>
          </div>
          <div className="flex items-center ml-[10px] justify-center">
            <div className="flex items-center ml-[10px] justify-center">
              <span>A to Z :</span>
              <select
                onChange={(e) => setSort(e.target.value)}
                className="w-[110px] mr-[5px] border border-[#BCBCBC] rounded-md p-[5px] ml-[10px] text-[14px]"
              >
                <option value={"asc"}>A to Z</option>
                <option value={"desc"}>Z to A</option>
              </select>
            </div>
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
      </div>
      <div className="">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 h-[50px]">
                <th className="w-10 p-2 border border-gray-200">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </th>
                {[
                  "Brand Name",
                  "Logo",
                  "Product Categories",
                  "Vendor Name",
                  "Number of products",
                  "Website",
                  "Status",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-3 py-2 text-xs font-medium text-gray-600 border border-gray-200"
                  >
                    <div className="flex items-center">
                      <p className="font-semibold text-[14px] text-center cursor-pointer leading-[100%] text-[#616161]">
                        {header}
                      </p>
                      {header !== "Action" && <span className="ml-1">▼</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brandsData?.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 text-center border h-[50px] border-gray-200">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.name}
                  </td>
                  <td className="flex flex-col justify-center items-center px-3 py-4 text-sm text-[#303030] font-normal border-b border-gray-200">
                    <img className="h-10 w-10" src={item?.logo} />
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.category_name?.toString().replace(",", ", ")}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.store_name?.toString().replace(",", ", ")}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.products_count}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                    {item?.slug || "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm  font-normal border border-gray-200">
                    <p
                      className={`${
                        item?.status == "published"
                          ? "bg-[#ccf0eb]  text-[#00B69B]"
                          : "bg-red-200  text-red-500"
                      }   text-center p-[5px] rounded text-[#00B69B]`}
                    >
                      {item?.status?.charAt(0).toUpperCase() +
                        item?.status?.slice(1)}
                    </p>
                  </td>
                  <td className="p-3 items-center">
                    <div className="flex  justify-center space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                      <span
                        onClick={() => {
                          setShowEdit(true);
                          setEditData(item);
                        }}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      >
                        <img
                          src={`${urls.hostUrl}/icons/pencil-write.png`}
                          alt="edit"
                        />
                      </span>

                      <div className="w-px h-5 bg-gray-300"></div>

                      <span
                        onClick={() => {
                          setShowDelete(true);
                          setId(item?.id);
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <img
                          src={`${urls.hostUrl}/icons/bin.png`}
                          alt="trash"
                        />
                      </span>
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
