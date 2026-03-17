"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SectionHeader from "@/src/components/SectionHeader";
import Image from "next/image";

type TeamMember = {
  id: number;
  name: string;
  post: string;
  image: string;
  description: string;
};

const API_URL = `/api/team`;

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_URL, { cache: "no-store" });
        const result: {
          success?: boolean;
          message?: string;
          data?: TeamMember[];
        } = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? "Failed to fetch team members");
        }

        const members = Array.isArray(result.data) ? result.data : [];
        setTeamMembers(members);
        setCurrentIndex(0);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch team members",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const canSlide = teamMembers.length > 1;
  const activeMember = teamMembers[currentIndex];

  const nextSlide = () => {
    if (!canSlide) return;
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    if (!canSlide) return;
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  return (
    <section
      id="team"
      className="bg-linear-to-b from-white via-emerald-50/30 to-white py-20"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeader
          kicker="MEET THE TEAM"
          title="People behind"
          highlight="Nepal Cables"
          align="center"
        />

        <div className="relative mt-12">
          {isLoading ? (
            <div className="rounded-3xl border border-emerald-100 bg-white p-10 shadow-lg shadow-emerald-100/70">
              <p className="text-slate-600">Loading team members...</p>
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-emerald-100 bg-white p-10 shadow-lg shadow-emerald-100/70">
              <p className="text-slate-600">{error}</p>
            </div>
          ) : !activeMember ? (
            <div className="rounded-3xl border border-emerald-100 bg-white p-10 shadow-lg shadow-emerald-100/70">
              <p className="text-slate-600">No team members found.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-emerald-100 bg-white p-10 shadow-lg shadow-emerald-100/70"
              >
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src={activeMember.image}
                    alt={activeMember.name}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-emerald-100 object-cover"
                  />
                  {/* <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-100 bg-emerald-50 text-2xl font-semibold text-emerald-700">
                    {activeMember.name.charAt(0)}
                  </div> */}

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {activeMember.name}
                    </h3>
                    <p className="mt-1 text-emerald-700">{activeMember.post}</p>
                    <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
                      {activeMember.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              disabled={!canSlide}
              className="cursor-pointer rounded-full border border-emerald-200 bg-white px-5 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Prev
            </button>

            <button
              onClick={nextSlide}
              disabled={!canSlide}
              className="cursor-pointer rounded-full bg-emerald-700 px-5 py-2 font-semibold text-white transition hover:bg-emerald-800"
            >
              Next
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === currentIndex ? "bg-emerald-700" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
