"use client";

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Ellipsis, X } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { AddressFormValues } from "@/lib/type";

const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string().required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  streetAddress: Yup.string().required("Street address is nequired"),
});

interface AddressFormProps {
  data: Partial<AddressFormValues>;
  onClose: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ data, onClose }) => {
  return (
    <div className="w-[600px] mx-auto p-4 bg-white shadow-md rounded-lg space-y-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Address</h2>
        <button className="text-orange-500 text-xl" onClick={onClose}>
          <X />
        </button>
      </div>
      <Formik
        initialValues={{
          fullName: data?.fullName || "",
          email: data?.email || "",
          phone: data?.phone || "",
          country: data?.country || "",
          state: data?.state || "",
          city: data?.city || "",
          zipcode: data?.zipcode || "",
          streetAddress: data?.streetAddress || "",
        }}
        enableReinitialize={true}
        validationSchema={AddressSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
          axiosInstance
            .put("/users", { billingAddress: values })
            .then((data) => {
              if (data?.data?.status) {
                toast.success("Address Added");
              }
            });
          setSubmitting(false);
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-2 gap-6 mb-6">
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
                  Country <span className="text-red-500">*</span>
                </label>
                <Field
                  name="country"
                  as="select"
                  className="mt-1 block w-3/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="">--</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Usa">Usa</option>
                </Field>
                <ErrorMessage name="fullName" className="text-red-500 mt-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <Field
                  name="state"
                  as="select"
                  className="mt-1 block w-3/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="">--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Field>
                <ErrorMessage name="state" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <Field
                  name="city"
                  as="select"
                  className="mt-1 block w-3/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="">--</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Bangladesh">Bangladesh</option>
                </Field>
                <ErrorMessage name="city" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <Field
                  name="zipcode"
                  type="text"
                  className="mt-1 block w-3/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <Field
                  name="streetAddress"
                  type="text"
                  className="mt-1 block w-3/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
                <ErrorMessage name="streetAddress" component="div" />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2"
                >
                  {isSubmitting ? "Adding..." : "Add Address"}
                </button>
                <button
                  type="submit"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const AddressList: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<Partial<AddressFormValues>>({});

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getAddress = async () => {
    await axiosInstance.get("/user").then((data) => {
      if (data?.data?.status) {
        setData(data.data.user.billingAddress);
      }
    });
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Addresses</h2>
      <div className="flex justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2>{data?.fullName}</h2>
              <Ellipsis />
            </div>
            <p>
              {data?.email}, {data?.phone}, {data?.city}, {data?.country},{" "}
              {data?.zipcode}
            </p>
          </div>

          <div>
            <button className="absolute top-2 right-8 text-blue-400 hover:text-blue-600">
              Edit
            </button>
            <button className="absolute top-2 right-2 text-red-400 hover:text-red-600">
              <X />
            </button>
          </div>
        </div>

        <button
          onClick={toggleModal}
          className="mt-4 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg flex items-center hover:bg-red-100"
        >
          Update Address
        </button>
      </div>

      {showModal && (
        <div className="fixed top-14 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <AddressForm onClose={toggleModal} data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;
