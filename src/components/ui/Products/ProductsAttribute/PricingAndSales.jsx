import React, { useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import CommonOption from "../../../common/MultiAttributes/CommonOption";

const PricingAndSales = ({ pricingSalesData, setPricingSales }) => {
  const [show, setShow] = useState(true);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let sanitizedValue;
    if (type === "number") {
      sanitizedValue = value.replace(/[eE+-]/g, "");
      sanitizedValue = sanitizedValue === "" ? "" : Number(sanitizedValue);
    } else if (type === "checkbox") {
      sanitizedValue = e.target.checked;
    } else {
      sanitizedValue = value;
    }

    setPricingSales((prev) => {
      const updated = {
        ...prev,
        [name]: sanitizedValue,
      };

      const costType = updated.cost_type;
      const costPerItem = Number(updated.cost_per_item || 0);
      const additionalValue = Number(updated.additional_cost_value || 0);
      const additionalPercent = Number(updated.additional_cost_percentage || 0);

      let totalCost = 0;
      if (costType === "value") {
        totalCost = costPerItem + additionalValue;
      } else if (costType === "percentage") {
        totalCost = costPerItem + (costPerItem * additionalPercent) / 100;
      }

      return {
        ...updated,
        total_cost_per_item: totalCost,
      };
    });
  };

  const missingCount =
    (!pricingSalesData?.price ? 1 : 0) +
    (!pricingSalesData?.sale_price ? 1 : 0) +
    (!pricingSalesData?.cost_per_item ? 1 : 0) +
    (!pricingSalesData?.currency?.length > 0 ? 1 : 0);

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Pricing and Sales
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
        <form className="space-y-4 px-4">
          <div className="flex gap-4 w-full pb-[15px]">
            <div className="flex flex-col w-[50%] pr-[18px] border-r border-[#A8A4A4]">
              <h1 className="text-[20px] text-[#4A4A4A] mb-[20px] leading-[27.28px] font-normal">
                Sale Price
              </h1>
              <CommonOption
                label="Currency"
                name="currencyValue"
                value={pricingSalesData?.currencyValue || ""}
                options={pricingSalesData?.currency}
                onChange={handleChange}
              />
              <CommonInput
                label={"Original Price"}
                name={"price"}
                type={"Number"}
                value={pricingSalesData?.price}
                onChange={handleChange}
              />
              <CommonInput
                label={"Sale Price After Discount"}
                name={"sale_price"}
                type={"Number"}
                value={pricingSalesData?.sale_price}
                onChange={handleChange}
              />
              <CommonInput
                label={"Minimum Order Quantity"}
                name={"minimum_order_quantity"}
                type={"Number"}
                value={pricingSalesData?.minimum_order_quantity}
                onChange={handleChange}
              />
              <CommonInput
                label={"Box Quantity"}
                value={pricingSalesData?.box_quantity}
                name={"box_quantity"}
                type="Number"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-[50%]">
              <h1 className="text-[20px] text-[#4A4A4A] mb-[20px] leading-[27.28px] font-normal">
                Cost Price
              </h1>
              <CommonInput
                label={"Cost Per Item"}
                name={"cost_per_item"}
                type={"Number"}
                value={pricingSalesData?.cost_per_item}
                onChange={handleChange}
              />
              <CommonOption
                label="Cost Per Item Currency"
                name="cost_per_item_currency"
                value={pricingSalesData?.cost_per_item_currency || ""}
                options={pricingSalesData?.currency}
                onChange={handleChange}
              />
              <div className="flex flex-col w-[100%] mt-[4px]">
                <label className="text-[16px] text-[#616161] font-semibold">
                  Cost Type
                </label>
                <select
                  className="border border-[#A8A4A4] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
                  name="cost_type"
                  value={pricingSalesData?.cost_type}
                  onChange={handleChange}
                >
                  <option value={""}>Select Type</option>
                  <option value={"percentage"}>Percentage</option>
                  <option value={"value"}>Value</option>
                </select>
              </div>

              {pricingSalesData?.cost_type === "value" && (
                <div className="w-[100%] mt-[10px]">
                  <CommonInput
                    label={"Additional Cost Value"}
                    name={"additional_cost_value"}
                    type={"Number"}
                    value={pricingSalesData?.additional_cost_value}
                    onChange={handleChange}
                  />
                </div>
              )}

              {pricingSalesData?.cost_type === "percentage" && (
                <div className="flex flex-col w-[100%] mt-[4px]">
                  <label className="text-[16px] text-[#616161] font-semibold">
                    Additional Cost Percentage
                  </label>
                  <select
                    className="border border-[#A8A4A4] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
                    name="additional_cost_percentage"
                    onChange={handleChange}
                    value={
                      pricingSalesData?.additional_cost_percentage?.split(
                        "."
                      )[0]
                    }
                  >
                    <option value={""}>Select Type</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}%
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-4 mt-[10px] w-[100%]">
                <CommonInput
                  label={"Total Cost Per Item"}
                  name={"total_cost_per_item"}
                  type={"Number"}
                  value={pricingSalesData?.total_cost_per_item || 0}
                  onChange={handleChange}
                  disabled // optional: disable manual edit
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PricingAndSales;
