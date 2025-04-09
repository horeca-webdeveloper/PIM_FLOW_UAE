import React, { useState } from "react";
import CommonMultiKeywordInput from "../common/CommonMultiKeywordInput";
import CommonMediaInput from "./CommonMediaInput";
import TextAreasComponent from "./TextAreasComponent";
const SeoComponent = ({ SEO }) => {
  const [show, setShow] = useState(true);
  const [volumes, setVolumes] = useState([{ id: 1 }]);

  const [secondaryKeywords, setSecondaryKeywords] = useState([
    "Keyword One",
    "Keyword Two",
  ]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };
  const handleAddVolume = () => {
    setVolumes([...volumes, { id: volumes.length + 1 }]);
  };
  return (
    <div className="grid grid-cols-2 p-4 gap-4 w-[60%]">
      <div>
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Primary Keyword
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field"
        />
      </div>

      <div>
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Monthly Search Volume
        </label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Numeric"
        />
      </div>



      {/* <CommonMultiKeywordInput
        secondaryKeywords={secondaryKeywords}
        setSecondaryKeywords={setSecondaryKeywords}
      /> */}

      <div>
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Secondary Keyword
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field"
        />
      </div>

      <div className="relative flex items-center">
        <div className="w-full">
          <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
            Monthly Search Volume
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Numeric"
          />
        </div>
        <button
          onClick={handleAddVolume}
          className="ml-2 mt-7  p-2 h-[40px] w-[40px] bg-[#F9F9FB] text-black border border-[#A8A4A4] rounded-md"
        >
          +
        </button>
      </div>





      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          URL Slug
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Title Tag
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Meta Title
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field (Limit 60)"
        />

        <label className="block text-sm font-medium pt-4">
          Meta Description
        </label>
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Text Field (Limit 200)"
        ></textarea>
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          OG Title
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field (Limit 60)"
        />
        <label className="block text-sm font-medium pt-4">OG Description</label>
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Text Field (Limit 160)"
        ></textarea>

        <label>
          OG Image (Webp format supported (max 10MB, must be 1200*630 px)
        </label>
        <CommonMediaInput />
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Alt Text
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field "
        />

        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Image File Name
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field "
        />
      </div>

      <div className="col-span-2">
        <div className="flex">
          <div className="space-y-2 w-full">
            <label
              htmlFor="material"
              className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
            >
              Schema Rating
            </label>
            <select
              type="text"
              id="material"
              name="material"
              onChange={handleInputChange}
              className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select (4 to 5)</option>
            </select>
          </div>
          <div className="space-y-2 w-full ml-[10px]">
            <label
              htmlFor="certifications"
              className="block text-[16px] font-medium leading-[21.82px] text-[#616161]"
            >
              Schema Reviews Count
            </label>
            <select
              type="text"
              id="certifications"
              name="certifications"
              onChange={handleInputChange}
              className="w-[100%] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Single Select (1 to 100)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Schema Services
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Text Field"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Internal Links
        </label>
        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="URL"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Indexing
        </label>
        <select
          type="url"
          className="w-full border p-2 rounded"
          placeholder="URL"
        >
          <option value="">Single Select</option>
        </select>
      </div>
      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          First Heading
        </label>
        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="Text Field (60 Character Limit)"
        />
      </div>

      <div className="col-span-2">
        <TextAreasComponent
          label="Heading Description"
          type="text"
          width={100}
          ckeditor={true}
          name="description"
          placeholder="Text Field (Min 500 Max 1500 Characters)"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Second Heading
        </label>
        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="Text Field (60 Character Limit)"
        />
      </div>

      <div className="col-span-2">
        <TextAreasComponent
          label="Heading Description"
          type="text"
          width={100}
          ckeditor={true}
          name="description"
          placeholder="Text Field (Min 500 Max 1500 Characters)"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium leading-[21.82px] text-[#616161] mb-[10px]">
          Third Heading
        </label>
        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="Text Field (60 Character Limit)"
        />
      </div>

      <div className="col-span-2">
        <TextAreasComponent
          label="Heading Description"
          type="text"
          width={100}
          ckeditor={true}
          name="description"
          placeholder="Text Field (Min 500 Max 1500 Characters)"
        />

        <CommonMultiKeywordInput
          title="Popular Tags"
          secondaryKeywords={secondaryKeywords}
          setSecondaryKeywords={setSecondaryKeywords}
        />
      </div>
    </div>
  );
};

export default SeoComponent;
