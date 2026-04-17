"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import SectionHeader from "@/src/components/SectionHeader";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setSubmitStatus({
          type: "error",
          message: result.message ?? "Failed to send your message",
        });
        return;
      }

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-lime-50 to-slate-50 pt-24 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 rounded-3xl border border-emerald-100 bg-white/80 p-8 text-center shadow-sm"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            kicker="Contact"
            title="Get in"
            highlight="Touch"
            description="Feel free to reach out for collaborations, consultations, or inquiries."
            align="center"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Contact Form */}
          <motion.div variants={fadeUpItem}>
            <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 placeholder-slate-500 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 placeholder-slate-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 placeholder-slate-500 transition"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 placeholder-slate-500 transition"
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 placeholder-slate-500 resize-none transition"
                ></textarea>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-lg transition shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus && (
                  <p
                    className={`text-sm ${
                      submitStatus.type === "success"
                        ? "text-emerald-700"
                        : "text-red-600"
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Map/Iframe */}
          <motion.div
            variants={fadeUpItem}
            className="h-full min-h-96 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md md:min-h-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d441.4070808763347!2d85.33715131119772!3d27.740228962381664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1922404b2473%3A0x7d481e21405ea721!2sNepal%20Cables!5e0!3m2!1sen!2snp!4v1771771858793!5m2!1sen!2snp"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-96"
            ></iframe>
          </motion.div>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={fadeUpItem}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <FiMapPin className="text-emerald-700 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Office Location
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Maharajgung,Chakrapath, Kathmandu
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <FiMail className="text-emerald-700 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                <a
                  href="mailto:necables@hotmail.com"
                  className="text-slate-700 hover:text-emerald-700 transition"
                >
                  necables@hotmail.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <FiPhone className="text-emerald-700 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Phone</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-slate-700 hover:text-emerald-700 transition">
                      4373315, 4372323
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
