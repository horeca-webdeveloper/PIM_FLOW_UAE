import React, { useEffect, useState } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import SelectField from "../../../components/common/MultiAttributes/CommonOption";
import CollapseComponent from "../../../components/common/CollapseComponent";
import MultiSelectComponent from "../../../components/common/MultiSelectComponent";
import { Controller } from "react-hook-form";
const NumberAttributes = ({
  stateData,
  register,
  control,
  errors,
  setValue,
  attributeGroups,
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  let validation = stateData.validations;
  useEffect(() => {
    if (stateData) {
      setValue("negative", validation?.negative ? "Yes" : "No");
      setValue("decimal", validation?.decimal ? "Yes" : "No");
      const selectedAttributes = stateData?.attribute_groups?.map((items) => ({
        value: items.id,
        label: items.name,
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
          name="attribute_group_id"
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

        {errors.attribute_group_id && (
          <p className="text-red-500">{errors.attribute_group_id.message}</p>
        )}
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
          minLength={0}
          defaultValue={validation?.min}
          {...register("min")}
          placeholder="Min number"
        />
        <CommonInput
          label="Max Number"
          name="min"
          min="0"
          type="number"
          minLength={0}
          defaultValue={validation?.max}
          {...register("max")}
          placeholder="Max Number"
        />
      </CollapseComponent>
    </div>
  );
};

export default NumberAttributes;
