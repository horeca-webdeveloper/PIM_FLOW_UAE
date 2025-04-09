import React from "react";

const CommonOption = ({
  label,
  name,
  value,
  options = [],
  onChange,
  className = "",
  defaultValue,
  ...props
}) => {
  // Ensure `options` is always an array
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className="flex flex-col gap-1 px-0 pb-2 w-[100%]">
      {label && (
        <label className="text-[16px] text-[#616161] font-semibold">
          {label}
        </label>
      )}
      <select
        name={name}
        {...props}
        value={value}
        onChange={(e) => onChange(e)}
        className={`border border-[#A8A4A4] rounded-[4px] px-3 py-2 h-[42px] text-[#616161] ${className}`}
      >
        {/* <option value="">Select an option</option> */}
        {safeOptions.map((option, index) => {
          const optionValue =
            option?.value ||
            option?.name ||
            option?.enabled ||
            option?.status ||
            option?.rate ||
            option?.title ||
            option?.symbol ||
            option?.unit;

          return (
            <option key={index} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CommonOption;
