"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import SectionHeader from "@/src/components/SectionHeader";

import Image from "next/image";

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

interface Partner {
  id: number;
  name: string;
  imageUrl: string;
}

const MainSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);

  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`, {
          cache: "force-cache",
        });
        const json = await res.json();
        setProducts(Array.isArray(json?.data) ? json.data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    const fetchPartners = async () => {
      try {
        const res = await fetch(`/api/partners`, {
          cache: "no-store",
        });
        const json = await res.json();
        const normalizedPartners = Array.isArray(json?.data)
          ? json.data.filter(
              (partner: Partner) =>
                typeof partner?.id === "number" &&
                typeof partner?.imageUrl === "string" &&
                partner.imageUrl.length > 0,
            )
          : [];

        setPartners(normalizedPartners);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
        setPartners([]);
      } finally {
        setPartnersLoading(false);
      }
    };

    fetchProducts();
    fetchPartners();
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-50 via-white to-white pt-16 md:pt-24">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-[110px]" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-lime-200/50 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div>
            <SectionHeader
              kicker="Product Portfolio"
              title="Explore our"
              highlight="Products"
              description="Nepal Cables delivers dependable cabling solutions designed for domestic, commercial, and industrial installation needs."
            />
          </div>
          <p className="mt-4 max-w-4xl rounded-2xl border border-emerald-100 bg-white p-4 text-sm text-slate-600 sm:text-base">
            Curated lines for residential, commercial, and infrastructure-grade
            installations.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="mb-6">
            <SectionHeader
              kicker="Highlights"
              title="Featured Product"
              highlight="Lines"
            />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {productsLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`course-skeleton-${index}`}
                  className="w-64 h-80 rounded-2xl bg-emerald-50 animate-pulse border border-emerald-100"
                />
              ))}

            {!productsLoading && featuredProducts.length === 0 && (
              <p className="text-slate-500 col-span-full text-center">
                No products available at the moment.
              </p>
            )}

            {!productsLoading &&
              featuredProducts.map((product) => {
                const subtitle =
                  typeof product.price === "number"
                    ? `NPR ${product.price}`
                    : "Available now";

                return (
                  <div key={product.id} className="w-full">
                    <Card
                      imageSrc={product.images?.[0]?.url || "/placeholder.svg"}
                      title={product.name}
                      subtitle={subtitle}
                      href={`/products/${product.id}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mb-2">
          <div id="partners" className="scroll-mt-30 mb-8">
            <SectionHeader
              kicker="Trusted Network"
              title="Our"
              highlight="Partners"
              align="center"
            />
          </div>

          {partnersLoading ? (
            <div className="flex gap-6 overflow-hidden max-w-7xl mx-auto px-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-48 h-32 bg-emerald-50 rounded-2xl shrink-0 border border-emerald-100"
                />
              ))}
            </div>
          ) : partners.length === 0 ? (
            <p className="text-center text-slate-500">No partners available.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center w-48 h-32 bg-white border border-emerald-100 rounded-2xl shadow-sm p-2"
                >
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name || "Partner"}
                    width={160}
                    height={80}
                    unoptimized
                    className="max-w-full max-h-20 object-contain rounded-xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainSection;
