import React, { useState, useEffect } from "react";
import CommonMediaInput from "../../common/CommonMediaInput";
import { Controller } from "react-hook-form";

const CategoryMedia = ({ title, spanTags, fileName, altText, control,register, namePrefix }) => {
  
  return (
    <div className="bg-white mt-[-20px]">
      <p className="text-[#616161] font-semibold mb-[20px] mt-[30px]">{title}</p>
      <div className="border-2 rounded-lg border-dashed">
        <p className="mt-2 p-2 text-[#616161]">{spanTags}</p>
        <div className="mb-[10px] p-4">
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name={`${namePrefix}[${index}].file`}
                  render={({ field }) => (
                    <CommonMediaInput
                      {...field}
                      showInput={true}
                      altText={false}  // we’ll handle altText separately below
                    />
                  )}
                />

                {/* Alt Text Input */}
                <input
                  type="text"
                  placeholder="Alt Text"
                  {...register(`${namePrefix}[${index}].alt_text`)}
                  className="border p-1 w-full mt-2"
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryMedia;
