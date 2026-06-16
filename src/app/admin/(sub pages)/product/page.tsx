"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Editor from "@/src/components/Editor";

interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

const API_URL = "/api/products";

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    images: [] as File[],
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });

      setProducts(res.data.data ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setSelected(null);
    setForm({
      name: "",
      price: "",
      description: "",
      images: [],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Please enter product name");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter product description");
      return;
    }

    const parsedPrice = Number(form.price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert("Please enter a valid price");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append(
      "product",
      JSON.stringify({
        name: form.name,
        description: form.description,
        price: parsedPrice,
      }),
    );

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
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
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Product Management</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="border-2 border-gray-300 p-8 rounded-xl shadow mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {selected ? "Edit Product" : "Add Product"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={form.name}
              placeholder="Product Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-2 border-gray-300 p-4 rounded"
            />

            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              placeholder="Price"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border-2 border-gray-300 p-4 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-3 text-lg">
              Description:
            </label>
            <Editor
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-2 text-lg">
              Images (multiple allowed):
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border-2 border-gray-300 p-3 w-full rounded"
            />

            {form.images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {form.images.length} file(s) selected
              </p>
            )}

            {selected && selected.images.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {selected.images.map((img) => (
                  <Image
                    key={img.id}
                    src={img.url}
                    alt={selected.name}
                    width={88}
                    height={88}
                    className="h-22 w-22 object-cover rounded border border-gray-200"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded font-semibold"
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
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">
          Products ({products.length})
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <div className="bg-gray-100 p-10 rounded text-center">
            No products yet
          </div>
        ) : (
          <div className="space-y-5">
            {products.map((product) => (
              <div key={product.id} className="border-2 p-6 rounded-xl shadow">
                <h3 className="font-bold text-xl">{product.name}</h3>
                <p className="text-gray-600 mt-1">Price: {product.price}</p>

                <div className="mt-3 text-gray-700 line-clamp-3 wrap-break-word">
                  {(() => {
                    try {
                      const parsed = JSON.parse(product.description);
                      const firstBlock = parsed?.[0];
                      const firstText = firstBlock?.content?.[0]?.text;
                      return firstText || "Rich content available";
                    } catch {
                      return product.description;
                    }
                  })()}
                </div>

                {product.images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.images.map((img) => (
                      <Image
                        key={img.id}
                        src={img.url}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 object-cover rounded border border-gray-200"
                      />
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded"
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
  );
}
