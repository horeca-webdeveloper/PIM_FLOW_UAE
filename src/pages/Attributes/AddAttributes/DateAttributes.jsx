import React, { useState,useEffect } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import CollapseComponent from "../../../components/common/CollapseComponent";
import MultiSelectComponent from "../../../components/common/MultiSelectComponent";
import { Controller } from "react-hook-form";
const DateAttributes = ({ stateData, register,control, errors,setValue,attributeGroups }) => {
  const [selectedAttributes,setSelectedAttributes]=useState([]);
  
  let validation;

  if (typeof stateData.validations === "string") {
    try {
        validation = stateData.validations;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    validation = stateData.validations;
  }
  useEffect(() => {
      if (stateData) {

        const selectedAttributes = stateData?.attribute_groups?.map((items) => ({
          value: items.id,
          label: items.name
        }));
        setSelectedAttributes(selectedAttributes);
        setValue("attribute_group_id", selectedAttributes);
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

 
        <Controller
          name='attribute_group_id'
          control={control}
          rules={{ required: `Attribute group are required` }}
          render={({ field }) => (
            <MultiSelectComponent
              defaultValues={!!selectedAttributes && selectedAttributes}
              label={`Attribute Group  required`}
              width="100%"
              option={attributeGroups || []}
              isMulti={false}
              {...field}
            />
          )}
        />

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
