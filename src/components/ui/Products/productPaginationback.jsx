import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
import FullScreenLoader from "../../../utils/FullScreenLoader";
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
const ProductsTable = ({
  tableHeading,
  productsData,
  setId,
  setShowDelete,
  productsLoading,
  paginationData,
  setPage,
  page
}) => {
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState("");

  const exportCSV = () => {
    const csvContent = [
      tableHeading?.map((col) => col.title), // Headers
      ...productsData?.map((row) =>
        tableHeading?.map((col) => {
          const value = row[col.key];
          if (Array.isArray(value)) {
            return value?.map((v) => v.name || v).join(", ");
          }
          return value ?? "";
        })
      ),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(csvContent);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const buffer = XLSX.write(workbook, { bookType: "csv", type: "array" });
    const blob = new Blob([buffer], { type: "text/csv" });
    saveAs(blob, "products.csv");
  };

  const exportExcel = () => {
    const excelData = productsData?.map((row) => {
      const rowObj = {};
      tableHeading.forEach((col) => {
        const value = row[col.key];
        rowObj[col.title] = Array.isArray(value)
          ? value?.map((v) => v.name || v).join(", ")
          : value ?? "";
      });
      return rowObj;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "products.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Exported Data", 14, 10);

    const headers = tableHeading.map((col) => col.title);
    const rows = productsData.map((row) =>
      tableHeading.map((col) => {
        const value = row[col.key];
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

    doc.save("products.pdf");
  };

  const cellClass = "px-3 py-2 w-[200px] text-sm text-gray-500 border";
  const headerClass = "px-3 py-2 min-w-[200px] text-left text-sm font-medium text-gray-700 border";
  // Sample data for the table also for how much it's complete


  // Function to get background color for lifecycle stage
  const getLifecycleBackground = (stage) => {
    if (stage.includes("Marketing")) return "bg-[#8280FF80]";
    if (stage.includes("Content")) return "bg-purple-100";
    if (stage.includes("Graphics")) return "bg-[#8280FF80]";
    if (stage.includes("Completed")) return "bg-[#26683A80]";
    return "";
  };

  const getLifecyclePercentage = (stage) => {
    const match = stage.match(/\((\d+)%\)/); // Extract percentage inside parentheses
    return match ? `${match[1]}%` : "100%"; // Default to full width if no percentage found
  };

  // Function to get background color for quality score
  const getQualityScoreBackground = (score) => {
    if (score === "A") return "bg-[#00B69B]";
    if (score === "B") return "bg-[#FEC53D]";
    if (score === "C") return "bg-[#4AD991]";
    return "";
  };

  const actionBodyTemplate = (rowData) => (
    <div className="p-1 mt-0 ml-2 mr-2 w-[100px] bg-[#FAFBFD] border-[#BCBCBC] flex items-center justify-center space-x-3 border rounded-md">
      <a href={`/AddProducts/${rowData.id}`} target="_blank" rel="noopener noreferrer">
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
        onClick={() => {
          setId(rowData.id);
          setShowDelete(true);
        }}
      />
    </div>
  );


  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">

      {/* Tab navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none"
        />
        <div className="flex gap-2 flex-wrap">
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
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-sm">

        <DataTable
          dataKey="id"
          value={productsData}
          loading={productsLoading}
          paginator
          lazy
          first={(page - 1) * 50}
          rows={50}
          totalRecords={paginationData?.total || 0}
          onPage={(e) => {
            setPage(Math.floor(e.first / e.rows) + 1); // Set new page number
          }}
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords}`}
          globalFilter={globalFilter}
          globalFilterFields={[
            "name",
            "sku",
            "store",
            "brand",
            "status",
            "product_family",
            "inStock",
            "taxonomy_path",
            "lifecycleStage",
            "qualityScore"
          ]}

          header="List of Products"
          className="p-datatable-gridlines "
          responsiveLayout="scroll"
          stripedRows
        >
          <Column field="name" header="Product Name" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="sku" header="SKU" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="image" header="Image" sortable filter body={(rowData) => (
            <img
              src={rowData.image}
              alt="Product"
              className="w-16 h-16 object-cover rounded"
            />
          )} bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="store" header="Vendor" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="brand" header="Brand" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="status" header="Status" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="product_family" header="Product Family" sortable filter body={(rowData) => rowData.product_family?.join(", ") || ""} bodyClassName="border border-gray-300 p-2" headerClassName="border border-gray-300" />
          <Column field="inStock" header="In Stock" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="taxonomy_path" header="Taxanomy path" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="lifecycleStage" header="Life Cycle Stage" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column field="qualityScore" header="Quality Score" sortable filter bodyClassName={cellClass} headerClassName={headerClass} />
          <Column header="Action" body={actionBodyTemplate} bodyClassName={cellClass} headerClassName={headerClass} />
        </DataTable>


      </div>
    </div>
  );
};

export default ProductsTable;
