"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Certification {
  id: number;
  name: string;
  fileUrl: string;
}

const API_URL = "/api/certificates";

const isImageUrl = (url: string) =>
  /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url);

export default function AdminCertificates() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    file: null as File | null,
  });

  const fetchCertificates = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(API_URL);
      setCertifications(res.data.data ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Please enter certificate name");
      return;
    }

    if (!form.file) {
      alert("Please select a file");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append(
        "certificate",
        JSON.stringify({
          name: form.name,
        }),
      );
      formData.append("file", form.file);

      await axios.post(API_URL, formData);

      alert("Certificate uploaded");
      setForm({
        name: "",
        file: null,
      });
      fetchCertificates();
    } catch (err) {
      console.error(err);
      alert("Failed to upload certificate");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this certificate?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCertificates();
    } catch (err) {
      console.error(err);
      alert("Failed to delete certificate");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Certificate Management</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="border-2 border-gray-300 p-6 rounded-lg bg-white shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Upload Certificate</h2>

              <input
                type="text"
                placeholder="Certificate Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-2 border-gray-300 p-2 w-full rounded mb-3"
              />

              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) =>
                  setForm({
                    ...form,
                    file: e.target.files?.[0] ?? null,
                  })
                }
                className="border-2 border-gray-300 p-2 w-full rounded"
              />

              {form.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {form.file.name}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-semibold"
              >
                {submitting ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              Certificates ({certifications.length})
            </h2>

            {loading ? (
              <p>Loading certificates...</p>
            ) : certifications.length === 0 ? (
              <div className="text-center py-8 bg-gray-100 rounded-lg">
                No certificates yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 border-gray-300 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-semibold mb-3 line-clamp-1">
                      {item.name}
                    </p>

                    {isImageUrl(item.fileUrl) ? (
                      <Image
                        src={item.fileUrl}
                        alt={item.name}
                        width={480}
                        height={240}
                        className="w-full h-36 object-contain mb-3 rounded border"
                      />
                    ) : (
                      <div className="w-full h-36 flex items-center justify-center mb-3 rounded border bg-gray-50 text-gray-600 font-semibold">
                        PDF File
                      </div>
                    )}

                    <div className="flex gap-2">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-center font-semibold"
                      >
                        View
                      </a>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-semibold"
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
