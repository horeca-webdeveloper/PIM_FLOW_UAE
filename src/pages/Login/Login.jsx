import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo/logo.png";
import { useLogin } from "../../services/apis/Login/Hook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../utils/Loader";
import LoginLogo from "../../../src/assets/icons/LoginLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading } = useLogin();

  const onSubmit = (data) => {
    setLoader(true);
    const payload = {
      formData: {
        ...data,
        rememberMe: false,
      },
    };

    mutate(payload, {
      onSuccess: (data) => {
        if (data?.token) {
          setLoader(false);
          localStorage.setItem("token", data?.token);
          navigate(`/`);
          toast.success("Login Successfully");
        } else {
          setLoader(false);
          toast.error("Invalid Credentials");
        }
      },
      onError: (err) => {
        setLoader(false);
        console.log(err);
      },
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col w-1/2  items-center justify-between">
        <div className=" bg-white p-8">
          <div className="w-[500px]">
            <div className="mb-[100px] mt-[80px] text-center">
              <img
                src={logo}
                alt="More PG Flow"
                className="mx-auto w-[280px]"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-[24px] font-semibold mb-2 text-[#1D1C1C]">
                Sign In
              </h2>
              <p className="text-[#616161] text-[16px]">
                Welcome back! Please enter your details
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={`h-[50px] w-full px-[10px] rounded-[12px] bg-[#fafafa] border ${
                      errors.email ? "border-red-500" : "border-[#A8A4A4]"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "password" : "text"}
                    placeholder="Enter your password"
                    className={`h-[50px] w-full px-[10px] rounded-[12px] bg-[#fafafa] border ${
                      errors.password ? "border-red-500" : "border-[#A8A4A4]"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 mt-[3%]  text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#efefef] hover:bg-[#26683A] text-black hover:text-[white] h-[54px] rounded-[12px] border border-[#A8A4A4] text-[16px] font-semibold"
                  disabled={loader}
                >
                  {loader ? <Loader /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center  mb-[20px] text-sm text-gray-500">
          All reserved by |{" "}
          <span className="text-[#26683A] font-bold">Horecastore</span>
        </div>
      </div>

      <div className="w-1/2 bg-cover bg-center">
        <img src={LoginLogo} />
        <div className="h-full w-full bg-black bg-opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;
