"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

type DropdownItem = { name: string; href: string };

interface Product {
  id: number;
  name: string;
}

const mediaItems: DropdownItem[] = [
  { name: "Gallery", href: "/gallery" },
  { name: "Blogs", href: "/blogs" },
];

const customerZoneItems: DropdownItem[] = [
  { name: "Certifications", href: "/certifications" },
  { name: "Brochure and Price List", href: "/brochure" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = (await response.json()) as {
          data?: Product[];
        };

        setProducts(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Failed to fetch products for navbar:", error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productItems: DropdownItem[] = products.slice(0, 6).map((product) => ({
    name: product.name,
    href: `/products/${product.id}`,
  }));

  const linkClass = (href: string) =>
    `rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
      pathname === href
        ? "bg-emerald-50 text-emerald-800"
        : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-emerald-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-sm font-bold text-white shadow-md shadow-emerald-200">
            NC
          </span>
          <div>
            <p className="text-base font-bold leading-none text-emerald-800">
              Nepal Cables
            </p>
            <p className="text-xs text-slate-500">Quality Cabling Solutions</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white p-2 shadow-sm md:flex">
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>

          <div className="group relative">
            <button className="inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-wide text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
              Products
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-11 min-w-56 rounded-2xl border border-emerald-100 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {productsLoading ? (
                <p className="px-3 py-2 text-sm text-slate-500">Loading...</p>
              ) : productItems.length === 0 ? (
                <p className="px-3 py-2 text-sm text-slate-500">No products</p>
              ) : (
                productItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {item.name}
                  </Link>
                ))
              )}

              <Link
                href="/products"
                className="mt-1 block rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 hover:bg-emerald-50"
              >
                View all products
              </Link>
            </div>
          </div>

          <div className="group relative">
            <button className="inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-wide text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
              Customer Zone
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-11 min-w-44 rounded-2xl border border-emerald-100 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {customerZoneItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button className="inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-wide text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
              Media
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-11 min-w-44 rounded-2xl border border-emerald-100 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {mediaItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/notice" className={linkClass("/notice")}>
            Notice
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-800"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="text-slate-700 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-emerald-100 bg-white px-4 py-4 md:hidden">
          <div className="space-y-3">
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
            >
              About
            </Link>

            <button
              onClick={() => setMobileProductsOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
            >
              Products
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileProductsOpen && (
              <div className="space-y-1 pl-4">
                {productsLoading ? (
                  <p className="px-3 py-2 text-sm text-slate-500">Loading...</p>
                ) : productItems.length === 0 ? (
                  <p className="px-3 py-2 text-sm text-slate-500">
                    No products
                  </p>
                ) : (
                  productItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50"
                    >
                      {item.name}
                    </Link>
                  ))
                )}

                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 hover:bg-emerald-50"
                >
                  View all products
                </Link>
              </div>
            )}

            <Link
              href="/customer-zone"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
            >
              Customer Zone
            </Link>

            <button
              onClick={() => setMobileMediaOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
            >
              Media
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileMediaOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileMediaOpen && (
              <div className="space-y-1 pl-4">
                {mediaItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
