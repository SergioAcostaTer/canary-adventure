import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Card, CardContent } from "../cards";
import { BadgePill } from "./BadgePill";

export type ExperienceCardProps = {
  img: string;
  title: string;
  island: string;
  price: number | string | null;
  /** Optional offer price to show discounted price */
  offerPrice?: number | string | null;
  rating?: number | string | null;
  badges?: string[];
  /** Link destination - can be relative path or external URL */
  href?: string;
  /** Default: "min-w-[280px] max-w-[320px] w-full" */
  widthClass?: string;
  /** Default: "h-48" */
  imageHeightClass?: string;
  className?: string;
};

export const ExperienceCard = React.forwardRef<
  HTMLDivElement,
  ExperienceCardProps
>(
  (
    {
      img,
      title,
      island,
      price,
      offerPrice,
      rating,
      badges = [],
      href,
      widthClass = "min-w-[280px] max-w-[320px] w-full",
      imageHeightClass = "h-48",
      className,
    },
    ref
  ) => {
    const hasOffer = offerPrice != null;
    const displayPrice = hasOffer ? offerPrice : price;
    const originalPrice = hasOffer ? price : null;

    const t = useTranslations("common");

    const cardContent = (
      <>
        {/* Image Container */}
        <div
          className={cn(
            "relative w-full bg-gray-100 dark:bg-gray-800 overflow-hidden",
            imageHeightClass
          )}
        >
          <div className="relative aspect-video w-full h-full">
            <Image
              src={img}
              alt={title}
              fill
              className="object-cover"
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBgkz2dgAAAABJRU5ErkJggg=="
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
            />
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-2 max-w-[calc(100%-24px)]">
              {badges.map((badge) => (
                <BadgePill
                  key={badge}
                  className="shadow-sm bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 text-gray-800 dark:text-gray-200"
                >
                  {badge}
                </BadgePill>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4 bg-white dark:bg-gray-900">
          {/* Island */}
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {island}
          </div>

          {/* Title */}
          <h3 className="line-clamp-1 text-base font-semibold text-foreground leading-tight mb-2 min-h-6">
            {title}
          </h3>

          {/* Price and Rating Row */}
          <div className="flex items-end justify-between">
            {/* Price Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-baseline gap-2">
                {displayPrice != null ? (
                  <>
                    <span className="text-md text-muted-foreground">
                      {t("from")}{" "}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-foreground">
                        €{displayPrice}
                      </span>
                      {originalPrice && (
                        <span className="text-md text-muted-foreground line-through font-medium text-gray-500 dark:text-gray-400">
                          €{originalPrice}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="text-xl font-bold text-foreground">
                    FREE
                  </span>
                )}
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col items-end">
              {rating != null ? (
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500 dark:fill-yellow-400 dark:stroke-yellow-400" />
                  <span className="text-sm font-semibold text-foreground">
                    {rating}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">
                  No rating yet
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </>
    );

    const cardClassName = cn(
      widthClass,
      "group overflow-hidden transition-all duration-200 ease-in-out",
      "bg-card border border-border",
      "hover:border-border/80 hover:shadow-md",
      "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
      href && "cursor-pointer",
      className
    );

    const ariaLabel = `${title} in ${island} - From €${displayPrice}${
      hasOffer ? " (Special Offer)" : ""
    }`;

    if (href) {
      return (
        <Link
          href={href}
          aria-label={ariaLabel}
          className="block w-full"
          passHref
        >
          <Card ref={ref} className={cardClassName}>
            {cardContent}
          </Card>
        </Link>
      );
    }

    return (
      <Card ref={ref} className={cardClassName}>
        {cardContent}
      </Card>
    );
  }
);

ExperienceCard.displayName = "ExperienceCard";

export function ExperienceCardSkeleton({
  widthClass = "min-w-[280px] max-w-[320px] w-full",
  imageHeightClass = "h-48",
  className,
}: Pick<ExperienceCardProps, "widthClass" | "imageHeightClass" | "className">) {
  return (
    <Card
      className={cn(
        widthClass,
        "overflow-hidden bg-card border border-border",
        className
      )}
    >
      {/* Image Skeleton */}
      <div
        className={cn(
          "w-full bg-muted animate-pulse relative",
          imageHeightClass
        )}
      >
        <div className="absolute left-3 top-3 flex gap-2">
          <div className="h-6 w-16 bg-muted-foreground/20 rounded-full animate-pulse" />
        </div>
        <div className="absolute right-3 top-3">
          <div className="h-6 w-12 bg-muted-foreground/20 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <CardContent className="p-4 space-y-3">
        <div className="h-3 w-16 bg-muted animate-pulse rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="h-6 w-24 bg-muted animate-pulse rounded" />
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-4 w-12 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
