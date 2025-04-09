import React, { useEffect, useMemo, useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import CommonMultiKeywordInput from "../../../common/CommonMultiKeywordInput";
import MultiSelectComponent from "../../../common/MultiSelectComponent";
import { useFetchProducts } from "../../../../services/apis/Products/Hooks";
import MultiSelectComponentDanish from "../../../common/MultiSelectComponentDanish";

const options = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
  { id: 4, name: "Mango" },
  { id: 5, name: "Orange" },
];

const PerformanceAnalytics = ({
  performanceAnalytics,
  setPerformanceAnalytics,
}) => {
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useFetchProducts({
    page: 1,
    per_page: 100,
  });

  // Format products data for MultiSelectComponent
  const formattedProducts = useMemo(() => {
    if (!productsData?.data) return [];
    return productsData.data.map((product) => ({
      id: product.id,
      name: product.sku || product.sku, // depending on your API response
    }));
  }, [productsData]);

  const [show, setShow] = useState(true);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle different input types
    let sanitizedValue;
    if (type == "number") {
      // Remove non-numeric characters except decimal point
      sanitizedValue = value.replace(/[eE+-]/g, "");
      // Convert to number or 0 if empty
      sanitizedValue = sanitizedValue === "" ? "" : Number(sanitizedValue);
    } else if (type === "checkbox") {
      sanitizedValue = e.target.checked;
    } else {
      sanitizedValue = value;
    }

    setPerformanceAnalytics((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectionChange = (items) => {
    console.log("Selected Items:", items); // ✅ Debugging - logs array of objects

    const selectedIds = items.map((item) => item.id); // ✅ Extract only IDs

    setPerformanceAnalytics((prev) => ({
      ...prev,
      frequently_bought_together: selectedIds, // ✅ Store array of IDs only
    }));

    console.log("Final Selected IDs:", selectedIds); // ✅ Debugging
  };

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Performance & Analytics
        </h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">
            1 missing required attribute
          </span>
          <button className="ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {show && (
        <div className="space-y-4 p-4">
          <MultiSelectComponentDanish
            label="Frequently Bought Together"
            options={formattedProducts}
            onChange={handleSelectionChange}
          />
          <div className="flex gap-4 w-[100%]">
            <CommonInput
              label={"Views"}
              name={"views"}
              disabled={true}
              type="Number"
              value={performanceAnalytics?.views}
              onChange={handleChange}
            />
            <CommonInput
              label={"Unit Sold"}
              name={"units_sold"}
              disabled={true}
              type="Number"
              value={performanceAnalytics?.units_sold}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceAnalytics;
