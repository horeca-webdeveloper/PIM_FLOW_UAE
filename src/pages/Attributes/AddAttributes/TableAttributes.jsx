import React, { useEffect,useState } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import SelectField from "../../../components/common/MultiAttributes/CommonOption";
import CollapseComponent from "../../../components/common/CollapseComponent";
import MultiSelectComponent from "../../../components/common/MultiSelectComponent";
import { Controller } from "react-hook-form";
const TableAttributes = ({ stateData, register, errors,control, setValue, attributeGroups }) => {
 const [selectedAttributes,setSelectedAttributes]=useState([]);
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
    if (stateData) {
      const selectedAttributes = stateData?.attribute_groups?.map((items) => ({
        value: items.id,
        label: items.name
      }));
      setSelectedAttributes(selectedAttributes);
      setValue("attribute_group_id", selectedAttributes);
      setValue("default_value", validation?.default_value ? "Yes" : "No");

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
        <SelectField
          label="Default Value"
          name="default_value"

          {...register("default_value", { required: "Default value is required" })}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}

        />
      </CollapseComponent>
    </div>
  );
};

export default TableAttributes;
