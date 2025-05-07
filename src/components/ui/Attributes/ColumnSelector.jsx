import React, { useState } from "react";

const ColumnSelector = ({
  setShowColumn,
  columnOptions,
  hiddenColumns,
  setHiddenColumns,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredColumns = columnOptions.filter((col) =>
    col.toLowerCase().includes(searchText)
  );

  const handleToggle = (column) => {
    setHiddenColumns((prev) => {
      const updated = prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column];
      console.log("Toggled hiddenColumns:", updated);
      localStorage.setItem("vendorCheckedColumns", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedColumns(columnOptions);
    } else {
      setSelectedColumns([]);
    }
  };

  const handleCheckboxChange = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleCancel = () => {
    setShowColumn(false);
  };

  const handleSubmit = () => {
    console.log("Selected:", selectedColumns);
    setShowColumn(false);
  };

  const isAllSelected = selectedColumns.length === columnOptions.length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-80 mx-auto">
      <input
        type="text"
        placeholder="Search"
        className="w-full border rounded px-3 py-2 mb-2"
        value={searchText}
        onChange={handleSearch}
      />

      <div className="border rounded p-2 max-h-64 overflow-y-auto">
        <div className="bg-white  rounded-md">
          <div className="flex items-center gap-1  pb-[10px] mb-[10px] border-b border-black justify-between">
            <button
              onClick={() => {
                setHiddenColumns([]);
                localStorage.setItem(
                  "vendorCheckedColumns",
                  JSON.stringify([])
                );
              }}
              className="bg-[#26683A] w-full text-white px-4 py-2 rounded"
            >
              Select All
            </button>
            {/* Clear All Functionality  */}
            <button
              onClick={() => {
                setHiddenColumns([]);
                localStorage.setItem(
                  "vendorCheckedColumns",
                  JSON.stringify([
                    "Vendor Name",
                    "Logo",
                    "Email",
                    "Contact Person",
                    "Mobile Number",
                    "Landline Number",
                    "Dropship",
                    "Website",
                    "Type",
                    "Credit Limit",
                    "Net Terms",
                    "Business License Number",
                    "Country Name",
                    "Account No",
                    "Status",
                    "Category",
                    "Grade",
                    "Brands",
                    "Products",
                    "Warehouse Locations",
                    "Created By",
                  ])
                );
                window.location.reload();
              }}
              className="bg-red-600 w-full text-white px-4 py-2 rounded"
            >
              Clear All
            </button>
          </div>
          {filteredColumns.map((column) => (
            <label key={column} className="block">
              <input
                type="checkbox"
                checked={!hiddenColumns.includes(column)}
                onChange={() => handleToggle(column)}
                className="cursor-pointer"
              />
              <span className="ml-2">{column}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={handleCancel}
          className="bg-gray-300 w-full text-gray-600 px-4 py-2 rounded"
        >
          Close
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#26683A] w-full text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ColumnSelector;
