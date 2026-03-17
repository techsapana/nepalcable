"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import EditorViewer from "@/src/components/EditorViewer";

interface Blog {
  id: string | number;
  title: string;
  description: string;
  content: string;
  images?: string[];
  image?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const getBlogImage = (blog: Blog) =>
  blog.imageUrl || blog.image || blog.images?.[0] || "";

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id?: string | string[] };

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const blogId = Array.isArray(id) ? id[0] : id;
        const response = await fetch(`/api/blogs/${blogId}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          success: boolean;
          data?: Blog;
        };

        if (payload.success && payload.data) {
          setBlog(payload.data);
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error("Failed to fetch blog", err);
        setBlog(null);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-linear-to-b from-white via-emerald-50 to-white pt-24 md:pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-36 bg-slate-300 rounded mb-6 animate-pulse" />
          <div className="h-10 w-3/4 bg-slate-300 rounded mb-4 animate-pulse" />
          <div className="h-4 w-40 bg-slate-300 rounded mb-6 animate-pulse" />
          <div className="w-full h-72 md:h-96 bg-slate-300 rounded-2xl mb-8 animate-pulse" />
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-slate-300 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-300 rounded w-5/6 animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-slate-300 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-300 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-300 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-slate-300 rounded w-4/6 animate-pulse" />
            <div className="h-4 bg-slate-300 rounded w-full animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-white via-emerald-50 to-white pt-24 md:pt-28 px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Blog not found
        </h1>
        <button
          onClick={() => router.push("/blogs")}
          className="bg-linear-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white px-6 py-3 rounded-lg"
        >
          Go Back to Blogs
        </button>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-b from-white via-emerald-50 to-white pt-24 md:pt-28 pb-16">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/50 blur-[120px]" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-lime-200/50 blur-[110px]" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/blogs"
            className="text-emerald-700 hover:text-emerald-800 hover:underline mb-6 inline-block"
          >
            &larr; Back to Blogs
          </Link>
        </motion.div>

        <motion.article
          variants={itemVariants}
          className="rounded-2xl border border-emerald-100 bg-white/95 shadow-md p-6 md:p-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 mb-2">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
            {blog.title}
          </h1>

          {getBlogImage(blog) && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-75 md:h-130 mb-8 rounded-2xl overflow-hidden bg-emerald-50"
            >
              <Image
                src={getBlogImage(blog)}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {blog.description && (
            <p className="text-lg text-slate-600 mb-6">{blog.description}</p>
          )}

          <div className="prose max-w-none text-slate-700">
            <EditorViewer
              content={blog?.content || ""}
              className="text-slate-700 -ml-14"
            />
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
