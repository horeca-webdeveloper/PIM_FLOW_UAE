import React from "react";

const CommonTrueFalse = ({ label, name, value, onChange, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 px-0 pb-2 w-[100%] ${className}`}>
      {label && (
        <label className="text-[16px] text-[#616161] font-semibold">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value ? "Yes" : "No"} // Convert boolean to string
        onChange={onChange}
        className="border border-[#A8A4A4]  rounded-md px-3 py-2 h-[42px] text-[#616161] focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  );
};

export default CommonTrueFalse;
