import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import VendorManage2 from "../../../assets/icons/VendorManage2.png";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../utils/Loader";
import { PreVendorManagementContext } from "../PreVendorManagementContext";
import { baseUrls } from "../../../utils/apiWrapper";

const AddSecondVendorValuationPopup = ({
  setShowSecondPopup,
  setShowPopup,
  createPayloadData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [performanceScore, setPerformanceScore] = useState(10);
  const [loader, setLoader] = useState(false);

  // Product form state management
  const [productForms, setProductForms] = useState([
    {
      id: 1,
      product_name: "",
      primary_keyword: "",
      search_volume: "",
      supplier_price: "",
      competitor_price_online: "",
      competitor_price_offline: "",
      margin_auto_calculate: "20",
    },
  ]);

  const addProductForm = () => {
    if (productForms.length < 5) {
      const newForm = {
        id: Date.now(),
        product_name: "",
        primary_keyword: "",
        search_volume: "",
        supplier_price: "",
        competitor_price_online: "",
        competitor_price_offline: "",
        margin_auto_calculate: "",
      };
      setProductForms([...productForms, newForm]);
    }
  };

  const removeProductForm = (id) => {
    if (productForms.length > 1) {
      setProductForms(productForms.filter((form) => form.id !== id));
    }
  };

  const handleProductFormChange = (id, field, value) => {
    setProductForms(
      productForms.map((form) => {
        if (form.id === id) {
          return { ...form, [field]: value };
        }
        return form;
      })
    );
  };

  const onSubmit = async (payload) => {
    setLoader(true);
    const { id, ...restdata } = createPayloadData;
    console.log(createPayloadData?.data?.id);
    const finalData = { ...restdata, ...payload };
    const { data, ...cleanedFinalData } = finalData;
    console.log("final data", cleanedFinalData);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${baseUrls}/pre-onboarding-vendors/${createPayloadData?.data?.id}`,
        cleanedFinalData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // With axios, the response data is directly available in response.data
      const result = response.data;
      if (result?.data?.id) {
        const { data: scoreResponse } = await axios.post(
          `${baseUrls}/supplier-score`,
          { id: result?.data?.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPerformance(scoreResponse);
        console.log("Score API response:", scoreResponse);
      }
      window.location.reload();
      setLoader(false);
      setShowSecondPopup(false);
      setShowPopup(false);
    } catch (error) {
      // Axios error handling
      console.error(" API Error:", error);
      if (error.response) {
        setLoader(false);
        // The server responded with a status other than 2xx
        console.error("Error creating vendor:", error.response.data);
        toast.error(
          `Error: ${error.response.data?.message || "Something went wrong"}`
        );
      } else {
        setLoader(false);
        toast.error("API error occurred. Check console for details.");
      }
    }
  };

  const { performance, setPerformance } = useContext(
    PreVendorManagementContext
  );

  console.log(performance);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[30%] p-3 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowSecondPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>
        <h2 className="text-xl font-semibold mb-1">Add Vendor Valuation</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 border-t pt-3"
        >
          <div className="flex items-center justify-center">
            <img src={VendorManage2} className="w-[40%]" alt="add vendor" />
          </div>
          <div className="p-4">
            <div className="relative w-full h-5 flex items-center mb-2">
              {[0, 20, 40, 60, 80, 100].map((val, idx) => (
                <div
                  key={idx}
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
                    performanceScore >= val ? "bg-yellow-400" : "bg-gray-400"
                  }`}
                  style={{ left: `calc(${val}% - 6px)` }}
                />
              ))}
              <input
                type="range"
                min="0"
                max="100"
                value={performance?.score}
                className="w-full h-2 bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-800 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white focus:outline-none"
              />
            </div>
            <p className="text-sm">Vendor Score: {performance?.score}</p>
          </div>

          {/* Product Forms Section */}
          <div className="h-[300px]  overflow-y-auto">
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[16px] font-medium text-[#616161]">
                  Product Demand Level (1/5)
                </h3>
                <button
                  type="button"
                  onClick={addProductForm}
                  disabled={productForms.length >= 5}
                  className={`p-1 rounded-full ${
                    productForms.length >= 5
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-blue-100 hover:bg-blue-200"
                  }`}
                  title={
                    productForms.length >= 5
                      ? "Maximum of 5 products allowed"
                      : "Add new product"
                  }
                >
                  <Plus
                    size={18}
                    className={
                      "p-[20px]" + productForms.length >= 5
                        ? "text-gray-500"
                        : "text-blue-600"
                    }
                  />
                </button>
              </div>

              <div className="space-y-6">
                {productForms.map((form, index) => (
                  <div
                    key={form.id}
                    className="border border-gray-300 border-dashed rounded-lg p-4 relative"
                  >
                    {productForms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProductForm(form.id)}
                        className="absolute top-4 right-4 p-0.5 rounded-full bg-red-100 hover:bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-gray-600 mb-1 text-sm">
                          Product Name
                        </label>
                        <Controller
                          name={`product_demand_level[${index}].product_name`}
                          control={control}
                          defaultValue={form.product_name}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-full border border-gray-300 rounded p-1 text-sm"
                              onChange={(e) => {
                                field.onChange(e);
                                handleProductFormChange(
                                  form.id,
                                  "product_name",
                                  e.target.value
                                );
                              }}
                            />
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-600 mb-1 text-sm">
                            Primary Keyword
                          </label>
                          <Controller
                            name={`product_demand_level[${index}].primary_keyword`}
                            control={control}
                            defaultValue={form.primary_keyword}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full border border-gray-300 rounded p-1 text-sm"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleProductFormChange(
                                    form.id,
                                    "primary_keyword",
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 mb-1 text-sm">
                            Search Volume
                          </label>
                          <Controller
                            name={`product_demand_level[${index}].search_volume`}
                            control={control}
                            defaultValue={form.search_volume}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full border border-gray-300 rounded p-1 text-sm"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleProductFormChange(
                                    form.id,
                                    "search_volume",
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-600 mb-1 text-sm">
                            Supplier Price
                          </label>
                          <Controller
                            name={`product_demand_level[${index}].supplier_price`}
                            control={control}
                            defaultValue={form.supplier_price}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full border border-gray-300 rounded p-1 text-sm"
                                type="number"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleProductFormChange(
                                    form.id,
                                    "supplier_price",
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 mb-1 text-sm">
                            Competitor Price (Online)
                          </label>
                          <Controller
                            name={`product_demand_level[${index}].competitor_price_online`}
                            control={control}
                            defaultValue={form.competitor_price_online}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full border border-gray-300 rounded p-1 text-sm"
                                type="number"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleProductFormChange(
                                    form.id,
                                    "competitor_price_online",
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-600 mb-1 text-sm">
                            Competitor Price (Offline)
                          </label>
                          <Controller
                            name={`product_demand_level[${index}].competitor_price_offline`}
                            control={control}
                            defaultValue={form.competitor_price_offline}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-full border border-gray-300 rounded p-1 text-sm"
                                type="number"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleProductFormChange(
                                    form.id,
                                    "competitor_price_offline",
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 mb-1 text-sm">
                            Margin
                          </label>
                          <Controller
                            name={`product_demand_level[${index}].margin_auto_calculate`}
                            control={control}
                            render={({ field }) => {
                              const supplierPrice = parseFloat(
                                watch(
                                  `product_demand_level[${index}].supplier_price`
                                )
                              );
                              const competitorPrice = parseFloat(
                                watch(
                                  `product_demand_level[${index}].competitor_price_online`
                                )
                              );

                              let margin = "";
                              if (
                                !isNaN(supplierPrice) &&
                                !isNaN(competitorPrice) &&
                                supplierPrice !== 0
                              ) {
                                margin =
                                  (
                                    ((competitorPrice - supplierPrice) /
                                      competitorPrice) *
                                    100
                                  ).toFixed(2) + "%";
                              }

                              return (
                                <input
                                  {...field}
                                  value={margin}
                                  readOnly
                                  className="w-full border border-gray-300 bg-gray-100 text-gray-700 rounded p-1 text-sm"
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2 mt-6">
            <button
              type="button"
              onClick={() => {
                setShowSecondPopup(false);
                setShowPopup(true);
              }}
              className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded-[4px] text-sm"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#26683A] border border-[#26683A] text-white w-full rounded-[4px] text-sm"
            >
              {loader ? <Loader /> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSecondVendorValuationPopup;
