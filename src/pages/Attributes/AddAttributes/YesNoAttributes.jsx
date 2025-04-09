import React, { useEffect } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import SelectField from "../../../components/common/MultiAttributes/CommonOption";
import SelectComponent from "../../../components/common/SelectComponent";
import CollapseComponent from "../../../components/common/CollapseComponent";
const YesNoAttributes = ({ stateData, register, errors, setValue, attributeGroups }) => {

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
      setValue("default_value", validation.default_value ? "Yes" : "No");

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
          label="Default value"
          name="default_value"

          {...register("default_value")}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}

        />
     </CollapseComponent>
    </div>
  );
};

export default YesNoAttributes;
