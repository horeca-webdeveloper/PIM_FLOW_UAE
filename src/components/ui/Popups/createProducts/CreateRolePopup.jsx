import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonInput from "../../../common/MultiAttributes/CommonInput";
import {
  useCreateRoles,
  useFetchRolesId,
} from "../../../../services/apis/Roles/Hooks";
import { useCreateUser } from "../../../../services/apis/Users/Hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateRolePopup = ({ setShowPopup }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
  });

  const {
    mutate,
    isLoading: createUserLoading,
    error: createUserError,
  } = useCreateRoles();

  const handleFormSubmit = (formData) => {
    setLoader(true);

    // Ensure slug is same as name
    const updatedFormData = { ...formData, slug: formData.name };
    mutate(updatedFormData, {
      onSuccess: (data) => {
        setLoader(false);
        toast.success("Role Created Successfully");
        window.location.reload();
        setShowPopup(false);
        document.body.style.overflow = "auto";
      },
      onError: (err) => {
        setLoader(false);
        console.log(err);
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-[18px]  border-b border-[#A8A4A4] pb-3 text-left mb-[10px] font-semibold text-[#1D1C1C]">
          Create User Role
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CommonInput
            label="Name"
            name="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Description */}
          <label className="text-[16px] text-[#616161] font-semibold">
            Description
          </label>
          <textarea
            name="description"
            className="h-[150px] w-full p-2 text-[#616161] rounded-md border border-[#A8A4A4]"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <div className="flex mt-[20px] justify-end space-x-2 mt-[10px]">
            <button
              type="button"
              onClick={() => {
                setShowPopup(false);
                document.body.style.overflow = "auto";
              }}
              className="flex-1 bg-[#F1EFEF] border border-[#A8A4A4] text-[#303030] py-2 px-4 mr-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#26683A]  text-white py-2 px-4 rounded"
            >
              {loader ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRolePopup;
