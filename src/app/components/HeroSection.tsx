"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
}

export default function Hero() {
  const [productCount, setProductCount] = useState("--");

  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const response = await fetch("/api/products", {
          cache: "force-cache",
        });

        if (!response.ok) {
          return;
        }

        const result = (await response.json()) as {
          data?: Product[];
        };

        const count = Array.isArray(result.data) ? result.data.length : 0;
        setProductCount(`${count}+`);
      } catch (error) {
        console.error("Failed to fetch products count:", error);
      }
    };

    fetchProductsCount();
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-white via-emerald-100 to-white pt-30 pb-16 md:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Nepal Cables
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            Built for Safe & Reliable{" "}
            <span className="bg-linear-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">
              Cable Infrastructure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg"
          >
            Nepal Cables provides dependable cable products for homes,
            businesses, and industrial projects with quality you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center rounded-full bg-emerald-700 px-7 py-3 font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-800"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-7 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Talk to Us
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-4xl border border-emerald-100 bg-white/80 p-6 shadow-xl shadow-emerald-100/80 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Projects served", value: "2000+" },
                { label: "Cable variants", value: productCount },
                { label: "Trusted partners", value: "30+" },
                { label: "Quality focus", value: "ISO" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-emerald-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute w-125 h-125 bg-lime-200 rounded-full blur-[140px] opacity-30 -z-10 top-10" />
    </section>
  );
}
