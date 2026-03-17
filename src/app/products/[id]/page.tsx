"use client";

import EditorViewer from "@/src/components/EditorViewer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
}

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/products/${params.id}`, {
          cache: "no-store",
        });

        const result = (await response.json()) as {
          success?: boolean;
          data?: Product;
          message?: string;
        };

        if (!response.ok || !result?.data) {
          throw new Error(result?.message || "Failed to fetch product");
        }

        setProduct(result.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-linear-to-b from-white via-emerald-50 to-white pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
            <div className="mb-4 h-8 w-1/2 rounded bg-gray-200" />
            <div className="mb-8 h-6 w-1/4 rounded bg-gray-200" />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="h-52 rounded-xl bg-gray-200" />
              <div className="h-52 rounded-xl bg-gray-200" />
              <div className="h-52 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="min-h-screen bg-linear-to-b from-white via-emerald-50 to-white pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-700">
            {error || "Product not found"}
          </div>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-emerald-50 to-white pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-6 inline-flex rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
        >
          ← Back to Products
        </Link>

        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-2xl font-bold text-emerald-700">
            NPR {product.price.toLocaleString()}
          </p>

          {product.images.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.images.map((image) => (
                <div
                  key={image.id}
                  className="relative h-56 overflow-hidden rounded-2xl border border-emerald-100"
                >
                  <Image
                    src={image.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-emerald-50/60 p-4 md:p-5">
            <EditorViewer content={product.description} className="-ml-14" />
          </div>
        </div>
      </div>
    </section>
  );
}
