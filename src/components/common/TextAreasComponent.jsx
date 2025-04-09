import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const TextAreasComponent = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  ckeditor,
  width,
  ...props
}) => {
  const widths = width ? width : 50;

  // Wrapper function for CKEditor to simulate a normal event object
  const handleCkEditorChange = (_, editor) => {
    const data = editor.getData();
    onChange({ target: { name, value: data } }); // Mimic normal event
  };

  return (
    <div className="space-y-2">
      <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161]">
        {label}
      </label>

      {ckeditor ? (
        <div className={`editor-container pb-[2px] w-[${widths}%]`}>
          <CKEditor
            editor={ClassicEditor}
            data={value || ""}
            onChange={handleCkEditorChange} // Use the wrapper function
            {...props}
            className={`w-[${widths}%] border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F5F8F8]`}
          />
        </div>
      ) : (
        <textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={(e) => onChange(e)} // Ensure event format consistency
          placeholder={placeholder}
          {...props}
          className={`w-[${widths}%] border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F5F8F8]`}
        />
      )}
    </div>
  );
};

export default React.memo(TextAreasComponent);
