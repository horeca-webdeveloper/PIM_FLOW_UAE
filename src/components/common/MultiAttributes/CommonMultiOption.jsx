import React, { useState, useRef, useEffect } from "react";

const CommonMultiOption = ({
  label,
  name,
  options = [],
  onChange,
  className = "",
  ...props
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (option) => {
    let newSelectedValues = [...selectedValues];

    if (newSelectedValues.includes(option.value)) {
      newSelectedValues = newSelectedValues.filter(
        (item) => item !== option.value
      );
    } else {
      newSelectedValues.push(option.value);
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Using capture phase to handle the event before it bubbles up
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e, option) => {
    e.stopPropagation();
    handleChange(option);
  };

  return (
    <div className="mt-[-12px] w-full" ref={dropdownRef}>
      {label && (
        <label className="block sm:font-semibold sm:text-[14px] text-[#616161] mb-1">
          {label}
        </label>
      )}

      <div
        className="border rounded-md px-3 py-2 text-[#26683A] text-[14px] flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
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
                onChange={(e) => handleOptionClick(e, option)}
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

export default CommonMultiOption;
