import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/ui/Products/ProductsAttribute/SEO";
import CollapseComponent from "../../components/common/CollapseComponent";
import AddProductsHeader from "../../components/ui/Products/AddProductsHeader";
import { COLORS } from "../../utils/colors";
import {
  useFetchBrands,
  useFetchCategoriesAttributes,
  useFetchStore,
  useUpdateProduct,
} from "../../services/apis/Products/Hooks";
import Loader from "../../utils/Loader";
import toast from "react-hot-toast";
import CategoryHeader from "../../components/ui/Categories/CategoryHeader";
import CategoryMedia from "../../components/ui/Categories/CategoryMedia";
import InputComponent from "../../components/common/InputComponent";
import TextAreasComponent from "../../components/common/TextAreasComponent";
import SelectComponent from "../../components/common/SelectComponent";
import CommonMediaInput from "../../components/common/CommonMediaInput";
import SeoComponent from "../../components/common/SeoComponent";
import CommonMultiKeywordInput from "../../components/common/CommonMultiKeywordInput";
import CategoriesSectionComponent from "../../components/common/CategoriesSectionComponent";
import BrandHeader from "../../components/ui/Brand/BrandHeader";
const BrandCustomizationThird = () => {
  const [selectedType, setSelectedType] = useState('Option1');
  const options = [
    {
      'label': 'Option1',
      'link': '',
      'icon': '',
      'type': 'button',
      'icon': 'icons/import.png',
      'textColor': 'white',
      'fontSize': '14px',
      'fontWeight': 'normal'
    },
    {
      'label': 'Option2',
      'popup': true,
      'icon': 'icons/download.png',
      'type': 'button',
      'textColor': 'white',
      'textSize': '14px',
      'fontWeight': 'normal'
    },
    {
      'label': 'Option3',
      'popup': true,
      'icon': 'icons/download.png',
      'type': 'button',
      'textColor': 'white',
      'textSize': '14px',
      'fontWeight': 'normal'
    }, {
      'label': 'Option4',
      'popup': true,
      'icon': 'icons/download.png',
      'type': 'button',
      'textColor': 'white',
      'textSize': '14px',
      'fontWeight': 'normal'
    }, {
      'label': 'Option5',
      'popup': true,
      'icon': 'icons/download.png',
      'type': 'button',
      'textColor': 'white',
      'textSize': '14px',
      'fontWeight': 'normal'
    }

  ];


  const [secondaryKeywords, setSecondaryKeywords] = useState([
    "Keyword One",
    "Keyword Two",
  ]);
  const location = useLocation();
  const id = location?.pathname?.split("/")[2];

  const [updateLoading, setUpdateLoading] = useState(false);

  const navigate = useNavigate();

  const {
    mutate,
    isLoading: updateProductLoading,
    error: updateProductError,
  } = useUpdateProduct();

  const handleCreateProduct = () => {
    setUpdateLoading(true);
    const payload = {
      // Handle General Data
      id: id,
      sku: generalData?.sku || "",
      barcode: generalData?.barcode || "",
      warranty_information: generalData?.warranty_information || "",
      refund:
        generalData?.refundValue == "Non-Refundable"
          ? 1
          : generalData?.refundValue == "15 Days Refund"
            ? 2
            : generalData?.refundValue == "15 Days Refund"
              ? 3
              : "",

      // Marketing
      name: marketingData?.name || "",
      content: marketingData?.content || "",
      description: marketingData?.description || "",

      //
      order: generalData?.order || 1,
      box_quantity: generalData?.boxQuantity || 0,
      delivery_days: generalData?.deliveryDays || 0,

      // Handle inventory Management
      quantity: inventoryStockManagement?.quantity || 0,
      allow_checkout_when_out_of_stock:
        inventoryStockManagement?.allow_checkout_when_out_of_stock_value == true
          ? 1
          : 0 || 0,
      with_storehouse_management:
        inventoryStockManagement?.with_storehouse_management_value == true
          ? 1
          : 0 || 0,
      stock_status:
        inventoryStockManagement?.stock_status_value === 1
          ? "In Stock"
          : inventoryStockManagement?.stock_status_value === 2
            ? "Out of Stock"
            : inventoryStockManagement?.stock_status_value === 3
              ? "Pre Order"
              : 1, // Fallback if no match

      variant_inventory_tracker:
        inventoryStockManagement?.variant_inventory_tracker || "shopify",
      variant_inventory_quantity:
        inventoryStockManagement?.variant_inventory_quantity || 0,
      variant_inventory_policy:
        inventoryStockManagement?.variant_inventory_policy || "deny",
      variant_fulfillment_service:
        inventoryStockManagement?.variant_fulfillment_service || "manual",

      // Handle Pricing and Sales
      price: pricingSales?.price || 0,
      sale_price: pricingSales?.sale_price || 0,
      sale_type: pricingSales?.sale_type || 0,
      cost_per_item: pricingSales?.cost_per_item || 0,
      tax_id:
        pricingSales?.taxValue == "VAT"
          ? 1
          : pricingSales?.taxValue == "None"
            ? 2
            : pricingSales?.taxValue == "Import Tax" || null,
      currency_id:
        pricingSales?.currencyValue === "USD"
          ? 1
          : pricingSales?.currencyValue === "EUR"
            ? 2
            : pricingSales?.currencyValue === "VND"
              ? 3
              : pricingSales?.currencyValue === "NGN"
                ? 4
                : pricingSales?.currencyValue === "AED"
                  ? 5
                  : pricingSales?.currencyValue === "SAR"
                    ? 6
                    : null,
      minimum_order_quantity: pricingSales?.minimum_order_quantity || 1,
      maximum_order_quantity: pricingSales?.maximum_order_quantity || 10,

      // This one is for mediaData
      images: mediaData?.images || [],
      image: mediaData?.mainImage || "",
      video_url: mediaData?.video_url || "",
      video_path: mediaData?.video_path || "",
      documents: mediaData?.documents || [],

      // Shipping Data
      length: shippingDimension?.length || 0,
      length_unit_id: 1,
      width: shippingDimension?.width || 0,
      height: shippingDimension?.height || 0,
      depth: shippingDimension?.depth || 0,
      weight: shippingDimension?.weight || 0,
      weight_unit_id: shippingDimension?.weight_unit_id || null,
      shipping_weight_option: "lbs",
      // shippingDimension?.shipping_weight_option_value == true ? 1 : 0 || 0,
      shipping_weight: shippingDimension?.shipping_weight || 0,
      shipping_dimension_option: "inch",
      shipping_width: shippingDimension?.shipping_width || 0,
      shipping_depth: shippingDimension?.shipping_depth || 0,
      shipping_height: shippingDimension?.shipping_height || 0,
      shipping_length: 0,
      shipping_length_id: "",

      // Product Variation Data
      is_variation: productVariation?.is_Variation_Value == true ? 1 : 0 || 0,
      variant_grams: productVariation?.variant_grams || 0,
      variant_requires_shipping:
        productVariation?.variant_requires_shipping_Value == true ? 1 : 0 || 1,
      variant_barcode: productVariation?.variant_barcode || "",
      variant_color_title: productVariation?.variant_color_title || "",
      variant_color_value: productVariation?.variant_color_value || "",

      // Store Vendor
      store_id: storeMapping[storeVendor?.storeValue] || null,
      brand_id: brandMapping[storeVendor?.brandValue] || null,

      // Performance Analytics
      views: performanceAnalytics?.views || 0,
      units_sold: performanceAnalytics?.units_sold || 0,
      frequently_bought_together:
        comparisonBundling?.frequently_bought_together || [],

      // Comparison Bundling
      compare_type: ["similar", "better"],
      compare_products: comparisonBundling?.compare_products || [],

      //  seo
      google_shopping_category: seoData?.google_shopping_category || "",
      google_shopping_mpn: seoData?.google_shopping_mpn || "",
    };
    mutate(payload, {
      onSuccess: (data) => {
        setUpdateLoading(false);
        toast.success("Product Updated Successfully");
        navigate(`/Products`);
      },
      onError: (err) => {
        console.log(err);
        alert("Failed to create product: " + err.message);
      },
    });
  };

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

  // Store Mapping
  const storeMapping = {
    "Amir Enteprises (Testing )": 1,
    "Arctic Air": 7,
    Atosa: 8,
    "American Dish Service": 16,
    Atosa: 17,
    Cadco: 18,
    "CMA Dishmachine": 19,
    Everest: 20,
    Midea: 21,
    Migali: 22,
    "Serv-ware": 23,
    BakeMax: 26,
    "Yanco China": 27,
    Amana: 28,
    "Beverage-Air": 29,
    "CAC China": 30,
    Coolski: 31,
    "Dexter Russell": 32,
    "Don Bellini": 33,
    "Flash Furniture": 34,
  };

  const brandMapping = {
    "Arctic Air": 13,
    Atosa: 14,
    Amana: 18,
    "American Dish Service": 19,
    BakeMax: 20,
    "Beverage-Air": 21,
    "CAC China": 22,
    "CMA Dishmachine": 23,
    Coolski: 24,
    "Don Bellini": 25,
    Atosa: 26,
    Cadco: 27,
    Everest: 28,
    Midea: 29,
    Migali: 30,
    "Serv-ware": 31,
    "Bar Maid By Winco": 32,
    "Dexter Russell": 33,
    Duke: 34,
    "Flash Furniture": 35,
  };

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
      setGeneralData({
        sku: data.product.sku,
        barcode: data.product.barcode,
        warranty_information: data.product.warranty_information,
        refund: [
          { value: "Non-Refundable", label: "Non-Refundable" },
          { value: "15 Days Refund", label: "15 Days Refund" },
          { value: "90 Days Refund", label: "90 Days Refund" },
          ...(data.product.refund || []),
        ],
        refundValue: data?.product?.refund[0]?.value,
        categories: data.product.categories,
      });

      setInventoryStockManagement({
        quantity: data.product?.quantity,
        allow_checkout_when_out_of_stock:
          data.product?.allow_checkout_when_out_of_stock,
        with_storehouse_management: data.product?.with_storehouse_management,
        with_storehouse_management_value:
          data.product?.with_storehouse_management[0]?.enabled,
        allow_checkout_when_out_of_stock_value:
          data.product?.allow_checkout_when_out_of_stock[0]?.enabled,
        stock_status_value: inventoryStockManagement?.stock_status[0]?.status,
        stock_status: [
          { value: "In Stock", label: "2" },
          { value: "Out of Stock", label: "3" },
          { value: "Pre Order", label: "3" },
          ...(data.product.stock_status || []),
        ],
        variant_inventory_tracker: data.product?.variant_inventory_tracker,
        variant_inventory_quantity: data.product?.variant_inventory_quantity,
        variant_inventory_policy: data.product?.variant_inventory_policy,
        variant_fulfillment_service: data.product?.variant_fulfillment_service,
      });

      setPricingSales({
        price: data.product.price,
        sale_price: data.product.sale_price,
        sale_type: data.product.sale_type,
        cost_per_item: data.product.cost_per_item,
        tax: [
          { value: "VAT" },
          { value: "None" },
          { value: "Import Tax" },
          ...(data.product.tax || []),
        ],
        taxValue: data.product?.tax[0]?.rate,
        minimum_order_quantity: data.product.minimum_order_quantity,
        maximum_order_quantity: data.product.maximum_order_quantity,
        approved_by: data.product.approved_by,
        currencyValue: data.product?.currency[0]?.title,
        currency: [
          { value: "USD" },
          { value: "EUR" },
          { value: "VND" },
          { value: "NGN" },
          { value: "AED" },
          { value: "SAR" },
          ...(data.product.currency || []),
        ],
      });

      setMarketingData({
        name: data.product.name,
        content: data.product.content,
        description: data.product.description,
      });

      setMediaData({
        images: data.product.images,
        image: data.product.image,
        video_url: data.product.video_url,
        video_path: data.product.video_path,
        documents: data.product.documents,
      });

      setShippingDimension({
        length: data.product.length || "",
        length_unit_id: data.product.length_unit_id || "",
        width: data.product.width || "",
        height: data.product.height || "",
        depth: data.product.depth || "",
        weight: data.product.weight || "",
        weight_unit_id: data.product.weight_unit_id || "",
        shipping_weight_option: [
          { value: "LBS" },
          { value: "KG" },
          { value: "Grams" },
          ...(data.product.shipping_weight_option || []),
        ],

        shipping_weight: data.product.shipping_weight || "",
        shipping_dimension_option: [
          { value: "INCH" },
          { value: "CM" },
          { value: "MM" },
          ...(data.product.shipping_dimension_option || []),
        ],
        shipping_width: data.product.shipping_width || "",
        shipping_depth: data.product.shipping_depth || "",
        shipping_height: data.product.shipping_height || "",
        shipping_length: data.product.shipping_length || "",
        shipping_length_id: data.product.shipping_length_id || "",
        length_unit_value:
          data.product?.length_unit[0]?.symbol == "cm"
            ? 1
            : data.product?.length_unit[0]?.symbol == "inch"
              ? 3
              : data.product?.length_unit[0]?.symbol == "mm"
                ? 11
                : 1,
        length_unit: [
          { value: "cm" },
          { value: "inch" },
          { value: "mm" },
          ...(data.product.length_unit || []),
        ],
        weight_unit_value: data.product?.weight_unit[0]?.symbol,
        weight_unit: [
          { value: "lg" },
          { value: "g" },
          { value: "lbs" },
          ...(data.product.weight_unit || []),
        ],
        shipping_weight_option_value:
          data.product?.shipping_weight_option[0]?.enabled,
        shipping_dimension_option_value:
          data.product?.shipping_dimension_option[0]?.enabled,
        shipping_length_value: data.product?.shipping_length[0]?.unit,
        shipping_length: data.product.shipping_length || "",
      });

      setProductVariation({
        is_variation: data.product.is_variation,
        is_Variation_Value: productVariation?.is_variation[0]?.enabled,
        variant_requires_shipping_Value:
          productVariation?.variant_requires_shipping[0]?.enabled,
        variant_grams: data.product.variant_grams,
        variant_requires_shipping: data.product.variant_requires_shipping,
        variant_barcode: data.product.variant_barcode,
        variant_color_title: data.product.variant_color_title,
        variant_color_value: data.product.variant_color_value,
      });

      setStoreVendor({
        store_id: storeVendor?.storeValue
          ? Object.keys(storeVendor?.store || {}).find(
            (key) => storeVendor.store[key] === storeVendor.storeValue
          ) || null
          : null,

        brand_id: storeVendor?.brandValue
          ? Object.keys(storeVendor?.brand || {}).find(
            (key) => storeVendor.brand[key] === storeVendor.brandValue
          ) || null
          : null,

        created_by_id: data.product.created_by_id,
        created_by_type: data.product.created_by_type,
        storeValue: storeOptions[0]?.value,
        brandValue: brandOptions[0]?.value,
        store: storeOptions,
        brand: brandOptions,
        creator: data.product.creator,
      });

      setPerformanceAnalytics({
        views: data.product.views,
        units_sold: data.product.units_sold,
        frequently_bought_together: data.product.frequently_bought_together,
      });

      setComparisonBundling({
        compare_type: data.product.compare_type,
        compare_products: data.product.compare_products,
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


          <BrandHeader

            general={generalData}
            setGeneralData={setGeneralData}
          />

          <CollapseComponent title="Hero Section">
            <CategoryMedia
              title="Page Top Banners For Desktop"
              fileName={true}
              altText={true}
              spanTags="Main Hero Banner (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
            <CategoryMedia
              title="Page Middle Banners For Mobile"
              fileName={true}
              altText={true}
              spanTags="Main Hero Banner (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
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
              title="Page Middle Banners For Mobile"
              fileName={true}
              altText={true}
              spanTags="Upload Image (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
          </CollapseComponent>
          <CollapseComponent title="Featured Product Section">
            <div className="bg-white mt-[-20px]">
              <p className="text-[#616161] font-semibold mb-[20px] mt-[20px]">
                Section Details
              </p>
              <div className="border-2 rounded-lg border-dashed">
                <>
                  <div className="mb-[-10px] p-3 ">
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

                    <label>Select Product (If Select Manual)</label>
                    <div className="mt-1 bg-white border-2 border-[#DFDFDF] rounded-lg w-[50%]">
                      {/* Header (Click to Expand/Collapse) */}
                      <div className="flex rounded-md py-[5px] border-[#DFDFDF] bg-[#F9F9FB] px-4 items-center cursor-pointer justify-between">

                        {/* Left Side (Options) */}
                        <div className="flex gap-2">
                          {options &&
                            options.map((item) => (
                              <div
                                key={item.label}
                                onClick={() => setSelectedType(item.label)}
                                className={`text-[16px] leading-[17.64px] font-light text-[${item.textColor}] ${item.label == selectedType ? `bg-[${COLORS.bgPrimary}]` : "bg-[#E2E2E2]"
                                  } px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2`}
                              >
                                {item.label}
                              </div>
                            ))}
                        </div>



                      </div>
                    </div>
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


          <CollapseComponent title="Website Banners & videos">
            <CategoryMedia
              title="Page Top Banners For Desktop"
              fileName={true}
              altText={true}
              spanTags="Main Hero Banner (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
            <CategoryMedia
              title="Page Middle Banners For Mobile"
              fileName={true}
              altText={true}
              spanTags="Main Hero Banner (Webp format allowed (max 10MB, must be 1920x450px)"
              mediaData={mediaData}
              setMediaData={setMediaData}
            />
          </CollapseComponent>
          <CollapseComponent title="SEO Attributes">
            <SeoComponent seo={seoData} setSeo={setSeoData} />
          </CollapseComponent>
        </div>
      )}
    </>
  );
};

export default React.memo(BrandCustomizationThird);
