import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import CommonMultiOption from "../../../components/common/MultiAttributes/CommonMultiOption";
import { urls } from "../../../config/baseUrls";
import VendorManage1 from "../../../assets/icons/VendorManage1.png";
import { VendorManagementContext } from "../VendorManagementContext";
import Loader from "../../../utils/Loader";
import CommonMultiWebsites from "./CommonMultiWebsites";

const UpdateVendorPopup = ({
  setShowEdit,
  setSecondShowEdit,
  fetchLoading,
  fetchData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const options = [
    { value: "1", label: "United States" },
    { value: "2", label: "United Arab Emirates" },
    { value: "3", label: "Saudi Arabia" },
  ];

  useEffect(() => {
    if (!fetchData) return;

    setValue("name", fetchData.name);
    setValue("email", fetchData.email);
    setValue("contact_person", fetchData.contact_person);
    setValue("landline_number", fetchData.landline_number);
    setValue("mobile_number", fetchData.mobile_number);
    setValue("website_link", fetchData.website_link);
    setValue("credit_limit", fetchData.credit_limit);
    setValue("net_terms", fetchData.net_terms);
    setValue(
      "website_ids",
      fetchData?.websites?.map((w) => String(w?.id))
    );
    // …and so on for cities, zipcodes, country, etc.
  }, [fetchData, setValue]);

  const { setCreateData, setEditData } = useContext(VendorManagementContext);

  const onSubmit = (data) => {
    setEditData(data);
    setSecondShowEdit(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[35%] p-3 relative">
        <button
          onClick={() => setShowEdit(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-1">Update Vendor Details</h2>

        {fetchLoading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 border-t pt-3"
          >
            {/* Vendor Name */}
            <div className=" flex items-center justify-center">
              <img src={VendorManage1} className=" w-[50%]" alt="add vendor" />
            </div>
            <div className="flex gap-2">
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Vendor Name
                </label>
                <input
                  {...register("name", {
                    required: "Vendor name is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Vendor Name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Contact Person
                </label>
                <input
                  {...register("contact_person", {
                    required: "Contact person is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Contact Person"
                />
                {errors.contact_person && (
                  <span className="text-red-500 text-sm">
                    {errors.contact_person.message}
                  </span>
                )}
              </div>
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Landline Number
                </label>
                <input
                  type="number"
                  {...register("landline_number", {
                    required: "Landline number is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Landline Number"
                />
                {errors.landline_number && (
                  <span className="text-red-500 text-sm">
                    {errors.landline_number.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Mobile Number
                </label>
                <input
                  type="number"
                  {...register("mobile_number", {
                    required: "Mobile no. is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Mobile Number"
                />
                {errors.mobile_number && (
                  <span className="text-red-500 text-sm">
                    {errors.mobile_number.message}
                  </span>
                )}
              </div>
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Vendor Website
                </label>
                <input
                  {...register("website_link", {
                    required: "Website link is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Website Link"
                />
                {errors.website_link && (
                  <span className="text-red-500 text-sm">
                    {errors.website_link.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Credit Limit
                </label>
                <input
                  {...register("credit_limit", {
                    required: "Credit limit is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Credit Limit"
                />
                {errors.credit_limit && (
                  <span className="text-red-500 text-sm">
                    {errors.credit_limit.message}
                  </span>
                )}
              </div>
              <div className="w-[100%]">
                <label className="block text-sm font-semibold text-[#616161] mb-[5px]">
                  Net Terms
                </label>
                <input
                  {...register("net_terms", {
                    required: "Net terms is required",
                  })}
                  className="w-full border border-gray-300 rounded-[4px] px-3 py-[6px]"
                  placeholder="Enter Net Terms "
                />
                {errors.net_terms && (
                  <span className="text-red-500 text-sm">
                    {errors.net_terms.message}
                  </span>
                )}
              </div>
            </div>
            {/* Country Multi-select */}
            <Controller
              name="website_ids"
              control={control}
              rules={{ required: "Please any website" }}
              render={({ field }) => (
                <CommonMultiWebsites
                  {...field}
                  label="Our Website"
                  options={options}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            {errors.website_ids && (
              <span className="text-red-500 text-sm">
                {errors.website_ids.message}
              </span>
            )}
            <div className="flex justify-between gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded-[4px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#26683A] border border-[#26683A] text-white w-full rounded-[4px]"
              >
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateVendorPopup;
