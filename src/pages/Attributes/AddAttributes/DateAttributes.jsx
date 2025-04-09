import React, { useState,useEffect } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import SelectComponent from "../../../components/common/SelectComponent";
import CollapseComponent from "../../../components/common/CollapseComponent";
const DateAttributes = ({ stateData, register, errors,setValue,attributeGroups }) => {
 
  let validation;

  if (typeof stateData.validations === "string") {
    try {
      let validation = stateData.validations;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    validation = stateData.validations;
  }
  useEffect(() => {
      if (stateData.validations) {

        setValue("attribute_group_id", stateData.attribute_groups[0].id);
      }
    }, [stateData, setValue]);

  return (
    <div className="min-h-screen">
      <MultiAttributesHeader type={stateData.type} />
      {/* General Parameters */}
      <CollapseComponent title="General Parameters" errors={errors}>
        <CommonInput
          label="Code (required)"
          name="code"
          type="input"
          disabled={true}
          defaultValue={stateData?.code}
          {...register("code", { required: "Code is required" })}
          placeholder="Enter your code"

        />
        {errors.code && <p className="text-red-500">{errors.code.message}</p>}

 
        <SelectComponent
          width="full"
          label="Attribute Group (required)" name="attribute_group_id" option={attributeGroups} 
          {...register("attribute_group_id", { required: "Attribute Group  required" })} />

        {errors.attribute_group_id && <p className="text-red-500">{errors.attribute_group_id.message}</p>}
      </CollapseComponent>

      {/* Validation Parameters */}
      <CollapseComponent title="Validation Parameters" errors={errors}>
        <CommonInput
          label="Min Date"
          name="min"
          type="date"
          defaultValue={validation?.min}
          {...register("min")}
          placeholder="Min"

        />
        <CommonInput
          label="Max Date"
          name="max"
          type="date"
          defaultValue={validation?.max}
          {...register("max")}
          placeholder="Max"

        />
     </CollapseComponent>
    </div>
  );
};

export default DateAttributes;
