import React, { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiWrapper";
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
import InputComponent from "../../components/common/InputComponent";
import CommonTextAreaComponent from "../../components/common/CommonTextAreaComponent";
import MultiSelectComponentForProducts from "../../components/common/MultiSelectComponentForProducts";
import SingleSelectImage from "../../components/ui/Categories/SingleSelectImage";


const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state?.datas?.category?.label || "";
  const id = location.state?.datas?.category?.value || "";
  const uid = location.state?.datas?.uid || "";
  const [categoryPageDetails, setCategoryPageDetails] = useState([]);
  const [attributeByCategory, setAttributeByCategory] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [selectedInnerCategories, setSelectedInnerCategories] = useState([]);

  //filter category for each section
  const [filterCategoryForTopPicks, setFilterCategoryForTopPicks] = useState([]);
  const [filterCategoryForTopDeals, setFilterCategoryForTopDeals] = useState([]);
  const [filterCategoryForExplore, setFilterCategoryForExplore] = useState([]);
  const [filterCategoryForNewRelease, setFilterCategoryForNewRelease] = useState([]);
  const [filterCategoryForYouMayAlsoLike, setFilterCategoryForYouMayAlsoLike] = useState([]);
  const [filterCategoryForInspiredBy, setFilterCategoryForInspiredBy] = useState([]);

  //default selected type

  const [defaultSelectedTypeForTopPicks, setDefaultSelectedTypeForTopPicks] = useState();
  const [defaultSelectedTypeForTopDeals, setDefaultSelectedTypeForTopDeals] = useState();
  const [defaultSelectedTypeForExplore, setDefaultSelectedTypeForExplor] = useState();
  const [defaultSelectedTypeForNewRelease, setDefaultSelectedTypeForNewRelease] = useState();
  const [defaultSelectedTypeForYouMayAlsoLike, setDefaultSelectedTypeForYouMayAlsoLike] = useState();
  const [defaultSelectedTypeForInspiredBy, setDefaultSelectedTypeForInspiredBy] = useState();



  // Selected types for each section
  const [selectedType, setSelectedType] = useState([]);
  const [topPicksSelectedType, setTopPicksSelectedType] = useState([]);
  const [topDealsSelectedType, setTopDealsSelectedType] = useState([]);
  const [newReleaseSelectedType, setNewReleaseSelectedType] = useState([]);
  const [youMayAlsoLikeSelectedType, setYouMayAlsoLikeSelectedType] = useState([]);
  const [inspiredByHistorySelectedType, setInspiredByHistorySelectedType] = useState([]);

  // Products for each section
  const [allProducts, setAllProducts] = useState([]);
  const [topPicksAllProducts, setTopPicksAllProducts] = useState([]);
  const [topDealsAllProducts, setTopDealsAllProducts] = useState([]);
  const [newReleaseAllProducts, setNewReleaseAllProducts] = useState([]);
  const [youMayAlsoLikeAllProducts, setYouMayAlsoLikeAllProducts] = useState([]);
  const [inspiredByHistoryAllProducts, setInspiredByHistoryAllProducts] = useState([]);

  // Matched products for display
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [matchedProductsForTopPicks, setMatchedProductsForTopPicks] = useState([]);
  const [matchedProductsForTopDeals, setMatchedProductsForTopDeals] = useState([]);
  const [matchedProductsForNewRelease, setMatchedProductsForNewRelease] = useState([]);
  const [matchedProductsForYouMayAlsoLike, setMatchedProductsForYouMayAlsoLike] = useState([]);
  const [matchedProductsForInspiredByHistory, setMatchedProductsForInspiredByHistory] = useState([]);

  const [show, setShow] = useState(false);
  const [categoryDetails, setCategoriesDetails] = useState([]);
  const [innerCategories, setInnerCategory] = useState([]);
  const [seoData, setSeoData] = useState([]);
  const [response, setResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const [productLoader, setProductLoader] = useState(false);

  const setTypeFunction = async (sectionName, type) => {
    // Update selected types based on section
    const updateSelectedType = (setStateFunction, currentState) => {
      setStateFunction((prevState) => {
        return prevState.includes(type) ? prevState : [...prevState, type];
      });
    };

    // Map section names to their respective state setters
    const sectionMap = {
      'explore': setSelectedType,
      'top_picks': setTopPicksSelectedType,
      'top_deals': setTopDealsSelectedType,
      'new_release': setNewReleaseSelectedType,
      'you_may_also_like': setYouMayAlsoLikeSelectedType,
      'inspired_by_history': setInspiredByHistorySelectedType
    };

    // Update the appropriate section's selected types
    if (sectionMap[sectionName]) {
      updateSelectedType(sectionMap[sectionName]);
    }

    try {
      setProductLoader(true);
      const response = await apiClient.get(`/products/category/${type}`);

      // Map section names to their respective product state setters
      const productSetMap = {
        'explore': { setter: setAllProducts, state: allProducts },
        'top_picks': { setter: setTopPicksAllProducts, state: topPicksAllProducts },
        'top_deals': { setter: setTopDealsAllProducts, state: topDealsAllProducts },
        'new_release': { setter: setNewReleaseAllProducts, state: newReleaseAllProducts },
        'you_may_also_like': { setter: setYouMayAlsoLikeAllProducts, state: youMayAlsoLikeAllProducts },
        'inspired_by_history': { setter: setInspiredByHistoryAllProducts, state: inspiredByHistoryAllProducts }
      };

      // Update products for the appropriate section
      if (productSetMap[sectionName]) {
        updateProductsByType(
          productSetMap[sectionName].setter,
          productSetMap[sectionName].state,
          response.data.data
        );
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      notify(errorMessage);
    } finally {
      setProductLoader(false);
    }
  };

  const updateProductsByType = (setStateFn, prodStates, products) => {
    setStateFn((prevState) => {
      const existingIds = new Set(prevState.map(p => p.category_id));
      const newProducts = products.filter(
        product => !existingIds.has(product.category_id)
      );
      return [...prevState, ...newProducts];
    });
  };

  const buttons = [
    {
      label: "Import",
      link: "/import",
      icon: "icons/import.png",
      type: "button",
      bgColor: "#E2E2E2",
      textColor: COLORS.darkCharcoal,
      fontSize: "14px",
      fontWeight: "normal",
    },
    {
      label: "Export",
      link: "/Export",
      icon: "icons/import.png",
      type: "button",
      bgColor: "#E2E2E2",
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
    setValue,
    control,
    formState: { errors },
  } = useForm();

  // Watch for changes in form fields
  const top_picks_category_id = watch("top_picks_category_ids", "");
  const top_deals_category_id = watch("top_deals_category_ids", "");
  const category_id = watch("explore_category_ids", "");
  const new_release_category_id = watch("new_release_category_ids", "");
  const you_may_also_like_category_id = watch("you_may_also_like_category_ids", "");
  const inspired_by_history_category_id = watch("inspired_by_history_category_ids", "");

  const top_picks_products_id = watch("top_picks_products_ids", "");
  const top_deals_products_id = watch("top_deals_products_ids", "");
  const products_ids = watch("explore_products_ids", "");
  const new_release_products_ids = watch("new_release_products_ids", "");
  const you_may_also_like_products_ids = watch("you_may_also_like_products_ids", "");
  const inspired_by_history_products_ids = watch("inspired_by_history_products_ids", "");

  const onSubmit = (data) => {
    //top picks prouducts and categories
    let top_picks_products_ids;
    if (data.top_picks_products_ids) {
      top_picks_products_ids = data.top_picks_products_ids?.map((prod) => prod.value.split(","));
    }
    const grouped = {};
    top_picks_products_ids.forEach(([productId, categoryId]) => {
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      grouped[categoryId].push(Number(productId));
    });

    const top_picks_products_categories_ids = data.top_picks_category_ids.map(({ value }) => ({
      category_id: value,
      product_ids: grouped[value] || [],
    }));
    //end top picks products and categories

    //top deals prouducts and categories
    let top_deals_products_ids;
    if (data?.top_deals_products_ids) {
      top_deals_products_ids = data.top_deals_products_ids?.map((prod) => prod.value.split(","));
    }
    const grouped2 = {};
    top_deals_products_ids?.forEach(([productId, categoryId]) => {
      if (!grouped2[categoryId]) {
        grouped2[categoryId] = [];
      }
      grouped2[categoryId].push(Number(productId));
    });

    const top_deals_products_categories_ids = data.top_deals_category_ids.map(({ value }) => ({
      category_id: value,
      product_ids: grouped2[value] || [],
    }));
    //end top picks products and categories

    //explore prouducts and categories
    let explore_products_ids;
    if (data.explore_products_ids) {
      explore_products_ids = data.explore_products_ids?.map((prod) => prod.value.split(","));
    }
    const grouped3 = {};
    explore_products_ids.forEach(([productId, categoryId]) => {
      if (!grouped3[categoryId]) {
        grouped3[categoryId] = [];
      }
      grouped3[categoryId].push(Number(productId));
    });

    const explore_products_categories_ids = data.explore_category_ids.map(({ value }) => ({
      category_id: value,
      product_ids: grouped3[value] || [],
    }));
    //end top picks products and categories

    //hot new release prouducts and categories
    let new_release_products_ids;
    if (data.new_release_products_ids) {
      new_release_products_ids = data.new_release_products_ids?.map((prod) => prod.value.split(","));
    }
    const grouped4 = {};
    new_release_products_ids.forEach(([productId, categoryId]) => {
      if (!grouped4[categoryId]) {
        grouped4[categoryId] = [];
      }
      grouped4[categoryId].push(Number(productId));
    });

    const new_release_categories_ids = data.explore_category_ids.map(({ value }) => ({
      category_id: value,
      product_ids: grouped4[value] || [],
    }));
    //end top picks products and categories


    // product you may also likes prouducts and categories
    let you_may_also_like_products_ids;
    if (data.you_may_also_like_products_ids) {
      you_may_also_like_products_ids = data.you_may_also_like_products_ids?.map((prod) => prod.value.split(","));
    }
    const grouped5 = {};
    you_may_also_like_products_ids.forEach(([productId, categoryId]) => {
      if (!grouped5[categoryId]) {
        grouped5[categoryId] = [];
      }
      grouped5[categoryId].push(Number(productId));
    });


    const you_may_also_like_categories_ids = data?.you_may_also_like_category_ids?.map(({ value }) => ({
      category_id: value,
      product_ids: grouped5[value] || [],
    }));
    //end top picks products and categories



    //inspired by browsing history prouducts and categories
    let inspired_by_history_products_ids;
    if (data.inspired_by_history_products_ids) {
      inspired_by_history_products_ids = data.inspired_by_history_products_ids?.map((prod) => prod.value.split(","));
    }
    const grouped6 = {};
    inspired_by_history_products_ids.forEach(([productId, categoryId]) => {
      if (!grouped6[categoryId]) {
        grouped6[categoryId] = [];
      }
      grouped6[categoryId].push(Number(productId));
    });

    const inspired_by_history_categories_ids = data?.inspired_by_history_category_ids?.map(({ value }) => ({
      category_id: value,
      product_ids: grouped6[value] || [],
    }));
    //end top picks products and categories


    const formData = new FormData();
    formData.append("category_id", parseInt(id));
    formData.append("title", data.banner_title);
    formData.append("description", data.banner_description);
    formData.append("banner_link", data.banner_link);
    formData.append("inner_categories", data.inner_categories.map((item) => item.value));


    formData.append("related_products", JSON.stringify(top_picks_products_categories_ids));
    formData.append("top_picks_in_santos", parseInt(id));
    formData.append("top_deals_from_our_sellers", JSON.stringify(top_deals_products_categories_ids));
    formData.append("explore_top_picks", JSON.stringify(explore_products_categories_ids));
    formData.append("hot_new_releases", JSON.stringify(new_release_categories_ids));
    formData.append("products_you_may_also_like", JSON.stringify(you_may_also_like_categories_ids));
    formData.append("inspired_by_your_browsing_history", JSON.stringify(inspired_by_history_categories_ids));
    formData.append("section_title", data.section_title);
    formData.append("section_description", data.section_description);
    formData.append("brand_heading", data.brand_heading);
    formData.append("brand_description", data.brand_description);


    //for banner file


    data.banner_image?.forEach((banner, index) => {


      if (banner.alt_text) {
        formData.append(`banner_image_alt`, banner.alt_text);
      }
      if (banner.file_name) {
        formData.append(`banner_image_file_name`, banner.file_name);
      }
      if (banner.file?.[0] instanceof File) {

        formData.append(`banner_image`, banner.file[0]);
      } else if (categoryPageDetails?.banner_image?.[index]) {
        // Preserve the existing image
        formData.append(`banner_image[${index}]`, categoryPageDetails.banner_image[index]);
      }
    });
    // brand images
    data.brand_images?.forEach((banner, index) => {
      if (banner.file_name) {
        formData.append(
          `twelve_images_file_name[${index}]`,
          banner.file_name
        );
      }

      if (banner.alt_text) {
        formData.append(
          `twelve_images_alt[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`twelve_images[${index}]`, banner.file[0]);
      } else if (categoryPageDetails?.twelve_images?.[index]) {
        // Preserve the existing image
        formData.append(`twelve_images[${index}]`, categoryPageDetails.twelve_images[index]);
      }
    });

    // extra banners

    data.extra_banner?.forEach((banner, index) => {
      if (banner.file_name) {
        formData.append(
          `four_banners_file_name[${index}]`,
          banner.file_name
        );
      }

      if (banner.alt_text) {
        formData.append(
          `four_banners_alt[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`four_banners[${index}]`, banner.file[0]);
      } else if (categoryPageDetails?.four_banners?.[index]) {
        // Preserve the existing image
        formData.append(`four_banners[${index}]`, categoryPageDetails.four_banners[index]);
      }
    });


    // mega_deals banners

    data.mega_deals?.forEach((banner, index) => {
      if (banner.file_name) {
        formData.append(
          `six_images_file_name[${index}]`,
          banner.file_name
        );
      }

      if (banner.alt_text) {
        formData.append(
          `six_images_alt[${index}]`,
          banner.alt_text
        );
      }
      if (banner.file?.[0] instanceof File) {
        formData.append(`six_images[${index}]`, banner.file[0]);
      } else if (categoryPageDetails?.six_images?.[index]) {
        // Preserve the existing image
        formData.append(`six_images[${index}]`, categoryPageDetails.six_images[index]);
      }
    });


    if (uid) {
      formData.append('_method', 'PUT');
      Apis.updateCategory(formData, categoryPageDetails?.data?.id, setLoader, setResponse);
    } else {
      Apis.createCategory(formData, setLoader, setResponse);
    }
    // Submit form data

    // Add your submission logic here
  };

  useEffect(() => {
    if (id) {
      // Apis.getAttributesByCategory(id, setLoader, setAttributeByCategory);
      // Apis.productByCategory(id, setLoader, setProductByCategory);
      Apis.fetchCategories(setLoader, setCategories);
      Apis.fetchInnerCategories(id, setLoader, setInnerCategory);
    }

  }, [id]);

  // Update matched products when product selections change
  useEffect(() => {
    // Helper function to update matched products
    const updateMatchedProducts = (productIds, allProductsSource, setMatchedProductsFn) => {
      if (productIds?.length > 0 && allProductsSource?.length > 0) {
        const selectedProductIds = productIds.map((p) => p.value.split(',')[0]);
        const matched = allProductsSource.filter((product) =>
          selectedProductIds.includes(String(product.id))
        );
        setMatchedProductsFn(matched);
      }
    };

    // Update matched products for each section
    updateMatchedProducts(top_picks_products_id, topPicksAllProducts, setMatchedProductsForTopPicks);
    updateMatchedProducts(top_deals_products_id, topDealsAllProducts, setMatchedProductsForTopDeals);
    updateMatchedProducts(products_ids, allProducts, setMatchedProducts);
    updateMatchedProducts(new_release_products_ids, newReleaseAllProducts, setMatchedProductsForNewRelease);
    updateMatchedProducts(you_may_also_like_products_ids, youMayAlsoLikeAllProducts, setMatchedProductsForYouMayAlsoLike);
    updateMatchedProducts(inspired_by_history_products_ids, inspiredByHistoryAllProducts, setMatchedProductsForInspiredByHistory);
  }, [
    top_picks_products_id, topPicksAllProducts,
    top_deals_products_id, topDealsAllProducts,
    products_ids, allProducts,
    new_release_products_ids, newReleaseAllProducts,
    you_may_also_like_products_ids, youMayAlsoLikeAllProducts,
    inspired_by_history_products_ids, inspiredByHistoryAllProducts
  ]);

  useEffect(() => {
    if (response && response.success) {
      notify(response.message);
      navigate("/categories");
    }
  }, [response, navigate]);

  useEffect(() => {
    if (uid) {
      Apis.fetchCategoriesPageById(uid, setLoader, setCategoryPageDetails);
    }
  }, [uid]);

  useEffect(() => {
    if (categoryPageDetails.success) {
      setValue("banner_title", categoryPageDetails?.data?.title);
      setValue("banner_description", categoryPageDetails?.data?.description);
      setValue("banner_link", categoryPageDetails?.data?.banner_link);
      setValue("section_title", categoryPageDetails?.data?.section_title);
      setValue("section_description", categoryPageDetails?.data?.section_description);
      setValue("brand_heading", categoryPageDetails?.data?.brand_heading);
      setValue("brand_description", categoryPageDetails?.data?.brand_description);

      //show default selected category

      const categoryIdsString = categoryPageDetails?.data?.explore_top_picks?.map(item => item.category_id).join(',');
      const getCategories = categoryPageDetails?.data?.explore_top_picks?.map(
        (item) => item.category_id
      );
      console.log('get',categoryIdsString);
      // setSelectedType(getCategories);
      // setDefaultSelectedType(getCategories);
      // Apis.filterCategoryByCategoryIdFirst(categoryIdsString, setCategoryLoader, setFilterCategory);
      // const categoryList = brandPageDetails?.category_id || [];

      // const selectedCategories = categoryList.map(({ category_id }) => {

      //   const match = categories.categories.find((item) => item.id === category_id);
      //   return match ? { value: match.id, label: match.name } : null;
      // }).filter(Boolean); // removes any nulls

      // setValue("category_ids", selectedCategories);
    }
  }, [setValue, categoryPageDetails]);


console.log("categoe",categoryPageDetails.data);

  useEffect(() => {
    if (innerCategories?.categories && categoryPageDetails?.data?.inner_categories) {
      const selectedObjects = innerCategories.categories
        .filter((item) =>
          categoryPageDetails.data.inner_categories.includes(item.id.toString())
        )
        .map((item) => ({
          label: item.name,
          value: item.id
        }));


      setSelectedInnerCategories(selectedObjects); // use this if needed
    }
  }, [categoryPageDetails, innerCategories]);

  // Render a product selection section
  const renderProductSelectionSection = (
    sectionName,
    categoryIds,
    selectedTypes,
    setTypeFn,
    productsIds,
    matchedProductsList
  ) => {
    return (

      <>
        <div className="mb-[-10px] p-3">
          <Controller
            name={`${sectionName}_category_ids`}
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <MultiSelectComponentForProducts
                label="Category (required)"
                value={field.value || []}
                option={
                  (categories?.categories?.map((item) => ({
                    value: item.id,
                    label: item.name
                  }))) || []
                }
                {...field}
                isOptionDisabled={(option) =>
                  field.value?.length >= 5 &&
                  !field.value?.find(
                    (selected) => selected.value === option.value
                  )
                }
              />
            )}
          />
          {errors[`${sectionName}_category_ids`] && (
            <p className="text-red-500">
              {errors[`${sectionName}_category_ids`].message}
            </p>
          )}

          {categoriesError && (
            <p className="text-red-500">
              Either select rest categories or remove the rest selected categories
            </p>
          )}

          {categoryIds && categoryIds.length > 0 ? (
            <>
              <label>Select Product (If Select Manual)</label>
              <div className="mt-1 bg-white border-2 border-[#DFDFDF] rounded-lg w-[50%]">
                <div className="flex rounded-md py-[5px] border-[#DFDFDF] bg-[#F9F9FB] px-4 items-center cursor-pointer justify-between">
                  <div className="flex gap-2 w-[50%]">
                    {categoryIds.map((item) => (
                      <div
                        key={item.value}
                        onClick={() => setTypeFn(sectionName, item.value)}
                        className={`text-[13px] whitespace-nowrap font-light 
                          ${selectedTypes.includes(item.value)
                            ? `bg-[${COLORS.bgPrimary}] text-white`
                            : "bg-[#E2E2E2] text-[#616161]"
                          } rounded-[5px] p-2 flex items-center gap-2`}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          <div className="mt-3">
            {productLoader ? (
              <Loader />
            ) : (
              <div className="mb-5">
                <Controller
                  name={`${sectionName}_products_ids`}
                  control={control}
                  rules={{ required: "Products is required" }}
                  render={({ field }) => (
                    <MultiSelectComponentForProducts
                      label="Products (required)"
                      option={
                        (sectionName === 'top_picks' && topPicksAllProducts?.map((item) => ({
                          value: item.id + ',' + parseInt(item.category_id),
                          label: item.sku
                        }))) ||
                        (sectionName === 'top_deals' && topDealsAllProducts?.map((item) => ({
                          value: item.id + ',' + parseInt(item.category_id),
                          label: item.sku
                        }))) ||
                        (sectionName === 'explore' && allProducts?.map((item) => ({
                          value: item.id + ',' + parseInt(item.category_id),
                          label: item.sku
                        }))) ||
                        (sectionName === 'new_release' && newReleaseAllProducts?.map((item) => ({
                          value: item.id + ',' + parseInt(item.category_id),
                          label: item.sku
                        }))) ||
                        (sectionName === 'you_may_also_like' && youMayAlsoLikeAllProducts?.map((item) => ({
                          value: item.id + ',' + parseInt(item.category_id),
                          label: item.sku
                        }))) ||
                        (sectionName === 'inspired_by_history' && inspiredByHistoryAllProducts?.map((item) => ({
                          value: item.id + ',' + parseInt(item.category_id),
                          label: item.sku
                        }))) || []
                      }
                      {...field}
                    />
                  )}
                />
                {errors[`${sectionName}_products_ids`] && (
                  <p className="text-red-500">
                    {errors[`${sectionName}_products_ids`].message}
                  </p>
                )}
              </div>
            )}

            <div className="mb-[10px] p-4">
              <div className="grid grid-cols-5 gap-4">
                {matchedProductsList &&
                  matchedProductsList.map((item) => (
                    <CommonMediaInput
                      key={item.id}
                      showInput={false}
                      showName={true}
                      name={item.name}
                      image={item.image}
                      sku={item.sku}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };


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

            <CollapseComponent title="Banner Section" errors={errors}>
              <InputComponent
                bgTransparent={true}
                label="Banner Title"
                type="text"
                name="banner_title"
                placeholder="Text Field"
                {...register("banner_title", { required: "Title name is required" })}
              />

              <CommonTextAreaComponent
                bgTransparent={true}
                label="Banner Description"
                type="text"
                name="banner_description"
                placeholder="Text Field"
                {...register("banner_description", { required: "Banner description is required" })}
              />

              <InputComponent
                bgTransparent={true}
                label="Banner Link"
                type="text"
                name="banner_link"
                placeholder="Enter link"
                {...register("banner_link", { required: "Banner link is required" })}
              />
              <SingleSelectImage

                title="Banner Image"
                fileLength={1}
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="banner_image"
                notInArray={true}
                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                selectedAltText={categoryPageDetails?.data?.banner_image_alt}
                selectedFileName={categoryPageDetails?.data?.banner_image_file_name}
                selectedBanner={
                  categoryPageDetails && categoryPageDetails?.data?.banner_image
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />



              <div className="bg-white mt-[10px]">
                <div className="rounded-lg">
                  <div className="mb-5">
                    <Controller
                      name="inner_categories"
                      control={control}

                      rules={{ required: "Inner categories are required" }}
                      render={({ field }) => (
                        <MultiSelectComponent
                          label="Inner categories (required)"
                          defaultValues={selectedInnerCategories}
                          option={
                            (innerCategories?.categories) || []
                          }
                          {...field}
                        />
                      )}
                    />
                    {errors.inner_categories && (
                      <p className="text-red-500">
                        {errors.inner_categories.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CollapseComponent>

            <CollapseComponent title="Mega Deals Section">
              <InputComponent
                bgTransparent={true}
                label="Title"
                type="text"
                name="section_title"
                placeholder="Title"
                {...register("section_title", { required: "Mega deals title is required" })}
              />
              <CommonTextAreaComponent
                bgTransparent={true}
                label="Description"
                type="text"
                name="section_description"
                placeholder="Text Field (Limit 60)"
                {...register("section_description", { required: "Mega description is required" })}
              />


              <CategoryMedia
                title="Mega Deals Images"
                fileLength={6}
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="mega_deals"
                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                selectedAltText={categoryPageDetails?.data?.six_images_alt}
                selectedFileName={categoryPageDetails?.data?.six_images_file_name}
                selectedBanner={
                  categoryPageDetails && categoryPageDetails?.data?.six_images
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />


            </CollapseComponent>

            <CollapseComponent title="Extra Banners Section">
              <CategoryMedia
                title="Extra Banner Images"
                fileLength={4}
                fileName={true}
                altText={true}
                control={control}
                register={register}
                setValue={setValue}
                namePrefix="extra_banner"
                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                selectedAltText={categoryPageDetails?.data?.four_banners_alt}
                selectedFileName={categoryPageDetails?.data?.four_banners_file_name}
                selectedBanner={
                  categoryPageDetails && categoryPageDetails?.data?.four_banners
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>

            <CollapseComponent title="Brand Section">
              <InputComponent
                bgTransparent={true}
                label="Brand Heading"
                type="text"
                name="brand_heading"
                placeholder="Title"
                {...register("brand_heading", { required: "Brand heading is required" })}
              />
              <CommonTextAreaComponent
                bgTransparent={true}
                label="Brand Description"
                type="text"
                name="brand_description"
                placeholder="Text Field (Limit 60)"
                {...register("brand_description", { required: "Brand description is required" })}
              />



              <CategoryMedia
                title="Brand Images"
                fileLength={12}
                fileName={true}
                altText={true}
                control={control}
                setValue={setValue}
                register={register}
                namePrefix="brand_images"
                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                selectedAltText={!!categoryPageDetails && categoryPageDetails?.data?.twelve_images_alt}
                selectedFileName={categoryPageDetails?.data?.twelve_images_file_name}
                selectedBanner={
                  categoryPageDetails && categoryPageDetails?.data?.twelve_images
                }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>

            <CollapseComponent title="Top Picks Section" errors={errors}>
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  {renderProductSelectionSection(
                    'top_picks',
                    top_picks_category_id,
                    topPicksSelectedType,
                    setTypeFunction,
                    top_picks_products_id,
                    matchedProductsForTopPicks
                  )}
                </div>
              </div>
            </CollapseComponent>

            <CollapseComponent title="Top Deals Section" errors={errors}>
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  {renderProductSelectionSection(
                    'top_deals',
                    top_deals_category_id,
                    topDealsSelectedType,
                    setTypeFunction,
                    top_deals_products_id,
                    matchedProductsForTopDeals
                  )}
                </div>
              </div>
            </CollapseComponent>

            <CollapseComponent title="Explore Section">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  {renderProductSelectionSection(
                    'explore',
                    category_id,
                    selectedType,
                    setTypeFunction,
                    products_ids,
                    matchedProducts
                  )}
                </div>
              </div>
            </CollapseComponent>

            <CollapseComponent title="New Release Section">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  {renderProductSelectionSection(
                    'new_release',
                    new_release_category_id,
                    newReleaseSelectedType,
                    setTypeFunction,
                    new_release_products_ids,
                    matchedProductsForNewRelease
                  )}
                </div>
              </div>
            </CollapseComponent>

            <CollapseComponent title="Products You May Also Like Section">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  {renderProductSelectionSection(
                    'you_may_also_like',
                    you_may_also_like_category_id,
                    youMayAlsoLikeSelectedType,
                    setTypeFunction,
                    you_may_also_like_products_ids,
                    matchedProductsForYouMayAlsoLike
                  )}
                </div>
              </div>
            </CollapseComponent>

            <CollapseComponent title="Inspired By Browsing History">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  {renderProductSelectionSection(
                    'inspired_by_history',
                    inspired_by_history_category_id,
                    inspiredByHistorySelectedType,
                    setTypeFunction,
                    inspired_by_history_products_ids,
                    matchedProductsForInspiredByHistory
                  )}
                </div>
              </div>
            </CollapseComponent>
          </div>
        </form>
      )}
    </>
  );
};

export default React.memo(Categories);