"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface Notice {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  createdAt?: string;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/notice", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const result = (await response.json()) as {
          data?: Notice[];
        };

        setNotices(Array.isArray(result.data) ? result.data : []);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const groupedNotices = useMemo(() => {
    const groups = new Map<string, Notice[]>();

    notices.forEach((notice) => {
      const parsedDate = notice.createdAt
        ? new Date(notice.createdAt)
        : new Date();
      const dateKey = parsedDate.toISOString().split("T")[0];

      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }

      groups.get(dateKey)?.push(notice);
    });

    return Array.from(groups.entries()).map(([dateKey, items]) => ({
      dateKey,
      label: new Date(dateKey).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      items,
    }));
  }, [notices]);

  return (
    <div className="min-h-screen bg-linear-to-b mt-10 from-emerald-50/70 via-white to-white px-4 py-10 text-black md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8 rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm md:p-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Nepal Cables
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Notices & Updates
          </h1>
          <p className="mt-2 text-slate-600">
            Multiple notices published on the same day are grouped together.
          </p>
        </section>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
            Loading notices...
          </div>
        ) : notices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
            No notices available right now.
          </div>
        ) : (
          <div className="space-y-7">
            {groupedNotices.map((group) => (
              <section key={group.dateKey}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-slate-900">
                    Published Date: {group.label}
                  </h2>
                  <span className="text-sm text-slate-500">
                    {group.items.length} notice
                    {group.items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-1">
                  {group.items.map((notice) => (
                    <button
                      key={notice.id}
                      onClick={() => setSelectedNotice(notice)}
                      className="w-70 shrink-0 cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            notice.published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {notice.published ? "Published" : "Draft"}
                        </span>

                        {notice.createdAt && (
                          <span className="text-xs text-slate-500">
                            {new Date(notice.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>

                      <h3 className="mb-2 text-lg font-bold text-slate-900">
                        {notice.title}
                      </h3>

                      {notice.imageUrl && (
                        <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg border border-slate-200">
                          <Image
                            src={notice.imageUrl}
                            alt={notice.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <p className="text-sm leading-relaxed text-slate-600">
                        {notice.content.length > 110
                          ? `${notice.content.slice(0, 110)}...`
                          : notice.content}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl md:p-7">
              <button
                onClick={() => setSelectedNotice(null)}
                aria-label="Close notice"
                className="absolute right-4 top-4 h-8 w-8 cursor-pointer rounded-full bg-slate-100 text-lg leading-none text-slate-600 hover:bg-slate-200"
              >
                ×
              </button>

              <div className="mb-3 flex flex-wrap items-center gap-2 pr-10">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                    selectedNotice.published
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {selectedNotice.published ? "Published" : "Draft"}
                </span>

                {selectedNotice.createdAt && (
                  <span className="text-sm text-slate-500">
                    {new Date(selectedNotice.createdAt).toLocaleString()}
                  </span>
                )}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {selectedNotice.title}
              </h3>

              {selectedNotice.imageUrl && (
                <div className="relative mb-5 h-64 w-full overflow-hidden rounded-xl border border-slate-200">
                  <Image
                    src={selectedNotice.imageUrl}
                    alt={selectedNotice.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <p className="whitespace-pre-line leading-relaxed text-slate-700">
                {selectedNotice.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
