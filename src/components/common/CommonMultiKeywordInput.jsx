import React from "react";

const CommonMultiKeywordInput = ({
  title,
  secondaryKeywords,
  setSecondaryKeywords,
  fieldName,
  label = "",
  ...props
}) => {


  const addKeyword = () => {
    setSecondaryKeywords((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), { value: "" }],
    }));
  };

  const removeKeyword = (index) => {
    setSecondaryKeywords((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }));
  };

  const updateKeyword = (index, newValue) => {
    setSecondaryKeywords((prev) => ({
      ...prev,
      [fieldName]: (prev[fieldName] || []).map((item, i) =>
        i === index ? { value: newValue } : item
      ),
    }));
  };

  return (
    <div className=" w-[100%]">
      <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
        {title || label}
      </label>
      <div className="flex flex-wrap items-center gap-2 border  p-2 rounded">
        {!!secondaryKeywords && secondaryKeywords.length > 0 && secondaryKeywords?.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-[#DEF9EC] text-[#26683A] px-2 py-[2px] rounded"
          >
            <input
              type="text"
              value={keyword.value}
              onChange={(e) => {
                updateKeyword(index, e.target.value);
              }}
              className="border-none bg-transparent outline-none w-24"
              {...props}
            />
            <button
              onClick={() => removeKeyword(index)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
        <button onClick={() => addKeyword()} className="text-green-600 font-semibold">
          +
        </button>
      </div>
    </div>
  );
};

export default CommonMultiKeywordInput;
