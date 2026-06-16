"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
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

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: any[];
}

interface Partner {
  id: number;
  name: string;
  imageUrl: string;
}

interface TeamMember {
  id: number;
  name: string;
  post: string;
  image: string;
  description: string;
}

interface HomeClientProps {
  initialNotice: Notice | null;
  products: Product[];
  partners: Partner[];
  teamMembers: TeamMember[];
}

export default function HomeClient({ 
  initialNotice, 
  products, 
  partners, 
  teamMembers 
}: HomeClientProps) {
  const [showNotice, setShowNotice] = useState(!!initialNotice);

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

  return (
    <>
      {showNotice && initialNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setShowNotice(false)}
              className="absolute right-3 cursor-pointer top-3 text-3xl text-gray-500 hover:text-gray-700"
              aria-label="Close notice"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-3">{initialNotice.title}</h2>

            {initialNotice.imageUrl && (
              <div className="relative h-56 w-full overflow-hidden rounded-lg border border-gray-200 mb-4">
                <Image
                  src={initialNotice.imageUrl}
                  alt={initialNotice.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-gray-700 whitespace-pre-line max-h-72 overflow-y-auto">
              {initialNotice.content}
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <MainSection initialProducts={products} initialPartners={partners} />
        </motion.div>

        <Team initialMembers={teamMembers} />
        <BottomSection />
        <Faqs />
      </div>
    </>
  );
}
