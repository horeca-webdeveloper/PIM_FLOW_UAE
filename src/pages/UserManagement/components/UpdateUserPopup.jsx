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
import Loader from "../../../utils/Loader";
import { UsersApiPath } from "../../../services/apiRoutes";
import axios from "axios";

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
      username: editData?.username,
      first_name: editData?.first_name,
      last_name: editData?.last_name,
      old_password: "",
      new_password: "",
      confirm_password: "",
      role: editData?.role_id,
    },
  });
  const { data, isLoading, error } = useFetchRolesId();

  const {
    mutate,
    isLoading: createUserLoading,
    error: createUserError,
  } = useUpdateUser();

  const handleFormSubmit = async (formData) => {
    const roleId = parseInt(formData.role, 10);
    const selectedRole = data?.data?.find((role) => role.id === roleId)
    const updatedData = {
      ...formData,
      password: formData.confirm_password,
      role: selectedRole.name
    };
    delete updatedData.confirm_password;
    delete updatedData.new_password;
    delete updatedData.old_password;
    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${UsersApiPath}/${editData?.id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoader(false);
      if (response?.data) {
        setShowEdit(false);
        toast.success("User Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (editData?.role_id) {
      setValue("role", editData.role_id);
    }
  }, [editData?.role_id, setValue]);

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
            <p className="text-red-500 text-[14px]">{errors.email.message}</p>
          )}

          <CommonInput
            label="User Name"
            name="username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-[14px]">
              {errors.username.message}
            </p>
          )}

          <div className="mb-2">
            <label className="text-[16px] text-[#616161] font-semibold block mb-[4px]">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "password" : "text"}
                className="border border-[#A8A4A4] w-full rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
                {...register("old_password", {
                  required: "Old password is required",
                })}
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
            {errors.old_password && (
              <p className="text-red-500 text-[14px]">
                {errors.old_password.message}
              </p>
            )}
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
              <p className="text-red-500 text-[14px]">
                {errors.new_password.message}
              </p>
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
              <p className="text-red-500 text-[14px]">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <CommonInput
            label="First Name"
            name="first_name"
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <p className="text-red-500 text-[14px]">
              {errors.first_name.message}
            </p>
          )}

          <CommonInput
            label="Last Name"
            name="last_name"
            {...register("last_name", { required: "Last name is required" })}
          />
          {errors.last_name && (
            <p className="text-red-500 text-[14px]">
              {errors.last_name.message}
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <label className="text-[16px] text-[#616161] font-semibold">
                Select a role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="border border-[#A8A4A4] w-[100%] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
              >
                <option value="">Select a role</option>
                {data?.data?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex mt-[20px] justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowEdit(false);
                document.body.style.overflow = "auto";
              }}
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
