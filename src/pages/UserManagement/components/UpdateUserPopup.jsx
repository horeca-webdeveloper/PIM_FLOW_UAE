import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import { useFetchRolesId } from "../../../services/apis/Roles/Hooks";
import {
  useCreateUser,
  useUpdateUser,
} from "../../../services/apis/Users/Hooks";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdateUserPopup = ({ setShowEdit, editData }) => {
  const [loader, setLoader] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: editData?.id,
      email: editData?.email,
      first_name: editData?.first_name,
      last_name: editData?.last_name,
      old_password: "",
      new_password: "",
      confirm_password: "",
      role_id: [],
    },
  });

  const { data, isLoading, error } = useFetchRolesId();

  const {
    mutate,
    isLoading: createUserLoading,
    error: createUserError,
  } = useUpdateUser();

  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    setLoader(true);
    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        setLoader(false);
        toast.success("User Updated Successfully");
        window.location.reload();
        setShowEdit(false);
      },
      onError: (err) => {
        setLoader(false);
        console.log(err);
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 sm:h-[600px] sm:overflow-y-scroll 2xl:h-[full] 2xl:overflow-none rounded-lg shadow-lg w-[30%]">
        <h2 className="text-[22px] text-left mb-[10px] font-bold text-[#1D1C1C]">
          Update User
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CommonInput
            label="Email"
            name="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <div className="mb-2">
            <label className="text-[16px] text-[#616161] font-semibold block mb-[4px]">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "password" : "text"}
                className="border border-[#A8A4A4] w-full rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
                {...register("old_password")}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showOldPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="mb-2">
            <label className="text-[16px] text-[#616161] font-semibold block mb-[4px]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "password" : "text"}
                className="border border-[#A8A4A4] w-full rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
                {...register("new_password", {
                  required: "New password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            {errors.new_password && (
              <p className="text-red-500">{errors.new_password.message}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="text-[16px] text-[#616161] font-semibold block mb-[4px]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "password" : "text"}
                className="border border-[#A8A4A4] w-full rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500">{errors.confirm_password.message}</p>
            )}
          </div>

          <CommonInput
            label="First Name"
            name="first_name"
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name.message}</p>
          )}

          <CommonInput
            label="Last Name"
            name="last_name"
            {...register("last_name", { required: "Last name is required" })}
          />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name.message}</p>
          )}

          <div>
            <label className="text-[16px] text-[#616161] font-semibold">
              Select a role
            </label>
            <select
              {...register("role_id", { required: "Role is required" })}
              className="border border-[#A8A4A4] w-[100%] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
            >
              <option value="">Select a role</option>
              {data?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="text-red-500">{errors.role_id.message}</p>
            )}
          </div>

          <div className="flex mt-[20px] justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowEdit(false)}
              className="flex-1 bg-[#F1EFEF] border border-[#A8A4A4] text-[#303030] py-2 px-4 mr-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#26683A] text-white py-2 px-4 rounded"
            >
              {loader ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPopup;
