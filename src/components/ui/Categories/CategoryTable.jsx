import React from "react";
import { FaEdit, FaFilter, FaSearch, FaTrash } from "react-icons/fa";
import { urls } from "../../../config/baseUrls";
import PaginationComponent from "../../common/PaginationComponent";
const CategoryTable = ({ tableHeading, datas, options, showFilter, showCheckBox, getDatafn, deleteData, disableDelete, setPage, totalPages, changePage, currentPage }) => {

    
    return (
        <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px]">
            {/* Tabs */}
            <div className="flex px-4 py-2 items-center justify-between bg-white rounded-md">
                <div>

                </div>
                {showFilter && (
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
                )}
            </div>

            {/* Table */}
            <div className="overflow-auto bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200 text-gray-700 text-sm">
                        <tr className="border border-[#BCBCBC]">
                            {showCheckBox ? <th className="p-3 w-10 border border-[#BCBCBC]">
                                <input type="checkbox" />
                            </th> : ''}

                            {tableHeading.map((item, index) => (
                                <th
                                    key={index}
                                    className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                                >
                                    {item.title}
                                </th>
                            ))}
                            <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas?.length > 0 ? (
                            datas.map((row, rowIndex) => (

                           
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
                                >

 

                                    <td
                                        key={row?.name}
                                        className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                                    >
                                        {row?.category?.name}
                                    </td>
                                    <td
                                        key={row?.image}
                                        className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                                    >
                                        <img src={row?.category?.image} alt={row?.name} />
                                    </td>

                                    <td
                                        key={row?.slug}
                                        className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                                    >
                                        {row?.category?.slug}
                                    </td>
                                    <td
                                        key={row?.status}
                                        className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                                    >
                                        {row?.category?.status}
                                    </td>


                                    <td className="p-3 items-center">
                                        <div className="flex  justify-center space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                                            <span className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => getDatafn(row.id,row.category.id,row.category.name)}>
                                                <img src={`${urls.hostUrl}/icons/pencil-write.png`} alt="edit" />
                                            </span>

                                            {!disableDelete ? <> {/* Divider */}
                                                <div className="w-px h-5 bg-gray-300"></div>

                                                <span className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => deleteData(row.id)}>
                                                    <img src={`${urls.hostUrl}/icons/bin.png`} alt="trash" />
                                                </span></> : ''}

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={tableHeading.length + 1}
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

export default React.memo(CategoryTable);
