import React, { useContext, useEffect, useRef, useState } from "react";
import Loader from "../../../utils/Loader";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../config/baseUrls";
import vendorFolder from "../../../assets/icons/vendorFolder.png";
import vendorUploadIcon from "../../../assets/icons/vendorUploadIcon.png";
import pencilWrite from "../../../assets/icons/pencilWrite.png";
import vendorBin from "../../../assets/icons/vendorBin.png";
import ColumnSelector from "./ColumnSelector";
import columnFitler from "../../../assets/icons/columnFitler.png";
import arrowDown from "../../../assets/icons/arrowDown.png";
import arrowUp from "../../../assets/icons/arrowUp.png";
import { ImSortAmountDesc } from "react-icons/im";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { VendorManagementContext } from "../VendorManagementContext";

const Table = ({
  brandsData,
  setSearchQuery,
  isLoading,
  sortBy,
  setShowEdit,
  setLimit,
  setSortBy,
  setSort,
  searchquery,
  setEditData,
  setUploadShow,
  setSearhVendor,
  setShowDelete,
  setId,
}) => {
  const navigate = useNavigate();
  const columnOptions = [
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
    "No Of Products",
    "Warehouse Locations",
    "Created By",
  ];
  const [showColumn, setShowColumn] = useState(false);
  const { setVendorName } = useContext(VendorManagementContext);
  const [hiddenColumns, setHiddenColumns] = useState(() => {
    return JSON.parse(localStorage.getItem("vendorCheckedColumns")) || [];
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const selectFilterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    const handleClickOutsideFilter = (event) => {
      if (
        selectFilterRef.current &&
        !selectFilterRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const checkedColumn =
    JSON.parse(localStorage.getItem("vendorCheckedColumns")) || [];
  console.log(checkedColumn);

  useEffect(() => {
    const storedColumns =
      JSON.parse(localStorage.getItem("vendorCheckedColumns")) || [];
    setHiddenColumns(storedColumns);
  }, []);
  return (
    <div className="bg-white rounded-lg min-h-[40vh] border border-gray-200 w-full overflow-hidden">
      <div className="flex justify-between py-2 items-center px-2">
        <div ref={wrapperRef} className="relative">
          <input
            onClick={() => setShowDropdown(true)}
            onChange={(e) => {
              setSearhVendor(e.target.value);
            }}
            placeholder={`Search ${searchquery ? searchquery : "Vendor"}`}
            className="border py-[4px] border-gray-400 px-[10px] w-[300px] rounded-md"
          />

          {/* Dropdown */}
          {false && (
            <div className="absolute z-10 mt-1 w-[300px] max-h-[200px] overflow-auto bg-white border rounded-md shadow-md">
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="name"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "name"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search <span className="font-bold">Name</span>
                </p>
              </div>
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="email"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "email"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search <span className="font-bold">Email</span>
                </p>
              </div>
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="contact_person"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "contact_person"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search <span className="font-bold">Contact Person</span>
                </p>
              </div>
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="mobile_number"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "mobile_number"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search <span className="font-bold">Mobile Number</span>
                </p>
              </div>
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="landline_number"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "landline_number"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search <span className="font-bold">Landline Number</span>
                </p>
              </div>
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="website_link"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "website_link"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search <span className="font-bold">Website Link</span>
                </p>
              </div>
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="type"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "type"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search <span className="font-bold">Type</span>
                </p>
              </div>
              <div
                onClick={(e) => {
                  setSearchQuery(e.currentTarget.id);
                }}
                id="business_licence_number"
                className={`p-2 hover:bg-gray-200 ${
                  searchquery === "business_licence_number"
                    ? "bg-gray-200 rounded-[7px] m-[10px]"
                    : "bg-white"
                } cursor-pointer`}
              >
                <p className="text-[14px]">
                  Search{" "}
                  <span className="font-bold">Business Licence Number</span>
                </p>
              </div>
            </div>
          )}
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
          <img
            onClick={() => setShowColumn(!showColumn)}
            className="ml-[5px] w-[32px] cursor-pointer rounded-md border border-gray-400 p-[5px]"
            src={columnFitler}
          />
          {showColumn && (
            <div className="absolute right-[40px] border rounded-md top-[180px]">
              <ColumnSelector
                columnOptions={columnOptions}
                setShowColumn={setShowColumn}
                hiddenColumns={hiddenColumns}
                setHiddenColumns={setHiddenColumns}
              />
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left">
            {brandsData?.length > 0 && (
              <thead>
                <tr className="bg-gray-50 h-[50px]">
                  <th className="w-10 p-2 border border-gray-200">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </th>
                  {[
                    { name: "Vendor Name", id: "name" },
                    { name: "Logo", id: "logo" },
                    { name: "Email", id: "email" },
                    { name: "Contact Person", id: "contact_person" },
                    { name: "Mobile Number", id: "mobile_number" },
                    { name: "Landline Number", id: "landline_number" },
                    { name: "Dropship", id: "dropship" },
                    { name: "Website", id: "website_link" },
                    { name: "Type", id: "type" },
                    { name: "Credit Limit", id: "credit_limit" },
                    { name: "Net Terms", id: "net_terms" },
                    {
                      name: "Business License Number",
                      id: "business_licence_number",
                    },
                    { name: "Country Name", id: "country_name" },
                    { name: "Account No", id: "Account No" },
                    { name: "Status", id: "Status" },
                    { name: "Category", id: "Category" },
                    { name: "Grade", id: "Grade" },
                    { name: "Brands", id: "Brands" },
                    { name: "No Of Products", id: "No Of Products" },
                    { name: "Warehouse Locations", id: "Warehouse Locations" },
                    { name: "Created By", id: "created_at" },
                    { name: "Action", id: "action" },
                  ].map((header, index) => {
                    if (hiddenColumns.includes(header?.name)) return null;
                    return (
                      <th
                        key={index}
                        onClick={() => {
                          if (
                            header?.id !== "logo" &&
                            header?.id !== "action" &&
                            header?.id !== "country_name" &&
                            header?.id !== "credit_limit" &&
                            header?.id !== "net_terms" &&
                            header?.id !== "created_at"
                          ) {
                            sortBy === header?.id
                              ? setSortBy("")
                              : setSortBy(header?.id);
                          }
                        }}
                        className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-200 hover:text-[white] font-medium text-gray-600 border border-gray-200"
                      >
                        <div className="flex flex-col  justify-center">
                          <p className="font-semibold text-[14px] min-w-[50px] cursor-pointer text-left leading-[100%] text-[#616161]">
                            <div className="flex items-center justify-between">
                              <p className="">{header?.name}</p>
                              <div className="ml-[20px]">
                                {!(
                                  header?.id === "logo" ||
                                  header?.id === "action" ||
                                  header?.id === "country_name" ||
                                  header?.id === "credit_limit" ||
                                  header?.id === "net_terms" ||
                                  header?.id === "created_at"
                                ) && (
                                  <div className="w-[20px]">
                                    {sortBy === header?.id ? (
                                      <BiSortUp className="w-full h-auto" />
                                    ) : (
                                      <BiSortDown className="w-full h-auto" />
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* <div className="flex flex-col ml-[10px]">
                              <img className="w-[10px]" src={arrowUp} />
                              <img className="w-[10px]" src={arrowDown} />
                            </div> */}
                            </div>
                          </p>
                          {/* {header?.name !== "Action" && (
                          <input
                            className="border rounded-[4px] pl-[5px] py-[7px] mt-[5px] px-[2px]"
                            placeholder={"Search " + header?.name}
                          />
                        )} */}
                          {/* {header?.name !== "Action" && <span className="ml-1">▼</span>} */}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
            )}
            <tbody>
              {brandsData?.length > 0 ? (
                brandsData.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 text-center border h-[50px] border-gray-200">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </td>

                    {!checkedColumn?.includes("Vendor Name") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.name}
                      </td>
                    )}

                    {!checkedColumn?.includes("Logo") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        <img src={item?.logo_url} alt="logo" />
                      </td>
                    )}

                    {!checkedColumn?.includes("Email") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.email}
                      </td>
                    )}

                    {!checkedColumn?.includes("Contact Person") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.contact_person}
                      </td>
                    )}

                    {!checkedColumn?.includes("Mobile Number") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.mobile_number}
                      </td>
                    )}

                    {!checkedColumn?.includes("Landline Number") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.landline_number}
                      </td>
                    )}

                    {!checkedColumn?.includes("Dropship") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.dropshipping}
                      </td>
                    )}

                    {!checkedColumn?.includes("Website") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.website_link}
                      </td>
                    )}

                    {!checkedColumn?.includes("Type") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.type}
                      </td>
                    )}

                    {!checkedColumn?.includes("Credit Limit") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.credit_limit}
                      </td>
                    )}

                    {!checkedColumn?.includes("Net Terms") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.net_terms}
                      </td>
                    )}

                    {!checkedColumn?.includes("Business License Number") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.business_licence_number}
                      </td>
                    )}

                    {!checkedColumn?.includes("Country Name") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.country_name}
                      </td>
                    )}
                    {/* New Columns */}
                    {!checkedColumn?.includes("Account No") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {""}
                      </td>
                    )}
                    {!checkedColumn?.includes("Status") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {""}
                      </td>
                    )}
                    {!checkedColumn?.includes("Category") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {""}
                      </td>
                    )}
                    {!checkedColumn?.includes("Grade") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {""}
                      </td>
                    )}
                    {!checkedColumn?.includes("Brands") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {""}
                      </td>
                    )}
                    {!checkedColumn?.includes("No Of Products") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {""}
                      </td>
                    )}
                    {!checkedColumn?.includes("Warehouse Locations") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {""}
                      </td>
                    )}
                    {!checkedColumn?.includes("Created By") && (
                      <td className="px-3 py-4 text-sm text-[#303030] font-normal border border-gray-200">
                        {item?.created_by}
                      </td>
                    )}

                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                      <div className="flex justify-center space-x-3 w-[150px] p-1 border rounded-md border-[#BCBCBC]">
                        <span
                          onClick={() => {
                            setVendorName(item?.name);
                            navigate(`/VendorAsset/${item?.id}`);
                          }}
                          className="text-blue-500 w-[38px] mt-[1px] hover:text-blue-700 cursor-pointer"
                        >
                          <img src={vendorFolder} alt="folder" />
                        </span>

                        <div className="w-px h-5 bg-gray-300"></div>

                        <span
                          onClick={() => {
                            setUploadShow(true);
                            setId(item.id);
                          }}
                          className="text-blue-500 w-[40px] hover:text-blue-700 cursor-pointer"
                        >
                          <img src={vendorUploadIcon} alt="upload" />
                        </span>

                        <div className="w-px h-5 bg-gray-300"></div>

                        <span
                          onClick={() => {
                            setShowEdit(true);
                            setEditData(item);
                            setId(item.id);
                          }}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                          <img src={pencilWrite} alt="edit" />
                        </span>

                        <div className="w-px h-5 bg-gray-300"></div>

                        <span
                          onClick={() => {
                            setShowDelete(true);
                            setId(item.id);
                          }}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <img src={vendorBin} alt="trash" />
                        </span>
                      </div>
                    </td>
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
