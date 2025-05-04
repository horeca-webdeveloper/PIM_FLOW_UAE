import React, { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import { urls } from "../../../config/baseUrls";
import PaginationComponent from "../../common/PaginationComponent";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AttributesTable = ({
  deleteAttribute,
  datas,
  setShowModal,
  setUpdateDatas,
  setPage,
  totalPages,
  changePage,
  currentPage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered rows
  const filteredData = datas?.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const csvContent = [
      ["Attribute Name", "Code", "Data Type", "Group", "Last Updated"],
      ...filteredData.map((item) => [
        item.name,
        item.code,
        item.type,
        item.attribute_groups.map((g) => g.name).join(", "),
        formatDate(item.updated_at),
      ]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(csvContent);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const buffer = XLSX.write(workbook, { bookType: "csv", type: "array" });
    const blob = new Blob([buffer], { type: "text/csv" });
    saveAs(blob, "attributes.csv");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        Name: item.name,
        Code: item.code,
        Type: item.type,
        Group: item.attribute_groups.map((g) => g.name).join(", "),
        Updated: formatDate(item.updated_at),
      }))
    );
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "attributes.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Attributes List", 14, 10);
    const tableColumn = ["Name", "Code", "Type", "Group", "Updated"];
    const tableRows = filteredData.map((item) => [
      item.name,
      item.code,
      item.type,
      item.attribute_groups.map((g) => g.name).join(", "),
      formatDate(item.updated_at),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("attributes.pdf");
  };

  return (
    <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px]">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
        <input
          type="text"
          placeholder="Search attributes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={exportCSV}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Export CSV
          </button>
          <button
            onClick={exportExcel}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Export Excel
          </button>
          <button
            onClick={exportPDF}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700 text-sm">
            <tr className="border border-[#BCBCBC]">
              <th className="p-3 border border-[#BCBCBC]">Attribute Name</th>
              <th className="p-3 border border-[#BCBCBC]">Code</th>
              <th className="p-3 border border-[#BCBCBC]">Data Type</th>
              <th className="p-3 border border-[#BCBCBC]">Group</th>
              <th className="p-3 border border-[#BCBCBC]">Last Updated</th>
              <th className="p-3 border border-[#BCBCBC]">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredData?.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
                >
                  <td className="p-3 capitalize border border-[#BCBCBC]">{row.name}</td>
                  <td className="p-3 border border-[#BCBCBC]">{row.code}</td>
                  <td className="p-3 capitalize border border-[#BCBCBC]">{row.type}</td>
                  <td className="p-3 border border-[#BCBCBC]">
                    {row.attribute_groups.map((g) => g.name).join(", ")}
                  </td>
                  <td className="p-3 border border-[#BCBCBC]">
                    {formatDate(row.updated_at)}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                      <a href={`/MutliAttributes/${row.id}`} target="_blank">
                        <img
                          src={`${urls.hostUrl}/icons/pencil-write.png`}
                          alt="edit"
                          className="cursor-pointer"
                        />
                      </a>
                      <div className="w-px h-5 bg-gray-300"></div>
                      <span
                        className="cursor-pointer"
                        onClick={() => deleteAttribute(row.id)}
                      >
                        <img
                          src={`${urls.hostUrl}/icons/bin.png`}
                          alt="delete"
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500 border">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationComponent
        setPage={setPage}
        totalPages={totalPages}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AttributesTable;
