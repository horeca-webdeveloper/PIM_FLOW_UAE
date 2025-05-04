import React, { useState, useRef, useEffect } from "react";

const CommonMultiWebsites = ({
  label,
  name,
  options = [],
  onChange,
  value = [], // <-- receive the controller’s value
  className = "",
  ...props
}) => {
  const [selectedValues, setSelectedValues] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // **Sync local state whenever the form value changes**
  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  const handleChange = (option) => {
    const val = option.value;
    let newSelected = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];

    setSelectedValues(newSelected);
    onChange(newSelected);
  };

  // ... rest of your dropdown / click‐outside logic

  return (
    <div className="mt-[-12px] w-full" ref={dropdownRef}>
      {label && (
        <label className="block sm:font-semibold sm:text-[14px] text-[#616161] mb-1">
          {label}
        </label>
      )}
      <div
        className="border rounded-md px-3 py-2 text-[#26683A] text-[14px] flex justify-between items-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((o) => !o);
        }}
      >
        {selectedValues.length > 0
          ? options
              .filter((opt) => selectedValues.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")
          : "Select options"}
        <span className="ml-2">&#9662;</span>
      </div>
      {isOpen && (
        <div
          className={`top-full mt-1 left-0 w-full border bg-white rounded-md ${className}`}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className="flex text-[14px] items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleChange(option)}
                className="w-4 h-4"
                {...props}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommonMultiWebsites;
