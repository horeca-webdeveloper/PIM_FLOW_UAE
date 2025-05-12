import React, { useContext, useEffect, useState } from "react";
import CommonInput from "../../../common/MultiAttributes/CommonInput";

import SeoLayout from "../../../common/SeoLayout/SeoLayout";
import { useFetchSEO } from "../../../../services/apis/SEO/Hooks";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrls } from "../../../../utils/apiWrapper";
import toast from "react-hot-toast";
import Loader from "../../../../utils/Loader";
import { AppContext } from "../../../../Context/AppContext";

const SeoManagement = ({ manageSeoProduct, setManageSeoProduct, id, type }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [seoData, setSeoData] = useState([]);
  const [show, setShow] = useState(true);
  const { data, isLoading, error } = useFetchSEO({
    id: location?.pathname?.split("/")[2],
  });

  const handleUpdateSeo = async () => {
    console.log(manageSeoProduct?.popular_tags);
    setLoading(true);
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("relational_id", manageSeoProduct?.relational_id);
      formData.append("relational_type", type);
      formData.append("url", manageSeoProduct?.url);
      formData.append("primary_keyword", manageSeoProduct?.primary_keyword);
      formData.append(
        "monthly_search_volume",
        manageSeoProduct?.monthly_search_volume || 0
      );
      formData.append("title_tag", manageSeoProduct?.title_tag);
      formData.append("meta_title", manageSeoProduct?.meta_title);
      formData.append("meta_description", manageSeoProduct?.meta_description);
      formData.append("internal_links", manageSeoProduct?.internal_links);
      formData.append("indexing", manageSeoProduct?.indexing);
      formData.append("created_by", manageSeoProduct?.created_by);
      formData.append("og_title", manageSeoProduct?.og_title);
      formData.append("og_description", manageSeoProduct?.og_description);
      formData.append("og_image_url", manageSeoProduct?.og_image_url);
      manageSeoProduct?.og_image_file !== undefined &&
        formData.append(
          "og_image_file",
          manageSeoProduct?.og_image_file || manageSeoProduct?.og_image_url
        );
      formData.append("og_image_alt_text", manageSeoProduct?.og_image_alt_text);
      formData.append("og_image_name", manageSeoProduct?.og_image_name);
      formData.append("tags", manageSeoProduct?.tags);
      formData.append("paragraph_1", manageSeoProduct?.paragraph_1);
      formData.append("paragraph_2", manageSeoProduct?.paragraph_2);
      formData.append("paragraph_3", manageSeoProduct?.paragraph_3);
      formData.append("paragraph_4", manageSeoProduct?.paragraph_4);
      formData.append(
        "popular_tags",
        JSON.stringify(manageSeoProduct?.popular_tags)
      );
      formData.append("schema_rating", manageSeoProduct?.schema_rating);
      formData.append(
        "schema_reviews_count",
        manageSeoProduct?.schema_reviews_count
      );

      formData.append(
        "secondary_keywords",
        JSON.stringify(
          manageSeoProduct?.secondary_keyword_details.map(
            ({ secondary_keyword, monthly_search_volume }) => ({
              secondary_keyword,
              monthly_search_volume,
            })
          )
        )
      );
      const response = await axios.post(
        `${baseUrls}/seo-management/${manageSeoProduct?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        window.location.reload();
        setLoading(false);
        console.log(response);
        toast.success("SEO Updated Successfully");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCreateSeo = async () => {
    console.log(manageSeoProduct?.popular_tags);
    setLoading(true);
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("relational_id", id);
      formData.append("relational_type", type);
      formData.append("url", manageSeoProduct?.url);
      formData.append("primary_keyword", manageSeoProduct?.primary_keyword);
      formData.append(
        "monthly_search_volume",
        manageSeoProduct?.monthly_search_volume || 0
      );
      formData.append("title_tag", manageSeoProduct?.title_tag);
      formData.append("meta_title", manageSeoProduct?.meta_title);
      formData.append("meta_description", manageSeoProduct?.meta_description);
      formData.append("internal_links", manageSeoProduct?.internal_links);
      formData.append("indexing", manageSeoProduct?.indexing);
      formData.append("created_by", 1);
      formData.append("og_title", manageSeoProduct?.og_title);
      formData.append("og_description", manageSeoProduct?.og_description);
      formData.append("og_image_url", manageSeoProduct?.og_image_url);
      manageSeoProduct?.og_image_file !== undefined &&
        formData.append(
          "og_image_file",
          manageSeoProduct?.og_image_file || manageSeoProduct?.og_image_url
        );
      formData.append("og_image_alt_text", manageSeoProduct?.og_image_alt_text);
      formData.append("og_image_name", manageSeoProduct?.og_image_name);
      formData.append("tags", manageSeoProduct?.tags);
      formData.append("paragraph_1", manageSeoProduct?.paragraph_1);
      formData.append("paragraph_2", manageSeoProduct?.paragraph_2);
      formData.append("paragraph_3", manageSeoProduct?.paragraph_3);
      formData.append("paragraph_4", manageSeoProduct?.paragraph_4);
      formData.append(
        "popular_tags",
        JSON.stringify(manageSeoProduct?.popular_tags)
      );
      formData.append("schema_rating", manageSeoProduct?.schema_rating);
      formData.append(
        "schema_reviews_count",
        manageSeoProduct?.schema_reviews_count || "12"
      );

      formData.append(
        "secondary_keywords",
        JSON.stringify(
          manageSeoProduct?.secondary_keyword_details.map(
            ({ secondary_keyword, monthly_search_volume }) => ({
              secondary_keyword,
              monthly_search_volume,
            })
          )
        )
      );
      const response = await axios.post(
        `${baseUrls}/seo-management`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        window.location.reload();
        setLoading(false);
        console.log(response);
        toast.success("SEO Updated Successfully");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.message);
    }
  };

  const { AllowedPermissions } = useContext(AppContext);
  const permissions = AllowedPermissions?.permissions || [];

  return (
    <div className="mt-[20px] bg-white border border-[#979797] rounded-lg">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797] bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          SEO Management
        </h2>
        <div className="text-sm text-red-500">
          <span className="mr-1 cursor-pointer">
            missing required attribute
          </span>

          <button
            type="button"
            className={`px-[15px] py-[8px] ml-[20px] text-white rounded-md ${
              permissions?.includes("update seo mgmt")
                ? "bg-[#26683A] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed opacity-50"
            }`}
            onClick={() => handleUpdateSeo()}
            disabled={!permissions?.includes("update seo mgmt")}
          >
            Update SEO
          </button>

          <button
            type="button"
            className={`px-[15px] py-[8px] ml-[20px] text-white rounded-md ${
              permissions?.includes("add seo mgmt")
                ? "bg-[#26683A] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed opacity-50"
            }`}
            onClick={() => handleCreateSeo()}
            disabled={!permissions?.includes("add seo mgmt")}
          >
            Create SEO
          </button>
        </div>
      </div>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <SeoLayout
          manageSeoProduct={manageSeoProduct}
          setManageSeoProduct={setManageSeoProduct}
        />
      )}
    </div>
  );
};

export default SeoManagement;
