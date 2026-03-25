"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Certification = {
  id: number;
  name: string;
  fileUrl: string;
};

const API_URL = "/api/certificates";

const isPdfFile = (fileUrl: string) => {
  if (/\.pdf(\?|$)/i.test(fileUrl)) {
    return true;
  }

  return fileUrl.includes("/raw/upload/");
};

const isImageFile = (fileUrl: string) => {
  if (isPdfFile(fileUrl)) {
    return false;
  }

  if (fileUrl.includes("/image/upload/")) {
    return true;
  }

  return /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(fileUrl);
};

const getPdfViewerUrl = (fileUrl: string) => {
  const separator = fileUrl.includes("#") ? "&" : "#";
  return `${fileUrl}${separator}page=1&view=FitH`;
};

const getPrimaryPdfUrl = (fileUrl: string) => {
  if (!isPdfFile(fileUrl)) {
    return fileUrl;
  }

  if (fileUrl.includes("/image/upload/")) {
    return fileUrl.replace("/image/upload/", "/raw/upload/");
  }

  return fileUrl;
};

function PdfCardThumbnail({
  fileUrl,
  name,
}: {
  fileUrl: string;
  name: string;
}) {
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const renderThumbnail = async () => {
      setThumbnailSrc(null);
      setThumbnailFailed(false);

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjs.getDocument({
          url: getPrimaryPdfUrl(fileUrl),
          withCredentials: false,
        });

        const pdfDocument = await loadingTask.promise;
        const page = await pdfDocument.getPage(1);

        const targetWidth = 440;
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = targetWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));

        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas context unavailable");
        }

        await page.render({
          canvas,
          canvasContext: context,
          viewport,
        }).promise;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.86);

        if (!isCancelled) {
          setThumbnailSrc(dataUrl);
        }

        await pdfDocument.destroy();
      } catch {
        if (!isCancelled) {
          setThumbnailFailed(true);
        }
      }
    };

    renderThumbnail();

    return () => {
      isCancelled = true;
    };
  }, [fileUrl]);

  if (thumbnailSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={thumbnailSrc}
        alt={`${name} PDF thumbnail`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }

  if (thumbnailFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-600 font-semibold px-3 text-center">
        PDF Preview
      </div>
    );
  }

  return (
    <div
      className="w-full h-full animate-pulse bg-gray-100"
      aria-hidden="true"
    />
  );
}

export default function CertificationsPage() {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Certification | null>(null);
  const [pdfPreviewFailed, setPdfPreviewFailed] = useState(false);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch(API_URL);
        const data = (await res.json()) as {
          data?: Certification[];
        };

        setItems(Array.isArray(data.data) ? data.data : []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  useEffect(() => {
    setPdfPreviewFailed(false);
  }, [selectedItem]);

  return (
    <section className="min-h-screen bg-linear-to-b mt-10 from-emerald-50/70 via-white to-white px-4 py-10 md:px-6 md:py-14">
      <div className="max-w-6xl mx-auto">
        <section className="mb-8 rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm md:p-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Nepal Cables
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Certifications
          </h1>
          <p className="mt-2 text-slate-600">
            Certified quality and compliance with recognized international and
            national standards.
          </p>
        </section>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8 mb-12 border border-gray-200">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Our commitment to quality, safety, and international standards is
            reinforced through certifications from globally recognized
            institutions and compliance with multiple engineering benchmarks.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              KEMA Laboratories, Arnhem, The Netherlands.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Central Power Research Institute (CPRI), Noida-201309, India.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Nepal Bureau of Standards & Metrology (NBSM), Balaju, Kathmandu,
              Nepal.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              First among Nepalese electrical manufacturers to achieve ISO 9000
              certification (two decades ago), setting a benchmark for quality
              and system certification along with KEMA Certificates.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Early adopter of NBSM standards (before mandatory compliance),
              reinforcing its commitment to safety and reliability.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              All products compliant as per Indian Standard (IS), British
              Standard (BS) & International Electro-technical Commission (IEC).
            </li>
          </ul>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading certifications...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-600">No certifications found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {items.map((item) => {
              const previewUrl = isPdfFile(item.fileUrl)
                ? getPrimaryPdfUrl(item.fileUrl)
                : item.fileUrl;

              return (
                <div key={item.id} className="text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="block mx-auto cursor-pointer"
                  >
                    <div className="mx-auto w-55 h-75 bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
                      {isImageFile(item.fileUrl) ? (
                        <Image
                          src={item.fileUrl}
                          alt={item.name}
                          width={220}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PdfCardThumbnail
                          fileUrl={item.fileUrl}
                          name={item.name}
                        />
                      )}
                    </div>
                  </button>

                  <p className="mt-4 text-xl font-bold text-gray-700 uppercase leading-snug">
                    {item.name}
                  </p>

                  <div className="mt-3 flex justify-center gap-2 flex-wrap">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                    >
                      Open
                    </a>
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold"
                    >
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-10 bg-black/70 hover:bg-black text-white rounded-full w-9 h-9"
            >
              ×
            </button>

            {isImageFile(selectedItem.fileUrl) ? (
              <div className="relative w-full h-full">
                <Image
                  src={selectedItem.fileUrl}
                  alt={selectedItem.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full h-full bg-gray-100">
                {!pdfPreviewFailed ? (
                  <iframe
                    src={getPdfViewerUrl(
                      getPrimaryPdfUrl(selectedItem.fileUrl),
                    )}
                    title={`${selectedItem.name} PDF viewer`}
                    className="w-full h-full"
                    onError={() => setPdfPreviewFailed(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center px-6 text-center text-gray-700 font-semibold">
                    PDF preview is blocked in browser. Use the buttons below.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
