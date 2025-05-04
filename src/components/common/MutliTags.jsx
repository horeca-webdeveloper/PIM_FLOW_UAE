import { useState, useRef, useEffect } from "react";

export default function MutliTags({
  label = "Tags",
  placeholder = "Type and press Enter",
  defaultTags = [],
  onChange = () => {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
  const initialized = useRef(false);

  // Initialize tags from defaultTags prop
  useEffect(() => {
    if (!initialized.current && defaultTags?.length > 0) {
      setTags(defaultTags);
      onChange(defaultTags);
      initialized.current = true;
    }
  }, [defaultTags, onChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue.trim());
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && tags?.length > 0) {
      const newTags = tags?.slice(0, -1);
      setTags(newTags);
      onChange(newTags);
    }
  };

  const addTag = (tag) => {
    if (!tags?.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onChange(newTags);
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags?.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange(newTags);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded "
        onClick={handleContainerClick}
      >
        {tags &&
          tags?.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
            >
              <span>{tag}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                className="ml-1 focus:outline-none text-[red] hover:text-gray-900"
                aria-label={`Remove ${tag}`}
              >
                x
              </button>
            </div>
          ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow outline-none min-w-20 bg-transparent"
          placeholder={tags.length === 0 ? placeholder : ""}
        />
      </div>
    </div>
  );
}
