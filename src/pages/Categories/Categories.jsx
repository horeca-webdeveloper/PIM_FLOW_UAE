import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollapseComponent from "../../components/common/CollapseComponent";
import {
  useFetchBrands,
  useFetchCategoriesAttributes,
  useFetchStore,
} from "../../services/apis/Products/Hooks";
import Loader from "../../utils/Loader";
import CategoryHeader from "../../components/ui/Categories/CategoryHeader";
import CategoryMedia from "../../components/ui/Categories/CategoryMedia";
import InputComponent from "../../components/common/InputComponent";
import TextAreasComponent from "../../components/common/TextAreasComponent";
import SelectComponent from "../../components/common/SelectComponent";
import CommonMediaInput from "../../components/common/CommonMediaInput";
import SeoComponent from "../../components/common/SeoComponent";

const Categories = () => {
  const location = useLocation();
  const id = location?.pathname?.split("/")[2];
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchCategoriesAttributes({
    id: id,
    attr_type: "All",
  });

  const {
    data: brandsData,
    isLoading: brandIsLoading,
    error: brandError,
  } = useFetchBrands();

  const brandOptions = brandsData?.brands
    ? Object.entries(brandsData.brands).map(([id, name]) => ({
        value: name, // ✅ Store ID as value (corrected)
        label: id, // ✅ Store Name as label
      }))
    : [];

  const {
    data: storeData,
    isLoading: StoreIsLoading,
    error: StoreError,
  } = useFetchStore();

  const storeOptions = storeData?.stores
    ? Object.entries(storeData.stores).map(([id, name]) => ({
        value: name, // ✅ Store ID as value (corrected)
        label: id, // ✅ Store Name as label
      }))
    : [];

  // States for each section
  const [generalData, setGeneralData] = useState({
    sku: "",
    barcode: "",
    warranty_information: "",
    refund: [],
    refundValue: "",
    categories: [],
  });
  const [inventoryStockManagement, setInventoryStockManagement] = useState({
    quantity: "",
    allow_checkout_when_out_of_stock: 0,
    allow_checkout_when_out_of_stock_value: false,
    with_storehouse_management: 0,
    with_storehouse_management_value: false,
    stock_status: "",
    stock_status_value: "",
    variant_inventory_tracker: "",
    variant_inventory_quantity: "",
    variant_inventory_policy: "",
    variant_fulfillment_service: "",
  });
  const [pricingSales, setPricingSales] = useState({
    price: "",
    sale_price: "",
    sale_type: "",
    cost_per_item: "",
    tax: [],
    taxValue: "",
    currency_id: "",
    minimum_order_quantity: "",
    maximum_order_quantity: "",
    approved_by: "",
    currency: [],
  });
  const [marketingData, setMarketingData] = useState({
    name: "",
    content: "",
    description: "",
  });
  const [mediaData, setMediaData] = useState({
    images: "",
    image: "",
    video_url: "",
    video_path: "",
    documents: "",
  });
  const [shippingDimension, setShippingDimension] = useState({
    length: "",
    length_unit_id: "",
    width: "",
    shipping_length_value: "",
    height: "",
    depth: "",
    weight: "",
    weight_unit_id: "",
    shipping_weight_option: "",
    shipping_weight_option_value: "",
    shipping_dimension_option_value: "",
    shipping_weight: "",
    shipping_dimension_option: "",
    shipping_width: "",
    shipping_depth: "",
    shipping_height: "",
    shipping_length: "",
    shipping_length_id: "",
    length_unit: "",
    length_unit_value: "",
    weight_unit: "",
    shipping_length_unit: "",
  });
  const [productVariation, setProductVariation] = useState({
    is_variation: "",
    is_Variation_Value: true,
    variant_requires_shipping_Value: true,
    variant_grams: "",
    variant_requires_shipping: "",
    variant_barcode: "",
    variant_color_title: "",
    variant_color_value: "",
  });
  const [storeVendor, setStoreVendor] = useState({
    store_id: "",
    brand_id: "",
    created_by_id: "",
    created_by_type: "",
    store: "",
    brand: "",
    creator: "",
  });
  const [performanceAnalytics, setPerformanceAnalytics] = useState({
    views: "",
    units_sold: "",
    frequently_bought_together: "",
  });
  const [comparisonBundling, setComparisonBundling] = useState({
    compare_type: "",
    compare_products: "",
  });
  const [seoData, setSeoData] = useState({
    google_shopping_category: "",
    google_shopping_mpn: "",
    seo_meta_data: "",
  });

  // Effect to update state when API data is available
  useEffect(() => {
    if (data?.product) {
      setMediaData({
        images: data.product.images,
        image: data.product.image,
        video_url: data.product.video_url,
        video_path: data.product.video_path,
        documents: data.product.documents,
      });

      setSeoData({
        google_shopping_category: data.product.google_shopping_category,
        google_shopping_mpn: data.product.google_shopping_mpn,
        seo_meta_data: data.product.seo_meta_data,
      });
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[100vh] bg-[#F1F1F1]">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen">
          <CategoryHeader updateProductLoading={updateLoading} />
          <CollapseComponent title="Hero Section">
            <CategoryMedia
              title="Page Top Banners For Desktop"
              fileName={true}
              altText={true}
              spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
            <CategoryMedia
              title="Page Top Banners For Desktop"
              fileName={true}
              altText={true}
              spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
          </CollapseComponent>

          <CollapseComponent title="Mega Deals Section">
            <InputComponent
              label="First Heading"
              type="text"
              name="text"
              placeholder="Text Field"
            />
            <TextAreasComponent
              label="Heading Description"
              type="text"
              name="description"
              placeholder="Text Field (Limit 60)"
            />

            <CategoryMedia
              title="Upload Images"
              altText={true}
              spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
          </CollapseComponent>

          <CollapseComponent title="Top Pick Section">
            <div className="bg-white mt-[-20px]">
              <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                Select Product (If Select Manual)
              </p>
              <div className="border-2 rounded-lg border-dashed">
                <>
                  <div className="m-2 p-3">
                    <SelectComponent
                      label="Select Brand"
                      type="text"
                      name="brand"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select Product"
                      type="text"
                      name="product"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select By"
                      type="text"
                      name="product"
                      defaultOption="If Automatic Select (Popular,Best Sellet, etc)"
                      placeholder="Text Field"
                    />
                  </div>

                  <div className="mb-[10px] p-4">
                    <div className="grid grid-cols-5 gap-4">
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                    </div>
                  </div>
                </>
              </div>
            </div>
          </CollapseComponent>

          <CollapseComponent title="Website Banners">
            <CategoryMedia
              title="Page Top Banners For Desktop"
              fileName={true}
              altText={true}
              spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
            <CategoryMedia
              title="Page Top Banners For Desktop"
              fileName={true}
              altText={true}
              spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
          </CollapseComponent>

          <CollapseComponent title="Top Deals Section">
            <div className="bg-white mt-[-20px]">
              <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                Section Details
              </p>
              <div className="border-2 rounded-lg border-dashed">
                <>
                  <div className="m-2 p-3">
                    <SelectComponent
                      label="Select Category"
                      type="text"
                      name="brand"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select Product"
                      type="text"
                      name="product"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select By"
                      type="text"
                      name="product"
                      defaultOption="If Automatic Select (Popular,Best Sellet, etc)"
                      placeholder="Text Field"
                    />
                  </div>

                  <div className="mb-[10px] p-4">
                    <div className="grid grid-cols-5 gap-4">
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
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
                  <div className="m-2 p-3">
                    <SelectComponent
                      label="Select Category"
                      type="text"
                      name="category"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select Product"
                      type="text"
                      name="product"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select By"
                      type="text"
                      name="product"
                      defaultOption="If Automatic Select (Popular,Best Sellet, etc)"
                      placeholder="Text Field"
                    />
                  </div>

                  <div className="mb-[10px] p-4">
                    <div className="grid grid-cols-5 gap-4">
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
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
                  <div className="m-2 p-3">
                    <SelectComponent
                      label="Select Category"
                      type="text"
                      name="category"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select Product"
                      type="text"
                      name="product"
                      placeholder="Text Field"
                    />
                    <SelectComponent
                      label="Select By"
                      type="text"
                      name="product"
                      defaultOption="If Automatic Select (Popular,Best Sellet, etc)"
                      placeholder="Text Field"
                    />
                  </div>

                  <div className="mb-[10px] p-4">
                    <div className="grid grid-cols-5 gap-4">
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                    </div>
                  </div>
                </>
              </div>
            </div>
          </CollapseComponent>

          <CollapseComponent title="Official Brand Stores">
            <div className="bg-white mt-[-20px]">
              <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                Section Details
              </p>
              <div className="border-2 rounded-lg border-dashed">
                <>
                  <div className="mb-[10px] p-4">
                    <div className="grid grid-cols-5 gap-4">
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                      <CommonMediaInput showInput={false} />
                    </div>
                  </div>
                </>
              </div>
            </div>
          </CollapseComponent>
          <CollapseComponent title="SEO Attributes">
            <SeoComponent seo={seoData} setSeo={setSeoData} />
          </CollapseComponent>
        </div>
      )}
    </>
  );
};

export default React.memo(Categories);
