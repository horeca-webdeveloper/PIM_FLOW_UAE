import React, { useEffect, useState } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import MultiKeywordInputComponent from "../../../components/common/MultiKeywordInputComponent";

import CollapseComponent from "../../../components/common/CollapseComponent";
import MultiSelectComponent from "../../../components/common/MultiSelectComponent";
import { Controller } from "react-hook-form";
const FileAttributes = ({ stateData, register, errors, control, setValue, allowedExtension, setAllowedExtension, attributeGroups }) => {
  let validation = stateData.validations;
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  useEffect(() => {
    if (stateData) {
      const selectedAttributes = stateData?.attribute_groups?.map((items) => ({
        value: items.id,
        label: items.name
      }));
      setSelectedAttributes(selectedAttributes);
      setValue("attribute_group_id", selectedAttributes);
      setAllowedExtension(validation?.allowedExtension)
    }
  }, [stateData, setValue]);

  useEffect(() => {
    setAllowedExtension(['pdf']);
  }, [])

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
          label="Max File Size"
          name="max"
          min="0"
          defaultValue={validation?.max}
          type={"number"}
          {...register("max")}
          placeholder="Max File Size"

        />

        <MultiKeywordInputComponent
          disabled
          title="Allowed Extension"
          allowedExtension={allowedExtension}
          setAllowedExtension={setAllowedExtension}
        />

      </CollapseComponent>
    </div>
  );
};

export default FileAttributes;
