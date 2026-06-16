"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/src/components/SectionHeader";

interface JobListing {
  id: number;
  title: string;
  date: string;
  status: "active" | "expired";
  image: string;
  description: string;
}

const jobListings: JobListing[] = [
  {
    id: 1,
    title: "Software Support Intern (Remote)",
    date: "Dec 22, 2024",
    status: "expired",
    image: "/file.svg",
    description:
      "Gain hands-on experience providing technical support as a Software Support Intern.",
  },
  {
    id: 2,
    title: "Senior MEAN Stack Developer",
    date: "Jan 15, 2025",
    status: "active",
    image: "/globe.svg",
    description:
      "Join our team as a Senior MEAN Stack Developer and work on cutting-edge projects.",
  },
  {
    id: 3,
    title: "Assistant IT System Administrator",
    date: "Feb 1, 2025",
    status: "active",
    image: "/next.svg",
    description:
      "Support IT infrastructure management and maintenance as an Assistant System Administrator.",
  },
  {
    id: 4,
    title: "IT Executive",
    date: "Jan 20, 2025",
    status: "active",
    image: "/vercel.svg",
    description:
      "Lead internal operations and systems as an IT Executive at Nepal Cables.",
  },
];

const testimonials = [
  {
    name: "Bishan Mahat",
    role: "Digital Marketing Expert",
    image: "/file.svg",
    feedback:
      "Nepal Cables gives us room to grow and contribute. The team culture and practical environment are excellent.",
  },
  {
    name: "Ganesh Thapa",
    role: "Graphic Designer",
    image: "/globe.svg",
    feedback:
      "Working with Nepal Cables has strengthened my design and communication skills through real campaigns.",
  },
];

export default function CareersPage() {
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-emerald-50 to-white pt-24 pb-16 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-sm">
          <SectionHeader
            kicker="Careers"
            title="Join"
            highlight="Nepal Cables"
            description="Explore career opportunities with Nepal Cables and help us deliver trusted cable solutions across Nepal."
            align="center"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SectionHeader
              kicker="Open Roles"
              title="Current"
              highlight="Openings"
              className="mb-6"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
                  onMouseEnter={() => setHoveredJob(job.id)}
                  onMouseLeave={() => setHoveredJob(null)}
                >
                  <div className="relative h-48 bg-linear-to-br from-emerald-50 to-lime-100">
                    <Image
                      src={job.image}
                      alt={job.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-emerald-900/90 text-center transition-opacity duration-300 ${
                        hoveredJob === job.id
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="text-white font-semibold">{job.date}</div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === "expired"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {job.status === "expired" ? "Expired" : "Active"}
                      </div>
                      <Link href="/">
                        <button className="mt-2 cursor-pointer rounded-full bg-white px-5 py-2 font-semibold text-emerald-900 transition hover:bg-gray-100">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-emerald-700 p-4 text-center">
                    <h3 className="text-white font-bold">{job.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <p className="text-sm text-emerald-700 font-semibold mb-2">
                Student Feedback
              </p>
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">
                What They Say About Nepal Cables
              </h3>
              <div className="space-y-6">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="space-y-3">
                    <p className="text-gray-700 text-sm">{t.feedback}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                        <p className="text-sm text-gray-600">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-800 p-6 text-center text-white">
              <h3 className="text-xl font-bold mb-3">
                Be Part of Nepal Cables
              </h3>
              <p className="text-sm mb-4">
                We are always looking for passionate individuals to join our
                team. If you value quality manufacturing and service, let&apos;s
                connect!
              </p>
              <a
                href="/contact"
                className="inline-block bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
