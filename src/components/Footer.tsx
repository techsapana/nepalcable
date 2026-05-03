"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa6";

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

  const visibleProducts = products.slice(0, 8);

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
              <div className="pt-4 border-t border-emerald-100 space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-emerald-700 text-lg mt-1 shrink-0" />
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-900 uppercase tracking-tight mb-1">Head Office</p>
                    <p>2322 Basundhara, (Narayan Gopal Chowk)</p>
                    <p>Chakrapath-5, Maharajgunj, Kathmandu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-emerald-700 text-lg mt-1 shrink-0" />
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-900 uppercase tracking-tight mb-1">MFG Plant</p>
                    <p>Jeetpursimara Sub-Metropolitan, Ward No.1</p>
                    <p>Madhesh Pradesh, Simara, Bara, Nepal</p>
                  </div>
                </div>
              </div>
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
                        className="text-slate-700 hover:text-emerald-700 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            {!productsLoading && products.length > 8 && (
              <div className="mt-4 pt-4 border-t border-emerald-100">
                <Link
                  href="/products"
                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Explore More Products →
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-sm">
            <h4 className="mb-5 text-lg font-semibold uppercase tracking-wide text-slate-900">
              Contact Details
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMail className="text-emerald-700 text-xl mt-1" />
                <a
                  href="mailto:nepalcables2025@gmail.com"
                  className="text-slate-700 hover:text-emerald-700 transition-colors break-all"
                >
                  nepalcables2025@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="text-emerald-700 text-xl mt-1" />
                <div className="text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Head Office:</p>
                  <p>01-4372323, 4373315</p>
                  <p className="font-semibold text-slate-900 pt-2">MFG Plant:</p>
                  <p>053-520471, 520003</p>
                  <p className="font-semibold text-slate-900 pt-2">Branch Contacts:</p>
                  <div className="grid grid-cols-1 gap-1 text-xs text-slate-600">
                    <p>Bhotebahal: 01-5904348</p>
                    <p>Pokhara: 061-531330</p>
                    <p>Butwal: 071-536054</p>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3 border-t border-emerald-100 pt-4">
                <FiClock className="text-emerald-700 text-xl mt-1" />
                <div className="text-slate-700">
                  <p className="font-semibold text-slate-900">Business Hours:</p>
                  <p>Sun - Fri: 9:30 AM - 6:00 PM</p>
                  <p className="text-red-600 text-xs font-medium">Closed on Saturday</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex w-full flex-col items-center gap-4 border-t border-emerald-100 pt-8 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Nepal Cables. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/share/1XbhDrbUea/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-[#1877F2] hover:text-white"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="https://www.tiktok.com/@nepalcables"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-black hover:text-white"
            >
              <FaTiktok className="text-sm" />
            </a>
            <a
              href="https://www.linkedin.com/company/nepalcables"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-[#0A66C2] hover:text-white"
            >
              <FaLinkedinIn className="text-sm" />
            </a>
            <a
              href="https://www.instagram.com/nepalcables"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-[#E4405F] hover:text-white"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="https://www.youtube.com/@nepalcables"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition hover:bg-[#FF0000] hover:text-white"
            >
              <FaYoutube className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
