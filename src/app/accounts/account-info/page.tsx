"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AccountInfoSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email().required("Invalid email"),
  phone: Yup.string().required("Phone number is required"),
  image: Yup.mixed().required("Image is nequired"),
});

const AccountInfoPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4 text-orange-500">
          Account Information
        </h1>
        <div className="bg-gray-50 p-6 mt-4">
          <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
          <Formik
            initialValues={{
              fullName: "Diana Didorenko",
              email: "diana.diddorenko@ukr.net",
              phone: "974379424",
              image: "",
            }}
            validationSchema={AccountInfoSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="fullName"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <select className="mt-1 block w-1/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                        <option value="UA +380">UA +380</option>
                      </select>
                      <Field
                        name="phone"
                        type="text"
                        className="mt-1 block w-3/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Image <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="image"
                      type="file"
                      onChange={(e: any) => {
                        setFieldValue("image", e.currentTarget.files![0]);
                      }}
                      className="mt-1 block w-full text-gray-500"
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 mt-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoPage;
