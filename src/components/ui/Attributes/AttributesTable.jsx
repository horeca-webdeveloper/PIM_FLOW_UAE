import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../../../utils/formatDate"; // Ensure this works with proper date input
import { urls } from "../../../config/baseUrls";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const AttributesTable = ({
  deleteAttribute,
  datas,
  updateAttributeTypes,
  setPage,
  totalPages,
  changePage,
  currentPage,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const cellClass = "px-3 py-2 text-sm text-gray-500 border text-left";
  const headerClass = "px-3 py-2 text-sm font-medium text-gray-700 border text-center whitespace-nowrap";

  // Preprocess the data to add group names as a field and parse updated_at to Date
  const processedData = datas?.map((item) => ({
    ...item,
    groupNames: item?.attribute_groups?.map((g) => g.name).join(", ") || "",
    updated_at: item.updated_at ? new Date(item.updated_at) : null, // Ensure valid Date object
  }));

  const exportCSV = () => {
    const csvContent = [
      ["Attribute Name", "Code", "Data Type", "Group", "Last Updated"],
      ...datas.map((item) => [
        item.name,
        item.code,
        item.type,
        item.attribute_groups.map((g) => g.name).join(", "),
        formatDate(item.updated_at), // Ensure this works with the Date object
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
      datas.map((item) => ({
        Name: item.name,
        Code: item.code,
        Type: item.type,
        Group: item.attribute_groups.map((g) => g.name).join(", "),
        Updated: formatDate(item.updated_at), // Ensure this works with the Date object
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
    const tableRows = datas.map((item) => [
      item.name,
      item.code,
      item.type,
      item.attribute_groups.map((g) => g.name).join(", "),
      formatDate(item.updated_at), // Ensure this works with the Date object
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("attributes.pdf");
  };

  const actionBodyTemplate = (rowData) => (
    <div className="p-1 mt-0 ml-2 mr-2 w-[100px] bg-[#FAFBFD] border-[#BCBCBC] flex items-center justify-center space-x-3 border rounded-md">
      <a
        href={`/MutliAttributes/${rowData.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${urls.hostUrl}/icons/pencil-write.png`}
          alt="edit"
          className="cursor-pointer"
        />
      </a>
      <div className="w-px h-6 bg-[#979797]"></div>
      <img
        src={`${urls.hostUrl}/icons/bin.png`}
        alt="delete"
        className="cursor-pointer"
        onClick={() => deleteAttribute(rowData.id)}
      />
    </div>
  );

  return (
    <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px]">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto text-sm capitalize">
        <DataTable
          value={processedData} // Use processed data with Date objects
          paginator
          rows={20}
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords}`}
          globalFilter={globalFilter}
          header="List of Attributes"
          className="p-datatable-gridlines "
          responsiveLayout="scroll"
          stripedRows
        >
          <Column
            field="name"
            header="Attribute Name"
            sortable
            filter
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
          <Column
            field="code"
            header="Code"
            sortable
            filter
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
          <Column
            field="type"
            header="Data Type"
            sortable
            filter
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
          <Column
            field="groupNames"
            header="Group"
            sortable
            filter
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
          <Column
            field="updated_at" // Field should be Date object
            header="Last Updated"
            sortable
            // filter
            dataType="date"
            body={(rowData) => formatDate(rowData.updated_at)} // Use the formatDate function
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
          <Column
            header="Update Type"
            body={(rowData) => (
              <button
                onClick={() => updateAttributeTypes(rowData)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Update Type
              </button>
            )}
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
          <Column
            header="Action"
            body={actionBodyTemplate}
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default AttributesTable;
