import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollapseComponent from "../../components/common/CollapseComponent";
import Loader from "../../utils/Loader";
import { Apis } from "../../services/apis/CategoryApis/Api";
import CategoryHeader from "../../components/ui/Categories/CategoryHeader";
import CategoryMedia from "../../components/ui/Categories/CategoryMedia";
import CommonMediaInput from "../../components/common/CommonMediaInput";
import { notify } from "../../utils/notify";
import { COLORS } from "../../utils/colors";
import { useForm, Controller } from "react-hook-form";
import MultiSelectComponent from "../../components/common/MultiSelectComponent";
import SeoManagement from "../../components/ui/Products/ProductsAttribute/SeoManagement";
import axios from "axios";
import { baseUrls } from "../../utils/apiWrapper";

const InnerCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location?.state?.datas?.category?.label;
  const id = location?.state?.datas?.category?.value;
  const uid = location?.state?.datas?.uid;
  const [attributeByCategory, setAttributeByCategory] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [response, setResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [subCategoryDetails, setCategoriesDetails] = useState([]);
  const [seoData, setSeoData] = useState([]);

  const getSEOData = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseUrls}/seo-management/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSeoData(response);
      setLoader(false);
      // console.log("response from the api ", response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSEOData();
  }, [id]);

   
  const [manageSeoProduct, setManageSeoProduct] = useState({
    id: "",
    relational_id: "",
    relational_type: "",
    url: "",
    primary_keyword: "",
    monthly_search_volume: 0,
    title_tag: "",
    meta_title: "",
    meta_description: "",
    internal_links: "",
    indexing: 0,
    og_title: "",
    og_description: "",
    og_image_url: "",
    og_image_file: "",
    og_image_alt_text: "",
    og_image_name: "",
    tags: "",
    schema: "",
    schema_rating: 0,
    schema_reviews_count: 0,
    created_by: 1,
    updated_by: null,
    created_at: "",
    updated_at: "",
    secondary_keyword_details: [],
    paragraph_1: "",
    paragraph_2: "",
    paragraph_3: "",
    paragraph_4: "",
    popular_tags: [],
  });

  useEffect(() => {
    setManageSeoProduct({
      id: seoData?.data?.data?.id,
      relational_id: seoData?.data?.data?.relational_id,
      relational_type: seoData?.data?.data?.relational_type,
      url: seoData?.data?.data?.url,
      primary_keyword: seoData?.data?.data?.primary_keyword,
      monthly_search_volume: seoData?.data?.data?.monthly_search_volume,
      title_tag: seoData?.data?.data?.title_tag,
      meta_title: seoData?.data?.data?.meta_title,
      meta_description: seoData?.data?.data?.meta_description,
      internal_links: seoData?.data?.data?.internal_links,
      indexing: seoData?.data?.data?.indexing,
      og_title: seoData?.data?.data?.og_title,
      og_description: seoData?.data?.data?.og_description,
      og_image_url: seoData?.data?.data?.og_image_url,
      og_image_file: seoData?.data?.data?.og_image_url,
      og_image_alt_text: seoData?.data?.data?.og_image_alt_text,
      og_image_name: seoData?.data?.data?.og_image_name,
      tags: seoData?.data?.data?.tags,
      schema: seoData?.data?.data?.schema,
      schema_rating: seoData?.data?.data?.schema_rating,
      schema_reviews_count: seoData?.data?.data?.schema_reviews_count,
      created_by: seoData?.data?.data?.created_by,
      updated_by: seoData?.data?.data?.updated_by,
      created_at: seoData?.data?.data?.created_at,
      updated_at: seoData?.data?.data?.updated_at,
      secondary_keyword_details: seoData?.data?.data?.secondary_keyword_details,
      paragraph_1: seoData?.data?.data?.paragraph_1 || "",
      paragraph_2: seoData?.data?.data?.paragraph_2 || "",
      paragraph_3: seoData?.data?.data?.paragraph_3 || "",
      paragraph_4: seoData?.data?.data?.paragraph_4 || "",
      popular_tags: seoData?.data?.data?.popular_tags || [],
    });
  }, [seoData]);

  const buttons = [
    {
      label: "Import",
      link: "/import",
      icon: "",
      type: "button",
      bgColor: "#E2E2E2",
      icon: "icons/import.png",
      textColor: COLORS.darkCharcoal,
      fontSize: "14px",
      fontWeight: "normal",
    },
    {
      label: "Export",
      link: "/Export",
      icon: "",
      type: "button",
      bgColor: "#E2E2E2",
      icon: "icons/import.png",
      textColor: COLORS.darkCharcoal,
      fontSize: "14px",
      fontWeight: "normal",
    },
    {
      label: "Create Now",
      link: "",
      icon: "icons/download.png",
      type: "submit",
      bgColor: COLORS.bgPrimary,
      textColor: "white",
      textSize: "14px",
      fontWeight: "normal",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const products_ids = watch("products_ids", "");

  const onSubmit = (data) => {
   

    let productIds;
    if (data?.products_ids?.length>0) {
      productIds = data.products_ids?.map((prod) => prod.value).join(",");
    } else {
      productIds = 1683;
    }
 
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("category_id", parseInt(id));
    const attributeIds = data.attributes_ids
      ?.map((attr) => attr.value)
      .join(",");
    // const productIds = data.products_ids?.map(prod => prod.value).join(",");
    // Attributes and Products as arrays
    formData.append("attributes_ids[]", attributeIds);
    formData.append("products_ids[]", productIds);

    // Web banners
    data.web_banners?.forEach((banner, index) => {
      if (banner.alt_text) {
        formData.append(`web_banners[${index}][alt_text]`, banner.alt_text);
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`web_banners[${index}][image]`, banner.file[0]);
      }
    });

    // Mobile banners
    data.mobile_banners?.forEach((banner, index) => {
      if (banner.alt_text) {
        formData.append(`mobile_banners[${index}][alt_text]`, banner.alt_text);
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`mobile_banners[${index}][image]`, banner.file[0]);
      }
    });

    if (uid) {
 
      Apis.updateSubCategory(formData, uid, setLoader, setResponse);
    } else {
      Apis.createSubCategory(formData, setLoader, setResponse);
    }
  };

  useEffect(() => {
    Apis.getAttributesByCategory(id, setLoader, setAttributeByCategory);
    Apis.productByCategory(id, setLoader, setProductByCategory);
    Apis.fetchCategories(setLoader, setCategories);
  }, []);

  useEffect(() => {
    const matchedProducts = productByCategory?.data?.filter((product) =>
      (products_ids || []).map((p) => p.value).includes(product.id)
    );
    setMatchedProducts(matchedProducts);
  }, [products_ids]);

  useEffect(() => {
    if (!!response && response.success) {
      notify(response.message);
      navigate("/sub-categories");
    }
  }, [response]);

  useEffect(() => {
    if (uid) {
      Apis.fetchSubCategoriesById(uid, setLoader, setCategoriesDetails);
    }
  }, [uid]);

  // Convert banner object to array format for react-hook-form compatibility
  const transformBannerData = (bannerData) => {
    if (!bannerData || typeof bannerData !== "object") return [];
    return Object.values(bannerData).map((banner) => ({
      alt_text: banner.alt_text || "",
      preview: banner.image_name || "", // assuming "preview" is used in CategoryMedia for showing the image
      file: [], // no File object since it's already uploaded
    }));
  };

  useEffect(() => {
    if (uid && subCategoryDetails) {
      // Extract and split the comma-separated strings
      const productIdArray =
        subCategoryDetails.products_ids?.[0]?.split(",") || [];
      const attributeIdArray =
        subCategoryDetails.attributes_ids?.[0]?.split(",") || [];

      // Format your available options
      const availableAttributes =
        attributeByCategory?.map((item) => ({
          value: item.id,
          label: item.name,
        })) || [];

      const availableProducts =
        productByCategory?.data?.map((item) => ({
          value: item.id,
          label: item.name,
        })) || [];

      // Filter only those that match the IDs from the API
      const matchedAttributes = availableAttributes.filter((attr) =>
        attributeIdArray.includes(attr.value.toString())
      );

      const matchedProducts = availableProducts.filter((prod) =>
        productIdArray.includes(prod.value.toString())
      );
      const webBanners = transformBannerData(subCategoryDetails.web_banners);
      const mobileBanners = transformBannerData(
        subCategoryDetails.mobile_banners
      );

      setValue("web_banners", webBanners);
      setValue("mobile_banners", mobileBanners);

      // Set default values
      setValue("attributes_ids", matchedAttributes);
      setValue("products_ids", matchedProducts);
    }
  }, [
    uid,
    subCategoryDetails,
    attributeByCategory,
    productByCategory,
    setValue,
  ]);

  return (
    <>
      {loader ? (
        <div className="flex items-center justify-center h-[100vh] bg-[#F1F1F1]">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-screen">
            <CategoryHeader
              buttons={buttons}
              categoryName={categoryName}
              setShow={setShow}
            />

            <CollapseComponent title="Filter Selection" errors={errors}>
              <Controller
                name="attributes_ids"
                control={control}
                rules={{ required: "Category Filterable Attributes is required" }}
                render={({ field }) => (
                  <MultiSelectComponent
                    label="Category Filterable Attributes (required)"
                    option={attributeByCategory || []}
                    {...field}
                  />
                )}
              />
              {errors.attributes_ids && (
                <p className="text-red-500">{errors.attributes_ids.message}</p>
              )}
            </CollapseComponent>

            <CollapseComponent title="Product Section" errors={errors}>
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Select Product (If Select Manual)
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-5 p-3 ">
                      <Controller
                        name="products_ids"
                        control={control}
                        // rules={{ required: "Products is required" }}

                        render={({ field }) => (
                          <MultiSelectComponent
                            label="Products (required)"
                            option={
                              (!!productByCategory &&
                                productByCategory?.data) ||
                              []
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors.products_ids && (
                        <p className="text-red-500">
                          {errors.products_ids.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-[10px] p-4">
                      <div className="grid grid-cols-5 gap-4">
                        {!!matchedProducts &&
                          matchedProducts.map((item) => {
                            return (
                              <CommonMediaInput
                                key={item.id}
                                showInput={false}
                                showName={true}
                                name={item.name}
                                image={item.image}
                                sku={item.sku}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </CollapseComponent>
            <CollapseComponent title="Website Banners" errors={errors}>
              <CategoryMedia
                title="Page Top Banners For Desktop"
                fileName={true}
                altText={true}
                control={control}
                register={register}
                namePrefix="web_banners"
                setValue={setValue}
                selectedAltText={subCategoryDetails && subCategoryDetails?.web_banners}
                selectedBanner={
                  subCategoryDetails && subCategoryDetails?.web_banners
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
              <CategoryMedia
                title="Page Middle Banners For Mobile"
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="mobile_banners"
                selectedAltText={subCategoryDetails && subCategoryDetails?.mobile_banners}
                selectedBanner={
                  subCategoryDetails && subCategoryDetails?.mobile_banners
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>

            <SeoManagement
              manageSeoProduct={manageSeoProduct}
              setManageSeoProduct={setManageSeoProduct}
              id={id}
              type={"Category"}
            />

            {/* <CollapseComponent title="SEO Attributes">
              <SeoComponent seo={seoData} setSeo={setSeoData} />
            </CollapseComponent> */}
          </div>
        </form>
      )}
    </>
  );
};

export default React.memo(InnerCategories);
