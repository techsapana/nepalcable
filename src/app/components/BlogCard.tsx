import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  imageSrc?: string;
  href?: string;
  linkLabel?: string;
}

const BlogCard = ({
  title,
  imageSrc,
  href = "#",
  linkLabel = "Read Blog",
}: BlogCardProps) => {
  return (
    <div className="group mx-auto flex w-full max-w-72 flex-col gap-4 rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="h-44 w-full shrink-0 overflow-hidden rounded-2xl bg-emerald-50">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={280}
            height={176}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-emerald-100" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-semibold leading-snug text-slate-900 md:text-lg">
          {title}
        </h3>
        <Link
          href={href}
          className="mt-3 inline-flex w-fit rounded-full border border-emerald-200 px-3 py-1.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-800"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
