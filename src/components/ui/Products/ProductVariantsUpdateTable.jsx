import React, { useEffect, useRef, useState } from "react";
import Loader from "../../../utils/Loader";
import whiteBin from "../../../assets/icons/bin-white.png";
import pencilWrite from "../../../assets/icons/pencilWrite.png";
import vendorBin from "../../../assets/icons/vendorBin.png";
import { Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

const ProductVariantsUpdateTable = ({
  setSearchQuery,
  isLoading,
  sortBy,
  updateData,
  setShowDelete,
  setId,
  setLimit,
  setSortBy,
  setParentId,
  setSort,
  searchquery,
  deleteAttribute,
  searchPlaceholder,
  setShowModal,
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  console.log("Update Data", updateData);

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const mockData = [
    {
      id: "1234567890",
      name: "Menumaster Stainless Steel...",
      brand: "Hamilton Beach",
      status: "Active",
      productFamily: "Kitchen Equipment",
      taxonomyPath: "Mechanical /Electrical equip....",
      children: [
        { id: "1", name: "Abc", sku: "1234567890", inStock: true },
        {
          id: "2",
          name: "Menumaster Stainless Steel...",
          sku: "1234567890",
          inStock: true,
        },
      ],
    },
    {
      id: "1234567891",
      name: "Menumaster Stainless Steel...",
      brand: "Hamilton Beach",
      status: "Active",
      productFamily: "Kitchen Equipment",
      taxonomyPath: "Mechanical /Electrical equip....",
      children: [
        { id: "1", name: "Abc", sku: "1234567891", inStock: true },
        {
          id: "2",
          name: "Menumaster Stainless Steel...",
          sku: "1234567891",
          inStock: true,
        },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg mt-[10px] border border-gray-200 w-full overflow-scroll">
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <div className="sticky top-0 bg-white">
            <div className="flex items-center gap-2 m-2">
              <span className="text-[14px] leading-[17.64px] text-white bg-[#64748B] px-[20px] font-bold rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer hover:text-white group hover:bg-[#26683A]">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="mr-1" />
                  <span>Select All</span>
                </label>
              </span>

              <span className="text-[14px] leading-[17.64px] text-white bg-[#EF3826] px-[20px] font-bold rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer hover:text-white group hover:bg-[#26683A]">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <img src={whiteBin} alt="trash" className="w-4 h-4 mr-1" />
                  Delete All
                </span>
              </span>
            </div>

            <div className="border rounded-lg h-[70vh] overflow-x-scroll">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#EBEBEB] text-[#616161]">
                  <tr>
                    <th className="w-10 border border-gray-200 capitalize"></th>
                    <th className="text-left w-[90%] p-2 border border-gray-200 capitalize">
                      Parent Name
                    </th>
                    <th className="text-left p-2 border border-gray-200 capitalize">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="h-[10vh]">
                  {Object.entries(updateData || {}).map(([key, item]) => {
                    console.log(key, item);
                    return (
                      <React.Fragment key={item.id}>
                        {/* Parent Row with striping */}
                        <tr
                        // className={`border-b ${
                        //   index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        // }`}
                        >
                          <td className="p-2 text-center border border-gray-200 capitalize">
                            <button onClick={() => toggleExpand(key)}>
                              {expandedRows.includes(key) ? (
                                <ChevronDown />
                              ) : (
                                <ChevronRight />
                              )}
                            </button>
                          </td>
                          <td className="p-2 border border-gray-200 capitalize">
                            {key}
                          </td>
                          <td className="p-2 border border-gray-200 capitalize">
                            <div className="flex gap-2">
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 ">
                                <div className="flex justify-center space-x-4 w-[120px] p-1 border rounded-md border-[#BCBCBC]">
                                  <a
                                    href={`#`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                      <img
                                        src={pencilWrite}
                                        alt="edit"
                                        className="w-5 h-5"
                                      />
                                    </span>
                                  </a>
                                  <div className="w-px h-5 bg-gray-300"></div>
                                  <span
                                    onClick={() => deleteAttribute(item.id)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                  >
                                    <img
                                      src={vendorBin}
                                      alt="trash"
                                      className="w-5 h-5"
                                    />
                                  </span>
                                </div>
                              </td>
                            </div>
                          </td>
                        </tr>

                        {/* Child Rows */}
                        {expandedRows.includes(key) && (
                          <>
                            {/* Child Header Row */}

                            <tr className="bg-[white] t-2 ">
                              <td className="p-2 border border-gray-200 capitalize"></td>
                              <td colSpan="8">
                                <table className="w-full text-sm m-2  rounded-lg ">
                                  <thead className="bg-[#F4F2F2] text-[#616161]">
                                    <tr>
                                      <th className="p-2 w-10 border border-gray-200 capitalize">
                                        <Checkbox />
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Child Name
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Brand
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Child SKU
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Image
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Product Family
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Status
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Taxanomy Path
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        In Stock
                                      </th>
                                      <th className="text-left p-2 border border-gray-200 capitalize">
                                        Action
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.map((child, childIndex) => (
                                      <tr
                                        key={child.id}
                                        className={`border-b ${
                                          childIndex % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                        }`}
                                      >
                                        <td className="p-2 border border-gray-200 capitalize">
                                          <Checkbox />
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          {child.name}
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          {child.brand}
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          {child.sku}
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          <img
                                            className="w-[40px] h-[40px] object-cover"
                                            src={child?.image}
                                          />
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          {child.product_family}
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          {child.status}
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          {child.taxonomy_path.toString()}
                                        </td>
                                        <td className="p-2 border border-gray-200 capitalize">
                                          <span
                                            className={`text-xs font-semibold ${
                                              child.inStock
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                          >
                                            {child.inStock ? "Yes" : "No"}
                                          </span>
                                        </td>

                                        <td className="p-2 border border-gray-200 capitalize">
                                          <div className="flex gap-2">
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 ">
                                              <div className="flex justify-center space-x-4 w-[120px] p-1 border rounded-md border-[#BCBCBC]">
                                                <span
                                                  onClick={() => {
                                                    setShowModal(true);
                                                    setId(child?.id);
                                                    setParentId(
                                                      child?.group_id
                                                    );
                                                  }}
                                                  rel="noopener noreferrer"
                                                >
                                                  <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                                    <img
                                                      src={pencilWrite}
                                                      alt="edit"
                                                      className="w-5 h-5"
                                                    />
                                                  </span>
                                                </span>
                                                <div className="w-px h-5 bg-gray-300"></div>
                                                <span
                                                  onClick={() => {
                                                    setShowDelete(true);
                                                    setId(child?.id);
                                                    setParentId(
                                                      child?.group_id
                                                    );
                                                  }}
                                                  className="text-red-500 hover:text-red-700 cursor-pointer"
                                                >
                                                  <img
                                                    src={vendorBin}
                                                    alt="trash"
                                                    className="w-5 h-5"
                                                  />
                                                </span>
                                              </div>
                                            </td>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVariantsUpdateTable;
