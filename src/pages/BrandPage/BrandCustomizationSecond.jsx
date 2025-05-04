import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollapseComponent from "../../components/common/CollapseComponent";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../utils/colors";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { Apis } from "../../services/apis/Brands/Api";
import CategoryMedia from "../../components/ui/Categories/CategoryMedia";
import CommonMediaInput from "../../components/common/CommonMediaInput";
import CategoryHeader from "../../components/ui/Categories/CategoryHeader";

import { notify } from "../../utils/notify";
import Loader from "../../utils/Loader";
import axios from "axios";
import { baseUrls } from "../../utils/apiWrapper";
import SeoManagement from "../../components/ui/Products/ProductsAttribute/SeoManagement";
import MultiSelectComponentForProducts from "../../components/common/MultiSelectComponentForProducts";
const BrandCustomizationSecond = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
    const [categoryLoader, setCategoryLoader] = useState(false);
  const [productLoader, setProductLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [filterCategory, setFilterCategory] = useState([]);
  const [brandPageDetails, setBrandPageDetails] = useState([]);
  const [defaultSelectedType, setDefaultSelectedType] = useState();


  const buttons = [
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
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const category_id = watch("category_ids", "");
  const products_ids = watch("products_ids", "");
  const location = useLocation();
  const brandName = location.state.datas.brand.label;
  const id = location.state.datas.brand.value;
  const uid = location.state.datas.uid;
  const [updateLoading, setUpdateLoading] = useState(false);



  const onSubmit = (data) => {

    if (category_id.length !== selectedType.length) {
      setCategoriesError(true);
      return false;
    } else {
      setCategoriesError(false);
    }

    let productIds;
    if (data.products_ids) {
      productIds = data.products_ids?.map((prod) => prod.value.split(","));
    }


    const grouped = {};
    productIds.forEach(([productId, categoryId]) => {
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      grouped[categoryId].push(Number(productId));
    });

    const categoryIds = data.category_ids.map(({ value }) => ({
      category_id: value,
      product_ids: grouped[value] || [],
    }));



    const formData = new FormData();
    formData.append("brand_id", parseInt(id));

    formData.append("category_id", JSON.stringify(categoryIds));

    // category banners
    data.category_banners?.forEach((banner, index) => {

      if (banner.alt_text) {
        formData.append(`category_banners_alt_text[${index}]`, banner.alt_text);
      }
      if (banner.file_name) {
        formData.append(`category_banners_file_name[${index}]`, banner.file_name);
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`category_banners[${index}]`, banner.file[0]);
      } else if (brandPageDetails?.category_banners?.[index]) {
        // Preserve the existing image
        formData.append(`category_banners[${index}]`, brandPageDetails.category_banners[index]);
      }
    });
    // top desktop banners
    data.page_top_banners_desktop?.forEach((banner, index) => {


      if (banner.file_name) {
        formData.append(
          `page_top_banners_desktop_file_name[${index}]`,
          banner.file_name
        );
      }

      if (banner.alt_text) {
        formData.append(
          `page_top_banners_desktop_alt_text[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`page_top_banners_desktop[${index}]`, banner.file[0]);
      } else if (brandPageDetails?.page_top_banners_desktop?.[index]) {
        // Preserve the existing image
        formData.append(`page_top_banners_desktop[${index}]`, brandPageDetails.page_top_banners_desktop[index]);
      }


    });

    // top banner mobile
    data.page_top_banners_mobile?.forEach((banner, index) => {
      if (banner.alt_text) {
        formData.append(
          `page_top_banners_mobile_alt_text[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file_name) {
        formData.append(
          `page_top_banners_mobile_file_name[${index}]`,
          banner.file_name
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`page_top_banners_mobile[${index}]`, banner.file[0]);
      } else if (brandPageDetails?.page_top_banners_mobile?.[index]) {
        // Preserve the existing image
        formData.append(`page_top_banners_mobile[${index}]`, brandPageDetails.page_top_banners_mobile[index]);
      }
    });

    // middle  banners desktop
    data.page_middle_banners_desktop?.forEach((banner, index) => {
      if (banner.alt_text) {
        formData.append(
          `page_middle_banners_desktop_alt_text[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file_name) {
        formData.append(
          `page_top_banners_mobile_file_name[${index}]`,
          banner.file_name
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(
          `page_middle_banners_desktop[${index}]`,
          banner.file[0]
        );
      } else if (brandPageDetails?.page_middle_banners_desktop?.[index]) {
        // Preserve the existing image
        formData.append(`page_middle_banners_desktop[${index}]`, brandPageDetails.page_middle_banners_desktop[index]);
      }
    });
    // middle banner mobile
    data.page_middle_banners_mobile?.forEach((banner, index) => {
      if (banner.alt_text) {
        formData.append(
          `page_middle_banners_mobile_alt_text[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file_name) {
        formData.append(
          `page_middle_banners_mobile_file_name[${index}]`,
          banner.file_name
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`page_middle_banners_mobile[${index}]`, banner.file[0]);
      } else if (brandPageDetails?.page_middle_banners_mobile?.[index]) {
        // Preserve the existing image
        formData.append(`page_middle_banners_mobile[${index}]`, brandPageDetails.page_middle_banners_mobile[index]);
      }
    });

    // website   banners videos
    data.website_banners_videos?.forEach((banner, index) => {
      if (banner.alt_text) {
        formData.append(
          `website_banners_videos_alt_text[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file_name) {
        formData.append(
          `website_banners_videos_file_name[${index}]`,
          banner.file_name
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`website_banners_videos[${index}]`, banner.file[0]);
      } else if (brandPageDetails?.website_banners_videos?.[index]) {
        // Preserve the existing image
        formData.append(`website_banners_videos[${index}]`, brandPageDetails.website_banners_videos[index]);
      }
    });
    // mobile banner videos
    data.website_banners_videos_mobile?.forEach((banner, index) => {
      if (banner.alt_text) {
        formData.append(
          `website_banners_videos_mobile_alt_text[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file_name) {
        formData.append(
          `website_banners_videos_mobile_file_name[${index}]`,
          banner.file_name
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(
          `website_banners_videos_mobile[${index}]`,
          banner.file[0]
        );
      } else if (brandPageDetails?.website_banners_videos_mobile?.[index]) {
        // Preserve the existing image
        formData.append(`website_banners_videos_mobile[${index}]`, brandPageDetails.website_banners_videos_mobile[index]);
      }
    });

    if (uid) {
      formData.append('_method', 'PUT');
      Apis.updateSecondBrandPage(formData, uid, setLoader, setResponse);
    } else {
      Apis.createSecondBrandPage(formData, setLoader, setResponse);
    }
  };

  useEffect(() => {
    Apis.fetchCategoryByBrandId(id, setLoader, setCategories);
  }, [id]);



  useEffect(() => {
    const matchedProducts = allProducts?.filter((product) => {
      return (products_ids || [])?.map((p) => p.value.split(',')[0])?.includes(product.id?.toString());
    });

    setMatchedProducts(matchedProducts);
  }, [products_ids, allProducts]);



  useEffect(() => {
    if (uid) {
      Apis.fetchBrandSecondPageById(uid, setLoader, setBrandPageDetails);

    }
  }, [uid]);





  useEffect(() => {
    if (uid && brandPageDetails && categories?.categories) {
      const categoryIdsString = brandPageDetails?.category_id?.map(item => item.category_id).join(',');
      const getCategories = brandPageDetails?.category_id?.map(
        (item) => item.category_id
      );
      setSelectedType(getCategories);
      setDefaultSelectedType(getCategories);
      Apis.filterCategoryByCategoryId(categoryIdsString, setCategoryLoader, setFilterCategory);
      const categoryList = brandPageDetails?.category_id || [];

      const selectedCategories = categoryList.map(({ category_id }) => {

        const match = categories.categories.find((item) => item.id === category_id);
        return match ? { value: match.id, label: match.name } : null;
      }).filter(Boolean); // removes any nulls

      setValue("category_ids", selectedCategories);


    }
  }, [uid, brandPageDetails, categories, setValue]);

  // Update your setTypeFunction to better handle product loading
  const setTypeFunction = (type) => {
    Apis.fetchProductByCategory(type, setProductLoader, (result) => {
      setProducts(result);

      // Clear previous products for this category to avoid duplicates
      if (result.success) {
        setAllProducts(prevProducts => {
          // Filter out products from this category
          const filteredProducts = prevProducts.filter(p => p.category_id !== type);
          // Add the new products
          return [...filteredProducts, ...result.data];
        });
      }
    });

    setSelectedType((prevSelectedType) => {
      if (prevSelectedType.includes(type)) {
        return prevSelectedType;
      }
      return [...prevSelectedType, type];
    });
  };

  // Add a function to handle category changes
  const handleCategoryChange = (newCategories) => {
    setValue("category_ids", newCategories);
    
    try {
      // Get the new category IDs
      const newCategoryIds = newCategories.map(cat => cat.value);
     
      
      // Update selectedType directly without filtering
      setSelectedType(newCategoryIds);
      
      // Handle product filtering
      const currentProducts = watch("products_ids") || [];
 
      
      if (Array.isArray(currentProducts)) {
        const filteredProducts = currentProducts.filter(prod => {
          try {
            const categoryId = prod.value.split(',')[1];
            return newCategoryIds.includes(parseInt(categoryId, 10));
          } catch (e) {
            console.error("Error filtering product:", e);
            return false;
          }
        });
        
        setValue("products_ids", filteredProducts);
        
        // Update allProducts
        setAllProducts(prev => {
          if (!Array.isArray(prev)) return [];
          return prev.filter(p => newCategoryIds.includes(p.category_id));
        });
      }
    } catch (error) {
      console.error("Error in handleCategoryChange:", error);
      // Fallback to safe values
      setSelectedType([]);
      setValue("products_ids", []);
    }
  };

  useEffect(() => {
    if (products.success) {
      setAllProducts((allProducts) => {
        const existingIds = new Set(allProducts.map(p => p.category_id));
        const newProducts = products.data.filter(
          product => !existingIds.has(product.category_id)
        );

        const updated = [...allProducts, ...newProducts];

        return updated;
      });
    }
  }, [products]);


  useEffect(() => {
    if (!!response && response.success) {
      notify(response.message);
      navigate("/brand/second");
    }
  }, [response]);

  useEffect(() => {
    if (filterCategory.success) {
      // Add filtered products to the full list so they're selectable
      setAllProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const newItems = filterCategory.data.filter(p => !existingIds.has(p.id));
        return [...prev, ...newItems];
      });

      // Set default selected values
      const formattedProducts = filterCategory.data.map((item) => ({
        value: `${item.id},${item.category_id}`,
        label: item.sku,
      }));
      setValue("products_ids", formattedProducts);
    }
  }, [filterCategory, setValue]);


  useEffect(() => {
    if (!category_id) return;
    if (uid) {
      const defaultSeleted = defaultSelectedType;

      const categoryValues = category_id && category_id?.map((item) => item?.value);
      const filteredValues = categoryValues.filter((id) =>
        defaultSelectedType.includes(id)
      );

      if (filteredValues.length > 0) {
        setSelectedType(filteredValues);
      } else {
        // Optional: clear selectedType if none match default
        setSelectedType([]);
      }
    }


  }, [category_id, uid]);


  // Add this useEffect to reset product selections when categories change
  useEffect(() => {
    if (category_id && category_id.length === 0) {
      setValue("products_ids", []);
      setAllProducts([]);
      setMatchedProducts([]);
    }
  }, [category_id, setValue]);

  // Improve how you handle product selection changes
  const handleProductSelectionChange = (selectedOptions) => {
    setValue("products_ids", selectedOptions);

    // Update matched products immediately
    const selectedIds = selectedOptions.map(option => option.value.split(',')[0]);
    const newMatchedProducts = allProducts.filter(product =>
      selectedIds.includes(product.id?.toString())
    );
    setMatchedProducts(newMatchedProducts);
  };
  return (
    <>
      {loader ? (
        <FullScreenLoader bgTransparent={true} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-screen">
            <CategoryHeader
              buttons={buttons}
              categoryName={brandName}
              setShow={setShow}
            />

            <CollapseComponent title="Hero Section" errors={errors}>
              <CategoryMedia
                title="Page Top Banners For Desktop"
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="page_top_banners_desktop"
                selectedAltText={brandPageDetails?.page_top_banners_desktop_alt_text}
                selectedFileName={brandPageDetails?.page_top_banners_desktop_file_name}
                selectedBanner={
                  brandPageDetails && brandPageDetails?.page_top_banners_desktop
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
              <CategoryMedia
                title="Page Middle Banners For Mobile"
                fileName={true}
                altText={true}
                control={control}
                register={register}
                namePrefix="page_top_banners_mobile"
                setValue={setValue}
                selectedFileName={brandPageDetails?.page_top_banners_mobile_file_name}
                selectedAltText={brandPageDetails?.page_top_banners_mobile_alt_text}
                selectedBanner={
                  brandPageDetails && brandPageDetails?.page_top_banners_mobile
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>
            {/* Pending need to implemnt the api */}
            <CollapseComponent title="Top Product Section">
              <div className="bg-white mt-[-20px]">
                <div className="">
                  <>

                    <CategoryMedia
                      title="Category Banners"
                      fileLength={5}
                      fileName={true}
                      altText={true}
                      control={control}
                      register={register}
                      setValue={setValue}
                      namePrefix="category_banners"
                      selectedFileName={brandPageDetails?.category_banners_file_name}
                      selectedAltText={brandPageDetails?.category_banners_alt_text}
                      selectedBanner={
                        brandPageDetails && brandPageDetails?.category_banners
                      }
                      spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
                    />
                  </>
                </div>
              </div>
            </CollapseComponent>
            <CollapseComponent title="Website Banner" errors={errors}>
              <CategoryMedia
                title="Page Middle Banners For Desktop"
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="page_middle_banners_desktop"
                selectedFileName={brandPageDetails?.page_middle_banners_desktop_file_name}
                selectedAltText={brandPageDetails?.page_middle_banners_desktop_alt_text}
                selectedBanner={
                  brandPageDetails &&
                  brandPageDetails?.page_middle_banners_desktop
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
                namePrefix="page_middle_banners_mobile"
                selectedFileName={brandPageDetails?.page_middle_banners_mobile_file_name}
                selectedAltText={brandPageDetails?.page_middle_banners_mobile_alt_text}
                selectedBanner={
                  brandPageDetails &&
                  brandPageDetails?.page_middle_banners_mobile
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>

            {/* Pending need to implemnt the api */}
            <CollapseComponent title="Featured Product Section">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-[-10px] p-3 ">
                         {categoryLoader?<Loader/>:''}
                      <Controller
                        name="category_ids"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <MultiSelectComponentForProducts
                            label="Category (required)"
                            value={field.value || []}
                            option={
                              (!!categories && categories?.categories?.map((item) => ({
                                value: item.id,
                                label: item.name
                              }))) || []
                            }
                            onChange={(selected) => {
                              handleCategoryChange(selected);
                              field.onChange(selected);
                            }}
                            isOptionDisabled={(option) =>
                              field.value?.length >= 5 &&
                              !field.value?.find(
                                (selected) => selected.value === option.value
                              )
                            }
                          />
                        )}
                      />
                      {errors.category_ids && (
                        <p className="text-red-500">
                          {errors.category_ids.message}
                        </p>
                      )}

                      {categoriesError && (
                        <p className="text-red-500">
                          Either select rest categories or remove the rest selected categories
                        </p>
                      )}
                      {!!category_id && category_id.length > 0 ? (
                        <>
                          <label>Select Product (If Select Manual)</label>
                          <div className="mt-1 bg-white border-2 border-[#DFDFDF] rounded-lg w-[50%]">
                            {/* Header (Click to Expand/Collapse) */}
                            <div className="flex rounded-md py-[5px] border-[#DFDFDF] bg-[#F9F9FB] px-4 items-center cursor-pointer justify-between">
                              {/* Left Side (Options) */}
                              <div className="flex gap-2 w-[50%]">
                                {category_id &&
                                  category_id.map((item) => (
                                    <div
                                      key={item.value}
                                      onClick={() =>
                                        setTypeFunction(item.value)
                                      }
                                      className={`text-[13px] whitespace-nowrap  font-light text-[${item.textColor
                                        }] ${selectedType.includes(item.value)
                                          ? `bg-[${COLORS.bgPrimary}]`
                                          : "bg-[#E2E2E2]"
                                        }  font-${item.fontWeight
                                        } rounded-[5px] p-2   flex items-center gap-2`}
                                    >
                                      {item.label}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div className="mt-3">
                        <>
                          {productLoader ? (
                            <Loader />
                          ) : (
                            <div className="mb-5">
                              <Controller
                                name="products_ids"
                                control={control}
                                rules={{ required: "Products is required" }}
                                render={({ field }) => (
                                  <MultiSelectComponentForProducts
                                    label="Products (required)"
                                    option={
                                      (!!allProducts && allProducts?.map((item) => ({
                                        value: item.id + ',' + parseInt(item.category_id),
                                        label: item.sku
                                      }))) || []
                                    }
                                    onChange={(selected) => {
                                      handleProductSelectionChange(selected);
                                      field.onChange(selected);
                                    }}
                                    value={field.value || []}
                                  />
                                )}
                              />
                              {errors.products_ids && (
                                <p className="text-red-500">
                                  {errors.products_ids.message}
                                </p>
                              )}
                            </div>
                          )}

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
                  </>
                </div>
              </div>
            </CollapseComponent>
            <CollapseComponent title="Website Banners & Videos" errors={errors}>
              <CategoryMedia
                title="Page Top Banners & Videos For Desktop"
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="website_banners_videos"
                selectedFileName={brandPageDetails?.website_banners_videos_file_name}
                selectedAltText={brandPageDetails?.website_banners_videos_alt_text}
                selectedBanner={
                  brandPageDetails && brandPageDetails?.website_banners_videos
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
              <CategoryMedia
                title="Page Middle Banners & Videos For Mobile"
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="website_banners_videos_mobile"
                selectedFileName={brandPageDetails?.website_banners_videos_mobile_file_name}
                selectedAltText={brandPageDetails?.website_banners_videos_mobile_alt_text}
                selectedBanner={
                  brandPageDetails &&
                  brandPageDetails?.website_banners_videos_mobile
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>


            {/* 
            <SeoManagement
              manageSeoProduct={manageSeoProduct}
              setManageSeoProduct={setManageSeoProduct}
              id={uid}
              type={"Brand"}
            />  */}

          </div>
        </form>
      )}
    </>
  );
};

export default React.memo(BrandCustomizationSecond);
