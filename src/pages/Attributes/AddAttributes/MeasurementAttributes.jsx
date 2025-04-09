import React, { useState, useEffect } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import SelectField from "../../../components/common/MultiAttributes/CommonOption";
import SelectComponent from "../../../components/common/SelectComponent";
import CollapseComponent from "../../../components/common/CollapseComponent";
const MeasurementAttributes = ({ stateData, register, errors, setValue,attributeGroups }) => {
  let validation;
  if (typeof stateData.validations === "string") {
    try {
      validation = JSON.parse(stateData.validations);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    validation = stateData.validations;
  }
  useEffect(() => {
    if (stateData.validations) {
      setValue("attribute_group_id", stateData.attribute_groups[0].id);
      setValue("measurment_family", validation.measurment_family ? "Yes" : "No");
      setValue("negative", validation.negative ? "Yes" : "No");
      setValue("decimal", validation.decimal ? "Yes" : "No");
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
        <SelectField
          label="Measurement Family (required)"
          name="measurment_family"

          {...register("measurment_family", { required: "Measurment family  required" })}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}

        />
        {errors.measurment_family && <p className="text-red-500">{errors.measurment_family.message}</p>}
        <SelectField
          label="Negative Values Allowed"
          name="negative"

          {...register("negative")}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}

        />
        <SelectField
          label="Decimal Values Allowed"
          name="decimal"
          {...register("decimal")}

          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}

        />
        <CommonInput
          label="Min Number"
          name="min"
          type="number"
          min="0"
          defaultValue={validation?.min}
          {...register("min")}
          placeholder="Min number"

        />
        <CommonInput
          label="Max Number"
          name="max"
          type="number"
          min="0"
          defaultValue={validation?.max}
          {...register("max")}
          placeholder="Max number"

        />
      </CollapseComponent>
    </div>
  );
};

export default MeasurementAttributes;
