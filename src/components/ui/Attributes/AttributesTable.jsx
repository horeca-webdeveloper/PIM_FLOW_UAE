import React, { useState } from "react";
import { FaEdit, FaFilter, FaSearch, FaTrash } from "react-icons/fa";
import { formatDate } from "../../../utils/formatDate";
import { urls } from "../../../config/baseUrls";
import PaginationComponent from "../../common/PaginationComponent";
import { useNavigate } from "react-router-dom";
const AttributesTable = ({ deleteAttribute, datas, setShowModal, setUpdateDatas, setPage, totalPages, changePage, currentPage }) => {
  const navigate = useNavigate();
  const updateBtnClick = (row) => {

    navigate("/MutliAttributes", {
      state: { datas: row.id },
    });
    // setUpdateDatas(row);
    // setShowModal(true);
  }
  return (
    <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px] ">
      {/* Tabs */}
      <div className="flex px-4 py-2 items-center justify-between bg-white rounded-md">
        <div>
          {/* {["Option One", "Option Two", "Option Three", "Option Four"].map(
            (option, index) => (
              <button
                type="button"
                key={index}
                className="px-6 py-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] hover:bg-gray-200 transition-all"
              >
                {option}
              </button>
            )
          )} */}
        </div>
        <div className="flex  justify-between ">
          <div className="p-1 mt-0 ml-2 mr-2 w-[100px] bg-[#FAFBFD] border-[#BCBCBC] flex items-center justify-center space-x-3 border rounded-md">
            <button className="text-blue-500 hover:text-blue-700">
              <img src={`${urls.hostUrl}/icons/search.png`} alt="search" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-[#979797]"></div>

            <button className="text-red-500 hover:text-red-700">
              <img src={`${urls.hostUrl}/icons/filter.png`} alt="filter" />
            </button>


          </div>
          <button className="text-red-500 p-2 bg-[#FAFBFD] hover:text-red-700 ml-1 border rounded-md">
            <img src={`${urls.hostUrl}/icons/sorting.png`} alt="sorting" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white ">
        <table className="w-full  text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700 text-sm">
            <tr className="border border-[#BCBCBC]">
              {/* <th className="p-3 w-10 border border-[#BCBCBC]">
                <input type="checkbox" />
              </th> */}
              <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                Attribute Name
              </th>
              <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                Code
              </th>
              <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                Data Type
              </th>
              <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                Group
              </th>
              <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                Last Updated
              </th>
              <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {datas?.length > 0 ? (
              datas.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
                >
                  {/* <td className="p-3 border-b border-[#BCBCBC]">
                    <input type="checkbox" />
                  </td> */}
                  <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC] capitalize">
                    {row.name}
                  </td>
                  <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                    {row.code}
                  </td>
                  <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                    {row.type}
                  </td>
                  <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                    {row.attribute_groups.length > 0 && (
                      <span>
                        {row.attribute_groups.map((item) => item.name).join(", ")}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                    {formatDate(row.updated_at)}
                  </td>


                  <td className="p-3 items-center">
                    <div className="flex  justify-center space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                      <span className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => updateBtnClick(row)} >
                        <img src={`${urls.hostUrl}/icons/pencil-write.png`} alt="edit" />
                      </span>


                      <div className="w-px h-5 bg-gray-300"></div>

                      <span className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => deleteAttribute(row.id)}>
                        <img src={`${urls.hostUrl}/icons/bin.png`} alt="trash" />
                      </span>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
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

      <PaginationComponent setPage={setPage}
        totalPages={totalPages}
        changePage={changePage}
        currentPage={currentPage} />
    </div>
  );
};

export default AttributesTable;
