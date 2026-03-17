"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import Talking from "./Talking";
import ArticleCard from "./BlogCard";
import SectionHeader from "@/src/components/SectionHeader";

type Blog = {
  id: string;
  title: string;
  image?: string;
  imageUrl?: string;
  images?: string[];
};

const getBlogImage = (blog: Blog) =>
  blog.imageUrl || blog.image || blog.images?.[0] || "";

const BottomSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const featuredBlogs = blogs.slice(0, 4);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs", { cache: "no-store" });
        const payload = (await response.json()) as {
          success: boolean;
          data?: Blog[];
        };

        if (payload.success && Array.isArray(payload.data)) {
          setBlogs(payload.data);
        }
      } catch {
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-50 via-white to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-emerald-200/40 blur-[110px]" />
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div>
            <SectionHeader
              kicker="Insights and Updates"
              title="Latest"
              highlight="Blogs"
              description="Practical tips, career guidance, and tech trends curated by the Nepal Cables team."
            />
          </div>

          <div className="grid grid-cols-1 place-items-center gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredBlogs.map((blog) => (
              <div key={blog.id} className="w-full flex justify-center">
                <ArticleCard
                  title={blog.title}
                  imageSrc={getBlogImage(blog)}
                  href={`/blogs/${blog.id}`}
                  linkLabel="Read Blog"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center md:justify-start">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200/60 transition hover:bg-emerald-800"
            >
              View All Blogs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomSection;
