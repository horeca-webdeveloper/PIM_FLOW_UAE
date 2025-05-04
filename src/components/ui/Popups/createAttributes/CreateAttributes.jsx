import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import text from "../../../../assets/createAttributesIcon/text.png";
import singleSelect from "../../../../assets/createAttributesIcon/singleSelect.png";
import image from "../../../../assets/createAttributesIcon/image.png";
import multiSelect from "../../../../assets/createAttributesIcon/multiSelect.png";
import price from "../../../../assets/createAttributesIcon/price.png";
import measurement from "../../../../assets/createAttributesIcon/measurement.png";
import yesno from "../../../../assets/createAttributesIcon/yesno.png";
import Date from "../../../../assets/createAttributesIcon/Date.png";
import file from "../../../../assets/createAttributesIcon/file.png";
import video from "../../../../assets/createAttributesIcon/video.png";
import table from "../../../../assets/createAttributesIcon/table.png";
import { utilsFn } from "../../../../utils/functions";
import { Apis } from '../../../../services/apis/Attributes/Api';
import Loader from "../../../../utils/Loader";
import InputComponent from '../../../common/InputComponent';
const attributeTypes = [
  { id: "text", name: "Text Area", icon: text },
  { id: "number", name: "Number", icon: table },
  { id: "select", name: "Single Select", icon: singleSelect },
  { id: "multiselect", name: "Multi Select", icon: multiSelect },
  { id: "price", name: "Price", icon: price },
  { id: "measurement", name: "Measurement", icon: measurement },
  { id: "toggle", name: "Toggle", icon: yesno },
  { id: "date", name: "Date", icon: Date },
  { id: "file", name: "File", icon: file },
  { id: "image", name: "Image", icon: image },
  { id: "video", name: "Video", icon: video },
  { id: "table", name: "Table", icon: table },
];

const CreateAttributes = ({ isOpen, onClose, loader, setLoader, setResponse, updateDatas, setType }) => {
 
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { type: "", name: "", code: "" },
  });

  const attributeName = watch("name", "");
  const selectedType = watch("type", "");

  useEffect(() => {
    setType(selectedType);
  }, [selectedType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }
  
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);
  
  useEffect(() => {
    if (attributeName) {
      const formattedCode = utilsFn.formatAttributeName(attributeName);
      setValue("code", formattedCode);
    }
  }, [attributeName, setValue]);
  useEffect(() => {
    if (updateDatas) {
    
      reset({
        type: updateDatas.type || "",
        name: updateDatas.name || "",
        code: updateDatas.code || "",
        attribute_group_id:updateDatas.attribute_groups?.[0]?.id || "",

      });
    } else {
      reset({ type: "", name: "", code: "" });
    }
  }, [updateDatas, reset]);

  if (!isOpen) return null; // ✅ Moved AFTER useEffect

  const onSubmit = (data) => {

    if (updateDatas) {
      data.id = updateDatas.id;
      data.is_required = updateDatas.is_required;
      data.validations = updateDatas.validations;
      Apis.handleUpdate(data, setLoader, setResponse);
      // reset();
    } else {
      Apis.handleCreate(data, setLoader, setResponse);
      // reset();

    }
    //  onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-10">
      <div className="bg-white rounded-lg max-w-full  mx-4 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Create Attribute</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Attribute Name (Required)
              </label>
              <InputComponent width="full" bgTransparent={true} name="name" {...register("name", { required: "Name is required" })} type="text" placeholder="Enter attribute name" />

              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Code (Required)
              </label>
              <InputComponent width="full" name="code" {...register("code")} type="text" readOnly />
              {errors.code && <p className="text-red-500 ">{errors.code.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Choose the attribute type (Required)

                <input
                  type="hidden"
                  {...register("type", { required: "Choose  attribute type required" })}
                />

                {errors.type && (
                  <p className="text-red-500  mb-2">
                    {errors.type.message}
                  </p>
                )}

              </label>

              <div className="sm:h-[200px] sm:overflow-y-auto 2xl:h-full ">

                <div className="grid grid-cols-4 gap-2">
                  {attributeTypes.slice(0, 4).map((type, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-center border rounded-md  w-[120px] h-[120px] p-2 cursor-pointer ${selectedType === type.id
                        ? "border-green-500"
                        : "border-gray-200"
                        }`}
                      onClick={() => setValue("type", type.id)}
                    >

                      <div className="flex items-center justify-center relative">
                        <div className="absolute top-1 left-1">
                          <div
                            className={`relative top-[-15px] ml-[60px] w-[15px] h-[15px] rounded-full border ${selectedType === type.id
                              ? "border-[#26683A] bg-[#26683A]"
                              : "border-gray-300"
                              }`}
                          >
                            {selectedType === type.id && (
                              <div className="w-2 h-2 bg-[#26683A] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <img src={type.icon} />
                          <p className="text-center text-[16px] text-[#303030] leading-[16px] font-normal mt-[5px]">
                            {type.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {attributeTypes.slice(4, 8).map((type) => (
                    <div
                      key={type.id}
                      className={`flex items-center justify-center border rounded-md  w-[120px] h-[120px] p-2 cursor-pointer ${selectedType === type.id
                        ? "border-green-500"
                        : "border-gray-200"
                        }`}
                      onClick={() => setValue("type", type.id)}
                    >
                      <div className="flex items-center justify-center relative">
                        <div className="absolute top-1 left-1">
                          <div
                            className={`relative top-[-15px] ml-[60px] w-[15px] h-[15px] rounded-full border ${selectedType === type.id
                              ? "border-[#26683A] bg-[#26683A]"
                              : "border-gray-300"
                              }`}
                          >
                            {selectedType === type.id && (
                              <div className="w-2 h-2 bg-[#26683A] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <img src={type.icon} />
                          <p className="text-center text-[16px] text-[#303030] leading-[16px] font-normal mt-[5px]">
                            {type.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-2 mt-2">
                  {attributeTypes.slice(8, 12).map((type) => (
                    <div
                      key={type.id}
                      className={`flex items-center justify-center border rounded-md  w-[120px] h-[120px] p-2 cursor-pointer ${selectedType === type.id
                        ? "border-green-500"
                        : "border-gray-200"
                        }`}
                      onClick={() => setValue("type", type.id)}
                    >
                      <div className="flex items-center justify-center relative">
                        <div className="absolute top-1 left-1">
                          <div
                            className={`relative top-[-15px] ml-[60px] w-[15px] h-[15px] rounded-full border ${selectedType === type.id
                              ? "border-[#26683A] bg-[#26683A]"
                              : "border-gray-300"
                              }`}
                          >
                            {selectedType === type.id && (
                              <div className="w-2 h-2 bg-[#26683A] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <div>
                            <img src={type.icon} />
                          </div>
                          <p className="text-center text-[16px] text-[#303030] leading-[16px] font-normal mt-[5px]">
                            {type.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex p-[20px] ">
            <button
              onClick={onClose}
              className="flex-1 border border-[#A8A4A4] mr-[10px] cursor-pointer rounded bg-[#F1EFEF] py-3 text-[#303030] text-[18px] font-medium border-r"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              // onClick={() =>
              //   navigate("/MutliAttributes", {
              //     state: { type: selectedType },
              //   })
              // }
              className="flex-1 py-3 text-white font-medium rounded cursor-pointer text-white bg-[#26683A] text-[18px] hover:bg-green-700 "
            // disabled={!selectedType}
            >
              {loader ? <Loader /> : `${updateDatas ? 'Update' : 'Create'}`}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default CreateAttributes;
