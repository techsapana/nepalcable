import Image from "next/image";
import Link from "next/link";

interface CardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  href: string;
}

const Card = ({ imageSrc, title, subtitle, href }: CardProps) => {
  return (
    <div className="group relative h-80 w-64 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-slate-900/75 via-slate-900/15 to-transparent" />

      <div className="absolute bottom-0 w-full p-5 text-white">
        <h3 className="text-lg font-bold drop-shadow">{title}</h3>
        <p className="text-sm text-white/90">{subtitle}</p>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-900/80 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-emerald-900"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
