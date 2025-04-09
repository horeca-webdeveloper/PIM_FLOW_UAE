import React, { useState } from "react";
import { urls } from "../../config/baseUrls";

const CommonMediaInput = ({
    showInput = true,
    fileName,
    altText,
    name,
    accept,
    singleSelect,
    image,
    sku,
    value,
    showName,
    onChange, // <-- From react-hook-form Controller
  }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
      const file = singleSelect ? files[0] : files;
  
      // Pass file(s) back to form state
      onChange(file); // <-- Very important!
  
      // For preview
      const filePreviews = files.map((file) => ({
        name: file.name,
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        type: file.type,
      }));
  
      setSelectedFiles(filePreviews);
    };
  
    return (
      <div className="border p-2 rounded">
        {selectedFiles.length === 0 ? (
          <label className="border-2 rounded p-6 text-center bg-[#F5F8F8] cursor-pointer h-[222px] flex flex-col items-center justify-center">
            {image ? (
              <img src={`${image}`} alt={altText} />
            ) : (
              <>
                <img src={`${urls.hostUrl}/icons/uploadImg.png`} alt="Upload Icon" />
                <span className="text-gray-600">Upload File Here</span>
              </>
            )}
            {showInput && (
              <input
                accept={accept || "image/*"}
                type="file"
                multiple={!singleSelect}
                className="hidden"
                onChange={handleFileUpload}
              />
            )}
          </label>
        ) : (
          <label className="border-2 rounded p-1 text-center cursor-pointer h-[222px] flex items-center justify-center">
            {selectedFiles[0].url ? (
              <img
                src={selectedFiles[0].url}
                alt={selectedFiles[0].name}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-sm text-gray-600">{selectedFiles[0].name}</span>
            )}
            {showInput && (
              <input
                accept={accept || "image/*"}
                type="file"
                multiple={!singleSelect}
                className="hidden"
                onChange={handleFileUpload}
              />
            )}
          </label>
        )}
  
        {showName && name && (
          <p className="text-[#616161] font-semibold pt-2">
            {sku && <span className="text-[12px]">SKU : {sku}<br /></span>}
            {name}
          </p>
        )}
  
        {altText && (
          <>
            <p className="text-[#616161] font-semibold pt-2">Alt Text</p>
            <input
              type="text"
              placeholder="Text Field"
              className="border p-1 w-full mt-2"
              // Optional: add another `Controller` for altText
            />
          </>
        )}
  
        {fileName && (
          <>
            <p className="text-[#616161] font-semibold pt-2">File Name</p>
            <input
              type="text"
              placeholder="Text Field"
              className="border p-1 w-full mt-2"
              // Optional: add another `Controller` for file name
            />
          </>
        )}
      </div>
    );
  };
  

export default CommonMediaInput;
