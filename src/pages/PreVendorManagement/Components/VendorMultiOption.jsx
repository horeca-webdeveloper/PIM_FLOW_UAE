import React, { useState, useRef, useEffect } from "react";

const VendorMultiOption = ({
  label,
  name,
  options = [],
  onChange,
  value = [],
  className = "",
  ...props
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Sync with parent value
  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  // Handle selection toggle
  const handleChange = (option) => {
    const val = option.value;
    let next = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];

    setSelectedValues(next);
    onChange(next);
  };

  // Filter options based on search query
  const filtered = options.filter((opt) =>
    opt?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  ).sort((a, b) => {
    const query = searchQuery.toLowerCase();
    const aLabel = a.label.toLowerCase();
    const bLabel = b.label.toLowerCase();

    const aStartsWith = aLabel.startsWith(query);
    const bStartsWith = bLabel.startsWith(query);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return aLabel.localeCompare(bLabel); 
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-[-12px] w-full">
      {label && (
        <label className="block text-[#616161] mb-1 text-sm font-semibold">
          {label}
        </label>
      )}

      <div
        className="border rounded-md px-3 py-2 flex justify-between cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          // setIsOpen(!isOpen);
          setIsOpen((prev) => {
            const next = !prev;
            if (next) setSearchQuery(""); 
            return next;
          });
        }}
      >
        {selectedValues.length
          ? options
              .filter((o) => selectedValues.includes(o.value))
              .map((o) => o.label)
              .join(", ")
          : "Select options"}
        <span>&#9662;</span>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`mt-1 border bg-white rounded-md ${className}`}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
          </div>

          {searchQuery.trim() !== "" ? (
            filtered.length > 0 ? (
              filtered.map((opt) => (
                <label
                  key={opt.value || opt.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    name={name}
                    value={opt.value || opt.id}
                    checked={selectedValues.includes(opt.value || opt.id)}
                    onChange={() => handleChange(opt)}
                    className="w-4 h-4"
                    {...props}
                  />
                  {opt.label || opt.name}
                </label>
              ))
            ) : (
              <p className="p-2 text-gray-500 text-sm">No results found</p>
            )
          ) : (
            <p className="p-2 text-gray-400 text-sm italic">
              Start typing to search...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorMultiOption;
