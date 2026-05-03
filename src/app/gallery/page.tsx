import prisma from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleries = await prisma.gallery.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <GalleryClient initialGalleries={galleries} />;
}
