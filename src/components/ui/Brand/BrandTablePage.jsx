import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { urls } from "../../../config/baseUrls";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import FullScreenLoader from "../../../utils/FullScreenLoader";
import { formatDate } from "../../../utils/formatDate";
// Utility function to handle nested object keys like "category.slug"
const getNestedValue = (obj, keyPath) => {
  return keyPath.split('.').reduce((acc, part) => acc?.[part], obj);
};


const BrandTablePage = ({
  title,
  tableHeading,
  datas,
  showCheckBox,
  getDatafn,
  deleteData,
  disableDelete,
  loading,

}) => {
  const cellClass = "px-3 py-2  text-sm text-gray-500 border";
  const headerClass =
    "px-3 py-2 text-left text-sm font-medium text-gray-700 border whitespace-nowrap";

  const [globalFilter, setGlobalFilter] = useState("");

  const exportCSV = () => {
    const csvContent = [
      tableHeading?.map((col) => col.title), // Headers
      ...datas?.map((row) =>
        tableHeading?.map((col) => {
          const value = getNestedValue(row, col.key);
          return Array.isArray(value)
            ? value.map((v) => v.name || v).join(", ")
            : value ?? "";
        })
      ),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(csvContent);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const buffer = XLSX.write(workbook, { bookType: "csv", type: "array" });
    const blob = new Blob([buffer], { type: "text/csv" });
    saveAs(blob, "data.csv");
  };

  const exportExcel = () => {
    const excelData = datas?.map((row) => {
      const rowObj = {};
      tableHeading.forEach((col) => {
        const value = getNestedValue(row, col.key);
        rowObj[col.title] = Array.isArray(value)
          ? value.map((v) => v.name || v).join(", ")
          : value ?? "";
      });
      return rowObj;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "data.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Exported Data", 14, 10);

    const headers = tableHeading.map((col) => col.title);
    const rows = datas.map((row) =>
      tableHeading.map((col) => {
        const value = getNestedValue(row, col.key);
        return Array.isArray(value)
          ? value.map((v) => v.name || v).join(", ")
          : value ?? "";
      })
    );

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 20,
    });

    doc.save("data.pdf");
  };


  const actionBodyTemplate = (rowData) => (
    <div className="p-1 mt-0 ml-2 mr-2 w-[100px] bg-[#FAFBFD] border-[#BCBCBC] flex items-center justify-center space-x-3 border rounded-md">
      <img
        src={`${urls.hostUrl}/icons/pencil-write.png`}
        alt="edit"
        className="cursor-pointer"
        onClick={() => getDatafn(rowData.id, rowData?.brand_id, rowData?.brand_name)}
      />
      {!disableDelete && (
        <>
          <div className="w-px h-5 bg-gray-300"></div>
          <img
            src={`${urls.hostUrl}/icons/bin.png`}
            alt="delete"
            className="cursor-pointer"
            onClick={() => deleteData(rowData.id)}
          />
        </>
      )}
    </div>
  );

  return (
    <>

      <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px]">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none"
          />
          {/* <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={exportCSV}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={exportExcel}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Export Excel
            </button>
            <button
              type="button"
              onClick={exportPDF}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Export PDF
            </button>
          </div> */}
        </div>

        <DataTable
          value={datas}
          paginator
          rows={20}
          dataKey="id"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords}`}
          globalFilter={globalFilter}
          header={title}
          className="p-datatable-gridlines"
          responsiveLayout="scroll"
          stripedRows

        >
          {showCheckBox && (
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}

          {tableHeading.map((item, idx) => (
            <Column
              key={idx}
              field={item.key}
              header={item.title}
              sortable
              filter
              body={(rowData) => {
                const value = getNestedValue(rowData, item.key);
                if (item.type === 'date') {
                  return formatDate(value);
                }
                if (item.type === "image") {
                  return (
                    <img
                      src={value}
                      alt={item.title}
                      className="w-12 h-12 object-contain rounded"
                    />
                  );
                }
                return Array.isArray(value)
                  ? value.map((v) => v?.name || v).join(", ")
                  : value ?? "";
              }}
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          ))}

          <Column
            header="Action"
            body={actionBodyTemplate}
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
        </DataTable>
      </div>

    </>
  );
};

export default BrandTablePage;
