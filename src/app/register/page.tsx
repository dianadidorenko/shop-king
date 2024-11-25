"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface SignUpFormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is requiered"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string().required("Mobile is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characheters long")
    .required("Password is requiered"),
});

const SignUpPage: React.FC = () => {
  const navigate = useRouter();

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values: any) => {
      axiosInstance
        .post("/register", values)
        .then((data) => {
          if (data?.data?.status) {
            toast.success("User registered successfully");
            setTimeout(() => {
              navigate.push("/login");
            }, 3001);
          }
        })
        .catch((error) => {
          toast.error("Registration failed");
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
              // src="https://placehold.co/600x800"
              src="/auth.png"
              alt="Three people walking in stylish outfits"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 px-2 py-6 md:p-10">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm fonr-bold mb-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`shadow appearance-none border rounde w-full py-2 px-3 text-gray-400 focus:outline-none ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sx mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm fonr-bold mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`shadow appearance-none border rounde w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
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
                  <p className="text-red-500 text-sx mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 text-sm fonr-bold mb-2"
                >
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="mobile"
                  className={`shadow appearance-none border rounde w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                    formik.touched.mobile && formik.errors.mobile
                      ? "border-red-500"
                      : ""
                  }`}
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-red-500 text-sx mt-1">
                    {formik.errors.mobile}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm fonr-bold mb-2"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className={`shadow appearance-none border rounde w-full py-2 px-3 text-gray-400 focus:outline-none ${
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
                  <p className="text-red-500 text-sx mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 duration-300"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
