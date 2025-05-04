import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios"; // Make sure axios is imported
import { basePath } from "../../../services/apiRoutes";
const UpdateBrandPopup = ({ setShowEdit, editData }) => {
  const [loader, setLoader] = useState(false);
  const [brandLogo, setBrandLogo] = useState(null);

  const token = localStorage.getItem("token"); // 🔐 Make sure token is stored in localStorage

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: editData?.id,
      name: editData?.name || "",
      description: editData?.description || "",
      website: editData?.slug || "",
      logo: editData?.logo || "",
    },
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandLogo(file);
      setValue("logo", file, { shouldValidate: true });
    }
  };

  const handleFormSubmit = async (formData) => {
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("website", formData.website);

    if (brandLogo) {
      formPayload.append("logo", brandLogo);
    }

    setLoader(true);

    try {
      const response = await axios.put(
        `${basePath}/brands/${editData?.id}`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Brand updated successfully");
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Failed to update brand");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[32%] p-3 relative">
        <button
          onClick={() => setShowEdit(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-1">Update Brand</h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
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
              <span className="ml-2 text-gray-500">
                {brandLogo
                  ? brandLogo.name
                  : editData?.logo
                  ? "Logo already uploaded"
                  : "No file chosen"}
              </span>
            </div>
            {errors.logo && (
              <p className="text-red-500 text-sm">{errors.logo.message}</p>
            )}
          </div>

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
              {loader ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrandPopup;
