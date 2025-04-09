import React from "react";

const CommonInput = ({
  label,
  name,
  value,
  min,
  max,
  onChange,
  type = "text",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 px-0 pb-2 w-[100%] ${className}`}>
      {label && (
        <label className="text-[16px] text-[#616161] font-semibold capitalize">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        min={min || null}
        max={max || null}
        placeholder={label}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
        {...props}
        className={`border border-[#A8A4A4] rounded-[4px] px-3 py-2 text-[#616161] focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};

export default CommonInput;
