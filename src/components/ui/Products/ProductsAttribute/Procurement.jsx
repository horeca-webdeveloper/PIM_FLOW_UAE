import React, { useState } from "react";

const Procurement = () => {
  const [show, setShow] = useState(true);
  const [formState, setFormState] = useState({
    SupplierName: "",
    SupplierItem: "",
    SupplierSKU: "",
    StockAvailablity: "",
    MOQ: "",
    CostPrice: "",
    Markup: "",
    SellingPriceNow: "",
    Discount: "",
    SellingPriceWas: "",
    GPMarginValue: "",
    GPMarginPercentage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
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
          Procurement Attribute
        </h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">
            6 missing required attribute
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
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <label
              htmlFor="brand"
              className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
            >
              Supplier Name
            </label>
            <input
              type="text"
              id="Single"
              name="Single"
              value={formState.SupplierName}
              onChange={handleInputChange}
              className="w-[50%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="color"
              className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
            >
              Supplier Item Name
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="color"
                name="color"
                value={formState.color}
                onChange={handleInputChange}
                className="w-[50%] p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex w-[50%]">
            <div className="space-y-2 w-full">
              <label
                htmlFor="material"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Supplier SKU
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formState.material}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 w-full ml-[10px]">
              <label
                htmlFor="certifications"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                MOQ (days)
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formState.certifications}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex w-[50%]">
            <div className="space-y-2 w-full">
              <label
                htmlFor="material"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Stock Availability
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formState.material}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 w-full ml-[10px]">
              <label
                htmlFor="certifications"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Lead Time
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formState.certifications}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex w-[50%]">
            <div className="space-y-2 w-full">
              <label
                htmlFor="material"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Cost Price
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formState.material}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 w-full ml-[10px]">
              <label
                htmlFor="certifications"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Markup
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formState.certifications}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex w-[50%]">
            <div className="space-y-2 w-full">
              <label
                htmlFor="material"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Selling Price Now
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formState.material}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 w-full ml-[10px]">
              <label
                htmlFor="certifications"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Discount
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formState.certifications}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 w-full ml-[10px]">
              <label
                htmlFor="certifications"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                Selling Price Was
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formState.certifications}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex w-[50%]">
            <div className="space-y-2 w-full">
              <label
                htmlFor="material"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                GP Margin in Value
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formState.material}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 w-full ml-[10px]">
              <label
                htmlFor="certifications"
                className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
              >
                GP Margin in %
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formState.certifications}
                onChange={handleInputChange}
                className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Procurement;
