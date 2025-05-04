import React, { useState, useRef } from "react";

const FILTER_OPTIONS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "contact_person", label: "Contact Person" },
  { id: "mobile_number", label: "Mobile Number" },
  { id: "landline_number", label: "Landline Number" },
  { id: "website_link", label: "Website Link" },
  { id: "type", label: "Type" },
  { id: "business_licence_number", label: "Business Licence Number" },
];

const TagInputDropdown = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const addTag = (option) => {
    if (!selectedTags.find((tag) => tag.id === option.id)) {
      setSelectedTags([...selectedTags, option]);
      setInputValue("");
      inputRef.current.focus();
    }
  };

  const removeTag = (id) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && inputValue === "") {
      setSelectedTags((prev) => prev.slice(0, -1));
    }
  };

  const filteredOptions = FILTER_OPTIONS.filter(
    (opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.some((tag) => tag.id === opt.id)
  );

  return (
    <div className="relative w-[500px] border border-gray-300 rounded-md px-2 py-1 flex flex-wrap items-center gap-1 min-h-[44px]">
      {selectedTags.map((tag) => (
        <div
          key={tag.id}
          className="flex items-center bg-gray-200 text-sm rounded-full px-2 py-1"
        >
          {tag.label}
          <span
            className="ml-2 text-red-500 cursor-pointer"
            onClick={() => removeTag(tag.id)}
          >
            ×
          </span>
        </div>
      ))}

      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[150px] outline-none text-sm"
        placeholder="Select filters..."
      />

      {true && (
        <div className="absolute top-full left-0 w-full bg-white border rounded shadow z-10 mt-1 max-h-60 overflow-y-auto">
          {FILTER_OPTIONS.map((option) => (
            <div
              key={option.id}
              onClick={() => addTag(option)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInputDropdown;
