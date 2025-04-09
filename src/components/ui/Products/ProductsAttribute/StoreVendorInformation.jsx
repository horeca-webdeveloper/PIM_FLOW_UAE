import React, { useState } from "react";

const StoreVendorInformation = ({
  storeVendor,
  store,
  brand,
  setStoreVendor,
}) => {
  const [show, setShow] = useState(true);

  const handleBrand = (event) => {
    const selectedOption = event.target.selectedOptions[0]; // Get selected option
    setStoreVendor((prevState) => ({
      ...prevState,
      brand_id: selectedOption.id, // Store brand ID
      brandValue: event.target.value, // Store brand name
    }));
  };

  const handleStore = (event) => {
    const selectedOption = event.target.selectedOptions[0]; // Get selected option
    setStoreVendor((prevState) => ({
      ...prevState,
      store_id: selectedOption.id, // Store store ID
      storeValue: event.target.value, // Store store name
    }));
  };

  const missingCount =
    (!storeVendor?.storeValue ? 1 : 0) + (!storeVendor?.brandValue ? 1 : 0);

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Brand & Vendor Information
        </h2>
        <div className="text-sm text-red-500">
          {missingCount > 0 && (
            <div className="text-sm text-red-500">
              <span className="mr-1 cursor-pointer">
                {missingCount} missing required attribute
                {missingCount > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      {show && (
        <div className="space-y-4 p-4">
          <div className="flex gap-4 w-full">
            {/* Store Dropdown */}
            <div className="w-[50%] gap-4">
              <h1 className="text-[16px] text-[#616161] font-semibold">
                Vendor
              </h1>
              <select
                value={storeVendor?.storeValue || ""}
                onChange={handleStore}
                className="border border-[#A8A4A4] w-[100%] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
              >
                <option value="" disabled>
                  Select a store
                </option>
                {store?.stores && Object.keys(store.stores).length > 0 ? (
                  Object.entries(store.stores).map(([id, name]) => (
                    <option key={id} value={name} id={id}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading stores...</option>
                )}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="w-[50%] gap-4">
              <h1 className="text-[16px] text-[#616161] font-semibold">
                Brand
              </h1>
              <select
                value={storeVendor?.brandValue || ""}
                onChange={handleBrand}
                className="border border-[#A8A4A4] w-[100%] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
              >
                <option value="" disabled>
                  Select a brand
                </option>
                {brand?.brands && Object.keys(brand.brands).length > 0 ? (
                  Object.entries(brand.brands).map(([id, name]) => (
                    <option key={id} value={name} id={id}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading brands...</option>
                )}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreVendorInformation;
