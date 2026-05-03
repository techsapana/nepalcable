import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch data in parallel on the server
  const [notices, products, partners, teamMembers] = await Promise.all([
    prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 1,
    }),
    prisma.product.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.partner.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Transform data for components
  const initialNotice = notices[0] || null;
  
  const normalizedPartners = partners.filter(
    (p) => p.id && p.imageUrl && p.imageUrl.length > 0
  );

  const normalizedTeamMembers = teamMembers.map((m) => ({
    id: m.id,
    name: m.name,
    post: m.role, // Mapping schema 'role' to UI 'post'
    image: m.imageUrl, // Mapping schema 'imageUrl' to UI 'image'
    description: m.description,
  }));

  return (
    <HomeClient 
      initialNotice={initialNotice}
      products={products}
      partners={normalizedPartners}
      teamMembers={normalizedTeamMembers}
    />
  );
}
