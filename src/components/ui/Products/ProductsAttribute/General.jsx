import React, { useState } from "react";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import CommonOption from "../../../common/MultiAttributes/CommonOption";

const General = ({ general, setGeneralData }) => {
  const [show, setShow] = useState(true);

  const formatTextWithParagraphs = (text, limit = 150) => {
    if (!text) return "";

    // Break text into chunks of `limit` characters
    const paragraphs = text.match(new RegExp(`.{1,${limit}}`, "g")) || [];

    // Wrap each chunk in a <p> tag and join them together
    return paragraphs.map((p) => `<p>${p}</p>`).join(""); // Returns a string of HTML paragraphs
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Remove `e`, `E`, `+`, and `-` from the input value
    // Handle different input types
    let sanitizedValue;
    if (type == "number") {
      // Remove non-numeric characters except decimal point
      sanitizedValue = value.replace(/[eE+-]/g, "");
      // Convert to number or 0 if empty
      sanitizedValue = sanitizedValue === "" ? "" : Number(sanitizedValue);
    } else if (type === "checkbox") {
      sanitizedValue = e.target.checked;
    } else {
      sanitizedValue = value;
    }

    setGeneralData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  return (
    <EditorProvider>
      <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
        <div
          onClick={() => setShow(!show)}
          className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797]  bg-[#F9F9FB] px-4 justify-between items-center ${
            show ? "mb-4" : "mb-0"
          }`}
        >
          <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
            General Attributes
          </h2>
          <div className="text-sm text-red-500">
            <span className="mr-1 cursor-pointer">
              4 missing required attribute
            </span>
            <button className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {show && (
          <form className="space-y-4 p-4">
            <div className="flex gap-4 w-[100%]">
              <CommonInput
                label="Barcode"
                name="barcode"
                value={general?.barcode}
                onChange={handleChange}
              />
              <CommonInput
                label="SKU"
                name="sku"
                value={general?.sku}
                disabled={true}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 w-[100%]">
              <CommonOption
                label="Refund"
                name="refundValue"
                value={general?.refundValue || ""}
                options={general?.refund || []}
                onChange={handleChange} // Custom onChange
              />

              <CommonOption
                label="Warranty Information"
                name="warranty_information"
                value={general?.warranty_information || ""}
                options={general?.warranty_info || []}
                onChange={handleChange} // Custom onChange
              />

              {/* <CommonOption
                label="Status"
                name="status_value"
                value={general?.status_value || ""}
                options={general?.status || []}
                onChange={handleChange} // Custom onChange
              /> */}
            </div>

            {/* WYSIWYG Editor with Formatting Options */}
            {/* <label className="block text-gray-700">Warranty Info</label>
            <Editor
              value={general?.warranty_information || ""}
              onChange={(e) =>
                setGeneralData((prev) => ({
                  ...prev,
                  warranty_information: formatTextWithParagraphs(
                    e.target.value
                  ), // Apply paragraph formatting
                }))
              }
              toolbar={[
                "bold",
                "italic",
                "underline",
                "strike",
                "orderedList",
                "unorderedList",
                "link",
                "image",
                "undo",
                "redo",
              ]}
            /> */}
          </form>
        )}
      </div>
    </EditorProvider>
  );
};

export default General;
