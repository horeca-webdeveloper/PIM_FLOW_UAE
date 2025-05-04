import React, { useState, useEffect } from "react";
import CommonMediaInput from "../../common/CommonMediaInput";
import { Controller } from "react-hook-form";

const CategoryMedia = ({ title, spanTags, fileName, altText, fileLength, control, register, namePrefix, selectedBanner, selectedAltText, selectedFileName, setValue,fileNameTitle,accept }) => {


  let colSpan;
  if (fileLength == 12) {
    colSpan = 4
  } else if (fileLength < 6) {
    colSpan = fileLength
  } else {
    colSpan = 3
  }
  useEffect(() => {
 
    if (!!selectedAltText && selectedAltText.length > 0) {
      selectedAltText.forEach((altText, index) => {
        if (altText) {
          setValue(`${namePrefix}[${index}].alt_text`, altText);
        }
      });
    }
    if (selectedFileName && selectedFileName.length > 0) {
      selectedFileName.forEach((fileName, index) => {
        if (fileName) {
          setValue(`${namePrefix}[${index}].file_name`, fileName);
        }
      });
    }
  }, [selectedAltText, selectedFileName, setValue, namePrefix]);
  return (
    <div className="bg-white mt-[-20px]">
      <p className="text-[#616161] font-semibold mb-[20px] mt-[30px]">{title}</p>
      <div className="border-2 rounded-lg border-dashed">
        <p className="mt-2 p-2 text-[#616161]">{spanTags}</p>
        <div className="mb-[10px] p-4">
          <div className={`grid grid-cols-${colSpan} gap-4`}>
            {Array.from({ length: fileLength || 3 }, (_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name={`${namePrefix}[${index}].file`}
                  render={({ field }) => (

                    <CommonMediaInput
                      selectedImage={selectedBanner && selectedBanner[index]}
                      {...field}
                      accept={accept?accept:"image/webp"}
                      showInput={true}
                      altText={false}  // we’ll handle altText separately below
                    />
                  )}
                />
               
                {selectedBanner && selectedBanner[index] ? 
                <Controller
                  control={control}
                  name={`${namePrefix}[${index}].previous_img`}
                  defaultValue={selectedBanner && selectedBanner[index] ? selectedBanner[index] : ""}
                  render={({ field }) => (
                    <input
                      type="hidden"
                      placeholder="previous image"
                      {...field}
                      className="border p-1 w-full mt-2"
                    />
                    
                  )}
                  
                />:''}
               
               
                {/* Alt Text Input */}
                {selectedAltText && selectedAltText[index]?.alt_text ? 
                <>
                <p className="text-[#616161] font-semibold pt-2 mb-[-10px]">Alt Text</p>
                <Controller
                  control={control}
                  name={`${namePrefix}[${index}].alt_text`}
                  defaultValue={selectedAltText && selectedAltText[index] ? selectedAltText[index].alt_text : ""}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Alt Text"
                      {...field}
                      className="border p-1 w-full mt-2"
                    />
                    
                  )}
                  
                /> </>: 
                <>
                <p className="text-[#616161] font-semibold pt-2 mb-[-10px]">Alt Text</p>
                <Controller
                  control={control}
                  name={`${namePrefix}[${index}].alt_text`}
                  defaultValue={selectedAltText && selectedAltText[index] ? selectedAltText[index] : ""}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Alt Text"
                      {...field}
                      className="border p-1 w-full mt-2"
                    />
                  )}
                />
                </>
                }

                
                {selectedFileName && selectedFileName[index]?.file_name ? 
               <>
                 <p className="text-[#616161] font-semibold pt-2 mb-[-10px]">{fileNameTitle?fileNameTitle:'File Name'}</p>
                <Controller
                  control={control}
                  name={`${namePrefix}[${index}].file_name`}
                  defaultValue={selectedFileName && selectedFileName[index] ? selectedFileName[index].file_name : ""}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="File Name"
                      {...field}
                      className="border p-1 w-full mt-2"
                    />
                  )}
                /> </>: 
                <>
          <p className="text-[#616161] font-semibold pt-2 mb-[-10px]">{fileNameTitle?fileNameTitle:'File Name'}</p>
                <Controller
                  control={control}
                  name={`${namePrefix}[${index}].file_name`}
                  defaultValue={selectedFileName && selectedFileName[index] ? selectedFileName[index] : ""}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="File Name"
                      {...field}
                      className="border p-1 w-full mt-2"
                    />
                  )}
                />
                </>
                
              
                }
                
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryMedia;
