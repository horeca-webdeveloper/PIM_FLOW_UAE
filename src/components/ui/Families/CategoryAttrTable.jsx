import React, { useState } from "react";
import { urls } from "../../../config/baseUrls";

const CategoryAttrTable = ({
    tableHeading,
    datas,
    options,
    showFilter,
    showCheckBox,
    getDatafn,
    deleteData
}) => {
    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="p-0 bg-white border border-[#BCBCBC] rounded-md mt-[20px]">
            {/* Tabs */}
            <div className="flex px-4 items-center justify-between bg-white rounded-md">
                <div>
                    {!!options &&
                        options.map((option, index) => (
                            <button
                                type="button"
                                key={index}
                                className="px-6 py-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] hover:bg-gray-200 transition-all"
                            >
                                {option}
                            </button>
                        ))}
                </div>
                {showFilter && (
                    <div className="flex justify-between">
                        <div className="p-1 w-[100px] bg-[#FAFBFD] border-[#BCBCBC] flex items-center justify-center space-x-3 border rounded-md">
                            <button className="text-blue-500 hover:text-blue-700">
                                <img src={`${urls.hostUrl}/icons/search.png`} alt="search" />
                            </button>
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
                            {showCheckBox && (
                                <th className="p-3 w-10 border border-[#BCBCBC]">
                                    <input type="checkbox" />
                                </th>
                            )}
                            {tableHeading.map((item, index) => (
                                <th
                                    key={index}
                                    className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                                >
                                    {item.title}
                                </th>
                            ))}
                            <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC] text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas?.attribute_groups?.length > 0 ? (
                            <>
                                {datas.attribute_groups.map((item) => (
                                    <React.Fragment key={item.id}>
                                        {/* Parent Row */}
                                        <tr className="hover:bg-gray-100 transition border-b border-[#BCBCBC]">
                                            {showCheckBox && (
                                                <td
                                                    className="p-3 border-b border-[#BCBCBC]"
                                                    onClick={() => toggleRow(item.id)}
                                                >
                                                    {expandedRows[item.id] ? (
                                                        <img src={`${urls.hostUrl}/icons/down-arrow.png`} alt="collapse" />
                                                    ) : (
                                                        <img src={`${urls.hostUrl}/icons/right-arrow.png`} alt="expand" />
                                                    )}
                                                </td>
                                            )}

                                            <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                                {item.name}
                                            </td>
                                            <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                                &nbsp;
                                            </td>
                                            <td className="p-3 items-center">
                                                <div className="flex justify-center space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                                                    <span className="text-red-500 hover:text-red-700 cursor-pointer">
                                                        <img src={`${urls.hostUrl}/icons/bin.png`} alt="delete" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Child Attribute Rows */}
                                        {expandedRows[item.id] &&
                                            item.group_attributes?.map((attr, index) => (
                                                <tr key={index} className="border-b border-[#BCBCBC]">
                                                    {showCheckBox && <td className="border border-[#BCBCBC]"></td>}
                                                    <td colSpan={tableHeading.length - 1} className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                                        {attr.name}
                                                    </td>
                                                    <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                                        {attr.code}
                                                    </td>
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                ))}

                                {/* Second Data Mapping */}
                                {datas?.category_attributes?.map((item) => (
                                    <React.Fragment key={item.id}>
                                        {/* Parent Row */}
                                        <tr className="hover:bg-gray-100 transition border-b border-[#BCBCBC]">
                                            {showCheckBox && (
                                                <td className="p-3 border-b border-[#BCBCBC]" >
                                                    
                                                </td>
                                            )}

                                            <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                                {item.name}
                                            </td>
                                            <td className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                                &nbsp;
                                            </td>
                                            <td className="p-3 items-center">
                                                <div className="flex justify-center space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                                                    <span className="text-red-500 hover:text-red-700 cursor-pointer">
                                                        <img src={`${urls.hostUrl}/icons/bin.png`} alt="delete" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={tableHeading.length + 1} className="p-4 text-center text-gray-500 border border-[#BCBCBC]">
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

export default React.memo(CategoryAttrTable);
