import React, { useEffect, useRef, useState } from "react";
import Loader from "../../../utils/Loader";
import { useNavigate } from "react-router-dom";
import pencilWrite from "../../../assets/icons/pencilWrite.png";
import vendorBin from "../../../assets/icons/vendorBin.png";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { formatDate } from "../../../utils/formatDate";
const AttributesTable = ({
  datas,
  setSearchQuery,
  isLoading,
  sortBy,
  setLimit,
  setSortBy,
  setSort,
  searchquery,
  deleteAttribute,
}) => {


  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  return (
    <div className="bg-white rounded-lg min-h-[40vh] border border-gray-200 w-full overflow-hidden">
      <div className="flex justify-between py-2 items-center px-2">
        <div ref={wrapperRef} className="relative">
          <input
            onClick={() => setShowDropdown(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder={`Search ${searchquery ? searchquery : "Attributes"}`}
            className="border py-[4px] border-gray-400 px-[10px] w-[300px] rounded-md"
          />

       
         
        </div>
        <div className="flex items-center ">
          <div className="flex items-center ml-[10px] justify-center">
            <span>A to Z :</span>
            <select
              onChange={(e) => setSort(e.target.value)}
              className="w-[110px] border border-[#BCBCBC] rounded-md p-[5px] ml-[10px] text-[14px]"
            >
              <option value={"asc"}>A to Z</option>
              <option value={"desc"}>Z to A</option>
            </select>
          </div>
          <div className="flex items-center ml-[10px] justify-center">
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
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left">
            {datas?.length > 0 && (
              <thead>
                <tr className="bg-gray-50 h-[50px]">
                  
                  {[
                    { name: "ID", id: "id" },
                    { name: "Name", id: "name" },
                    { name: "Code", id: "code" },
                    { name: "Data Type", id: "type" },
                    { name: "Attribute Groupe", id: "attribute_group_name" },
                    { name: "Created At", id: "created_at" },
                    { name: "Last Update ", id: "updated_at" },

                    { name: "Action", id: "action" },
                  ].map((header, index) => {

                    return (
                      <th
                        key={index}
                        onClick={() => {
                          if (
                            header?.id !== "action"
                       
                          ) {
                            sortBy === header?.id
                              ? setSortBy("")
                              : setSortBy(header?.id);
                          }
                        }}
                        className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-200 hover:text-[white] font-medium text-gray-600 border border-gray-200"
                      >
                        <div className="flex flex-col  justify-center">
                          <div className="font-semibold text-[14px] min-w-[50px] cursor-pointer text-left leading-[100%] text-[#616161]">
                            <div className="flex items-center justify-between">
                              <span className="">{header?.name}</span>
                              <div className="ml-[20px]">
                                {!(
                                
                                  header?.id === "action" 
                              
                                
                                ) && (
                                    <div className="w-[20px]">
                                      {sortBy === header?.id ? (
                                        <BiSortUp className="w-full h-auto" />
                                      ) : (
                                        <BiSortDown className="w-full h-auto" />
                                      )}
                                    </div>
                                  )}
                              </div>


                            </div>
                          </div>


                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
            )}
            <tbody>
              {datas?.length > 0 ? (
                datas.map((item, index) => (

                  <tr key={index}>
                  
                    <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200 capitalize">
                      {item?.id}
                    </td>
                    <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200 capitalize">
                      {item?.name}
                    </td>
                    
                    <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200 capitalize">
                      {item?.code}
                    </td>
                    <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200 capitalize">
                      {item?.type}
                    </td>
                    <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200 capitalize">
                      {item?.attribute_group_name}
                    </td>

                    <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                      {formatDate(item?.created_at)}
                    </td>


                    <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
  {formatDate(item?.updated_at)}
</td>

                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                      <div className="flex justify-center space-x-4 w-[120px] p-1 border rounded-md border-[#BCBCBC]">
                        <a
                          href={`/MutliAttributes/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                            <img src={pencilWrite} alt="edit" className="w-5 h-5" />
                          </span>
                        </a>
                        <div className="w-px h-5 bg-gray-300"></div>
                        <span
                          onClick={() => deleteAttribute(item.id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <img src={vendorBin} alt="trash" className="w-5 h-5" />
                        </span>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="100%" className="text-center py-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttributesTable;
