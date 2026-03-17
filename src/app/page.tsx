"use client";

import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import MainSection from "./components/MainSection";
import HeroSection2 from "./components/HeroSection";
import BottomSection from "./components/BottomSection";
import Team from "./components/Team";
import Faqs from "./components/Faqs";

interface Notice {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
}

export default function Home() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const scrollToSection = () => {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      const timer = setTimeout(scrollToSection, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const fetchPublishedNotice = async () => {
      try {
        const res = await axios.get("/api/notice?published=true");
        const notices = res.data?.data as Notice[];

        const publishedNotices = Array.isArray(notices)
          ? notices.filter((item) => item.published)
          : [];

        if (publishedNotices.length > 0) {
          setNotice(publishedNotices[0]);
          setShowNotice(true);
        }
      } catch (error) {
        console.error("Failed to fetch notice:", error);
      }
    };

    fetchPublishedNotice();
  }, []);

  return (
    <>
      {showNotice && notice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setShowNotice(false)}
              className="absolute right-3 cursor-pointer top-3 text-3xl text-gray-500 hover:text-gray-700"
              aria-label="Close notice"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-3">{notice.title}</h2>

            {notice.imageUrl && (
              <div className="relative h-56 w-full overflow-hidden rounded-lg border border-gray-200 mb-4">
                <Image
                  src={notice.imageUrl}
                  alt={notice.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-gray-700 whitespace-pre-line max-h-72 overflow-y-auto">
              {notice.content}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HeroSection2 />
        </motion.div>

        {/* <Marquee text="Trusted cable and wiring solutions for homes, industries, and infrastructure across Nepal" /> */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <MainSection />
        </motion.div>

        <Team />
        <BottomSection />
        <Faqs />
      </div>
    </>
  );
}
