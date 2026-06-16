import prisma from "@/lib/prisma";
import SectionHeader from "@/src/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-emerald-50 to-white pt-24 md:pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-sm">
          <SectionHeader
            kicker="Products"
            title="Nepal Cables"
            highlight="Product Range"
            description="Built for durability, safety, and dependable performance across project environments."
            align="center"
          />
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-12 text-center text-slate-600">
            No products available right now.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <article className="cursor-pointer rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="relative h-44 overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        No image
                      </div>
                    )}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-slate-900">
                    {product.name}
                  </h2>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Request Product Details
          </Link>
        </div>
      </div>
    </section>
  );
}
