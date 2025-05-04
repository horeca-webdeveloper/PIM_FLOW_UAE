import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchStore } from "../../../services/apis/Products/Hooks";
import { useAddBrands } from "../../../services/apis/BrandsManagement/Hooks";
import toast from "react-hot-toast";

const AddBrandPopup = ({ setShowPopup }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const isFeatured = watch("is_featured", false);

  const [brandLogo, setBrandLogo] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandLogo(file); // Update state for immediate UI feedback
      setValue("logo", file, { shouldValidate: true }); // Register file in the form
    }
  };

  const {
    mutate,
    isLoading: deleteUserLoading,
    error: deleteUserError,
  } = useAddBrands();

  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();

    // Add all fields from data (destructured) to FormData
    const formattedData = {
      ...data,
      is_featured: 1,
      status: "draft",
      order: 1,
    };

    Object.entries(formattedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    mutate(formData, {
      onSuccess: (res) => {
        setLoading(false);
        toast.success("Brand Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      },
      onError: (err) => {
        console.log(err);
        setLoading(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[32%] p-3 relative">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-1">Add Brand</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 border-t pt-3"
        >
          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Brand Name
            </label>
            <input
              {...register("name", { required: "Brand name is required" })}
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              placeholder="Enter brand name"
            />
            {errors.name && (
              <p className="text-red-500 text-[14px]">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Brand Short Description
            </label>
            <textarea
              {...register("description", {
                required: "Brand description is required",
              })}
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              placeholder="Enter brand description"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-[14px]">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#616161] mb-[4px]">
              Brand Logo
            </label>
            <div className="flex items-center">
              <input
                type="file"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
                accept="image/*"
              />
              <label
                htmlFor="logo-upload"
                className="bg-[#26683A] text-white px-4 py-2 rounded-[4px] cursor-pointer"
              >
                Choose File
              </label>
              <span className="ml-0 text-red-500">
                {brandLogo ? brandLogo.name : "No file chosen"}
              </span>
            </div>
            {errors.logo && (
              <p className="text-red-500 text-sm">{errors.logo.message}</p>
            )}
          </div>

          {/* <div className="w-full gap-4">
            <h1 className="text-[16px] text-[#616161] font-semibold">Vendor</h1>
            <select className="border border-[#A8A4A4] w-[100%] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]">
              <option value="" disabled>
                Select a store
              </option>
              {storeData?.stores && Object.keys(storeData.stores).length > 0 ? (
                Object.entries(storeData.stores).map(([id, name]) => (
                  <option key={id} value={name} id={id}>
                    {name}
                  </option>
                ))
              ) : (
                <option disabled>Loading stores...</option>
              )}
            </select>
          </div> */}

          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Brand Website
            </label>
            <input
              {...register("website", {
                required: "Brand website is required",
                pattern: {
                  value: /^https?:\/\/[\w.-]+\.[a-z]{2,}([\/\w .-]*)*\/?$/i,
                  message: "Please enter a valid website",
                },
              })}
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              placeholder="Enter brand website"
            />
            {errors.website && (
              <p className="text-red-500 text-[14px]">
                {errors.website.message}
              </p>
            )}
          </div>

          {/* <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
            >
              <option value="">Select Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Is Featured
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("is_featured")}
                className="hidden"
              />
              <span
                className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                  isFeatured ? " bg-[darkgreen]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
                    isFeatured ? "translate-x-5" : ""
                  }`}
                ></span>
              </span>
              <span className="ml-2 text-sm font-semibold">
                {isFeatured ? "Yes" : "No"}
              </span>
            </label>
          </div> */}

          <div className="flex justify-between gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded-[4px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#26683A] border border-[#26683A] text-white w-full rounded-[4px]"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandPopup;
