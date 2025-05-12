import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import VendorManage2 from "../../../assets/icons/VendorManage2.png";
import { VendorManagementContext } from "../VendorManagementContext";
import CommonMultiOption from "../../../components/common/MultiAttributes/CommonMultiOption";
import MutliTags from "../../../components/common/MutliTags";
import VendorMultiOption from "../../PreVendorManagement/Components/VendorMultiOption";
import { basePath } from "../../../services/apiRoutes";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../utils/Loader";

const UpdateSecondVendorPopup = ({
  setSecondShowEdit,
  setShowEdit,
  allCountriesList,
  id,
  fetchData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset, // ← add reset
    watch,
    formState: { errors },
  } = useForm();

  const { createData, editData } = useContext(VendorManagementContext);

  const [tax_certificate, setTaxCertificate] = useState(null);
  const [business_licence, setBusinessLicense] = useState(null);
  const [logo, setLogo] = useState(null);
  const [cities, setCities] = useState([]);
  const [loadingCity, setLoadingCity] = useState(false);
  const selectedCountryId = watch("country_id");
  const [loader, setLoader] = useState(false);

  const handleTaxCertificate = (e) => {
    const file = e.target.files[0];

    if (file) {
      setTaxCertificate(file);

      // Update form state and trigger validation
      setValue("tax_certificate", file, { shouldValidate: true });
    } else {
      setValue("tax_certificate", null, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (!fetchData) return;

    // map simple fields straight through
    const base = {
      name: fetchData.name,
      email: fetchData.email,
      contact_person: fetchData.contact_person,
      landline_number: fetchData.landline_number,
      mobile_number: fetchData.mobile_number,
      description: fetchData.description,
      domain: fetchData.domain,
      type: fetchData.type,
      dropshipping: fetchData.dropshipping == true ? "yes" : "no", // if your select expects strings
      website_link: fetchData.website_link,
      business_licence_number: fetchData.business_licence_number,
      credit_limit: fetchData.credit_limit,
      net_terms: fetchData.net_terms,
      country_id: fetchData.country?.id,
      // files remain null (user will re‑upload if changing)
      // logo: fetchData?.logo_url,
      // business_licence: fetchData?.business_licence_url,
      // tax_certificate: fetchData.tax_certificate_url,
    };

    // map arrays to value arrays
    const arrays = {
      city_ids: fetchData.cities.map((c) => c.id),
      website_ids: fetchData.websites.map((w) => w.id),
    };

    reset({ ...base, ...arrays });
  }, [fetchData, reset]);

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

  const handleBusinessCertificate = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBusinessLicense(file);

      // Update form state and trigger validation
      setValue("business_licence", file, { shouldValidate: true });
    } else {
      setValue("business_licence", null, { shouldValidate: true });
    }
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogo(file);

      // Update form state and trigger validation
      setValue("logo", file, { shouldValidate: true });
    } else {
      setValue("logo", null, { shouldValidate: true });
    }
  };

  const formatOptions = (data, labelKey = "name", valueKey = "id") =>
    data.map((item) => ({
      label: item[labelKey],
      value: item[valueKey],
    }));

  const onSubmit = async (data) => {
    setLoader(true);
    const finalData = { ...data, ...editData };
    const formData = new FormData();
    const token = localStorage.getItem("token");

    // Append regular fields
    formData.append("_method", "PUT");
    formData.append("name", finalData.name);
    formData.append("email", finalData.email);
    formData.append("contact_person", finalData.contact_person);
    formData.append("landline_number", finalData.landline_number);
    formData.append("mobile_number", finalData.mobile_number);
    formData.append(
      "business_licence_number",
      finalData.business_licence_number
    );
    formData.append("country_id", finalData.country_id);
    formData.append("credit_limit", finalData.credit_limit);
    // formData.append("description", finalData.description);
    formData.append("domain", finalData.domain);
    formData.append("dropshipping", finalData.dropshipping);
    formData.append("net_terms", finalData.net_terms);
    formData.append("type", finalData.type);
    formData.append("website_link", finalData.website_link);

    // Append files)
    if (finalData.business_licence) {
      formData.append("business_licence", finalData.business_licence);
    }

    if (finalData.tax_certificate) {
      formData.append("tax_certificate", finalData.tax_certificate);
    }

    if (finalData.logo) {
      formData.append("logo", finalData.logo);
    }

    // Append arrays
    finalData.city_ids.forEach((id) => {
      formData.append("city_ids[]", id);
    });

    finalData.website_ids.forEach((id) => {
      formData.append("website_ids[]", id);
    });

    try {
      const response = await axios.post(`${basePath}/vendors/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoader(false);
      if (response?.data) {
        toast.success("Vendor Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[35%] p-3 relative">
        <button
          onClick={() => setSecondShowEdit(false)}
          className="absolute right-4 text-gray-500 hover:text-gray-700 text-[20px]"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-1">Update Vendor Details</h2>
        <div className=" flex items-center mb-[10px] justify-center">
          <img src={VendorManage2} className=" w-[50%]" alt="add vendor" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 max-h-[550px] overflow-y-scroll border-t pt-3"
        >
          <div>
            <div className="w-[100%] mb-[10px]">
              <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                Rebate Target
              </label>
              <input
                // {...register("email", {
                //   required: "Email is required",
                // })}
                className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                placeholder="Enter Rebate Target"
              />
              {/* {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )} */}
            </div>
          </div>
          <div>
            <div className="w-[100%] mb-[10px]">
              <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                Rebate %
              </label>
              <input
                // {...register("email", {
                //   required: "Email is required",
                // })}
                className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                placeholder="Enter Rebate %"
              />
              {/* {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )} */}
            </div>
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
              {allCountriesList?.data?.map((country) => {
                return (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                );
              })}
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
                <p className="text-gray-500">Loading cities...</p>
              ) : (
                <Controller
                  name="city_ids"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <VendorMultiOption
                      label="City"
                      name="city_ids"
                      options={formatOptions(cities, "name")}
                      onChange={(ids) => field.onChange(ids)}
                      value={field.value || []}
                    />
                  )}
                />
              )}
            </div>
          )}
          {[
            {
              name: "type",
              label: "Type",
              options: ["direct", "indirect"],
            },
            {
              name: "domain",
              label: "Domain",
              options: ["Horeca", "Rapid Supplies"],
            },
            {
              name: "dropshipping",
              label: "Dropshipping",
              options: ["yes", "no"],
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
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
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
          <div className="max-h-[450px]">
            <div className=" mb-[10px]">
              <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                Business License No. / Employer Identification No.
              </label>
              <input
                {...register("business_licence_number", {
                  required: "Business licence no. / Employer identification no is required",
                })}
                className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                placeholder="Enter Business License No."
              />
              {errors.business_licence_number && (
                <span className="text-red-500 text-sm">
                  {errors.business_licence_number.message}
                </span>
              )}
            </div>
            {/* INput Fields */}

            {/* Logo */}
            <div className=" mb-[10px]">
              <label className="block text-sm font-semibold text-[#616161] mb-[4px]">
                Logo (webp, .png)
                {fetchData.logo_url && (
                  <a
                    href={fetchData.logo_url}
                    download="logo.webp"
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm ml-2"
                  >
                    Download
                  </a>
                )}
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  onChange={handleLogo}
                  className="hidden"
                  id="logo-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="logo-upload"
                  className="bg-[#26683A] text-white px-4 py-[5px] rounded-[4px] cursor-pointer"
                >
                  Choose File
                </label>
                <span className="ml-2 text-gray-500 max-w-[200px] truncate inline-block align-middle">
                  {logo ? logo.name : "No file chosen"}
                </span>
              </div>
              {errors.logo && (
                <span className="text-red-500 text-sm">
                  {errors.logo.message}
                </span>
              )}
            </div>

            {/* Business License Upload */}
            <div className="mb-[10px]">
              <label className="block text-sm font-semibold text-[#616161] mb-[4px]">
                Business License (pdf)
                {fetchData.business_licence_url && (
                  <a
                    href={fetchData.business_licence_url}
                    download="BusinessLincense.pdf"
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm ml-2"
                  >
                    Download
                  </a>
                )}
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  onChange={handleBusinessCertificate}
                  className="hidden"
                  id="business-license-upload"
                  accept="application/pdf"
                />
                <label
                  htmlFor="business-license-upload"
                  className="bg-[#26683A] text-white px-4 py-[5px] rounded-[4px] cursor-pointer"
                >
                  Choose File
                </label>
                <span className="ml-2 text-gray-500 max-w-[200px] truncate inline-block align-middle">
                  {business_licence ? business_licence.name : "No file chosen"}
                </span>
              </div>
              {errors.business_licence && (
                <span className="text-red-500 text-sm">
                  {errors.business_licence.message}
                </span>
              )}
            </div>

            {/* Tax Certificate Upload */}
            <div className="mb-[10px]">
              <label className="block text-sm font-semibold text-[#616161] mb-[4px]">
                Tax Certificate (pdf)
                {fetchData.tax_certificate_url && (
                  <a
                    href={fetchData.tax_certificate_url}
                    download="TextCertificate.pdf"
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm ml-2"
                  >
                    Download
                  </a>
                )}
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  onChange={handleTaxCertificate}
                  className="hidden"
                  id="tax-certificate-upload"
                  accept="application/pdf"
                />
                <label
                  htmlFor="tax-certificate-upload"
                  className="bg-[#26683A] text-white px-4 py-[5px] rounded-[4px] cursor-pointer"
                >
                  Choose File
                </label>
                <span className="ml-2 text-gray-500  max-w-[200px] truncate inline-block align-middle">
                  {tax_certificate ? tax_certificate.name : "No file chosen"}
                </span>
              </div>
              {errors.tax_certificate && (
                <span className="text-red-500 text-sm">
                  {errors.tax_certificate.message}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                setSecondShowEdit(false);
                setShowEdit(true);
              }}
              className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded-[4px]"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#26683A] border border-[#26683A] text-white w-full rounded-[4px]"
            >
              {loader ? <Loader /> : "Update"}
              {/* {isLoading ? "Creating..." : "Create"} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSecondVendorPopup;
