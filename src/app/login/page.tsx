"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Cookies from "js-cookie";

import { axiosInstance } from "@/lib/axiosInstance";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useRouter();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      axiosInstance
        .post("/login", values)
        .then((data) => {
          if (data?.data?.status) {
            toast.success("User logged in successfully");
            Cookies.set("token", data?.data?.token, { expires: 1 });
            // Cookies.set("role", data?.data?.role, { expires: 1 });
            setTimeout(() => {
              if (data?.data?.role === "customer") {
                navigate.push("/");
              } else {
                navigate.push("/dashboard");
              }
            }, 3001);
          }
        })
        .catch((error) => {
          toast.error("Login failed");
          console.error(error);
        });
    },
  });

  return (
    <div className="container mx-auto px-2 xl:px-4 pt-0 md:py-12">
      <div className="w-full mx-auto md:w-[70%]">
        <div className="bg-white md:rounded-lg shadow-lg flex flex-wrap md:flex-nowrap overflow-hidden">
          <div className="w-full md:w-1/2">
            <img
              src="/auth.png"
              alt="Login illustration"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 px-2 py-6 md:p-10">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">Log In</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 duration-300 rounded"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-orange-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
