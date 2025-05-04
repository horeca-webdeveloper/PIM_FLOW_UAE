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

const UpdateVendorValuationPopup = ({
  setShowEdit,
  allCountriesList,
  fetchLoading,
  setSecondShowEdit,
  setUpdateData,
  vendorData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: vendorData || {},
  });

  const { performance } = useContext(PreVendorManagementContext);
  const [loadingCity, setLoadingCity] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cities, setCities] = useState([]);

  const selectedCountryId = watch("country_id");

  // Initialize form with vendor data
  useEffect(() => {
    if (vendorData) {
      // Set country data
      if (vendorData.country) {
        setValue("country_id", vendorData.country.id);
      }

      // Set category data
      if (vendorData.categories && vendorData.categories.length > 0) {
        setValue(
          "category_ids",
          vendorData.categories.map((cat) => cat.id)
        );
      }

      if (vendorData.cities && vendorData.cities.length > 0) {
        setValue(
          "city_ids",
          vendorData.cities.map((cat) => cat.id)
        );
      }

      // Set other form values
      const fieldsToSet = [
        "name",
        "contact_person",
        "email",
        "phone_number",
        "type",
        "dropshipping",
        "shipping_days",
        "credit_limit",
        "credit_terms",
        "grade",
      ];

      fieldsToSet.forEach((field) => {
        if (vendorData[field] !== undefined) {
          setValue(field, vendorData[field]);
        }
      });

      // Convert dropshipping from 1/0 to yes/no
      if (vendorData.dropshipping !== undefined) {
        setValue("dropshipping", vendorData.dropshipping === 1 ? "yes" : "no");
      }
    }
  }, [vendorData, setValue]);

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
  console.log("---->>>>", categories);
  const onSubmit = async (data) => {
    const cleanedData = { ...data };
    const fieldsToRemove = [
      "primary_category",
      "secondary_category",
      "city",
      "zipcode",
      "country",
    ];
    fieldsToRemove.forEach((field) => {
      delete cleanedData[field];
    });
    // Step 2: Ensure `city_ids` is an array
    // Step 3: Add extra fields
    const finalData = {
      ...cleanedData,
      grade: "A",
      dropshipping: cleanedData.dropshipping === "yes" ? 1 : 0,
      score: performance?.score,
    };
    setUpdateData(finalData);
    setShowEdit(false);
    setSecondShowEdit(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[28%] max-h-[90vh] overflow-y-auto p-4 relative">
        <button
          onClick={() => setShowEdit(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-4">Update Vendor Evaluation</h2>

        {fetchLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 border-t pt-4"
          >
            <div className="flex items-center justify-center">
              <img
                src={VendorManage1}
                className="w-[50%]"
                alt="update vendor"
              />
            </div>

            {/* Performance Score Slider */}
            <div className="p-4">
              <div className="relative w-full h-5 flex items-center mb-2">
                {[0, 20, 40, 60, 80, 100].map((val, idx) => (
                  <div
                    key={idx}
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
                      performance?.score >= val ? "bg-green-800" : "bg-gray-400"
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

            {/* Text Inputs */}
            <div className=" h-[300px]  overflow-y-auto">
              {[
                { label: "Vendor Name", name: "name" },
                { label: "Contact Person", name: "contact_person" },
                { label: "Email", name: "email" },
                { label: "Phone Number", name: "phone_number" },
                { label: "Credit Limit", name: "credit_limit" },
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
                  options: ["direct", "indirect"],
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

              {/* Categories */}
              <div className="mt-4">
                <Controller
                  control={control}
                  name="category_ids"
                  rules={{ required: "Primary Category is required" }}
                  render={({ field }) => {
                    <div>
                      <Controller
                        name="category_ids"
                        control={control}
                        rules={{ required: "Primary Category is required" }}
                        render={({ field }) => {
                          return (
                            <VendorMultiOption
                              label="Primary Category"
                              name="category_ids"
                              options={formatOptions(categories, "name")}
                              onChange={(ids) => field.onChange(ids)}
                              value={field.value || []}
                            />
                          );
                        }}
                      />
                    </div>;
                    return (
                      <VendorMultiOption
                        label="Primary Category"
                        name="category_ids"
                        options={formatOptions(categories, "name")}
                        onChange={(ids) => field.onChange(ids)}
                        value={field.value || []}
                      />
                    );
                  }}
                />
                {errors.primary_category && (
                  <span className="text-red-500 text-sm">
                    {errors.primary_category.message}
                  </span>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-[#616161] mb-1">
                  Country
                </label>
                <select
                  {...register("country_id", {
                    required: "Country is required",
                  })}
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
                <div className="mt-12 mb-[30px] mt-[30px]">
                  {loadingCity ? (
                    <p className="text-gray-500">Loading cities...</p>
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
                            render={({ field }) => {
                              return (
                                <VendorMultiOption
                                  label="Warehouse Locations"
                                  name="city_ids"
                                  options={formatOptions(cities, "name")}
                                  onChange={(ids) => field.onChange(ids)}
                                  value={field.value || []}
                                />
                              );
                            }}
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
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#26683A] text-white w-full rounded"
              >
                {loading ? <Loader /> : "Save & Next"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateVendorValuationPopup;
