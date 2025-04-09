import React, { useEffect } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import SelectField from "../../../components/common/MultiAttributes/CommonOption";
import SelectComponent from "../../../components/common/SelectComponent";
import CollapseComponent from "../../../components/common/CollapseComponent";
const NumberAttributes = ({ stateData, register, errors,setValue,attributeGroups }) => {
 
  let validation = stateData.validations;
    useEffect(() => {
      if (stateData.validations) {

        setValue("negative", validation.negative ? 'Yes' : 'No');
        setValue("decimal", validation.decimal ? 'Yes' : 'No');
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
          min="0"
          name="min"
          type="number"
          defaultValue={validation?.min}
          {...register("min")}
          placeholder="Min number"

        />
        <CommonInput
          label="Max Number"
          name="min"
           min="0"
          type="number"
          defaultValue={validation?.max}
          {...register("max")}
          placeholder="Max Number"

        />
      </CollapseComponent>
    </div>
  );
};

export default NumberAttributes;
