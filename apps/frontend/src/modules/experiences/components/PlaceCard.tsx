import { Link } from "@/i18n/navigation";
import { calculateApproxDuration } from "@/lib/utils/calculateAproxDuration";
import Stars from "@/modules/core/components/stars/Stars";
import { Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export interface ExperienceCardProps {
  img: string;
  title: string;
  island: string;
  rating?: number;
  duration?: number;
  href: string;
  featured?: boolean;
  className?: string;
}

export default async function PlaceCard({
  img,
  title,
  island,
  rating,
  href,
  duration,
  featured,
  className = "",
}: ExperienceCardProps) {
  const t = await getTranslations("common");

  const labels = duration
    ? [calculateApproxDuration(duration), t("free")]
    : [t("free")];

  return (
    <article
      className={`rounded-lg bg-[var(--background)] border border-[var(--border-primary)] w-full group relative overflow-hidden ${className}`}
    >
      <Link href={href as never} className="flex flex-col h-full">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
          <Image
            src={img || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="300px"
          />
        </div>

        <div className="p-3 flex flex-col gap-1 flex-1">
          <div className="flex flex-col gap-1 mb-1">
            <p className="text-sm text-[var(--label-secondary)] font-semibold">
              {island?.toUpperCase()}
            </p>
            <h3 className="text-lg font-bold text-[var(--foreground)] line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-[var(--label-secondary)]">
              {labels.filter(Boolean).join(" · ")}
            </p>
            {featured && (
              <p
                className="inline-block my-1 text-sm font-semibold bg-[var(--label-strong)] text-white px-2 py-1 rounded w-fit"
                aria-label={t("featuredAndRating", { rating: rating ?? 0 })}
              >
                {t("featured")}
              </p>
            )}
          </div>
          {rating != null && (
            <div className="flex items-center gap-2">
              <Stars
                rating={rating}
                reviews={Math.round(rating * 10)}
                size={16}
                gap={2}
              />
            </div>
          )}
        </div>
      </Link>

      <button
        aria-label={t("like")}
        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition"
      >
        <Heart className="w-6 h-6 text-black/70" />
      </button>
    </article>
  );
}
