"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/src/components/SectionHeader";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What types of cables do you offer?",
    answer:
      "We offer a wide range of cable solutions including power cables, data cables, and optical fiber cable variants for residential, commercial, and industrial projects.",
  },
  {
    question: "Do you support both small and large orders?",
    answer:
      "Yes. We support individual customers, contractors, and enterprise buyers with flexible order volumes and dependable fulfillment.",
  },
  {
    question: "Do your products meet quality standards?",
    answer:
      "Yes. Our cable lines are produced with strict quality checks and material standards to ensure long-term safety and performance.",
  },
  {
    question: "How quickly can you deliver?",
    answer:
      "Delivery timelines vary by location and order size, but our team prioritizes timely dispatch and clear delivery coordination across Nepal.",
  },
  {
    question: "Can I get help choosing the right cable?",
    answer:
      "Absolutely. Our team helps you select product specifications based on your project requirements, load conditions, and installation environment.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <section
      id="faqs"
      className="relative overflow-hidden py-16 md:py-24 bg-linear-to-b from-white via-emerald-50/30 to-white"
    >
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-[120px]" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime-200/40 blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <SectionHeader
              kicker="Support Desk"
              title="Frequently Asked"
              highlight="Questions"
              description="Find answers to common questions about our products, quality, and delivery support."
              align="center"
            />
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <motion.div
                  className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-emerald-50/40"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 pr-8">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className={`w-6 h-6 transition-colors duration-200 ${
                          openIndex === index
                            ? "text-emerald-700"
                            : "text-slate-500"
                        }`}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: "easeInOut",
                            },
                            opacity: {
                              duration: 0.25,
                              delay: 0.05,
                            },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: "easeInOut",
                            },
                            opacity: {
                              duration: 0.2,
                            },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center pt-8">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-emerald-800 hover:shadow-lg"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
