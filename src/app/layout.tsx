import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Nepal Cables | Home",
  icons: {
    icon: "/nepalcableslogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
        <div className="fixed bottom-20 right-6">
          <div className="flex items-center gap-2">
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nepalcables2025@gmail.com"
              target="_blank"
              className="group relative bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg inline-flex"
            >
              <span
                className="
                  pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2
                  opacity-0 group-hover:opacity-100
                  translate-x-2 group-hover:translate-x-0
                  transition-all duration-300
                  bg-gray-800 text-white text-sm
                  px-3 py-2 rounded-lg shadow
                  whitespace-nowrap
                  hidden sm:block
                "
              >
                Send us an email
              </span>
              <FaEnvelope size={28} />
            </Link>
          </div>
        </div>

        <div className="fixed bottom-2 right-6">
          <div className="flex items-center gap-2">
            <Link
              href="https://wa.me/4373315"
              target="_blank"
              className="group relative bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg inline-flex"
            >
              <span
                className="
                  pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2
                  opacity-0 group-hover:opacity-100
                  translate-x-2 group-hover:translate-x-0
                  transition-all duration-300
                  bg-gray-800 text-white text-sm
                  px-3 py-2 rounded-lg shadow
                  whitespace-nowrap
                  hidden sm:block
                "
              >
                Chat with us for enterprises
              </span>
              <FaWhatsapp size={28} />
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
