import React, { useState, useRef, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function MultiSelectComponentDanish({
  label,
  options,
  values,
  onChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const dropdownRef = useRef(null); // Ref for detecting outside clicks

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedItems(values);
  }, [values]);

  const filteredOptions = options.filter(
    (option) =>
      !selectedItems.includes(option.name) &&
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item) => {
    console.log(item);
    if (selectedItems.length < 3) {
      const newSelectedItems = [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      setSearchTerm("");
      setIsOpen(false);
      onChange(newSelectedItems);
    }
  };

  const handleRemove = (id) => {
    console.log(id);
    console.log(selectedItems);
    const newSelectedItems = selectedItems.filter((item) => item?.id !== id);
    console.log(newSelectedItems);
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-[16px] mb-[10px] text-[#616161] font-semibold capitalize">
        {label}
      </label>

      {/* Selected Items */}
      <div
        className="flex flex-wrap gap-2 border border-[#A8A4A4] mt-[5px] p-2 border rounded-md min-h-[42px] cursor-text"
        onClick={() => setIsOpen(true)}
      >
        {selectedItems?.map((item) => (
          <div
            key={item}
            className="flex items-center bg-[#BCE3C9] text-[#186737] px-2 py-1 rounded-md"
          >
            <span className="mr-2 font-[12px]">{item?.name}</span>
            <IoCloseCircle
              className="w-5 h-5 cursor-pointer text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item?.id);
              }}
            />
          </div>
        ))}

        {/* Search Input */}
        {selectedItems.length < 3 && (
          <div className="flex-grow flex items-center">
            <input
              type="text"
              placeholder={selectedItems.length ? "" : "Select up to 3 SKU..."}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="flex-grow outline-none bg-transparent"
            />
          </div>
        )}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border rounded-md shadow-lg bg-white max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
