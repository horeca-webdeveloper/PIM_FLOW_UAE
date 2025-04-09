import React, { useState } from "react";
import {
  useFetchAllProductCategories,
  useFetchProductCategories,
} from "../../../../services/apis/Categories/Hooks";
import { LoaderIcon } from "react-hot-toast";
import CommonMultiOption from "../../../common/MultiAttributes/CommonMultiOption";
import Loader from "../../../../utils/Loader";

const CreateProductsInputs = ({
  productType,
  formData,
  setFormData,
  handleInputChange,
}) => {
  const { data, isLoading, error } = useFetchAllProductCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  const categories = data?.categories || [];
  const options = [
    { value: "1", label: "United States" },
    { value: "2", label: "United Arab Emirates" },
    { value: "3", label: "Saudi Arabia" },
  ];

  const handleSelectionChange = (selected) => {
    setFormData((prevData) => ({
      ...prevData,
      website: selected, // Assuming "website" is the correct key in formData
    }));
  };

  return (
    <div className="space-y-3 sm:max-h-[300px] sm:overflow-y-auto">
      {productType === "product" ? (
        <>
          <div className=" mb-[-3px]">
            <label className="block sm:font-semibold sm:text-[14px] text-[#616161] mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="w-full border border-gray-300 rounded p-2 text-sm"
              value={formData.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold text-[14px] text-[#616161] mb-1">
              Sku
            </label>
            <input
              type="text"
              placeholder="123456"
              className="w-full border border-gray-300 rounded p-2 text-sm"
              value={formData.sku}
              onChange={(e) => handleInputChange("sku", e.target.value)}
            />
          </div>
          <div className="p-0 ">
            {/* First Level Dropdown */}
            <label className="block sm:font-semibold sm:text-[14px] text-[#616161] mb-1">
              Primary Category
            </label>
            <select
              className="border border-[#d1d5da] p-2 text-[14px] mb-[12px] rounded w-full"
              onChange={(e) => {
                const category = categories.find(
                  (cat) => cat.id === Number(e.target.value)
                );
                setSelectedCategory(category);
                setSelectedSubCategory(null);
                setSelectedItem(null);
              }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Second Level Dropdown */}
            {selectedCategory?.children &&
              selectedCategory.children.length > 0 && (
                <>
                  <label className="block sm:font-semibold sm:text-[14px] text-[#616161] mb-1">
                    Secondary Category
                  </label>
                  <select
                    className="border  border-[#d1d5da] p-2 text-[14px] mb-[12px] rounded w-full"
                    onChange={(e) => {
                      const subCategory = selectedCategory.children.find(
                        (sub) => sub.id === Number(e.target.value)
                      );
                      setSelectedSubCategory(subCategory);
                      setSelectedItem(null);
                    }}
                  >
                    <option value="">Select Sub-Category</option>
                    {selectedCategory.children.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

            {/* Third Level Dropdown */}
            {selectedSubCategory?.children &&
              selectedSubCategory.children.length > 0 && (
                <>
                  <label className="block sm:font-semibold sm:text-[14px] text-[#616161] mb-1">
                    Product Family
                  </label>

                  <select
                    className="border p-2  border-[#d1d5da] text-[14px] mb-[12px] rounded w-full"
                    onChange={(e) => {
                      const item = selectedSubCategory.children.find(
                        (child) => child.id === Number(e.target.value)
                      );
                      setSelectedItem(item);

                      // Update formData when an option is selected
                      setFormData((prevData) => ({
                        ...prevData,
                        family: Number(e.target.value), // Ensure it's a number
                      }));
                    }}
                  >
                    <option value="">Select Item</option>
                    {selectedSubCategory.children.map((child) => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
          </div>
          <div>
            <CommonMultiOption
              label="Website"
              name="Website"
              options={options}
              onChange={handleSelectionChange}
            />
          </div>
        </>
      ) : (
        // Product Model form fields
        <>
          <div>
            <label className="block text-[14px] text-[#616161] mb-1">
              Code
            </label>
            <input
              type="text"
              placeholder="Description will be placed here"
              className="w-full border border-gray-300 rounded p-2 text-sm"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[14px] text-[#616161] mb-1">
              Family (Required)
            </label>
            <select
              className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500"
              value={formData.family}
              onChange={(e) => handleInputChange("family", e.target.value)}
            >
              <option value="">Description will be placed here</option>
              <option value="family1">Family 1</option>
              <option value="family2">Family 2</option>
            </select>
          </div>

          <div>
            <label className="block text-[14px] text-[#616161] mb-1">
              Variant (Required)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Description will be placed here"
                className="w-full border border-gray-300 rounded p-2 text-sm pr-8"
                value={formData.variant}
                onChange={(e) => handleInputChange("variant", e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProductsInputs;
