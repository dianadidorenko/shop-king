import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LucideEdit, LucideTrash, LucidePlus, LucideX } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { axiosInstance } from "@/lib/axiosInstance";

interface Video {
  provider: string;
  link: string;
  _id: string;
}

const ProductVideo: React.FC = () => {
  const params = useParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [videoId, setVideoId] = useState("");

  const getVideos = async () => {
    if (Array.isArray(params?.slug)) {
      const productId = params.slug[1];
      const response = await axiosInstance.get(`/products/${productId}/videos`);
      if (response?.data?.status) {
        setVideos(response?.data?.data);
      }
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const formik = useFormik({
    initialValues: {
      provider: "",
      link: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      provider: Yup.string().required("Video provider is required"),
      link: Yup.string()
        .url("Must be a valid URL")
        .required("Link is required"),
    }),
    onSubmit: (values) => {
      if (editingVideo) {
        if (Array.isArray(params?.slug)) {
          const productId = params.slug[1];
          axiosInstance
            .put(`/products/${productId}/videos/${videoId}`, values)
            .then((data) => {
              if (data?.data?.status) {
                alert("Vidoe updated successfully");
              } else {
                console.error("Something went wrong");
              }
            });
        }
      } else {
        if (Array.isArray(params?.slug)) {
          const productId = params.slug[1];
          axiosInstance
            .post(`/products/${productId}/videos`, { videos: values })
            .then((data) => {
              if (data?.data?.status) {
                alert("Vidoe added to product successfully");
              }
            });
        }
      }
      closePopup();
    },
  });

  const openPopup = (video: Video | null = null, id: string) => {
    setEditingVideo(video);
    setVideoId(id);
    if (video) {
      formik.setValues(video);
    } else {
      formik.resetForm();
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setEditingVideo(null);
    setIsPopupOpen(false);
  };

  const handleDelete = (id: string) => {
    if (Array.isArray(params?.slug)) {
      const productId = params.slug[1];
      axiosInstance
        .delete(`/products/${productId}/videos/${id}`)
        .then((data) => {
          if (data?.data?.status) {
            alert("Video Deleted");
            getVideos();
          }
        });
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4 px-6 py-4 shadow">
          <h1 className="text-2xl font-semibold">Video Manager</h1>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => openPopup(null)}
          >
            <LucidePlus className="inline-block mr-2" size={16} />
            Add Video
          </button>
        </div>

        <table className="w-full bg-white px-6 py-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Video Provider</th>
              <th className="py-2 px-4 border-b text-left">Link</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{video.provider}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={video.link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {video.link}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b flex justify-center">
                  <button
                    className="text-green-500 hover:text-green-700 mr-2"
                    onClick={() => openPopup(video, video?._id)}
                  >
                    <LucideEdit size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(video._id)}
                  >
                    <LucideTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700">
              {editingVideo ? "Edit Video" : "Add Video"}
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={closePopup}
                >
                  <LucideX size={20} />
                </button>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="px-6 py-4 flex flex-col gap-4"
              >
                <div className="mb-4">
                  <label
                    htmlFor="provider"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Video Provider <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="provider"
                    name="provider"
                    value={formik.values.provider}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">--</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Vimeo">Vimeo</option>
                  </select>
                  {formik.touched.provider && formik.errors.provider && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.provider}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="link"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Link <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="link"
                    name="link"
                    value={formik.values.link}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full border border-gray-300 rounded-md p-2 h-24"
                  ></textarea>
                  {formik.touched.link && formik.errors.link && (
                    <p className="text-red-500 text-sm">{formik.errors.link}</p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 mr-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVideo;
