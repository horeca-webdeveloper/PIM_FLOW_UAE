import React from "react";
import { FaEdit, FaFilter, FaSearch, FaTrash } from "react-icons/fa";
import { urls } from "../../../config/baseUrls";
import PaginationComponent from "../../common/PaginationComponent";
const ImportZipLogs = ({
    tableHeading,
    datas,

}) => {
    { console.log("datas", datas) }
    return (
        <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px]">
            {/* Tabs */}
            <div className="flex px-4 py-3 items-center justify-between bg-white rounded-md">
                <div>
                    <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
                        Import Logs
                    </h2>
                </div>

            </div>

            {/* Table */}
            <div className="overflow-auto bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200 text-gray-700 text-sm">
                        <tr className="border border-[#BCBCBC]">



                            <th

                                className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                            >
                                SKU
                            </th>
                            <th

                                className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                            >
                                Status
                            </th>
                            <th

                                className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]"
                            >
                                Errors
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {!!datas && datas.map((items, index) => {
                            return (
                                <tr key={index}>

                                    <td   className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                        {items.sku}
                                    </td>
                                    <td   className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                        {items.status}
                                    </td>
                                    <td   className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px] border border-[#BCBCBC]">
                                        {items?.errors?.map((err, index) => {
                                            return (
                                                <p key={index}>{err}</p>
                                            )
                                        })}
                                    </td>

                                </tr>
                            );

                        })}

                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-center">

            </div>
        </div>
    );
};

export default React.memo(ImportZipLogs);
