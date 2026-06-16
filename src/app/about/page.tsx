"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/src/components/SectionHeader";

const stats = [
  { label: "Years of Experience", value: "35+" },
  { label: "Projects Completed", value: "2,000+" },
  { label: "Cable Variants", value: "450+" },
  { label: "Dealers & Partners", value: "300+" },
];

const certifications = [
  "ISO 9000 Certified",
  "KEMA Laboratories – Netherlands",
  "CPRI – India",
  "Nepal Bureau of Standards & Metrology (NBSM)",
  "Compliant with IS, BS & IEC Standards",
];

const products = [
  "PVC Insulated Wires",
  "Power Cables up to 33KV",
  "Control Cables",
  "FR & FRLS Cables",
  "Solar Cables",
  "Aluminum & Copper Conductors",
  "Concentric Cables for NEA",
];

const companyDetails = [
  "Incorporation: 2044 B.S (Purchased by Sigdyal family in 2052 B.S)",
  "PAN No: 300020272",
  "Head Office: Basundhara, Narayan Gopal Chowk",
  "Factory: Simara, Bara (own land area: 1 Bigha & 12 Kattha)",
  "Branches: Pokhara & Butwal",
];

const identityPoints = [
  "Market Position: Ranked 3rd by volume, widely recognized for quality, innovation, and reliability.",
  "Scalability Challenge: Growth is constrained by high-interest working capital loans.",
  "Investment Opportunity: Affordable capital can unlock larger production and market reach.",
];

const portfolioCategories = [
  {
    category: "Power Transmission & Distribution",
    items: "ACSR, AAC, AAAC Conductors, Aerial Bundled Cables (ABC), Low Voltage Power Cables, Concentric (Service Drop) Cables",
  },
  {
    category: "Specialized & Safety Cables",
    items: "Fire-Resistant (FR), Fire-Resistant Low-Smoke (FRLS), Solar Cables",
  },
  {
    category: "Building & Industrial",
    items: "PVC House Wires, Control Cables, Flexible Cords, Auto Cables",
  },
];

const leadershipProfiles = [
  {
    name: "Mrs. Shanta Sigdyal — Chairman",
    summary: "Provides strategic direction and governance across NWCPL and related concerns.",
    highlights: [
      "Chairs NWCPL, NWC Concern, and Amrit Nath Udyam for long-term stability.",
      "Former board member of Prakash Cable Industries and Solarex Nepal.",
    ],
  },
  {
    name: "Ashish Sigdyal — Managing Director",
    summary: "With over 25 years at NWCPL, Ashish drives operations and market strategy.",
    highlights: [
      "Three-term President of NEEMA with strong policy and agency ties including NEA.",
      "Business experience across multiple ventures including A-1 Direct Marketing (USA).",
      "Education at St. Joseph’s, Darjeeling and Bellevue University, Nebraska.",
    ],
  },
  {
    name: "Krishna P. Sigdyal — Senior Consultant",
    summary: "Strategic advisor since 1995 with deep policy and institutional expertise.",
    highlights: [
      "Served on National Development Council, Environment Protection Council, and as Nepal’s delegate to UNCED 1992.",
      "Former role with IUCN (Switzerland) and recognized thought leadership.",
    ],
  },
];

const coreStrengths = [
  {
    area: "Quality & Certification",
    detail: "Certified by KEMA (Netherlands), CPRI (India), ISO 9001:2000, with IS/ISO/IEC 17025:2005-accredited lab capability.",
  },
  {
    area: "Innovation Leadership",
    detail: "Among the first in Nepal for NEA-approved ABC, concentric cables, FRLS cables, and high-performance solar cables.",
  },
  {
    area: "Industry Influence",
    detail: "Leadership involvement in NEEMA supports policy access and strong sector coordination.",
  },
  {
    area: "Experienced Leadership",
    detail: "Sigdyal family leadership combines operations, governance, and strategic policy experience.",
  },
  {
    area: "Cost Efficiency",
    detail: "Competitive pricing and efficient production despite high finance costs, with export-ready positioning.",
  },
  {
    area: "Strategic Location",
    detail: "Simra plant is ~18 km from Sirsiya Dry Port and ~3 km from East-West Highway for efficient logistics.",
  },
];

const synopsisNav = [
  { label: "1.0 Profile", target: "synopsis-profile" },
  { label: "1.1 Identity", target: "synopsis-identity" },
  { label: "1.2 Portfolio", target: "synopsis-portfolio" },
  { label: "1.3 Leadership", target: "synopsis-leadership" },
  { label: "1.8 Strengths", target: "synopsis-strengths" },
];

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white px-4 py-24 sm:px-6 lg:px-8">
      {/* Soft Background Radial Flare */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Block */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100/60 bg-white/80 p-8 md:p-12 shadow-xl shadow-emerald-100/10 backdrop-blur-md">
          <SectionHeader
            kicker="About Nepal Cables"
            title="Engineering Reliable Electrical"
            highlight="Solutions for Nepal"
            description="Nepal Wire & Cables (P.) Ltd. is a leading domestic manufacturer delivering internationally certified electrical cables for residential, commercial, and industrial infrastructure across Nepal."
            align="center"
          />
        </div>

        {/* Brochure Narrative Card */}
        <div className="mt-16 rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-8 w-1.5 rounded-full bg-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              About Ourselves
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-slate-600 text-base leading-relaxed">
            <div className="space-y-4">
              <p>
                We take this opportunity to introduce ourselves as a manufacturer
                of quality wire and cables with the brand name{" "}
                <span className="font-semibold text-emerald-700">“NEPAL CABLES”</span>. 
                Our manufacturing plant is located in Simra, Bara (Central Nepal) and
                has been in commercial production for four decades.
              </p>
              <p>
                We manufacture electrical, electronic and telecom wires and cables, including
                AAC, AAAC, ABC, ACSR, etc. conductors of various sizes. We have our
                branch offices all across the country, as well as an extensive dealership
                network throughout.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                The cables stand out distinctly in performance in all applications, simple 
                as well as complex. Continuous innovation in products and technology has 
                become a foundational process in our facility to keep line losses minimal.
              </p>
              <p className="rounded-2xl bg-emerald-50/50 p-5 border border-emerald-100/40 text-slate-700">
                Our plant is proudly an <span className="font-semibold text-emerald-800">ISO 9001:2015</span> certified company, and its testing laboratory operates matching stringent international standards.
              </p>
            </div>
          </div>
        </div>

        {/* Numeric Highlights Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
            >
              <p className="text-4xl font-extrabold tracking-tight text-emerald-600 transition-transform duration-300">
                {stat.value}
              </p>
              <div className="mt-2 h-0.5 w-8 bg-emerald-100 group-hover:w-16 mx-auto transition-all duration-300" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature Split Layout */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-md">
            <SectionHeader
              kicker="Company Overview"
              title="Industry Leadership"
              highlight="& Legacy"
            />
            <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">
              With over four decades of manufacturing excellence, Nepal Cables
              has built strong relationships with NEA, contractors, government
              projects, and industrial clients.
            </p>

            <div className="mt-6 space-y-3">
              {certifications.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-50 bg-slate-50/50 p-3 transition hover:bg-emerald-50/30">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100/60 bg-gradient-to-br from-white to-emerald-50/10 p-8 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Our Core Product Spectrum
            </h3>
            <ul className="space-y-3">
              {products.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0 group">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-emerald-600 transition-colors" />
                  <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Value Proposition Hero Banner */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-emerald-700/20 blur-xl" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Why Nepal Cables?</h2>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h4 className="font-semibold text-emerald-300 mb-2 text-base">Strategic Location</h4>
              <p className="text-emerald-100/90 text-sm leading-relaxed">
                Centrally located with close proximity to Indian border and Sirsiya Dry Port ensuring efficient logistics and fast delivery.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h4 className="font-semibold text-emerald-300 mb-2 text-base">Government Trust</h4>
              <p className="text-emerald-100/90 text-sm leading-relaxed">
                Trusted by Nepal Electricity Authority (NEA) for grid expansion, substations, and rural electrification projects.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h4 className="font-semibold text-emerald-300 mb-2 text-base">Innovation & Growth</h4>
              <p className="text-emerald-100/90 text-sm leading-relaxed">
                Producing FRLS, solar, and concentric cables while expanding toward medium voltage and export markets.
              </p>
            </div>
          </div>
        </div> {/* <-- CRITICAL FIXED TAG: Properly closes the grid container block */}

        {/* Comprehensive Synopsis Segment */}
        <div className="mt-20 space-y-8 rounded-3xl border border-slate-100 bg-white p-6 md:p-10 shadow-xl">
          <SectionHeader
            kicker="Company Synopsis"
            title="Detailed Profile of"
            highlight="Nepal Wire & Cables Pvt. Ltd."
            description="Expanded highlights from the official company synopsis, covering identity, leadership, manufacturing capacity, and core differentiators."
          />

          {/* Sticky Tab Navigation Bar */}
          <div className="sticky top-24 z-40 rounded-2xl border border-emerald-100/80 bg-white/90 p-4 shadow-md backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 mr-2">Quick Jump:</span>
              {synopsisNav.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Identity & Corporate Metadata Split */}
          <div className="grid gap-6 md:grid-cols-2 pt-6">
            <div id="synopsis-profile" className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 scroll-mt-44 hover:bg-white hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-emerald-600" />
                1. Company Profile
              </h3>
              <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                Nepal Wire & Cables Pvt. Ltd. (NWCPL), operating under “Nepal Cables”, is one of Nepal’s pioneering manufacturers of electrical, electronic, and telecommunication wires and cables.
              </p>
              <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                Over multiple decades, NWCPL has reliably supported industrial, infrastructure, and residential grid development layouts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 hover:bg-white hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Corporate Registration Details</h3>
              <ul className="mt-4 space-y-2.5">
                {companyDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span className="font-medium text-slate-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strategic Positions Blocks */}
          <div className="grid gap-6 md:grid-cols-2">
            <div id="synopsis-identity" className="rounded-2xl border border-slate-100 bg-white p-6 scroll-mt-44 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-emerald-600" />
                1.1 NWCPL Strategic Identity
              </h3>
              <ul className="mt-4 space-y-3">
                {identityPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="synopsis-portfolio" className="rounded-2xl border border-slate-100 bg-white p-6 scroll-mt-44 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-emerald-600" />
                1.2 Core Product Portfolio Breakdown
              </h3>
              <div className="mt-4 space-y-3">
                {portfolioCategories.map((entry) => (
                  <div key={entry.category} className="rounded-xl border border-emerald-50 bg-emerald-50/20 p-4 transition-colors hover:bg-emerald-50/40">
                    <p className="text-sm font-bold text-emerald-900">{entry.category}</p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">{entry.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Board Members Directory */}
          <div id="synopsis-leadership" className="rounded-2xl border border-slate-100 bg-slate-50/30 p-6 scroll-mt-44">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
              <span className="h-4 w-1 rounded-full bg-emerald-600" />
              1.3 Executive Leadership & Governance Matrix
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {leadershipProfiles.map((profile) => (
                <div key={profile.name} className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">{profile.name}</p>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed italic">{profile.summary}</p>
                    <ul className="mt-4 space-y-2">
                      {profile.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Differentiators Row */}
          <div id="synopsis-strengths" className="rounded-2xl border border-slate-100 bg-white p-6 scroll-mt-44 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
              <span className="h-4 w-1 rounded-full bg-emerald-600" />
              1.8 Core Strengths & Market Differentiators
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {coreStrengths.map((item) => (
                <div key={item.area} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md hover:border-emerald-100 group">
                  <p className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition-colors">{item.area}</p>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;