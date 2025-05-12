import React, { useState, useEffect, useContext, useRef } from "react";
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
import columnFitler from "../../../assets/icons/columnFitler.png";
import ColumnSelector from "./ColumnSelector";
import { AppContext } from "../../../Context/AppContext";

const ProductsTable = ({
  tableHeading,
  productsData,
  setId,
  setShowDelete,
  productsLoading,
  setGlobalFilter,
  globalFilter,
  paginationData,
  setPage,
  page,
  setSort,
  setLimit,
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const columnOptions = [
    "name",
    "sku",
    "image",
    "store",
    "brand",
    "status",
    "product_family",
    "inStock",
    "taxonomy_path",
    "lifecycleStage",
    "qualityScore",
  ];
  const [showColumn, setShowColumn] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState(() => {
    return JSON.parse(localStorage.getItem("ProductsColumn")) || [];
  });

  const checkedColumn =
    JSON.parse(localStorage.getItem("ProductsColumn")) || [];

  useEffect(() => {
    const storedColumns =
      JSON.parse(localStorage.getItem("ProductsColumn")) || [];
    setHiddenColumns(storedColumns);
  }, []);

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

  const { AllowedPermissions } = useContext(AppContext);
  const permissions = AllowedPermissions?.permissions || [];

  const cellClass = "px-3 py-2 w-[200px] text-sm text-gray-500 border border-gray-300";
  const headerClass =
    "px-3 py-2 min-w-[200px] text-left text-sm font-medium text-gray-700 border border-gray-300 whitespace-nowrap";

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
      <a
        href={
          permissions?.includes("update product")
            ? `/AddProducts/${rowData.id}`
            : "#"
        }
        onClick={(e) => {
          if (!permissions?.includes("update product")) {
            e.preventDefault();
          }
        }}
        title={
          permissions?.includes("update product")
            ? "Edit Product"
            : "Not allowed"
        }
        rel="noopener noreferrer"
        target={permissions?.includes("update product") ? "_blank" : "_self"}
      >
        <img
          src={`${urls.hostUrl}/icons/pencil-write.png`}
          alt="edit"
          className={`cursor-pointer ${
            !permissions?.includes("update product")
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        />
      </a>

      <div className="w-px h-6 bg-[#979797]"></div>
      <img
        src={`${urls.hostUrl}/icons/bin.png`}
        alt="delete"
        title={
          permissions?.includes("delete product")
            ? "Delete Product"
            : "Not allowed"
        }
        className={`cursor-pointer ${
          !permissions?.includes("delete product")
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
        onClick={() => {
          if (permissions?.includes("delete product")) {
            setId(rowData.id);
            setShowDelete(true);
          }
        }}
      />
    </div>
  );
  const truncateText = (text, maxLength = 35) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      {/* Tab navigation */}

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
          <div className="border rounded-md p-[4px] cursor-pointer">
            <img
              onClick={() => setShowColumn(!showColumn)}
              className="ml-[5px] w-[30px] cursor-pointer rounded-md border p-[5px]"
              src={columnFitler}
            />
            {showColumn && (
              <div style={{ zIndex: 999 }} className="absolute z-99">
                <div className="relative right-[300px] top-[10px]">
                  <ColumnSelector
                    columnOptions={columnOptions}
                    setShowColumn={setShowColumn}
                    hiddenColumns={hiddenColumns}
                    setHiddenColumns={setHiddenColumns}
                  />
                </div>
              </div>
            )}
          </div>
        </div> */}
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
      
      </div> */}
      <div className="flex justify-between py-2 items-center px-2">
        <div ref={wrapperRef} className="relative">
          {/* <input
            onClick={() => setShowDropdown(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder={`${searchquery ? searchquery : "searchPlaceholder"}`}
            className="border py-[4px] border-gray-400 px-[10px] w-[300px] rounded-md"
          /> */}
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
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

      {/* Table */}
      <div className="overflow-x-auto text-sm capitalize">
        <DataTable
          dataKey="id"
          value={productsData}
          paginator
          rows={20}
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords}`}
          globalFilter={globalFilter}
          header="List of Products"
          className="p-datatable-gridlines"
          responsiveLayout="scroll"
          loading={productsLoading}
          lazy
          first={(page - 1) * 50}
          totalRecords={paginationData?.total || 0}
          onPage={(e) => {
            setPage(Math.floor(e.first / e.rows) + 1); // Set new page number
          }}
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
            "qualityScore",
          ]}

          stripedRows
        >
          {!hiddenColumns.includes("name") && (
            <Column
              field="name"
              header="Product Name"
              filter
              sortable
              body={(rowData) => truncateText(rowData.name)}
              bodyClassName={`${cellClass} truncate-line-clamp`}
              headerClassName={headerClass}
            />
          )}
          {!hiddenColumns.includes("sku") && (
            <Column
              field="sku"
              header="SKU"
              filter
              sortable
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}

          {!hiddenColumns.includes("image") && (
            <Column
              field="image"
              header="Image"
              filter
              sortable
              body={(rowData) => (
                <img
                  src={rowData.image}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              bodyClassName={`${cellClass} flex justify-center items-center`}
              headerClassName={headerClass}
            />
          )}

          {!hiddenColumns.includes("store") && (
            <Column
              field="store"
              header="Vendor"
              filter
              sortable
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}

          {!hiddenColumns.includes("brand") && (
            <Column
              filter
              sortable
              field="brand"
              header="Brand"
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}

          {!hiddenColumns.includes("status") && (
            <Column
              field="status"
              header="Status"
              sortable
              filter
              headerClassName={headerClass}
              bodyClassName={cellClass}
              body={(rowData) => {
                const status = rowData?.status;
                let bgColor = "bg-white";

                if (status === "published") {
                  bgColor = "bg-green-200 text-green-900";
                } else if (status === "draft") {
                  bgColor = "bg-yellow-100 text-yellow-800";
                } else if (status === "pending") {
                  bgColor = "bg-red-100 text-red-800";
                }

                return (
                  <span className={`px-2 py-1 rounded font-medium ${bgColor}`}>
                    {status}
                  </span>
                );
              }}
            />
          )}

          {!hiddenColumns.includes("product_family") && (
            <Column
              field="product_family"
              header="Product Family"
              filter
              sortable
              body={(rowData) => truncateText(rowData.product_family?.join(", ") || "")}
              headerClassName={headerClass}
              bodyClassName={cellClass}
            />
          )}

          {!hiddenColumns.includes("inStock") && (
            <Column
              field="inStock"
              header="In Stock"
              filter
              sortable
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}
          {!hiddenColumns.includes("taxonomy_path") && (
            <Column
              field="taxonomy_path"
              header="Taxanomy path"
              filter
              sortable
              body={(rowData) => truncateText(rowData.taxonomy_path)}
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}
          {!hiddenColumns.includes("lifecycleStage") && (
            <Column
              field="lifecycleStage"
              header="Life Cycle Stage"
              filter
              sortable
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}

          {!hiddenColumns.includes("qualityScore") && (
            <Column
              field="qualityScore"
              header="Quality Score"
              filter
              sortable
              bodyClassName={cellClass}
              headerClassName={headerClass}
            />
          )}
          <Column
            header="Action"
            filter
            sortable
            body={actionBodyTemplate}
            bodyClassName={cellClass}
            headerClassName={headerClass}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default ProductsTable;
