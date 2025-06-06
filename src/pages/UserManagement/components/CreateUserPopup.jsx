import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CommonInput from "../../../components/common/MultiAttributes/CommonInput";
import { useFetchRolesId } from "../../../services/apis/Roles/Hooks";
import { useCreateUser } from "../../../services/apis/Users/Hooks";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../../utils/Loader";
import axios from "axios";
import { UsersApiPath } from "../../../services/apiRoutes";

const CreateUserPopup = ({ setShowPopup }) => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      role: "",
    },
  });

  const { data, isLoading, error } = useFetchRolesId();

  console.log(data?.data);

  const {
    mutate,
    isLoading: createUserLoading,
    error: createUserError,
  } = useCreateUser();

  const handleFormSubmit = async (formData) => {
    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${UsersApiPath}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response?.response?.data);

      setLoader(false);
      if (response?.data) {
        toast.success("User Created Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-[18px] text-left mb-[10px] font-semibold text-[#1D1C1C]">
          Create User
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
          <CommonInput
            label="User Name"
            name="username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <div className="mb-2">
            <label className="text-[16px] text-[#616161] font-semibold block mb-[4px]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                className="border border-[#A8A4A4] w-full rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
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

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <label className="text-[16px] text-[#616161] font-semibold">
                Select a role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="border border-[#A8A4A4] w-[100%] rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
              >
                <option value="">Select a role</option>
                {data?.data?.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </>
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

export default CreateUserPopup;
