import React from "react";

const MultiKeywordInputComponent = ({
  title,
  allowedExtension,
  setAllowedExtension,
  label = "",
  ...props
}) => {

  const addKeyword = () => {
    setAllowedExtension((prev) => [...(Array.isArray(prev) ? prev : []), ""]);
  };

  const removeKeyword = (index) => {
    setAllowedExtension((prev) => (Array.isArray(prev) ? prev.filter((_, i) => i !== index) : []));
  };

  const updateKeyword = (index, newValue) => {
    setAllowedExtension((prev) =>
      Array.isArray(prev) ? prev.map((item, i) => (i === index ? newValue : item)) : []
    );
  };

  return (
    <div className="w-[50%]">
      <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
        {title ? title : "Secondary Keyword"}
      </label>
      <div className="flex flex-wrap items-center gap-2 border p-2 rounded">
        {!!allowedExtension?.length &&
          allowedExtension.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-[#DEF9EC] text-[#26683A] px-2 py-[2px] rounded"
            >
              <input
                type="text"
                value={keyword}
                onChange={(e) => updateKeyword(index, e.target.value)}
                className="border-none bg-transparent outline-none w-24"
                {...props}
              />
              {!props.disabled ? <span
                onClick={() => removeKeyword(index)}
                className="text-red-500 font-bold cursor-pointer"
              >
                ×
              </span> : ''}

            </div>
          ))}
        {!props.disabled ? <span
          onClick={addKeyword}
          className="text-green-600 font-semibold cursor-pointer"
        >
          +
        </span> : ''}

      </div>
    </div>
  );
};

export default MultiKeywordInputComponent;
