"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Brochure {
  id: number;
  name: string;
  fileUrl: string;
}

const isImageFile = (url: string) =>
  /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url);

const isPdfFile = (url: string) => /\.pdf(\?|$)/i.test(url);

export default function BrochurePage() {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const response = await fetch("/api/brochures", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch brochures");
        }

        const result = (await response.json()) as {
          data?: Brochure[];
        };

        setBrochures(Array.isArray(result.data) ? result.data : []);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Failed to load brochures");
      } finally {
        setLoading(false);
      }
    };

    fetchBrochures();
  }, []);

  return (
    <div className="min-h-screen mt-10 bg-linear-to-b from-white via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-emerald-100 bg-white/85 p-6 shadow-sm md:p-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Customer Zone
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            Brochure and Price List
          </h1>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            Browse and preview downloadable brochures and product lists.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-slate-600 shadow-sm">
            Loading brochures...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            {error}
          </div>
        ) : brochures.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-slate-600 shadow-sm">
            No brochures available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {brochures.map((brochure) => (
              <div
                key={brochure.id}
                className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-72 bg-slate-100">
                  {isImageFile(brochure.fileUrl) ? (
                    <Image
                      src={brochure.fileUrl}
                      alt={brochure.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : isPdfFile(brochure.fileUrl) ? (
                    <iframe
                      src={`${brochure.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={brochure.name}
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-600 font-semibold">
                      Preview not available
                    </div>
                  )}
                </div>

                <div className="border-t border-emerald-100 bg-linear-to-r from-emerald-50 to-lime-50 p-4">
                  <h2 className="line-clamp-2 text-xl font-semibold text-slate-800">
                    {brochure.name}
                  </h2>
                  <a
                    href={brochure.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    ⬇ View Brochure
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
