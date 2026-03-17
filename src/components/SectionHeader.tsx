interface SectionHeaderProps {
  kicker?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  kicker,
  title,
  highlight,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`space-y-3 ${isCenter ? "text-center" : "text-left"} ${className || ""}`}
    >
      {kicker ? (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 ${isCenter ? "mx-auto" : ""}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          {kicker}
        </div>
      ) : null}

      <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
        {title}{" "}
        {highlight ? (
          <span className="text-emerald-700">{highlight}</span>
        ) : null}
      </h2>

      {description ? (
        <p
          className={`max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg ${isCenter ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
