import { Link } from "@/i18n/navigation";
import { calculateApproxDuration } from "@/lib/utils/calculateAproxDuration";
import Stars from "@/modules/core/components/stars/Stars";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
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

const Article = ({
  children,
  className,
  href,
  image,
  onTop,
}: React.PropsWithChildren<{
  className?: string;
  href: string;
  image: React.ReactNode;
  onTop?: React.ReactNode;
}>) => (
  <article
    className={`rounded-[8px] bg-[var(--background)] border border-[var(--border-primary)] w-full ${className} group relative overflow-hidden`}
  >
    <Link href={href as never} className="flex flex-col h-full">
      {image}
      {children}
    </Link>
    {onTop}
  </article>
);

const LikeButton = () => {
  const t = useTranslations("common");

  return (
    <button
      aria-label={t("like")}
      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition cursor-pointer"
    >
      <Heart className="w-6 h-6 text-black/70" />
    </button>
  );
};

export function PlaceCard({
  img,
  title,
  island,
  rating,
  href,
  duration,
  featured,
  className = "",
}: ExperienceCardProps) {
  const t = useTranslations("common");

  const image = (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-[8px]">
      <Image
        src={img || "/placeholder.png"}
        alt={title}
        fill
        className="object-cover group-hover:scale-120 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
      />
    </div>
  );

  const labels = duration
    ? [calculateApproxDuration(duration), t("free")]
    : [t("free")];

  const content = (
    <div className="p-[8px_12px_0] flex flex-col gap-1 pb-3 justify-between flex-1 h-full">
      <div className="flex flex-col gap-[4px] mb-1">
        <p className="text-sm text-[var(--label-secondary)] font-semibold">
          {island?.toLocaleUpperCase()}
        </p>
        <h3 className="text-lg font-bold text-[var(--foreground)] line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-[var(--label-secondary)]">
          {labels.filter(Boolean).map((label, idx, arr) => (
            <span key={idx}>
              {label}
              {idx < arr.length - 1 && <span className="mx-1">·</span>}
            </span>
          ))}
        </p>
        {featured && (
          <div>
            <p
              className="inline-block my-1 text-sm font-semibold bg-[var(--label-strong)] text-white p-[3px_8px] rounded"
              aria-label={t("featuredAndRating", { rating: rating ?? 0 })}
            >
              {t("featured")}
            </p>
          </div>
        )}
      </div>
      {rating != null && (
        <div className="flex items-center gap-2">
          <Stars
            rating={rating}
            reviews={Math.round((rating || 0) * 10)}
            size={16}
            gap={2}
          />
        </div>
      )}
    </div>
  );

  return (
    <Article
      className={className}
      href={href}
      image={image}
      onTop={<LikeButton />}
    >
      {content}
    </Article>
  );
}
