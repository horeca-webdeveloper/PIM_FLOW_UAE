import React from "react";
import { FaEdit, FaFilter, FaSearch, FaTrash } from "react-icons/fa";
import { urls } from "../../config/baseUrls";

const CategoryTable = ({ tableHeading, datas, options, showFilter, showCheckBox }) => {

    // Function to extract the percentage and return background style
    const getLifecycleBgStyle = (lifecycle_stage) => {
        const percentageMatch = lifecycle_stage.match(/\d+/); // Extract number from "Marketing (70%)"
        const percentage = percentageMatch ? parseInt(percentageMatch[0]) : 0;
    
        let bgColor = "rgba(130, 128, 255, 0.5)"; // Purple with 50% opacity
    
        if (percentage > 70 && percentage <= 80) {
            bgColor = "rgba(255, 167, 86, 0.5)"; // Orange with 50% opacity
        } else if (percentage > 80 && percentage <= 100) {
            bgColor = "rgba(38, 104, 58, 0.5)"; // Green with 50% opacity
        }
    
        return {
            background: `linear-gradient(to right, ${bgColor} ${percentage}%, transparent ${percentage}%)`,
            color: "#303030", // Text remains fully visible
            
        };
    };
    
    // Function to determine quality score color
    const getQualityIcon = (score) => {
        switch (score) {
            case "A":
                return `${urls.hostUrl}/icons/A.png`;
            case "B":
                return `${urls.hostUrl}/icons/B.png`;
            case "C":
                return `${urls.hostUrl}/icons/C.png`;
            default:
                return null; // No image for default case
        }
    };


    return (
        <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px]">
            {/* Tabs */}
            <div className="flex px-4 items-center justify-between bg-white rounded-md">
                <div>
                    {!!options &&
                        options?.map((option, index) => (
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
                            {showCheckBox && (
                                <th className="p-3 w-10 border border-[#BCBCBC]">
                                    <input type="checkbox" />
                                </th>
                            )}
                            {tableHeading.map((item, index) => (
                                <th
                                    key={index}
                                    className={`p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]`}
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
                        {datas.length > 0 ? (
                            datas.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-100 transition border-b border-[#BCBCBC] "
                                >
                                    {showCheckBox && (
                                        <td className="p-1 border-b border-[#BCBCBC]">
                                            <input type="checkbox" />
                                        </td>
                                    )}
                                    {tableHeading.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`${column.key!=="quality_score"?'p-1':''} text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]  text-center ${column.key==='lifecycle_stage'?'whitespace-nowrap':''}`}
                                            style={column.key === "lifecycle_stage" ? getLifecycleBgStyle(row[column.key]) : {}}
                                        >
                                            {typeof row[column.key] === "string" && row[column.key].match(/\.(jpeg|jpg|gif|png|svg)$/) ? (
                                                <img
                                                    src={row[column.key].replace(/"(.+?)"/, "$1")} // Fix URL format issue
                                                    alt="Thumbnail"
                                                    className="w-12 h-12 object-cover ml-5"
                                                />
                                            ) : column.key === "quality_score" ? (
                                                getQualityIcon(row[column.key]) ? (
                                                    <img
                                                        src={getQualityIcon(row[column.key])}
                                                        alt={row[column.key]}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    <span className="bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold mx-auto">
                                                        {row[column.key]}
                                                    </span>
                                                )
                                            ) : (
                                                row[column.key]
                                            )}
                                        </td>

                                    ))}


                                    <td className="p-1 mt-5 ml-2 mr-2 w-[100px] border-[#BCBCBC] flex items-center justify-center space-x-3 border rounded-md">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <img src={`${urls.hostUrl}/icons/pencil-write.png`} alt="edit" />
                                        </button>

                                        {/* Divider */}
                                        <div className="w-px h-5 bg-gray-300"></div>

                                        <button className="text-red-500 hover:text-red-700">
                                            <img src={`${urls.hostUrl}/icons/bin.png`} alt="trash" />
                                        </button>
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
        </div>
    );
};

export default React.memo(CategoryTable);
