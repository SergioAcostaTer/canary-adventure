import { Link } from "@/i18n/navigation";
import { calculateApproxDuration } from "@/lib/utils/calculateAproxDuration";
import Stars from "@/modules/core/components/stars/Stars";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

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
}: React.PropsWithChildren<{
  className?: string;
  href: string;
  image: React.ReactNode;
}>) => (
  <article
    className={`rounded-[8px] bg-[var(--background)] border border-[var(--border-primary)] w-full ${className} group`}
  >
    <Link href={href as never} className="flex flex-col">
      {image}
      {children}
    </Link>
  </article>
);

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
        className="object-cover group-hover:scale-105 transition-transform"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
      />
      {/*         <div className="absolute inset-0">
          <div className="absolute w-full h-[50px] top-0 left-0 bg-gradient-to-b from-black/90 to-transparent" />
          <p className="absolute top-1 left-3 text-white text-sm   font-semibold px-2 py-1">
            {t("common.featured")}
          </p>
        </div> */}
    </div>
  );

  const labels = duration
    ? [calculateApproxDuration(duration), t("free")]
    : [t("free")];

  const content = (
    <div className="p-[8px_12px_0] flex flex-col gap-1 pb-3">
      <p className="text-sm text-[var(--label-secondary)] font-semibold">
        {island?.toLocaleUpperCase()}
      </p>
      <h3 className="text-lg font-bold text-[var(--foreground)]">{title}</h3>
      <p className="text-sm text-[var(--label-secondary)]">
        {labels.filter(Boolean).map((label, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-1">·</span>}
            {label}
          </React.Fragment>
        ))}
      </p>

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
    <Article className={className} href={href} image={image}>
      {content}
    </Article>
  );
}
