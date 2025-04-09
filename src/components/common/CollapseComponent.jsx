import { useState } from "react";

const CollapseComponent = ({ title, children, label, errors }) => {
  
  const [isOpen, setIsOpen] = useState(true); // Default: Open

  return (
    <div className="mt-5  bg-white border-2 border-[#DFDFDF] rounded-lg">
      {/* Header (Click to Expand/Collapse) */}
      <div
        className="flex rounded-t-md py-[5px] border-b-2 border-b-[#DFDFDF] bg-[#F9F9FB] px-4 justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          {title}
        </h2>

        {/* Right-side status & toggle icon */}
        <div className="flex items-center text-sm text-[red]">
          {errors && (
            <span className="flex items-center mr-1 gap-1">
              {Object.keys(errors).length > 0 && (
                <>
                  <div className="w-1 h-1 bg-[#26683A] rounded-full mr-2"></div>
                  <span >{`${Object.keys(errors).length} missing required attributes`}</span>
                </>
              )}
            </span>
          )}



          {/* Toggle Arrow Icon */}
          <div
            className="ml-1 p-2 rounded-md border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transform transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
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
              className={`${isOpen ? "rotate-180" : "rotate-0"}`}
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-[max-height]  duration-300 ease-in-out  ${isOpen ? "h-auto" : "max-h-0 overflow-hidden"
          }`}
      >
        <div className="p-4">
          {children} {/* Renders whatever is passed inside */}
        </div>
      </div>
    </div>
  );
};

export default CollapseComponent;
