import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { axiosInstance } from "@/lib/axiosInstance";
import { AddressFormValues } from "@/lib/type";

interface AddressFormProps {
  onClose: () => void;
  showBillingAddress: boolean;
  shippingAddress: AddressFormValues | null;
  billingAddress: AddressFormValues | null;
  title: string;
  fetchAddress: () => void;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is requiered"),
  phone: Yup.string().required("Phone is required"),
  zipcode: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
  streetAddress: Yup.string().required("Street Address is required"),
});

const AddressForm: React.FC<AddressFormProps> = ({
  onClose,
  showBillingAddress,
  shippingAddress,
  billingAddress,
  title,
  fetchAddress,
}) => {
  const initialValues: AddressFormValues = {
    fullName: showBillingAddress
      ? billingAddress?.fullName || ""
      : shippingAddress?.fullName || "",
    email: showBillingAddress
      ? billingAddress?.email || ""
      : shippingAddress?.email || "",
    phone: showBillingAddress
      ? billingAddress?.phone || ""
      : shippingAddress?.phone || "",
    country: showBillingAddress
      ? billingAddress?.country || ""
      : shippingAddress?.country || "",
    state: showBillingAddress
      ? billingAddress?.state || ""
      : shippingAddress?.state || "",
    city: showBillingAddress
      ? billingAddress?.city || ""
      : shippingAddress?.city || "",
    zipcode: showBillingAddress
      ? billingAddress?.zipcode || ""
      : shippingAddress?.zipcode || "",
    streetAddress: showBillingAddress
      ? billingAddress?.streetAddress || ""
      : shippingAddress?.streetAddress || "",
  };

  const handleSubmit = (values: AddressFormValues) => {
    if (showBillingAddress) {
      axiosInstance
        .put("/users", {
          shippingAddress: values,
          billingAddress: showBillingAddress ? values : null,
        })
        .then((data) => {
          if (data?.data?.status) {
            toast.success("Shipping & Billing Address Added!");
            fetchAddress();
            onClose();
          } else {
            toast.error("Shipping & Billing Address Not Added");
            fetchAddress();
            onClose();
          }
        });
    } else {
      if (title === "Billing Address") {
        axiosInstance.put("/users", { billingAddress: values }).then((data) => {
          if (data?.data?.status) {
            toast.success("Billing Address Added!");
            fetchAddress();
            onClose();
          } else {
            toast.error("Billing Address Not Added");
            fetchAddress();
            onClose();
          }
        });
      }

      if (title === "Shipping Address") {
        axiosInstance
          .put("/users", { shippingAddress: values })
          .then((data) => {
            if (data?.data?.status) {
              toast.success("Shipping Address Added!");
              onClose();
            } else {
              toast.error("Shipping Address Not Added");
              onClose();
            }
          });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-2xl mx-auto p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Address</h2>
          <button className="text-red-500 text-xl" onClick={onClose}>
            <X />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Field
                  name="fullName"
                  type="text"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <Field
                  name="phone"
                  type="text"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="country"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                >
                  <option value="">--</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="Bangladesh">Bangladesh</option>
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <Field
                  as="select"
                  name="city"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                >
                  <option value="">--</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="New York">New York</option>
                </Field>
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* State*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <Field
                  as="select"
                  name="state"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Field>
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* ZipCode */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <Field
                  name="zipcode"
                  type="text"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="zipcode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <Field
                  name="streetAddress"
                  type="text"
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="streetAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddressForm;
