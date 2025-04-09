import React, { useState, useEffect } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import MultiSelectComponent from "../../../common/MultiSelectComponent";
import SelectComponent from "../../../common/SelectComponent";
import TextAreasComponent from "../../../common/TextAreasComponent";
import MultiSelectForProduct from "../../../common/MultiSelectForProduct";
import { IoToggle } from "react-icons/io5";
import CommonMediaInput from "../../../common/CommonMediaInput";
const AttributesGroupsComp = ({ title, datas, setAttributeData, attributeData }) => {

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (datas?.length) {
      const initialAttributes = datas.reduce((acc, item) => {
        acc[item.id] = item.currentValue || "";
        return acc;
      }, {});

      setAttributeData((prev) => ({
        ...prev,
        attributes: { ...prev.attributes, ...initialAttributes },
      }));
    }
  }, [datas, setAttributeData]);

  // Handle input changes
  const handleChange = (e, id, type) => {
    console.log("id", id);
    let value;
    if (e.target) {
      value = e.target.value;
    } // Ensure event exists

    if (type === "multiselect") {
      value = e;
    }

    if (type === "file" || type === "image" || type === "videos") {
      value = e.target.files?.[0] || null; // Get first file or null
    }


    setAttributeData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [id]: value, // Store value correctly
      },
    }));
  };

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797] bg-[#F9F9FB] px-4 justify-between items-center ${show ? "mb-4" : "mb-0"}`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">{title}</h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">6 missing required attribute</span>
          <button className="ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {show && (
        <>
          {datas?.map((item) => (
            <div key={item.id} className="flex items-center px-4 mt-[10px] mb-[20px] gap-4">
              <div className="w-full">
{console.log("item",item.name)}
{console.log("item",item)}
                {item.type === "multiselect" ? (
                  <MultiSelectForProduct
                    label={item.name}
                    required={item?.validations?.required === 1}
                    min={item?.validations?.min}
                    name={item.name}
                    width="100%"
                    value={attributeData?.attributes?.[item.id] || ""} // Ensure it's a string
                    option={
                      item?.validations?.allowedExtension?.map((value) => ({
                        id: value,
                        name: value,
                      })) || []
                    }
                    onChange={(selectedValues) => handleChange(selectedValues, item.id, "multiselect")}
                  />

                ) : item.type === "select" || item.type === "dropdown" ? (
                  <SelectComponent
                    label={item.name}
                    required={item?.validations?.required === 1}
                    min={item?.validations?.min}
                    name={item.name}
                    width="full"
                    value={attributeData?.attributes?.[item.id] || ""}
                    option={
                      item?.validations?.allowedExtension?.map((value) => ({
                        id: value,
                        name: value,
                      })) || []
                    }
                    onChange={(e) => handleChange(e, item.id, "select")}
                  />
                ) : item.type == "yesno" || item.type === "toggle" ?
                  (
                    <>
                      <label className="relative inline-flex items-center cursor-pointer mb-3 capitalize">{item.name}</label>
                      <div>

                        <label className="relative inline-flex items-center cursor-pointer">


                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={attributeData?.attributes?.[item.id] === "Active"}
                            onChange={() =>
                              setAttributeData((prev) => {
                                const newValue = prev.attributes[item.id] === "Active" ? "Inactive" : "Active";
                                return {
                                  ...prev,
                                  attributes: { ...prev.attributes, [item.id]: newValue },
                                };
                              })
                            }
                          />
                          <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-all relative">
                            {/* Toggle Knob */}
                            <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all ${attributeData?.attributes?.[item.id] === "Active" ? "translate-x-7" : ""}`}></div>
                          </div>
                          <span className="ml-2 text-gray-700">{attributeData?.attributes?.[item.id] || "Inactive"}</span>
                        </label>
                      </div>
                    </>
                  )

                  : (
                    <>
                      {item?.validations?.editor === 1 ? <TextAreasComponent
                        label={item.name}
                        type="text"
                        width={100}
                        ckeditor={true}
                        name={item.name}
                        placeholder={item.name}
                        required={item?.validations?.required === 1}
                        onChange={(e) => handleChange(e, item.id, item.type)}
                        value={attributeData?.attributes?.[item.id] || ""}
                      /> : item.type === "file" || item.type === "videos" || item.type === "image" ? <>
                        <label className="relative inline-flex items-center cursor-pointer mb-3 capitalize">{item.name}</label>
                        <div className="grid grid-cols-4 gap-3">
                          <CommonMediaInput singleSelect={true} accept={ item?.validations?.allowedExtension?.map(ext => `.${ext}`).join(',')} />
                        </div>
                      </> :

                        <CommonInput
                          label={item.name}
                          name={item.name}
                          min={item?.validations?.min}
                          max={item?.validations?.max}
                          required={item?.validations?.required === 1}
                          value={attributeData?.attributes?.[item.id] || ""}
                          step="any"
                          pattern={
                            item?.validations?.negative === 0 ? "^[0-9]*\.?[0-9]+$" : "^-?[0-9]*\.?[0-9]+$"
                          }
                          onChange={(e) => handleChange(e, item.id, item.type)}
                          type={(item.type === "measurement" || item.type === "price") ? "number" : (item.type === 'image' || item.type === 'videos') ? "file" : item.type}
                        />}
                    </>

                  )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AttributesGroupsComp;
