import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddProductsHeader from "../../components/ui/Products/AddProductsHeader";
import General from "../../components/ui/Products/ProductsAttribute/General";
import Marketing from "../../components/ui/Products/ProductsAttribute/Marketing";
import Media from "../../components/ui/Products/ProductsAttribute/Media";
import { Apis } from "../../services/apis/Attributes/Api";
import {
  useFetchBrands,
  useFetchCategoriesAttributes,
  useFetchStore,
} from "../../services/apis/Products/Hooks";
import PricingAndSales from "../../components/ui/Products/ProductsAttribute/PricingAndSales";
import ShippinDimension from "../../components/ui/Products/ProductsAttribute/ShippinDimension";
import PerformanceAnalytics from "../../components/ui/Products/ProductsAttribute/PerformanceAnalytics";
import StoreVendorInformation from "../../components/ui/Products/ProductsAttribute/StoreVendorInformation";
import InventoryStockManagement from "../../components/ui/Products/ProductsAttribute/InventoryStockManagement";
import Loader from "../../utils/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import SEO from "../../components/ui/Products/ProductsAttribute/SEO";
import AttributesGroupsComp from "../../components/ui/Products/ProductsAttribute/AttributesGroupsComp";
import { baseUrls } from "../../utils/apiWrapper";
import SeoManagement from "../../components/ui/Products/ProductsAttribute/SeoManagement";
import { useFetchSEO } from "../../services/apis/SEO/Hooks";
import { AppContext } from "../../Context/AppContext";
const AddProducts = () => {
  const location = useLocation();
  const id = location?.pathname?.split("/")[2];
  const [attributes, setAttributes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [attributeData, setAttributeData] = useState({});

  const handleSubmit = async (e) => {
    try {
      setUpdateLoading(true);
      const formData = new FormData();
      const token = localStorage.getItem("token");

      formData.append(
        "product_attributes",
        JSON.stringify(attributeData.attributes)
      );
      // Handle General Data
      formData.append("sku", generalData?.sku || "");
      formData.append("barcode", generalData?.barcode || "");
      formData.append("status", generalData?.status_value || "Draft");
      formData.append(
        "warranty_information",
        generalData?.warranty_information || ""
      );
      formData.append(
        "refund",
        generalData?.refundValue == "Non-Refundable"
          ? 1
          : generalData?.refundValue == "15 days"
          ? 2
          : generalData?.refundValue == "90 days"
          ? 3
          : 1
      );

      // Marketing
      formData.append("name", marketingData?.name || "");
      formData.append(
        "benefits_features",
        JSON.stringify(
          marketingData.apiBenefits == null
            ? [
                {
                  benifit: "",
                  feature: "",
                },
              ]
            : marketingData.apiBenefits
        )
      );
      formData.append("description", marketingData?.description || "");

      const faqsObject = marketingData.faqs.reduce((acc, faq, index) => {
        acc[index] = faq; // Assign each FAQ object to a numbered key
        return acc;
      }, {});

      formData.append("faqs", JSON.stringify(faqsObject));

      // General Order Data
      formData.append("order", other?.order || 1);
      formData.append(
        "delivery_days",
        inventoryStockManagement?.delivery_days || 0
      );

      // Inventory Management
      formData.append("quantity", inventoryStockManagement?.quantity || 0);
      formData.append(
        "allow_checkout_when_out_of_stock",
        inventoryStockManagement?.allow_checkout_when_out_of_stock_value ? 1 : 0
      );
      formData.append(
        "with_storehouse_management",
        inventoryStockManagement?.with_storehouse_management_value ? 1 : 0
      );
      formData.append(
        "stock_status",
        inventoryStockManagement?.stock_status_value == "In Stock"
          ? 1
          : inventoryStockManagement?.stock_status_value == "Out of Stock"
          ? 2
          : inventoryStockManagement?.stock_status_value == "Pre Order"
          ? 3
          : 1
      );

      // Inventory Tracking
      formData.append(
        "variant_inventory_tracker",
        inventoryStockManagement?.variant_inventory_tracker || "shopify"
      );
      formData.append(
        "variant_inventory_quantity",
        inventoryStockManagement?.variant_inventory_quantity || 0
      );
      formData.append(
        "variant_inventory_policy",
        inventoryStockManagement?.variant_inventory_policy || "deny"
      );
      formData.append(
        "variant_fulfillment_service",
        inventoryStockManagement?.variant_fulfillment_service || "manual"
      );

      // Pricing and Sales
      formData.append("price", pricingSales?.price || 0);
      formData.append("sale_price", pricingSales?.sale_price || 0);
      formData.append("sale_type", "");
      formData.append("cost_per_item", pricingSales?.cost_per_item || 0);
      formData.append(
        "cost_per_item_currency",
        pricingSales?.cost_per_item_currency || 0
      );
      formData.append(
        "additional_cost_value",
        pricingSales?.additional_cost_value || 0
      );
      formData.append("cost_type", pricingSales?.cost_type || 0);
      formData.append(
        "additional_cost_percentage",
        pricingSales?.additional_cost_percentage || 0
      );
      formData.append(
        "total_cost_per_item",
        pricingSales?.total_cost_per_item || 0
      );
      formData.append("box_quantity", pricingSales?.box_quantity || 0);
      formData.append(
        "tax_id",
        pricingSales?.taxValue === "VAT"
          ? 1
          : pricingSales?.taxValue === "None"
          ? 2
          : pricingSales?.taxValue === "Import Tax"
          ? 3
          : 2
      );
      formData.append(
        "currency_id",
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
          : null
      );
      formData.append(
        "minimum_order_quantity",
        pricingSales?.minimum_order_quantity || 1
      );
      formData.append(
        "maximum_order_quantity",
        pricingSales?.maximum_order_quantity || 10
      );

      // Media Data
      if (mediaData?.images?.length > 0) {
        mediaData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else {
        formData.append("images", JSON.stringify([]));
      }

      formData.append("image", mediaData?.mainImage || "");
      formData.append("video_url", mediaData?.video_url || "");

      if (mediaData?.video_path?.length > 0) {
        mediaData.video_path.forEach((video, index) => {
          formData.append(`video_path[${index}]`, video);
        });
      } else {
        formData.append("video_path", JSON.stringify([]));
      }

      if (mediaData?.documents?.length > 0) {
        mediaData.documents.forEach((doc, index) => {
          formData.append(`documents[${index}]`, doc);
        });
      } else {
        formData.append("documents", JSON.stringify([]));
      }

      // Shipping Data
      formData.append("length", shippingDimension?.length || 0);
      formData.append(
        "length_unit_id",
        shippingDimension?.length_unit_value === "cm"
          ? 1
          : shippingDimension?.length_unit_value === "in"
          ? 3
          : shippingDimension?.length_unit_value === "mm"
          ? 11
          : 1 // Default value if none of the conditions match
      );

      formData.append("width", shippingDimension?.width || 0);
      formData.append("height", shippingDimension?.height || 0);
      formData.append("depth", shippingDimension?.depth || 0);
      formData.append("weight", shippingDimension?.weight || 0);
      formData.append(
        "weight_unit_id",
        shippingDimension?.weight_unit_id == "lbs"
          ? 9
          : shippingDimension?.weight_unit_id === "kg"
          ? 5
          : shippingDimension?.weight_unit_id === "g"
          ? 6
          : 9
      );
      formData.append(
        "shipping_weight_option",
        shippingDimension?.shipping_weight_option_value === "lbs"
          ? "lbs"
          : shippingDimension?.shipping_weight_option_value === "kg"
          ? "kg"
          : shippingDimension?.shipping_weight_option_value === "g"
          ? "g"
          : "lbs"
      );
      formData.append(
        "shipping_weight",
        shippingDimension?.shipping_weight || 0
      );
      formData.append("shipping_dimension_option", "inch");
      formData.append("shipping_width", shippingDimension?.shipping_width || 0);
      formData.append("shipping_depth", shippingDimension?.shipping_depth || 0);
      formData.append(
        "shipping_height",
        shippingDimension?.shipping_height || 0
      );
      formData.append(
        "shipping_length_id",
        shippingDimension?.shipping_length_value === "cm"
          ? 1
          : shippingDimension?.shipping_length_value === "in"
          ? 3
          : shippingDimension?.shipping_length_value === "mm"
          ? 11
          : 1 // Default value if none of the conditions match
      );
      // formData.append("shipping_length_id", "");

      // Product Variation
      formData.append(
        "is_variation",
        productVariation?.is_Variation_Value ? 1 : 0
      );
      formData.append("variant_grams", productVariation?.variant_grams || 0);
      formData.append(
        "variant_requires_shipping",
        productVariation?.variant_requires_shipping_Value ? 1 : 0
      );
      formData.append(
        "variant_barcode",
        productVariation?.variant_barcode || ""
      );
      formData.append(
        "variant_color_title",
        productVariation?.variant_color_title || ""
      );
      formData.append(
        "variant_color_value",
        productVariation?.variant_color_value || ""
      );

      // Store and Brand
      formData.append("store_id", storeVendor?.store_id);
      formData.append("brand_id", storeVendor?.brand_id);

      // METHOD _PUT
      formData.append("_method", "PUT");

      // Analytics and Bundling
      formData.append("views", performanceAnalytics?.views || 0);
      formData.append("units_sold", performanceAnalytics?.units_sold || 0);
      formData.append(
        "frequently_bought_together",
        JSON.stringify(
          performanceAnalytics?.frequently_bought_together_value ||
            performanceAnalytics?.frequently_bought_together.map(
              (item) => item.id
            )
          // frequently_bought_together
        )
      );
      formData.append("compare_type", "");
      formData.append("compare_products", JSON.stringify([]));

      // SEO
      formData.append(
        "google_shopping_category",
        seoData?.google_shopping_category ||
          data?.product.google_shopping_category
      );
      formData.append(
        "google_shopping_mpn",
        seoData?.google_shopping_mpn || data?.product.google_shopping_mpn
      );

      const response = await axios.post(
        `${baseUrls}/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setUpdateLoading(false);
        toast.success("Product Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      setUpdateLoading(false);
      toast.error(error?.message);
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    }
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

  const {
    data: storeData,
    isLoading: StoreIsLoading,
    error: StoreError,
  } = useFetchStore();

  // States for each section
  const [generalData, setGeneralData] = useState({
    sku: "",
    barcode: "",
    warranty_information: "",
    status: [],
    websites: "",
    status_value: "",
    warranty_info: [],
    refund: [],
    refundValue: "",
    categories: [],
  });

  // REVIEWS
  const [customerReviews, setCustomerReviews] = useState([
    {
      review_customer_name: "",
      review_customer_email: "",
      review_star: "",
      review_images: [],
      review_comment: "",
      review_status: 1,
    },
  ]);

  const [inventoryStockManagement, setInventoryStockManagement] = useState({
    quantity: "",
    allow_checkout_when_out_of_stock: 0,
    allow_checkout_when_out_of_stock_value: false,
    with_storehouse_management: 0,
    with_storehouse_management_value: false,
    stock_status: "",
    delivery_days: "",
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
    cost_per_item_currency: "",
    cost_type: "",
    additional_cost_percentage: "",
    additional_cost_value: "",
    total_cost_per_item: "",
    tax: [],
    box_quantity: "",
    taxValue: "",
    currency_id: "",
    minimum_order_quantity: "",
    maximum_order_quantity: "",
    approved_by: "",
    currency: [],
  });
  const [marketingData, setMarketingData] = useState({
    name: "",
    content: [],
    Benefits: [],
    apiBenefits: [],
    description: "",
    faqs: [{ name: "", email: "", rating: "", image: [], review: "" }],
  });
  const [mediaData, setMediaData] = useState({
    images: [],
    image: "",
    video_url: "",
    video_path: [],
    documents: [],
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
    shipping_length: [],
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
    storeValue: "",
    brandValue: "",
    created_by_id: "",
    created_by_type: "",
    store: [],
    brand: [],
    creator: "",
  });
  const [performanceAnalytics, setPerformanceAnalytics] = useState({
    views: "",
    units_sold: "",
    frequently_bought_together_value: "",
    frequently_bought_together: [],
  });
  const [comparisonBundling, setComparisonBundling] = useState({
    compare_type: [],
    compare_products: [],
  });

  const [other, setOther] = useState({
    order: "",
  });

  const [seoData, setSeoData] = useState({
    google_shopping_category: "",
    google_shopping_mpn: "",
    seo_meta_data: "",
  });

  const [seoManageData, setSeoManageData] = useState([]);

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
      setSeoManageData(response);
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
      id: seoManageData?.data?.data?.id,
      relational_id: seoManageData?.data?.data?.relational_id,
      relational_type: seoManageData?.data?.data?.relational_type,
      url: seoManageData?.data?.data?.url,
      primary_keyword: seoManageData?.data?.data?.primary_keyword,
      monthly_search_volume: seoManageData?.data?.data?.monthly_search_volume,
      title_tag: seoManageData?.data?.data?.title_tag,
      meta_title: seoManageData?.data?.data?.meta_title,
      meta_description: seoManageData?.data?.data?.meta_description,
      internal_links: seoManageData?.data?.data?.internal_links,
      indexing: seoManageData?.data?.data?.indexing,
      og_title: seoManageData?.data?.data?.og_title,
      og_description: seoManageData?.data?.data?.og_description,
      og_image_url: seoManageData?.data?.data?.og_image_url,
      og_image_file: seoManageData?.data?.data?.og_image_url,
      og_image_alt_text: seoManageData?.data?.data?.og_image_alt_text,
      og_image_name: seoManageData?.data?.data?.og_image_name,
      tags: seoManageData?.data?.data?.tags,
      schema: seoManageData?.data?.data?.schema,
      schema_rating: seoManageData?.data?.data?.schema_rating,
      schema_reviews_count: seoManageData?.data?.data?.schema_reviews_count,
      created_by: seoManageData?.data?.data?.created_by,
      updated_by: seoManageData?.data?.data?.updated_by,
      created_at: seoManageData?.data?.data?.created_at,
      updated_at: seoManageData?.data?.data?.updated_at,
      secondary_keyword_details:
        seoManageData?.data?.data?.secondary_keyword_details,
      paragraph_1: seoManageData?.data?.data?.paragraph_1 || "",
      paragraph_2: seoManageData?.data?.data?.paragraph_2 || "",
      paragraph_3: seoManageData?.data?.data?.paragraph_3 || "",
      paragraph_4: seoManageData?.data?.data?.paragraph_4 || "",
      popular_tags: seoManageData?.data?.data?.popular_tags || [],
    });
  }, [seoManageData]);

  // Effect to update state when API data is available
  useEffect(() => {
    if (data?.product) {
      setGeneralData({
        sku: data?.product?.sku,
        barcode: data?.product?.barcode,
        websites: data?.product?.website_ids,
        warranty_info: [
          { value: "30 Days Warranty" },
          { value: "90 Days Warranty" },
          { value: "6 Month Warranty" },
          { value: "1 Year Warranty" },
          { value: "2 Year Warranty" },
          { value: "3 Year Warranty" },
          { value: "5 Year Warranty" },
        ],
        warranty_information:
          data?.product.warranty_information || "30 Days Warranty",
        refund: [
          { value: "Non-Refundable" },
          { value: "15 days" },
          { value: "90 days" },
        ],
        refundValue: data?.product?.refund?.[0]?.value,
        warranty_info_value: "",
        categories: data?.product?.categories,
        status: [
          { value: "Draft" },
          { value: "Pending" },
          { value: "Published" },
        ],
        status_value: data?.product?.status[0]?.value || "",
      });

      setInventoryStockManagement({
        quantity: data?.product?.quantity,
        allow_checkout_when_out_of_stock:
          data?.product?.allow_checkout_when_out_of_stock,
        with_storehouse_management: data?.product?.with_storehouse_management,
        with_storehouse_management_value:
          data?.product?.with_storehouse_management?.selected,
        allow_checkout_when_out_of_stock_value:
          data?.product?.allow_checkout_when_out_of_stock?.selected,
        stock_status_value: data?.product?.stock_status?.selected,
        stock_status: [
          { value: "In Stock", label: "1" },
          { value: "Out of Stock", label: "2" },
          { value: "Pre Order", label: "3" },
        ],
        delivery_days: data?.product.delivery_days,
        variant_inventory_tracker: data?.product?.variant_inventory_tracker,
        variant_inventory_quantity: data?.product?.variant_inventory_quantity,
        variant_inventory_policy: data?.product?.variant_inventory_policy,
        variant_fulfillment_service: data?.product?.variant_fulfillment_service,
      });

      setPricingSales({
        price: data?.product.price,
        sale_price: data?.product.sale_price,
        sale_type: data?.product.sale_type,
        cost_per_item: data?.product.cost_per_item,
        cost_per_item_currency: data?.product?.cost_per_item_currency,
        cost_type: data?.product?.cost_type,
        additional_cost_percentage: data?.product?.additional_cost_percentage,
        additional_cost_value: data?.product?.additional_cost_value,
        total_cost_per_item: data?.product?.total_cost_per_item,
        tax: [{ value: "VAT" }, { value: "None" }, { value: "Import Tax" }],
        taxValue: data?.product?.tax[0]?.rate || "VAT",
        minimum_order_quantity: data?.product.minimum_order_quantity,
        maximum_order_quantity: data?.product.maximum_order_quantity,
        box_quantity: data?.product.box_quantity,
        approved_by: data?.product.approved_by,
        currencyValue: data?.product?.currency[0]?.title || "USD",
        currency: [
          { value: "USD" },
          { value: "EUR" },
          { value: "VND" },
          { value: "NGN" },
          { value: "AED" },
          { value: "SAR" },
        ],
        costCurrencyValue: [
          { value: "USD" },
          { value: "EUR" },
          { value: "VND" },
          { value: "NGN" },
          { value: "AED" },
          { value: "SAR" },
        ],
        contType: "",
      });

      setMarketingData({
        name: data.product.name,
        content: data.product.content,
        apiBenefits: data?.product?.benefits_features,
        description: data.product.description,
        faqs: data.faq,
      });

      setMediaData({
        images: data?.product.images || [],
        image: data?.product.image || "",
        video_url: "",
        video_path: data?.product.video_path || [],
        documents: data?.product.documents || [],
      });

      setShippingDimension({
        length: data?.product.length || "",
        length_unit_id: data?.product.length_unit_id || "",
        width: data?.product.width || "",
        height: data?.product.height || "",
        depth: data?.product.depth || "",
        weight: data?.product.weight || "",
        weight_unit_id: data?.product.weight_unit_id || "",
        shipping_weight_option: [
          { value: "lbs" },
          { value: "kg" },
          { value: "g" },
          ,
        ],

        shipping_weight: data?.product.shipping_weight || "",
        shipping_dimension_option: [
          { value: "in" },
          { value: "cm" },
          { value: "mm" },
        ],
        shipping_width: data?.product.shipping_width || "",
        shipping_depth: data?.product.shipping_depth || "",
        shipping_height: data?.product.shipping_height || "",
        shipping_length: data?.product.shipping_length || "",
        shipping_length_id: data?.product.shipping_length_id || "",
        length_unit_value: data?.product?.length_unit?.selected || "cm",
        length_unit: [{ value: "cm" }, { value: "in" }, { value: "mm" }],
        weight_unit_id: data?.product?.weight_unit?.selected || "lg",
        weight_unit: [{ value: "lbs" }, { value: "kg" }, { value: "g" }],
        shipping_weight_option_value:
          data?.product?.shipping_weight_option?.selected || "lbs",
        shipping_dimension_option_value:
          data?.product?.shipping_dimension_option?.selected || "in",
        shipping_length_value: data?.product?.shipping_length?.selected || "cm",
        shipping_length: [{ value: "cm" }, { value: "in" }, { value: "mm" }],
      });

      setProductVariation({
        is_variation: data?.product.is_variation,
        is_Variation_Value: data?.product?.is_variation?.selected,
        variant_requires_shipping_Value:
          data?.product?.variant_requires_shipping?.selected,
        variant_grams: data?.product.variant_grams,
        variant_requires_shipping: data?.product.variant_requires_shipping,
        variant_barcode: data?.product.variant_barcode,
        variant_color_title: data?.product.variant_color_title,
        variant_color_value: data?.product.variant_color_value,
      });

      setStoreVendor({
        store_id: 1,
        brand_id: 13,
        created_by_id: data?.product.created_by_id,
        created_by_type: data?.product.created_by_type,
        storeValue:
          data?.product?.store !== null
            ? data?.product?.store[0]?.name
            : "Amir Enteprises (Testing )",
        brandValue:
          data?.product?.brand !== null
            ? data?.product?.brand[0]?.name
            : "Arctic Air",
        store: storeData,
        brand: brandsData,
        creator: data?.product.creator,
      });

      setPerformanceAnalytics({
        views: data?.product.views,
        units_sold: data?.product.units_sold,
        frequently_bought_together:
          data?.product.frequently_bought_together || [],
      });

      setComparisonBundling({
        compare_type: data?.product.compare_type,
        compare_products: data?.product.compare_products,
      });

      setSeoData({
        google_shopping_category: data?.product.google_shopping_category,
        google_shopping_mpn: data?.product.google_shopping_mpn,
        seo_meta_data: data?.product.seo_meta_data,
      });
      setOther({
        order: data?.product.order,
      });
    }
  }, [data]);

  useEffect(() => {
    Apis.fetchCategoryAttributeGroups(id, setLoader, setAttributes);
  }, [id]);

  const { AllowedPermissions } = useContext(AppContext);
  const permissions = AllowedPermissions?.permissions || [];

  console.log("generalData....", generalData);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[100vh] bg-[#F1F1F1]">
          <Loader />
        </div>
      ) : (
        // <form onSubmit={handleSubmit}>
        <div className="h-screen overflow-y-auto">
          <AddProductsHeader
            data={data}
            permissions={permissions}
            handleCreateProduct={handleSubmit}
            updateProductLoading={updateLoading}
            general={generalData}
            setGeneralData={setGeneralData}
          />
          <General general={generalData} setGeneralData={setGeneralData} />
          {/* <StoreVendorInformation
            storeVendor={storeVendor}
            setStoreVendor={setStoreVendor}
            store={storeData}
            brand={brandsData}
          /> */}
          <InventoryStockManagement
            inventoryStockManagement={inventoryStockManagement}
            setInventoryStockManagement={setInventoryStockManagement}
          />
          <PricingAndSales
            pricingSalesData={pricingSales}
            setPricingSales={setPricingSales}
          />
          <Marketing
            marketing={marketingData}
            setMarketing={setMarketingData}
            customerReviews={customerReviews}
            setCustomerReviews={setCustomerReviews}
            data={data?.faq}
          />
          <Media mediaData={mediaData} setMediaData={setMediaData} />
          <ShippinDimension
            shippingDimension={shippingDimension}
            setShippingDimension={setShippingDimension}
          />

          <PerformanceAnalytics
            performanceAnalytics={performanceAnalytics}
            setPerformanceAnalytics={setPerformanceAnalytics}
          />
          {/* this SEO is for Google Shopping Keywords */}
          <SEO seoData={seoData} setSeoData={setSeoData} />
          {}
          {permissions?.includes("list seo mgmt") && (
            <SeoManagement
              manageSeoProduct={manageSeoProduct}
              setManageSeoProduct={setManageSeoProduct}
              id={id}
              type={"Product"}
            />
          )}
          {!!attributes && attributes?.data?.length > 0
            ? attributes.data.map((item, index) => (
                <AttributesGroupsComp
                  key={item.id}
                  title={item.name}
                  datas={item.group_attributes}
                  setAttributeData={setAttributeData}
                  attributeData={attributeData}
                />
              ))
            : null}
        </div>
        // </form>
      )}
    </>
  );
};

export default AddProducts;
