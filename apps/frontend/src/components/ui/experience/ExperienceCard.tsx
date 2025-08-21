import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";
import * as React from "react";
import { Card, CardContent } from "../cards";
import { BadgePill } from "./BadgePill";

export type ExperienceCardProps = {
  img: string;
  title: string;
  island: string;
  price: number | string;
  /** Optional offer price to show discounted price */
  offerPrice?: number | string;
  rating?: number | string;
  badges?: string[];
  /** Link destination - can be relative path or external URL */
  href?: string;
  /** Default: "min-w-[280px] max-w-[320px] w-full" */
  widthClass?: string;
  /** Default: "h-48" */
  imageHeightClass?: string;
  className?: string;
  onClick?: () => void;
};

const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//")
  );
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
      onClick,
    },
    ref
  ) => {
    const hasOffer = offerPrice != null;
    const displayPrice = hasOffer ? offerPrice : price;
    const originalPrice = hasOffer ? price : null;
    const savings = hasOffer ? Number(originalPrice) - Number(offerPrice) : 0;

    const isExternal = href ? isExternalUrl(href) : false;
    const linkProps = href
      ? {
          href,
          ...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer",
          }),
        }
      : {};

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!onClick && !href) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (onClick) {
          onClick();
        } else if (href) {
          if (isExternal) {
            window.open(href, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = href;
          }
        }
      }
    };

    const handleClick = (e: React.MouseEvent) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    };

    const cardContent = (
      <>
        {/* Image Container */}
        <div
          className={cn(
            "relative w-full bg-gray-100 dark:bg-gray-800 overflow-hidden",
            imageHeightClass
          )}
        >
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-2 max-w-[calc(100%-24px)]">
              {badges.map((badge) => (
                <BadgePill
                  key={badge}
                  className="shadow-sm bg-white/95 backdrop-blur-sm dark:bg-gray-900/95"
                >
                  {badge}
                </BadgePill>
              ))}
            </div>
          )}

          {/* Professional Offer Badge */}
          {hasOffer && (
            <div className="absolute right-3 top-3">
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-red-600 dark:bg-red-500 text-white text-xs font-semibold tracking-wide shadow-sm">
                -{Math.round((savings / Number(originalPrice)) * 100)}%
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Island */}
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {island}
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-base font-semibold text-foreground leading-tight mb-3 min-h-[2.5rem]">
            {title}
          </h3>

          {/* Price and Rating Row */}
          <div className="flex items-end justify-between">
            {/* Price Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">From</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-foreground">
                    €{displayPrice}
                  </span>
                  {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through font-medium">
                      €{originalPrice}
                    </span>
                  )}
                </div>
              </div>
              {hasOffer && (
                <div className="inline-flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                  Save €{savings}
                </div>
              )}
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
      (onClick || href) && "cursor-pointer",
      className
    );

    if (href) {
      return (
        <Card ref={ref} className={cardClassName}>
          <a
            {...linkProps}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={`${title} in ${island} - From €${displayPrice}${
              hasOffer ? " (Special Offer)" : ""
            }`}
          >
            {cardContent}
          </a>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cardClassName}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : -1}
        aria-label={
          onClick ? `${title} in ${island} - From €${displayPrice}` : undefined
        }
      >
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
