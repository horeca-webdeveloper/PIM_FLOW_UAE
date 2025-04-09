import React, { useEffect } from "react";
import MultiAttributesHeader from "../../../components/ui/Attributes/MultiAttributesHeader";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import MultiKeywordInputComponent from "../../../components/common/MultiKeywordInputComponent";
import SelectComponent from "../../../components/common/SelectComponent";
import CollapseComponent from "../../../components/common/CollapseComponent";
const ImageAttributes = ({ stateData,register, errors, setValue,allowedExtension,setAllowedExtension,attributeGroups }) => {
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
        setAllowedExtension(validation.allowedExtension)
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
          label="Max File Size"
          name="max"
          min="0"
          defaultValue={validation?.max}
          type={"number"}
          {...register("max")}
          placeholder="Max File Size"

        />

        <MultiKeywordInputComponent
           title="Allowed Extension"
           allowedExtension={allowedExtension}
           setAllowedExtension={setAllowedExtension}
        />
       
   </CollapseComponent>
    </div>
  );
};

export default ImageAttributes;
