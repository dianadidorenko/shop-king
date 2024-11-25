"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 charachters"),
  confirmPassword: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("newPassword")], "Password must match"),
});

const ChangePasswordPage: React.FC = () => {
  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">
        Change Password
      </h1>
      <div className="bg-gray-50 p-6 mt-4">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={PasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Old password <span className="text-red-500">*</span>
                </label>
                <Field
                  name="oldPassword"
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="newPassword"
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Password Confirmation{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
