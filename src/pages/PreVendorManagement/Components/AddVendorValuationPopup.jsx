import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import VendorManage1 from "../../../assets/icons/VendorManage1.png";
import axios from "axios";
import VendorMultiOption from "./VendorMultiOption";
import Select from "react-select";
import { basePath } from "../../../services/apiRoutes";
import { useFetchAllProductCategories } from "../../../services/apis/Categories/Hooks";
import Loader from "../../../utils/Loader";
import { PreVendorManagementContext } from "../PreVendorManagementContext";
import { baseUrls } from "../../../utils/apiWrapper";

const AddVendorValuationPopup = ({
  setShowPopup,
  allCountriesList,
  setShowSecondPopup,
  setCreatePayloadData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { setPerformance } = useContext(PreVendorManagementContext);
  const [performanceScore, setPerformanceScore] = useState(0);

  const [zipcodes, setZipcodes] = useState([]);
  const [loadingZip, setLoadingZip] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCity, setLoadingCity] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCountryId = watch("country_id");
  const selectedCityId = watch("city_ids");

  // Fetch cities when country changes
  useEffect(() => {
    if (selectedCountryId) {
      setLoadingCity(true);
      const token = localStorage.getItem("token");

      axios
        .get(`${basePath}/cities/${selectedCountryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCities(res.data?.data || []);
        })
        .catch((err) => {
          console.error("City error:", err);
          setCities([]);
        })
        .finally(() => setLoadingCity(false));
    } else {
      setCities([]);
    }
  }, [selectedCountryId]);

  // Fetch zipcodes when city changes
  // useEffect(() => {
  //   if (selectedCityId) {
  //     setLoadingZip(true);
  //     const token = localStorage.getItem("token");

  //     axios
  //       .get(`${basePath}/zipcodes/${selectedCityId}?page=1&length=20`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         setZipcodes(res.data?.data || []);
  //       })
  //       .catch((err) => {
  //         console.error("Zipcode error:", err);
  //         setZipcodes([]);
  //       })
  //       .finally(() => setLoadingZip(false));
  //   } else {
  //     setZipcodes([]);
  //   }
  // }, [selectedCityId]);

  // Convert to VendorMultiOption format
  const formatOptions = (data, labelKey = "name", valueKey = "id") =>
    data.map((item) => ({
      label: item[labelKey],
      value: item[valueKey],
    }));

  const { data, isLoading, error } = useFetchAllProductCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const categories = data?.categories || [];

  const onSubmit = async (data) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Step 1: Remove unwanted fields
      const fieldsToRemove = [
        "primary_category",
        "secondary_category",
        "city",
        "zipcode",
        "country",
      ];
      const cleanedData = { ...data };
      fieldsToRemove.forEach((field) => delete cleanedData[field]);

      // Step 2: Add required fields
      const finalData = {
        ...cleanedData,
        grade: "A",
        zipcode_ids: [],
        dropshipping: cleanedData.dropshipping === "yes",
      };

      console.log("Final Data to Send:", finalData);

      // Step 3: Create vendor
      const { data: vendorResult } = await axios.post(
        `${baseUrls}/pre-onboarding-vendors`,
        finalData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(vendorResult?.data?.id);

      // Step 4: Trigger supplier score API
      // if (vendorResult?.data?.id) {
      //   const { data: scoreResponse } = await axios.post(
      //     `${baseUrls}/supplier-score`,
      //     { id: vendorResult?.data?.id },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      //   setPerformance(scoreResponse);
      //   console.log("Score API response:", scoreResponse);
      // }

      toast.success("Vendor created successfully!");

      const sendData = { ...finalData, ...vendorResult };
      setCreatePayloadData(sendData);
      setShowPopup(false);
      setShowSecondPopup(true);
    } catch (error) {
      console.error("API Error:", error);

      if (error.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("API error occurred. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getThumbColor = () => {
    if (performanceScore < 25) return "bg-green-800";
    if (performanceScore < 75) return "bg-orange-400";
    return "bg-green-500";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[28%] max-h-[90vh] p-4 relative">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Vendor Evaluation</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 border-t pt-4"
        >
          <div className="flex items-center justify-center">
            <img src={VendorManage1} className="w-[50%]" alt="add vendor" />
          </div>
          {/* Performance Score Slider */}
          <div className="p-4">
            <div className="relative w-full h-5 flex items-center mb-2">
              {[0, 20, 40, 60, 80, 100].map((val, idx) => (
                <div
                  key={idx}
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
                    performanceScore >= val ? "bg-green-800" : "bg-gray-400"
                  }`}
                  style={{ left: `calc(${val}% - 6px)` }}
                />
              ))}
              <input
                type="range"
                min="0"
                max="100"
                value={performanceScore}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setPerformanceScore(value);
                  setValue("performance_score", value);
                }}
                className="w-full h-2 bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-800 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white focus:outline-none"
              />
            </div>
            <p className="text-sm">Vendor Score: {performanceScore}</p>
          </div>
          {/* Text Inputs */}
          <div className=" h-[300px]  overflow-y-auto">
            {[
              { label: "Vendor Name", name: "name" },
              { label: "Contact Person", name: "contact_person" },
              { label: "Email", name: "email" },
              { label: "Phone Number", name: "phone_number" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-[#616161] mb-1">
                  {field.label}
                </label>
                <input
                  {...register(field.name, {
                    required: `${field.label} is required`,
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm">
                    {errors[field.name].message}
                  </span>
                )}
              </div>
            ))}
            {/* Select Inputs with Controller */}
            {[
              {
                name: "type",
                label: "Type",
                options: ["direct", "indirect", "N/A"],
              },
              {
                name: "dropshipping",
                label: "Dropshipping",
                options: ["yes", "no"],
              },
              {
                name: "shipping_days",
                label: "Shipping Days",
                options: [
                  "1 Day to 2 Days",
                  "2 Days to 3 Days",
                  "3 Days to 5 Days",
                  "5 Days to 7 Days",
                  "1 Day to 12 Days",
                  "3 to 4 weeks",
                  "6 to 8 weeks",
                  "8 to 10 weeks",
                  "10 to 12 weeks",
                ],
              },
              {
                name: "credit_terms",
                label: "Credit Terms",
                options: ["Net 60", "Net 45", "Net 30", "Net 15", "Advance"],
              },
            ].map(({ name, label, options }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-[#616161] mb-1">
                  {label}
                </label>
                <Controller
                  name={name}
                  control={control}
                  rules={{ required: `${label} is required` }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select {label}</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors[name] && (
                  <span className="text-red-500 text-sm">
                    {errors[name]?.message}
                  </span>
                )}
              </div>
            ))}
            {[{ label: "Credit Limit", name: "credit_limit" }].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-[#616161] mb-1">
                  {field.label}
                </label>
                <input
                  {...register(field.name, {
                    required: `${field.label} is required`,
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm">
                    {errors[field.name].message}
                  </span>
                )}
              </div>
            ))}
            <div className="mt-4">
              <Controller
                control={control}
                name="category_ids"
                rules={{ required: "Primary Category is required" }}
                render={({ field }) => (
                  <VendorMultiOption
                    label="Primary Category"
                    name="category_ids"
                    options={categories.map((cat) => ({
                      label: cat.name,
                      value: cat.id,
                    }))}
                    onChange={(selected) => {
                      const selectedId = selected;
                      const selectedCat = categories.find(
                        (cat) => cat.id === selectedId
                      );

                      setSelectedCategory(selectedCat);

                      setValue("category_ids", selectedId);

                      field.onChange(selectedId);
                    }}
                    value={field.value}
                  />
                )}
              />
              {errors.primary_category && (
                <span className="text-red-500 text-sm">
                  {errors.primary_category.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#616161] mb-1">
                Country
              </label>
              <select
                {...register("country_id", { required: "Country is required" })}
                className="border p-2 w-full"
              >
                <option value="">Select Country</option>
                {allCountriesList?.data?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country_id && (
                <p className="text-red-500 text-sm">
                  {errors.country_id.message}
                </p>
              )}
            </div>

            {/* City Multi-select */}
            {selectedCountryId && (
              <div
                style={{ marginTop: "20px" }}
                className="mt-12 mb-[30px] mt-[60px]"
              >
                {loadingCity ? (
                  <p className="text-gray-500">
                    Loading Warehouse Locations...
                  </p>
                ) : (
                  <Controller
                    name="city_ids"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <div>
                        <Controller
                          name="city_ids"
                          control={control}
                          rules={{ required: "City is required" }}
                          render={({ field }) => (
                            <VendorMultiOption
                              label="Warehouse Locations"
                              name="city_ids"
                              options={formatOptions(cities, "name")}
                              onChange={(ids) => field.onChange(ids)}
                              value={field.value || []}
                            />
                          )}
                        />
                      </div>
                    )}
                  />
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-[#26683A] ${
                isLoading ? "cursor-not-allowed bg-gray-400" : ""
              } text-white w-full rounded`}
            >
              {loading ? <Loader /> : "Save & Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendorValuationPopup;
