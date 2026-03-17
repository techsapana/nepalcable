"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Editor from "@/src/components/Editor";
import Image from "next/image";

interface Blog {
  id: string | number;
  title: string;
  description: string;
  content: string;
  images: string[];
  image?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = `/api/blogs`;

const getBlogImage = (blog: Blog) =>
  blog.imageUrl || blog.image || blog.images?.[0] || "";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState<Blog | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    images: [] as File[],
  });

  /* ================= FETCH BLOGS ================= */

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("adminToken");

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ================= HANDLERS ================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter a description");
      return;
    }

    const formData = new FormData();

    formData.append(
      "blog",
      JSON.stringify({
        title: form.title,
        description: form.description,
        content: form.content,
      }),
    );

    form.images.forEach((img) => formData.append("images", img));

    try {
      setIsSubmitting(true);

      if (selected) {
        await axios.put(`${API_URL}/${selected.id}`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
      }

      alert("Success!");

      setForm({
        title: "",
        description: "",
        content: "",
        images: [],
      });

      setSelected(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });

      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  const handleEdit = (b: Blog) => {
    setSelected(b);
    setForm({
      title: b.title,
      description: b.description,
      content: b.content || "",
      images: [],
    });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Blog Management</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* ================= FORM ================= */}
        <div className="border-2 border-gray-300 p-8 rounded-xl bg-white shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {selected ? "Edit Blog" : "Add New Blog"}
          </h2>

          <input
            type="text"
            value={form.title}
            placeholder="Blog Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 border-gray-300 p-4 text-lg w-full mb-4 rounded focus:outline-none focus:border-blue-500"
          />

          <div className="mb-6">
            <label className="font-semibold block mb-3 text-lg">
              Description:
            </label>
            <input
              type="text"
              value={form.description}
              placeholder="Enter a short description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border-2 border-gray-300 p-4 text-lg w-full mb-4 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-3 text-lg">Content:</label>
            <Editor
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
            />
          </div>

          {/* IMAGES */}
          <div className="mb-6">
            <label className="font-semibold block mb-2 text-lg">Images:</label>

            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border-2 border-gray-300 p-3 w-full rounded"
                />

                {form.images.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {form.images.length} file(s) selected
                  </p>
                )}
              </div>

              {selected && getBlogImage(selected) && (
                <div className="w-full md:w-56 shrink-0">
                  <p className="text-sm text-gray-600 mb-2">Current image:</p>
                  <div className="relative h-36 w-full overflow-hidden rounded border border-gray-200">
                    <Image
                      src={getBlogImage(selected)}
                      alt={selected.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            {isSubmitting && (
              <p className="text-sm text-blue-600 self-center">
                {selected ? "Saving changes..." : "Creating blog..."}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded font-semibold text-lg"
            >
              {isSubmitting
                ? selected
                  ? "Updating..."
                  : "Creating..."
                : selected
                  ? "Update Blog"
                  : "Create Blog"}
            </button>

            {selected && (
              <button
                disabled={isSubmitting}
                onClick={() => {
                  setSelected(null);
                  setForm({
                    title: "",
                    description: "",
                    content: "",
                    images: [],
                  });
                }}
                className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded font-semibold text-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* ================= LIST ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Available Blogs ({blogs?.length})
          </h2>

          {loading ? (
            <p className="text-gray-600">Loading blogs...</p>
          ) : blogs?.length === 0 ? (
            <div className="text-center py-10 bg-gray-100 rounded-lg">
              No blogs yet. Create one to get started!
            </div>
          ) : (
            <div className="space-y-5">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="border-2 border-gray-300 p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-4 md:items-start"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">{b.title}</h3>

                    <p className="mb-3">{b.description}</p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(b)}
                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(b.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {getBlogImage(b) && (
                    <div className="relative h-36 w-full md:w-56 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={getBlogImage(b)}
                        alt={b.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
