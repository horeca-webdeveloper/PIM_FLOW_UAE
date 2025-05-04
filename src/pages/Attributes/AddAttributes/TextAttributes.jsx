import React, { useEffect, useState } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import SelectField from "../../../components/common/MultiAttributes/CommonOption";
import CollapseComponent from "../../../components/common/CollapseComponent";
import { Controller } from "react-hook-form";
import MultiSelectComponent from "../../../components/common/MultiSelectComponent";
const TextAttributes = ({ stateData, register, errors, setValue,control, attributeGroups }) => {

  let validation = stateData.validations;
  const [selectedAttributes,setSelectedAttributes]=useState([]);
  useEffect(() => {
    if (stateData) {
      const selectedAttributes = stateData?.attribute_groups?.map((items) => ({
        value: items.id,
        label: items.name
      }));
      setSelectedAttributes(selectedAttributes);
      setValue("editor", validation?.editor ? 'Yes' : 'No');
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
        <SelectField
          label="Text editor enabled"
          name="editor"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          {...register("editor")}
        />
        {errors.editor && <p className="text-red-500">{errors.editor.message}</p>}
        <CommonInput
          label="Max Character"
          name="max"
          type="number"
          min="0"
          placeholder="Text"
          {...register("max")}
          defaultValue={validation?.max}

        />
        {errors.max && <p className="text-red-500">{errors.max.message}</p>}
      </CollapseComponent>

    </div>
  );
};

export default TextAttributes;
