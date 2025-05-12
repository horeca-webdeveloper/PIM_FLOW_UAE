import React, { useEffect, useRef, useState } from "react";
import Loader from "../../../utils/Loader";
import columnFilter from "../../../assets/icons/columnFitler.png";
import ColumnSelector from "./ColumnSelector";
import { urls } from "../../../config/baseUrls";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const Table = ({
  brandsData,
  isLoading,
  setShowEdit,
  setLimit,
  sortBy,
  setUploadShow,
  setSort,
  setSortBy,
  searchquery,
  setShouldFetch,
  setSearhVendor,
  setSearchQuery,
  setEditData,
  setShowDelete,
  setId,
}) => {
  const columnOptions = [
    "Vendor Name",
    "Direct/Indirect",
    "Contact Persons",
    "Phone Number",
    "Email",
    "Country",
    "Category",
    "Credit Limit",
    "Credit Terms",
    "Shipping Days",
    "Dropship",
    "Grade",
  ];

  const TableOptions = [
    { name: "Vendor Code.", id: "" },
    { name: "Vendor Name", id: "name" },
    { name: "Direct/Indirect", id: "" },
    { name: "Contact Persons", id: "contact_person" },
    { name: "Phone Number", id: "phone_number" },
    { name: "Email", id: "email" },
    { name: "Country", id: "" },
    { name: "Category", id: "" },
    { name: "Credit Limit", id: "credit_limit" },
    { name: "Credit Terms", id: "credit_terms" },
    { name: "Shipping Days", id: "shipping_days" },
    { name: "Dropship", id: "" },
    { name: "Grade", id: "grade" },
    { name: "Actions", id: "" },
  ];

  const [hiddenColumns, setHiddenColumns] = useState(() => {
    return JSON.parse(localStorage.getItem("preVendorCheckedColumns")) || [];
  });

  const [showColumn, setShowColumn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const selectFilterRef = useRef(null);

  // Persist hidden columns to localStorage
  useEffect(() => {
    localStorage.setItem(
      "preVendorCheckedColumns",
      JSON.stringify(hiddenColumns)
    );
  }, [hiddenColumns]);

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectFilterRef.current &&
        !selectFilterRef.current.contains(event.target)
      ) {
        setShowColumn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg border max-w-[82vw] border-gray-200 w-full overflow-x-scroll">
      <div className="flex items-center border-b border-gray-200 px-2 justify-between h-[50px]">
        {/* Search box */}
        <div ref={wrapperRef} className="relative">
          <input
            onClick={() => setShowDropdown(true)}
            onChange={(e) => {
              setSearhVendor(e.target.value);
              setShouldFetch(true);
            }}
            placeholder={`Search ${searchquery ? searchquery : "Pre Vendor"}`}
            className="border py-[4px] border-gray-300 px-[10px] w-[300px] rounded-md"
          />

          {/* {showDropdown && ( */}
          {false && (
            <div className="absolute z-10 mt-1 w-[300px] max-h-[200px] overflow-auto bg-white border rounded-md shadow-md">
              {[
                { id: "name", label: "Name" },
                { id: "email", label: "Email" },
                { id: "contact_person", label: "Contact Person" },
                { id: "mobile_number", label: "Mobile Number" },
                { id: "landline_number", label: "Landline Number" },
                { id: "website_link", label: "Website Link" },
                { id: "type", label: "Type" },
                {
                  id: "business_licence_number",
                  label: "Business Licence Number",
                },
              ].map(({ id, label }) => (
                <div
                  key={id}
                  id={id}
                  onClick={(e) => {
                    setSearchQuery(e.currentTarget.id);
                    setShowDropdown(false);
                  }}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <p className="text-[14px]">
                    Search <span className="font-bold">{label}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column Selector */}
        <div className="flex relative">
          <div className="flex items-center ml-[10px] justify-center">
            <div className="flex items-center ml-[10px] justify-center">
              <span>A to Z :</span>
              <select
                onChange={(e) => setSort(e.target.value)}
                className="w-[110px] mr-[5px] border border-[#BCBCBC] rounded-md p-[5px] ml-[10px] text-[14px]"
              >
                <option value={"asc"}>A to Z</option>
                <option value={"desc"}>Z to A</option>
              </select>
            </div>
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
          <img
            onClick={() => setShowColumn(!showColumn)}
            className="ml-[5px] w-[32px] cursor-pointer rounded-md border border-gray-400 p-[5px]"
            src={columnFilter}
          />
          {showColumn && (
            <div
              ref={selectFilterRef}
              className="absolute right-0 mt-[40px] z-20 bg-white border rounded-md shadow-md"
            >
              <ColumnSelector
                columnOptions={columnOptions}
                hiddenColumns={hiddenColumns}
                setHiddenColumns={setHiddenColumns}
                setShowColumn={setShowColumn}
              />
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto h-[65vh]">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 h-[50px]">
                <th className="w-10 p-2 border border-gray-200">
                  <input type="checkbox" className="h-4 w-4" />
                </th>
                {TableOptions?.map((header, index) => {
                  if (hiddenColumns.includes(header?.name)) return null;
                  return (
                    <th
                      onClick={() => {
                        if (header?.id !== "") {
                          sortBy === header?.id
                            ? setSortBy("")
                            : setSortBy(header?.id);
                        }
                      }}
                      key={index}
                      className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-200 hover:text-[white] font-medium text-gray-600 border border-gray-200"
                    >
                      <div className="flex">
                        <p className="flex items-center justify-center font-semibold text-[14px] leading-[100%] text-[#616161]">
                          {header?.name}
                        </p>
                        <div className="ml-[20px]">
                          {!(header?.id === "") && (
                            <div className="w-[20px]">
                              {sortBy === header?.id ? (
                                <BiSortUp className="w-full h-auto" />
                              ) : (
                                <BiSortDown className="w-full h-auto" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {brandsData?.length > 0 ? (
                brandsData.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 text-center border border-gray-200">
                      <input type="checkbox" className="h-4 w-4" />
                    </td>
                    {!hiddenColumns.includes("Vendor Name") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.id}
                      </td>
                    )}
                    {!hiddenColumns.includes("Vendor Name") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.name}
                      </td>
                    )}
                    {!hiddenColumns.includes("Direct/Indirect") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.type}
                      </td>
                    )}
                    {!hiddenColumns.includes("Contact Persons") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.contact_person}
                      </td>
                    )}
                    {!hiddenColumns.includes("Phone Number") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.phone_number}
                      </td>
                    )}
                    {!hiddenColumns.includes("Email") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.email}
                      </td>
                    )}
                    {!hiddenColumns.includes("Country") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.country_name}
                      </td>
                    )}
                    {!hiddenColumns.includes("Category") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.categories}
                      </td>
                    )}
                    {!hiddenColumns.includes("Credit Limit") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.credit_limit}
                      </td>
                    )}
                    {!hiddenColumns.includes("Credit Terms") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.credit_terms}
                      </td>
                    )}
                    {!hiddenColumns.includes("Shipping Days") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.shipping_days}
                      </td>
                    )}
                    {!hiddenColumns.includes("Dropship") && (
                      <td className="px-3 py-4 border text-[#303030] text-sm font-normal border-gray-200">
                        {item?.dropship ? "Yes" : "No"}
                      </td>
                    )}
                    {!hiddenColumns.includes("Grade") && (
                      <td className="px-4 py-4 text-sm text-[#303030] font-normal border text-center border-gray-200">
                        <p className="bg-[#e0d4fc] p-4 text-[#6226EF] rounded-md text-[18px]">
                          {item?.grade}
                        </p>
                      </td>
                    )}
                    {!hiddenColumns.includes("Actions") && (
                      <td className="p-3 items-center">
                        <div className="flex  justify-center space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                          <span
                            onClick={() => {
                              setShowEdit(true);
                              setEditData(item);
                              setId(item?.id);
                            }}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          >
                            <img
                              src={`${urls.hostUrl}/icons/pencil-write.png`}
                              alt="edit"
                            />
                          </span>

                          <div className="w-px h-5 bg-gray-300"></div>

                          <span
                            onClick={() => {
                              setShowDelete(true);
                              setId(item?.id);
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <img
                              src={`${urls.hostUrl}/icons/bin.png`}
                              alt="trash"
                            />
                          </span>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="100%" className="text-center py-4 text-gray-500">
                    No Vendor Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
