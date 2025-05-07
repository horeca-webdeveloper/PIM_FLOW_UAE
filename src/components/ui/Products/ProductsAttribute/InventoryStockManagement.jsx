import React, { useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import CommonOption from "../../../common/MultiAttributes/CommonOption";

const InventoryStockManagement = ({
  inventoryStockManagement,
  setInventoryStockManagement,
}) => {
  const [show, setShow] = useState(true);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Remove `e`, `E`, `+`, and `-` from the input value
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
    setInventoryStockManagement((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const missingCount =
    (!inventoryStockManagement?.quantity ? 1 : 0) +
    (!inventoryStockManagement?.stock_status_value ? 1 : 0) +
    (!inventoryStockManagement?.delivery_days ? 1 : 0);

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Inventory & Stock Management
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
        <form className="space-y-4 p-4">
          <div className="flex gap-4 w-[100%]">
            <CommonInput
              label={"Quantity"}
              value={inventoryStockManagement?.quantity}
              name={"quantity"}
              type={"Number"}
              onChange={handleChange}
            />
            {inventoryStockManagement?.quantity > 0 && (
              <CommonOption
                label="Stock Status "
                name="stock_status_value"
                value={inventoryStockManagement?.stock_status_value || ""}
                options={inventoryStockManagement?.stock_status || []}
                onChange={handleChange}
              />
            )}
            <CommonOption
              label="Delivery Days"
              name="delivery_days"
              value={inventoryStockManagement?.delivery_days}
              options={[
                { value: "2 To 3 " },
                { value: "5 To 7" },
                { value: "10 To 12" },
                { value: "3 To 4 Weeks" },
                { value: "6 Weeks" },
                { value: "8 To 10 Weeks" },
                { value: "12 Weeks" },
              ]}
              onChange={handleChange}
            />
            {/* <CommonInput
              label={"Delivery Days"}
              value={inventoryStockManagement?.delivery_days}
              name={"delivery_days"}
              type="number" minLength={0}
              onChange={handleChange}
            /> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default InventoryStockManagement;
