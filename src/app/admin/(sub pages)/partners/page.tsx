"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  imageUrl: string;
}

const API_URL = `/api/partners`;

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<Partner | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    image: null as File | null,
  });

  const fetchPartners = async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("adminToken");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPartners(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load partners");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Please enter partner name");
      return;
    }

    if (!selected && !form.image) {
      alert("Please select partner image");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append(
        "partner",
        JSON.stringify({
          name: form.name,
        }),
      );

      if (form.image) {
        formData.append("image", form.image);
      }

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
        name: "",
        image: null,
      });
      setSelected(null);
      fetchPartners();
    } catch (err) {
      console.error(err);
      alert("Failed to save partner");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this partner?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("adminToken")}` },
      });
      fetchPartners();
    } catch (err) {
      console.error(err);
      alert("Failed to delete partner");
    }
  };

  const handleEdit = (p: Partner) => {
    setSelected(p);
    setForm({
      name: p.name,
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Partner Management</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="border-2 border-gray-300 p-6 rounded-lg bg-white shadow-sm">
              <h2 className="text-2xl font-bold mb-4">
                {selected ? "Update Partner" : "Add New Partner"}
              </h2>

              <input
                type="text"
                placeholder="Partner Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-2 border-gray-300 p-2 w-full rounded mb-3"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.files?.[0] ?? null,
                  })
                }
                className="border-2 border-gray-300 p-2 w-full rounded"
              />

              {form.image && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {form.image.name}
                </p>
              )}

              {selected && !form.image && (
                <p className="mt-2 text-sm text-gray-600">
                  Keep existing image or choose a new one.
                </p>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-semibold"
                >
                  {selected
                    ? submitting
                      ? "Updating..."
                      : "Update"
                    : submitting
                      ? "Creating..."
                      : "Create"}
                </button>

                {selected && (
                  <button
                    onClick={() => {
                      setSelected(null);
                      setForm({
                        name: "",
                        image: null,
                      });
                    }}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              Partners ({partners.length})
            </h2>

            {loading ? (
              <p>Loading partners...</p>
            ) : partners.length === 0 ? (
              <div className="text-center py-8 bg-gray-100 rounded-lg">
                No partners yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {partners.map((p) => (
                  <div
                    key={p.id}
                    className="border-2 border-gray-300 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-semibold text-center mb-3 line-clamp-1">
                      {p.name}
                    </p>

                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      height={40}
                      width={70}
                      className="w-full h-24 object-contain mb-3"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
