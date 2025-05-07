import React, { useEffect, useState } from "react";
import CommonMultiKeywordInput from "../CommonMultiKeywordInput";
import SeoMediaInput from "./SeoMediaInput";
import axios from "axios";
import { baseUrls } from "../../../utils/apiWrapper";
import toast from "react-hot-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MutliTags from "../MutliTags";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SeoLayout = ({ manageSeoProduct, setManageSeoProduct }) => {
  const [keywordDetails, setKeywordDetails] = useState([
    {
      id: 1,
      monthly_search_volume: 0,
      primary_keyword_id: 1,
      secondary_keyword: "secondary-test",
    },
  ]);

  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const details = manageSeoProduct?.secondary_keyword_details;

    // If no keyword details, insert one empty input
    const initialKeywordDetails = details?.length
      ? details
      : [{ secondary_keyword: "", monthly_search_volume: 0 }];

    setKeywordDetails(initialKeywordDetails);

    setManageSeoProduct((prev) => ({
      ...prev,
      keywordDetails: initialKeywordDetails,
      secondary_keyword_details: initialKeywordDetails,
    }));

    setUploadedFile(manageSeoProduct?.og_image_url);
  }, [
    manageSeoProduct?.og_image_url,
    manageSeoProduct?.secondary_keyword_details,
  ]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let sanitizedValue;
    if (type === "number") {
      sanitizedValue = value.replace(/[eE+-]/g, "");
      sanitizedValue = sanitizedValue === "" ? "" : Number(sanitizedValue);
    } else if (type === "checkbox") {
      sanitizedValue = e.target.checked;
    } else {
      sanitizedValue = value;
    }

    setManageSeoProduct((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const popular_tags = ["tag1", "tag2", "tag3"];

  const handleTagsChange = (tags) => {
    setManageSeoProduct((prev) => ({
      ...prev,
      popular_tags: tags,
    }));
  };

  const handleFileChange = (file) => {
    setUploadedFile(file);
    setManageSeoProduct((prev) => ({
      ...prev,
      og_image_file: file, // or any other field name you prefer
    }));
  };

  const addField = () => {
    const updated = [
      ...keywordDetails,
      { secondary_keyword: "", monthly_search_volume: "" },
    ];
    setKeywordDetails(updated);
    setManageSeoProduct((prev) => ({
      ...prev,
      secondary_keyword_details: updated,
    }));
  };

  const removeField = (index) => {
    const updated = keywordDetails.filter((_, i) => i !== index);
    setKeywordDetails(updated);
    setManageSeoProduct((prev) => ({
      ...prev,
      secondary_keyword_details: updated,
    }));
  };

  const updateField = (index, field, value) => {
    const updated = keywordDetails.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setKeywordDetails(updated);

    setManageSeoProduct((prev) => ({
      ...prev,
      secondary_keyword_details: updated,
    }));
  };
  const title = "Secondary Keyword";

  return (
    <div className="p-[15px] w-full">
      <div>
        <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
          Primary Keyword
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Text Field"
          name="primary_keyword"
          value={manageSeoProduct?.primary_keyword}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-[16px] font-medium text-[#616161] mt-[10px] mb-[10px]">
          Monthly Search Volume
        </label>
        <input
          type="number"
          minLength={0}
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Numeric"
          name="monthly_search_volume"
          value={manageSeoProduct?.monthly_search_volume}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-4 col-span-2">
        {keywordDetails?.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-full">
              <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
                {title}
              </label>
              <input
                type="text"
                className="w-full border border-[#A8A4A4] p-2 rounded"
                placeholder="Secondary Keyword"
                value={item.secondary_keyword}
                onChange={(e) =>
                  updateField(index, "secondary_keyword", e.target.value)
                }
              />
            </div>
            <div className="w-full relative">
              <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
                Monthly Search Volume
              </label>
              <input
                type="number"
                minLength={0}
                className="w-full border border-[#A8A4A4] p-2 rounded"
                placeholder="Monthly Search Volume"
                value={item.monthly_search_volume}
                onChange={(e) =>
                  updateField(index, "monthly_search_volume", e.target.value)
                }
              />
            </div>

            <div className="flex items-end gap-1 mt-[30px]">
              <button
                onClick={addField}
                type="button"
                className="p-3 bg-[#26683A] text-white rounded hover:bg-[#1e5630]"
              >
                <AiOutlinePlus />
              </button>
              {index > 0 && (
                <button
                  onClick={() => removeField(index)}
                  type="button"
                  className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <AiOutlineMinus />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium text-[#616161] mt-[10px] mb-[10px]">
          URL Slug (Prefixed already : https://thehorecastore.co/collections/)
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="URL"
          name="url"
          value={manageSeoProduct?.url || ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium mt-[10px] text-[#616161] mb-[10px]">
          Title Tag
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Title Tag"
          name="title_tag"
          value={manageSeoProduct?.title_tag || ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] mt-[10px] font-medium text-[#616161] mb-[10px]">
          Meta Title
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Meta Title (70 Characters)"
          maxLength={"70"}
          name="meta_title"
          value={manageSeoProduct?.meta_title || ""}
          onChange={handleChange}
        />

        <label className="block text-[16px] font-medium text-[#616161] mb-[4px] mt-[10px]">
          Meta Description
        </label>
        <textarea
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Meta Description Limit (200 Characters)"
          maxLength={"200"}
          name="meta_description"
          value={manageSeoProduct?.meta_description || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
          OG Title
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Og Title Limit (60 Characters)"
          maxLength={"60"}
          name="og_title"
          value={manageSeoProduct?.og_title || ""}
          onChange={handleChange}
        />
        <label className="block text-[16px] font-medium text-[#616161] mb-[4px] mt-[10px]">
          OG Description
        </label>
        <textarea
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Og Description Limit (160 Characters)"
          name="og_description"
          maxLength={"160"}
          value={manageSeoProduct?.og_description || ""}
          onChange={handleChange}
        ></textarea>

        <div className="col-span-2">
          <label className="block text-[16px] font-medium text-[#616161] mb-[4px] mt-[4px]">
            Schema Rating
          </label>
          <select
            className="w-full border border-[#A8A4A4] p-2 rounded"
            name="schema_rating"
            placeholder="Select Index"
            value={manageSeoProduct?.schema_rating ?? ""}
            onChange={handleChange}
          >
            <option disabled value="">
              Select Rating
            </option>
            <option value={"4"}>4</option>
            <option value={"5"}>5</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-[16px] font-medium text-[#616161] mb-[4px] mt-[10px]">
            Schema Review Count
          </label>
          <select
            className="w-full border border-[#A8A4A4] p-2 rounded"
            name="schema_reviews_count"
            placeholder="Select Review Count"
            value={manageSeoProduct?.schema_reviews_count}
            onChange={handleChange}
          >
            <option disabled value="">
              Select Rating
            </option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
          </select>
        </div>

        <label className="block text-[16px] mt-[10px] font-medium text-[#616161] mb-[10px]">
          Og Image URL
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Og Image Url"
          name="og_image_url"
          value={manageSeoProduct?.og_image_url || ""}
          onChange={handleChange}
        />

        <label className="block pt-4">
          OG Image (Webp format supported (max 10MB, must be 1200×630 px))
        </label>
        <SeoMediaInput
          name="Product Image"
          accept="image/*"
          showInput={true}
          singleSelect={true}
          image={manageSeoProduct?.og_image_file}
          onChange={handleFileChange}
          value={uploadedFile}
          fileName={true}
          altText={true}
          showName={true}
        />

        <label className="block text-[16px] mt-[10px] font-medium text-[#616161] mb-[10px]">
          Alt Text
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Og Image Alt Text"
          name="og_image_alt_text"
          value={manageSeoProduct?.og_image_alt_text || ""}
          onChange={handleChange}
        />

        <label className="block text-[16px] mt-[10px] font-medium text-[#616161] mb-[10px]">
          Image File Name
        </label>
        <input
          type="text"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Og Name Image"
          name="og_image_name"
          value={manageSeoProduct?.og_image_name || ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
          Schema
        </label>
        <textarea
          rows={4}
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Schema Field"
          name={"schema"}
          value={manageSeoProduct?.schema || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
          Internal Links ( Separated by | )
        </label>
        <input
          type="url"
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Internal Links"
          name={"internal_links"}
          value={manageSeoProduct?.internal_links || ""}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-2">
        <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
          Tags ( Separated by | )
        </label>
        <input
          className="w-full border border-[#A8A4A4] p-2 rounded"
          placeholder="Tags"
          name={"tags"}
          value={manageSeoProduct?.tags || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="col-span-2">
          <label className="block text-[16px] font-medium text-[#616161] mb-[10px]">
            Indexing
          </label>
          <select
            className="w-full border border-[#A8A4A4] p-2 rounded"
            name="indexing"
            placeholder="Select Index"
            value={manageSeoProduct?.indexing ?? ""}
            onChange={handleChange}
          >
            <option disabled value="">
              Select Indexing
            </option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>
        {manageSeoProduct?.id !== "" && (
          <>
            <label className="block text-gray-700 mb-2 mt-[10px]">
              Paragraph 1
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={manageSeoProduct?.paragraph_1 || "<p></p>"}
              onChange={(event, editor) => {
                const data = editor.getData();
                setManageSeoProduct((prev) => ({
                  ...prev,
                  paragraph_1: data,
                }));
              }}
            />

            <label className="block text-gray-700 mb-2 mt-[10px]">
              Paragraph 2
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={manageSeoProduct?.paragraph_2 || "<p></p>"}
              onChange={(event, editor) => {
                const data = editor.getData();
                setManageSeoProduct((prev) => ({
                  ...prev,
                  paragraph_2: data,
                }));
              }}
            />

            <label className="block text-gray-700 mb-2 mt-[10px]">
              Paragraph 3
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={manageSeoProduct?.paragraph_3 || "<p></p>"}
              onChange={(event, editor) => {
                const data = editor.getData();
                setManageSeoProduct((prev) => ({
                  ...prev,
                  paragraph_3: data,
                }));
              }}
            />

            <label className="block text-gray-700 mb-2 mt-[10px]">
              Paragraph 4
            </label>
            <div className="ckeditor-wrapper">
              <CKEditor
                editor={ClassicEditor}
                data={manageSeoProduct?.paragraph_4 || "<p></p>"}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setManageSeoProduct((prev) => ({
                    ...prev,
                    paragraph_4: data,
                  }));
                }}
              />
            </div>

            <div className="mt-[20px]">
              <MutliTags
                label="Popular Tags"
                placeholder="Add Popular Tags"
                defaultTags={manageSeoProduct.popular_tags}
                onChange={handleTagsChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeoLayout;
