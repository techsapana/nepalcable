"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-white via-emerald-50 to-lime-50">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/40 blur-[130px]" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-lime-200/50 blur-[130px]" />

      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 opacity-20"
      >
        <div className="w-20 h-20 border-4 border-emerald-400 rounded-full" />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 0.5 }}
        className="absolute bottom-32 right-16 opacity-20"
      >
        <div className="w-16 h-16 border-4 border-lime-400 rounded-lg rotate-45" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="relative">
            <motion.h1
              className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-700 to-lime-600 leading-none"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              404
            </motion.h1>

            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400/50" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl space-y-4 rounded-3xl border border-emerald-100 bg-white/75 p-8 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It
              might have been moved or deleted.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200/60 transition-colors duration-200 hover:bg-emerald-800"
              >
                <Home className="w-5 h-5" />
                Go Home
              </motion.button>
            </Link>

            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-emerald-700 bg-white px-6 py-3 font-semibold text-emerald-700 transition-colors duration-200 hover:bg-emerald-50"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8">
            <p className="text-sm text-slate-500 mb-3">
              You might be interested in:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                href="/about"
                className="text-emerald-700 hover:text-emerald-800 hover:underline transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                About Us
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/blogs"
                className="text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
              >
                Latest Blogs
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/contact"
                className="text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
              >
                Contact Support
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/gallery"
                className="text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
              >
                Gallery
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
