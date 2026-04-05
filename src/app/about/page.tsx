"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/src/components/SectionHeader";

const stats = [
  { label: "Years of Experience", value: "25+" },
  { label: "Projects Completed", value: "2,000+" },
  { label: "Cable Variants", value: "120+" },
  { label: "Dealers & Partners", value: "30+" },
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
    items:
      "ACSR, AAC, AAAC Conductors, Aerial Bundled Cables (ABC), Low Voltage Power Cables, Concentric (Service Drop) Cables",
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
    name: "Ashish Sigdyal — Managing Director",
    summary:
      "With over 25 years at NWCPL, Ashish drives operations and market strategy.",
    highlights: [
      "Three-term President of NEEMA with strong policy and agency ties including NEA.",
      "Business experience across multiple ventures including A-1 Direct Marketing (USA).",
      "Education at St. Joseph’s, Darjeeling and Bellevue University, Nebraska.",
    ],
  },
  {
    name: "Mrs. Shanta Sigdyal — Chairman",
    summary:
      "Provides strategic direction and governance across NWCPL and related concerns.",
    highlights: [
      "Chairs NWCPL, NWC Concern, and Amrit Nath Udyam for long-term stability.",
      "Former board member of Prakash Cable Industries and Solarex Nepal.",
    ],
  },
  {
    name: "Krishna P. Sigdyal — Senior Consultant",
    summary:
      "Strategic advisor since 1995 with deep policy and institutional expertise.",
    highlights: [
      "Served on National Development Council, Environment Protection Council, and as Nepal’s delegate to UNCED 1992.",
      "Former role with IUCN (Switzerland) and recognized thought leadership.",
    ],
  },
];

const shareholderData = [
  { name: "Ashish Sigdyal", amount: "25,000,000" },
  { name: "Shanta Sigdyal", amount: "20,000,000" },
  { name: "Total", amount: "45,000,000" },
];

const capacityData = [
  {
    category: "Power Infrastructure",
    product: "Power Cables (Low Voltage)",
    size: "16 sq.mm to 500 sq.mm",
    dailyCapacity: "20 km",
  },
  {
    category: "Power Infrastructure",
    product: "ACSR Conductors",
    size: "Weasel, Rabbit, Dog, Cat, Leopard",
    dailyCapacity: "90 km",
  },
  {
    category: "Power Infrastructure",
    product: "Aerial Bundled Cables (LV ABC)",
    size: "16 sq.mm to 150 sq.mm",
    dailyCapacity: "30 km",
  },
  {
    category: "Power Infrastructure",
    product: "Concentric (Service Drop) Cables",
    size: "4 sq.mm to 25 sq.mm",
    dailyCapacity: "20 km",
  },
  {
    category: "Building & Industrial",
    product: "House Wires (PVC Insulated)",
    size: "0.5 sq.mm to 16 sq.mm",
    dailyCapacity: "35 km",
  },
  {
    category: "Support & Ancillary",
    product: "Stay Wires (Galvanized Steel)",
    size: "7/12, 7/10, 7/18",
    dailyCapacity: "50 km",
  },
];

const rawMaterialPoints = [
  "Landed input costs for copper and aluminum rods are effectively on par with major cross-border competitors.",
  "Pricing parity follows global LME benchmark + producer premium applied region-wide.",
  "Simara logistics costs are comparable with Indian industrial hubs, creating no major location disadvantage.",
  "Competitive edge comes from operational efficiency, lower conversion loss, and a protected domestic market.",
  "A 15% import duty on finished cables strengthens domestic execution-based competitiveness.",
];

const investmentPlan = [
  {
    pillar: "Scale for Dominance: Capacity Expansion",
    allocation: "20 Crore",
    percentage: "44%",
    actions:
      "Upgrade machinery to double LV ABC output and establish a Medium Voltage (MV) cable line.",
    outcomes:
      "Capture NEA tenders and unlock higher-margin revenue through MV products.",
  },
  {
    pillar: "Pivot to High-Margin Markets: Consumer Focus",
    allocation: "15 Crore",
    percentage: "33%",
    actions:
      "Launch FR/FRLS cable line for homes and shift housing mix from 15% toward 40%.",
    outcomes: "Build leadership in premium home electrical safety segment.",
  },
  {
    pillar: "Fortify the Core: Working Capital Management",
    allocation: "10 Crore",
    percentage: "22%",
    actions:
      "Restructure balance sheet and optimize raw-material sourcing via international bulk procurement.",
    outcomes:
      "Reduce volatility, improve margins, and de-risk delivery for large contracts.",
  },
];

const financialFigures = [
  { particulars: "Share Capital", fy2080: "4.5", fy2079: "4.5", fy2078: "4.5" },
  {
    particulars: "Reserve & Surplus",
    fy2080: "3.82",
    fy2079: "3.77",
    fy2078: "3.78",
  },
  { particulars: "Income", fy2080: "45", fy2079: "23.52", fy2078: "30.96" },
  { particulars: "Borrowings", fy2080: "30", fy2079: "31", fy2078: "28" },
];

const coreStrengths = [
  {
    area: "Quality & Certification",
    detail:
      "Certified by KEMA (Netherlands), CPRI (India), ISO 9001:2000, with IS/ISO/IEC 17025:2005-accredited lab capability.",
  },
  {
    area: "Innovation Leadership",
    detail:
      "Among the first in Nepal for NEA-approved ABC, concentric cables, FRLS cables, and high-performance solar cables.",
  },
  {
    area: "Industry Influence",
    detail:
      "Leadership involvement in NEEMA supports policy access and strong sector coordination.",
  },
  {
    area: "Experienced Leadership",
    detail:
      "Sigdyal family leadership combines operations, governance, and strategic policy experience.",
  },
  {
    area: "Cost Efficiency",
    detail:
      "Competitive pricing and efficient production despite high finance costs, with export-ready positioning.",
  },
  {
    area: "Strategic Location",
    detail:
      "Simra plant is ~18 km from Sirsiya Dry Port and ~3 km from East-West Highway for efficient logistics.",
  },
];

const synopsisNav = [
  { label: "1.0 Profile", target: "synopsis-profile" },
  { label: "1.1 Identity", target: "synopsis-identity" },
  { label: "1.2 Portfolio", target: "synopsis-portfolio" },
  { label: "1.3 Leadership", target: "synopsis-leadership" },
  { label: "1.4 Capacity", target: "synopsis-capacity" },
  { label: "1.5 Raw Materials", target: "synopsis-raw-materials" },
  { label: "1.6 Investment", target: "synopsis-investment" },
  { label: "1.7 Financials", target: "synopsis-financials" },
  { label: "1.8 Strengths", target: "synopsis-strengths" },
];

const AboutUs = () => {
  return (
    <section className="mt-10 bg-linear-to-b from-white via-emerald-50 to-white px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white/75 p-8 shadow-sm">
          <SectionHeader
            kicker="About Nepal Cables"
            title="Engineering Reliable Electrical"
            highlight="Solutions for Nepal"
            description="Nepal Wire & Cables (P.) Ltd. is a leading domestic manufacturer delivering internationally certified electrical cables for residential, commercial, and industrial infrastructure across Nepal."
            align="center"
          />
        </div>

        {/* NEW — Brochure Content Section */}
        <div className="mt-16 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6">
            About Ourselves
          </h2>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              We take this opportunity to introduce ourselves as a manufacturer
              of quality wire and cables with the brand name “NEPAL CABLES”. Our
              manufacturing plant is located in Simra, Bara (Central Nepal) and
              has been in commercial production for four decades. We manufacture
              electrical, electronic and telecom wires and cables, including
              AAC, AAAC, ABC, ACSR,etc. conductors of various sizes. We have our
              branch offices all across the country, as well as a dealership
              network throughout. Our cables are rapidly gaining popularity in
              the markets of neighboring countries too.
            </p>

            <p>
              The cables stand out distinctly in performance in all
              applications, simple as well as complex; every now and then a new
              cable is manufactured to suit the client’s need and this has been
              very instrumental in the growth of Nepal Cables. We are committed
              to contribute by producing high quality wires & cables with low
              losses. For this purpose, innovation in products and technology
              has become a continuous process in the working of Nepal Cables. It
              is an ISO 9001:2015 company.
            </p>

            <p>
              Our products have “Nepal Cables” printed / embossed / tagged on
              them. It is the first industry to receive Nepal Standards in
              cables and conductors, and its laboratory is disposed to IS / ISO
              / IEC 17025:2005.
            </p>

            <p>
              All products face strict quality control procedures stringently
              observed by a well-trained and experienced team of technical
              personnel, well versed in cable manufacturing. Technical personnel
              are welcome to peruse over our quality system and results, for
              their own as well as that of their clients’ satisfaction.
              Fulfilling clients’ needs of special applications in cables
              without compromising quality is our specialty. It is built around
              information, and the entire process of making is all the way to
              the final customer.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <p className="text-2xl font-bold text-emerald-700">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Existing Sections (unchanged) */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
            <SectionHeader
              kicker="Company Overview"
              title="Industry Leadership"
              highlight="& Legacy"
            />
            <p className="mt-4 text-slate-600 leading-relaxed">
              With over four decades of manufacturing excellence, Nepal Cables
              has built strong relationships with NEA, contractors, government
              projects, and industrial clients. The company pioneered early ISO
              certification among Nepalese electrical manufacturers and
              continues to lead through strict quality compliance.
            </p>

            <div className="mt-6 space-y-3">
              {certifications.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Our Product Range
            </h3>
            <ul className="mt-6 space-y-3">
              {products.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-lime-500" />
                  <p className="text-slate-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 rounded-4xl bg-emerald-700 p-10 text-white md:p-14">
          <h2 className="text-2xl md:text-3xl font-bold">Why Nepal Cables?</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8 text-sm md:text-base">
            <div>
              <h4 className="font-semibold mb-3">Strategic Location</h4>
              <p className="text-emerald-100">
                Centrally located with close proximity to Indian border and
                Sirsiya Dry Port ensuring efficient logistics and fast delivery.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Government Trust</h4>
              <p className="text-emerald-100">
                Trusted by Nepal Electricity Authority (NEA) for grid expansion,
                substations, and rural electrification projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Innovation & Growth</h4>
              <p className="text-emerald-100">
                Producing FRLS, solar, and concentric cables while expanding
                toward medium voltage and export markets.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-8 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
          <SectionHeader
            kicker="Company Synopsis"
            title="Detailed Profile of"
            highlight="Nepal Wire & Cables Pvt. Ltd."
            description="Expanded highlights from the official company synopsis, covering identity, leadership, manufacturing capacity, investment roadmap, and financials."
          />

          <div className="sticky top-24 z-40 rounded-2xl border border-emerald-100 bg-emerald-50/95 p-5 backdrop-blur-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Quick Jump
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {synopsisNav.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
              <h3
                id="synopsis-profile"
                className="text-lg font-semibold text-slate-900 scroll-mt-36"
              >
                1. Company Profile
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">
                Nepal Wire & Cables Pvt. Ltd. (NWCPL), operating under “Nepal
                Cables”, is one of Nepal’s pioneering manufacturers of
                electrical, electronic, and telecommunication wires and cables.
                Founded by a first-generation entrepreneur, the company is
                recognized for product quality, innovation, and
                international-standard manufacturing.
              </p>
              <p className="mt-3 text-slate-700 leading-relaxed">
                Over two decades, NWCPL has supported industrial,
                infrastructure, and residential development with reliable cable
                solutions.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Other Details
              </h3>
              <ul className="mt-3 space-y-2">
                {companyDetails.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 p-6">
              <h3
                id="synopsis-identity"
                className="text-lg font-semibold text-slate-900 scroll-mt-36"
              >
                1.1 NWCPL Identity
              </h3>
              <ul className="mt-4 space-y-3">
                {identityPoints.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-lime-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-100 p-6">
              <h3
                id="synopsis-portfolio"
                className="text-lg font-semibold text-slate-900 scroll-mt-36"
              >
                1.2 Product Portfolio
              </h3>
              <div className="mt-4 space-y-4">
                {portfolioCategories.map((entry) => (
                  <div
                    key={entry.category}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {entry.category}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                      {entry.items}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 p-6">
            <h3
              id="synopsis-leadership"
              className="text-lg font-semibold text-slate-900 scroll-mt-36"
            >
              1.3 Leadership Profile
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {leadershipProfiles.map((profile) => (
                <div
                  key={profile.name}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-semibold text-slate-900">{profile.name}</p>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                    {profile.summary}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {profile.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Shareholder
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Amount (NPR)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shareholderData.map((item) => (
                    <tr
                      key={item.name}
                      className="border-t border-slate-200 text-slate-700"
                    >
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 p-6">
            <h3
              id="synopsis-capacity"
              className="text-lg font-semibold text-slate-900 scroll-mt-36"
            >
              1.4 Production Capacity & Human Resources
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Location</p>
                <p className="mt-1">Simra, Bara, Nepal</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Facility Type</p>
                <p className="mt-1">
                  Integrated cable & conductor manufacturing plant
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Operating Model</p>
                <p className="mt-1">14-hour production cycle</p>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Product Line
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Size / Spec
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Daily Capacity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {capacityData.map((row) => (
                    <tr
                      key={`${row.product}-${row.size}`}
                      className="border-t border-slate-200 text-slate-700"
                    >
                      <td className="px-4 py-3">{row.category}</td>
                      <td className="px-4 py-3">{row.product}</td>
                      <td className="px-4 py-3">{row.size}</td>
                      <td className="px-4 py-3">{row.dailyCapacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-slate-700 leading-relaxed">
              With adequate working capital, NWCPL can generate up to Rs 60 Cr
              in annual sales using existing capacity, while targeted machinery
              upgrades can further enhance output and improve margins. The
              company currently employs 65+ personnel, with 85% of employees
              serving for 10+ years.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 p-6">
              <h3
                id="synopsis-raw-materials"
                className="text-lg font-semibold text-slate-900 scroll-mt-36"
              >
                1.5 Raw Materials & Import Dynamics
              </h3>
              <ul className="mt-4 space-y-3">
                {rawMaterialPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-100 p-6">
              <h3
                id="synopsis-investment"
                className="text-lg font-semibold text-slate-900 scroll-mt-36"
              >
                1.6 Investment Need
              </h3>
              <p className="mt-2 text-slate-700">
                Total investment sought:{" "}
                <span className="font-semibold">NPR 45 Crore</span>
              </p>
              <div className="mt-4 space-y-3">
                {investmentPlan.map((plan) => (
                  <div
                    key={plan.pillar}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="font-semibold text-slate-900">
                      {plan.pillar}
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Allocation: {plan.allocation} ({plan.percentage})
                    </p>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                      {plan.actions}
                    </p>
                    <p className="mt-2 text-sm text-emerald-700 leading-relaxed">
                      {plan.outcomes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 p-6">
              <h3
                id="synopsis-financials"
                className="text-lg font-semibold text-slate-900 scroll-mt-36"
              >
                1.7 Financial Figures (in Cr)
              </h3>
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">
                        Particulars
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        2080/81
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        2079/80
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        2078/79
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialFigures.map((item) => (
                      <tr
                        key={item.particulars}
                        className="border-t border-slate-200 text-slate-700"
                      >
                        <td className="px-4 py-3">{item.particulars}</td>
                        <td className="px-4 py-3">{item.fy2080}</td>
                        <td className="px-4 py-3">{item.fy2079}</td>
                        <td className="px-4 py-3">{item.fy2078}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 p-6">
              <h3
                id="synopsis-strengths"
                className="text-lg font-semibold text-slate-900 scroll-mt-36"
              >
                1.8 Core Strengths & Differentiators
              </h3>
              <div className="mt-4 space-y-3">
                {coreStrengths.map((item) => (
                  <div
                    key={item.area}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <p className="font-semibold text-slate-900">{item.area}</p>
                    <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
