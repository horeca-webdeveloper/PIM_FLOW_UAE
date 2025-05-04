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
import TextAreasComponent from "../../components/common/TextAreasComponent";
import MultiSelectComponentForProducts from "../../components/common/MultiSelectComponentForProducts";
const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state.datas.category.label;
  const id = location.state.datas.category.value;
  const uid = location.state.datas.uid;
  const [attributeByCategory, setAttributeByCategory] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);

  const [selectedType, setSelectedType] = useState([]);
  const [products, setProducts] = useState([]);
  const [response, setResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [matchedProductsForTopPicks, setMatchedProductsForTopPicks] = useState([]);
  const [matchedProductsForTopDeals, setMatchedProductsForTopDeals] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryDetails, setCategoriesDetails] = useState([]);
  const [innerCategories, setInnerCategory] = useState([]);
  const [seoData, setSeoData] = useState([]);
  const [productLoader, setProductLoader] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [topPicksAllProducts, setTopPicksAllProducts] = useState([]);
  const [topDealsAllProducts, setTopDealsAllProducts] = useState([]);
  const [topPicksselectedType, setTopPicksSelectedType] = useState([]);
  const [topDealselectedType, setTopDealSelectedType] = useState([]);
  const setTypeFunction = async (name, type) => {

    if (name === 'top_picks') {
      setTopPicksSelectedType((topPicksselectedType) => {
        const updated = topPicksselectedType.includes(type)
          ? topPicksselectedType
          : [...topPicksselectedType, type];

        return updated;
      });
    }
    if (name === 'top_deals') {
      setTopDealSelectedType((topDealselectedType) => {
        const updated = topDealselectedType.includes(type)
          ? topDealselectedType
          : [...topDealselectedType, type];

        return updated;
      });
    }

    try {
      setProductLoader(true);
      const response = await apiClient.get(`/products/category/${type}`);

      if(name=='top_picks'){
        updateProductsByType(setTopPicksAllProducts,topPicksAllProducts,response.data.data);
      }
      if(name=='top_deals'){
        updateProductsByType(setTopDealsAllProducts,topDealsAllProducts,response.data.data);
      }
    
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      notify(errorMessage)

    } finally {
      setProductLoader(false);
    }

    //  const response= await Apis.fetchProductByCategory(type, setProductLoader, setProducts);

   

  };


 const updateProductsByType=(statFun,prodstates,products)=>{
   
  statFun((prodstates) => {
      const existingIds = new Set(prodstates.map(p => p.category_id));
      const newProducts = products.filter(
        product => !existingIds.has(product.category_id)
      );

      const updated = [...prodstates, ...newProducts];

      return updated;
    });
 
 }


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
    formState: { errors },
  } = useForm();

  const top_picks_category_id = watch("top_picks_category_ids", "");
  const top_deals_category_id = watch("top_deals_category_ids", "");
  const category_id = watch("category_ids", "");
  const top_pics_products_id = watch("top_pics_products_ids", "");
  const top_deals_products_id = watch("top_deals_products_ids", "");

  const onSubmit = () => {

  };

  useEffect(() => {
    Apis.getAttributesByCategory(id, setLoader, setAttributeByCategory);
    Apis.productByCategory(id, setLoader, setProductByCategory);
    Apis.fetchCategories(setLoader, setCategories);
    Apis.fetchInnerCategories(id, setLoader, setInnerCategory);
  }, [id]);

  useEffect(() => {
    if (top_pics_products_id?.length > 0 && topPicksAllProducts?.length > 0) {
      const selectedProductIds = top_pics_products_id.map((p) => p.value.split(',')[0]);
      const matched = topPicksAllProducts.filter((product) =>
        selectedProductIds.includes(String(product.id))
      );
  
      setMatchedProductsForTopPicks(matched);
    }

    if (top_deals_products_id?.length > 0 && topDealsAllProducts?.length > 0) {
      const selectedProductIds = top_deals_products_id.map((p) => p.value.split(',')[0]);
      const matched = topDealsAllProducts.filter((product) =>
        selectedProductIds.includes(String(product.id))
      );
  
      setMatchedProductsForTopDeals(matched);
    }
  }, [top_pics_products_id,top_deals_products_id, topPicksAllProducts,topDealsAllProducts]);
console.log("top_deals",top_deals_products_id);

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
                name="title"
                placeholder="Text Field"
              />
              <TextAreasComponent
                bgTransparent={true}
                label="Banner  Description"
                type="text"
                name="description"
                placeholder="Text Field (Limit 60)"
              />
              <InputComponent
                bgTransparent={true}
                label="Banner Link"
                type="text"
                name="banner_link"
                placeholder="Enter link"
              />
              <CategoryMedia
                title="Banner Image"
                fileLength={1}
                fileName={true}
                altText={true}
                control={control}
                register={register}
                namePrefix="banner_image"
                // selectedBanner={
                //   brandPageDetails && brandPageDetails?.page_top_banners_desktop
                // }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />


              <div className="bg-white mt-[10px]">
                <div className="rounded-lg ">
                  <>
                    <div className="mb-5">
                      <Controller
                        name="inner_categories"
                        control={control}
                        rules={{ required: "Inner categories are required" }}
                        render={({ field }) => (
                          <MultiSelectComponent
                            label="Inner categories (required)"
                            option={
                              (!!innerCategories &&
                                innerCategories?.categories) ||
                              []
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

                    {/* <div className="mb-[10px] p-4">
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
                    </div> */}
                  </>
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
              />
              <TextAreasComponent
                bgTransparent={true}
                label="Description"
                type="text"
                name="section_description"
                placeholder="Text Field (Limit 60)"
              />

              <CategoryMedia
                title="Mega Deals Images"
                fileLength={6}
                fileName={true}
                altText={true}
                control={control}
                register={register}
                namePrefix="mega_deals"
                // selectedBanner={
                //   brandPageDetails && brandPageDetails?.page_top_banners_desktop
                // }
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
                namePrefix="extra_banner"
                // selectedBanner={
                //   brandPageDetails && brandPageDetails?.page_top_banners_desktop
                // }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>

            <CollapseComponent title="Brand  Section">
              <InputComponent
                bgTransparent={true}
                label="Brand Heading"
                type="text"
                name="brand_heading"
                placeholder="Title"
              />
              <TextAreasComponent
                bgTransparent={true}
                label="Brand Description"
                type="text"
                name="brand_description"
                placeholder="Text Field (Limit 60)"
              />

              <CategoryMedia
                title="Mega Deals Images"
                fileLength={12}
                fileName={true}
                altText={true}
                control={control}
                register={register}
                namePrefix="mega_deals"
                // selectedBanner={
                //   brandPageDetails && brandPageDetails?.page_top_banners_desktop
                // }
                spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              />
            </CollapseComponent>



            <CollapseComponent title="Top Picks Section" errors={errors}>
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-[-10px] p-3 ">
                      <Controller
                        name="top_picks_category_ids"
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
                      {errors.top_picks_category_ids && (
                        <p className="text-red-500">
                          {errors.top_picks_category_ids.message}
                        </p>
                      )}

                      {categoriesError && (
                        <p className="text-red-500">
                          Either select rest categories or remove the rest selected categories
                        </p>
                      )}
                      {!!top_picks_category_id && top_picks_category_id.length > 0 ? (
                        <>
                          <label>Select Product (If Select Manual)</label>
                          <div className="mt-1 bg-white border-2 border-[#DFDFDF] rounded-lg w-[50%]">
                            {/* Header (Click to Expand/Collapse) */}
                            <div className="flex rounded-md py-[5px] border-[#DFDFDF] bg-[#F9F9FB] px-4 items-center cursor-pointer justify-between">
                              {/* Left Side (Options) */}
                              <div className="flex gap-2 w-[50%]">
                                {top_picks_category_id &&
                                  top_picks_category_id.map((item) => (
                                    <div
                                      key={item.value}
                                      onClick={() =>
                                        setTypeFunction('top_picks', item.value)
                                      }
                                      className={`text-[13px] whitespace-nowrap  font-light text-[${item.textColor
                                        }] ${topPicksselectedType.includes(item.value)
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
                                name="top_pics_products_ids"
                                control={control}
                                rules={{ required: "Products is required" }}
                                render={({ field }) => (
                                  <MultiSelectComponentForProducts
                                    label="Products (required)"
                                    option={
                                      (!!topPicksAllProducts && topPicksAllProducts?.map((item) => ({
                                        value: item.id + ',' + parseInt(item.category_id),
                                        label: item.sku
                                      }))) || []
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
                          )}

                          <div className="mb-[10px] p-4">
                            <div className="grid grid-cols-5 gap-4">
                              {!!matchedProductsForTopPicks &&
                                matchedProductsForTopPicks.map((item) => {
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

            <CollapseComponent title="Top Deals Section" errors={errors}>
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-[-10px] p-3 ">
                      <Controller
                        name="top_deals_category_ids"
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
                      {errors.top_deals_category_ids && (
                        <p className="text-red-500">
                          {errors.top_deals_category_ids.message}
                        </p>
                      )}

                      {categoriesError && (
                        <p className="text-red-500">
                          Either select rest categories or remove the rest selected categories
                        </p>
                      )}
                      {!!top_deals_category_id && top_deals_category_id.length > 0 ? (
                        <>
                          <label>Select Product (If Select Manual)</label>
                          <div className="mt-1 bg-white border-2 border-[#DFDFDF] rounded-lg w-[50%]">
                            {/* Header (Click to Expand/Collapse) */}
                            <div className="flex rounded-md py-[5px] border-[#DFDFDF] bg-[#F9F9FB] px-4 items-center cursor-pointer justify-between">
                              {/* Left Side (Options) */}
                              <div className="flex gap-2 w-[50%]">
                                {top_deals_category_id &&
                                  top_deals_category_id.map((item) => (
                                    <div
                                      key={item.value}
                                      onClick={() =>
                                        setTypeFunction('top_deals', item.value)
                                      }
                                      className={`text-[13px] whitespace-nowrap  font-light text-[${item.textColor
                                        }] ${topDealselectedType.includes(item.value)
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
                                name="top_deals_products_ids"
                                control={control}
                                rules={{ required: "Products is required" }}
                                render={({ field }) => (
                                  <MultiSelectComponentForProducts
                                    label="Products (required)"
                                    option={
                                      (!!topDealsAllProducts && topDealsAllProducts?.map((item) => ({
                                        value: item.id + ',' + parseInt(item.category_id),
                                        label: item.sku
                                      }))) || []
                                    }
                                    {...field}
                                  />
                                )}
                              />
                              {errors.top_deals_products_ids && (
                                <p className="text-red-500">
                                  {errors.top_deals_products_ids.message}
                                </p>
                              )}
                            </div>
                          )}

                          <div className="mb-[10px] p-4">
                            <div className="grid grid-cols-5 gap-4">
                              {!!matchedProductsForTopDeals &&
                                matchedProductsForTopDeals.map((item) => {
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
           
            <CollapseComponent title="Explore Section">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-[-10px] p-3 ">
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
            <CollapseComponent title="New Release Section">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-[-10px] p-3 ">
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

            <CollapseComponent title="Products You May Also Like Section">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-[-10px] p-3 ">
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

            <CollapseComponent title="Inspired By Browsing History">
              <div className="bg-white mt-[-20px]">
                <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                  Section Details
                </p>
                <div className="border-2 rounded-lg border-dashed">
                  <>
                    <div className="mb-[-10px] p-3 ">
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
            {/* 
            <SeoManagement
              manageSeoProduct={manageSeoProduct}
              setManageSeoProduct={setManageSeoProduct}
            /> */}

            {/* <CollapseComponent title="SEO Attributes">
              <SeoComponent seo={seoData} setSeo={setSeoData} />
            </CollapseComponent> */}
          </div>
        </form>
      )}
    </>
  );
};

export default React.memo(Categories);
