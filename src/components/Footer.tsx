"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
}

const Footer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`, {
          cache: "force-cache",
        });
        const json = await res.json();
        if (json?.success) {
          setProducts(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch products for footer:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = products.slice(0, 6);

  return (
    <footer
      id="footer"
      className="bg-linear-to-br from-emerald-100 via-white to-lime-100 px-6 py-12 text-slate-900 md:py-16"
    >
      <div className="max-w-7xl mx-auto md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 font-bold text-white">
                  NC
                </span>
                <div>
                  <p className="text-lg font-bold leading-none text-emerald-800">
                    Nepal Cables
                  </p>
                  <p className="text-xs text-slate-500">
                    Quality Cabling Solutions
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Nepal Cables provides dependable cabling solutions for homes,
                businesses, and infrastructure projects with a strong focus on
                quality, safety, and long-term performance.
              </p>
              <p className="text-sm text-emerald-700 font-medium">
                Powering reliable connections across Nepal
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-sm">
            <h4 className="mb-5 text-lg font-semibold uppercase tracking-wide text-slate-900">
              Featured Products
            </h4>
            <ul className="space-y-3 text-sm">
              {productsLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <li
                    key={`product-skeleton-${index}`}
                    className="h-4 w-3/4 bg-emerald-100 rounded animate-pulse"
                  />
                ))}

              {!productsLoading && visibleProducts.length === 0 && (
                <li className="text-gray-400">No products available.</li>
              )}

              {!productsLoading &&
                visibleProducts.map((product) => {
                  return (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.id}`}
                        className="text-slate-700 hover:text-emerald-700 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-sm">
            <h4 className="mb-5 text-lg font-semibold uppercase tracking-wide text-slate-900">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMail className="text-emerald-700 text-xl mt-1" />
                <div>
                  <a
                    href="mailto:nepalcables2025@gmail.com"
                    className="text-slate-700 hover:text-emerald-700 transition-colors"
                  >
                    nepalcables2025@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FiMapPin className="text-emerald-700 text-xl mt-1" />
                <span className="text-slate-700"><p>Head Office: Nepal Wire & Cables (P.) Ltd.</p>
                <p>2322 Basundhara, (Narayan Gopal Chowk), </p>
                <p>Chakrapath-5, Maharajgunj, Kathmandu, Nepal.</p>
                <p>Tel.: 00977-1-4372323, 4373315</p></span>
              </li>

              <li className="flex items-start gap-3">
                <FiMapPin className="text-emerald-700 text-xl mt-1" />
                <span className="text-slate-700"><p>MFG Plant(Factory):Jeetpursimara Sub-Metropolitan, Ward No.1,  Madhesh Pradesh,Simara, Bara, Nepal.</p>
                <p>Tel.: 00977- 053-520471, 520003</p>
                <p>Email: nepalcables@yahoo.com</p>

                <span className="text-slate-700"> MFG Plant:Simara, Bara,Nepal</span>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="text-emerald-700 text-xl mt-1" />
                <div className="space-y-1">
                  <div>
                    <div className="text-slate-700 space-y-1">
                      <p>Bhotebahal Branch:01-5904348</p>
                      <p>Pokhara Branch:061-531330</p>
                      <p>Butwal Branch:071-546054</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 w-full border-t border-emerald-100 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Nepal Cables. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
