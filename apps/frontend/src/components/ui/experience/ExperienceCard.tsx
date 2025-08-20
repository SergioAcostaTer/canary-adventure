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
  rating?: number | string;
  badges?: string[];
  /** Default: "min-w-[260px] max-w-[260px]" */
  widthClass?: string;
  /** Default: "h-40" */
  imageHeightClass?: string;
  className?: string;
  onClick?: () => void;
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
      rating,
      badges = [],
      widthClass = "min-w-[260px] max-w-[260px]",
      imageHeightClass = "h-40",
      className,
      onClick,
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <Card
        ref={ref}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(widthClass, "overflow-hidden", className)}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : -1}
      >
        {/* Image */}
        <div className={cn("relative w-full", imageHeightClass)}>
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {badges.length > 0 && (
            <div className="absolute left-2 top-2 flex gap-2">
              {badges.map((b) => (
                <BadgePill key={b}>{b}</BadgePill>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-3">
          <div className="text-xs text-gray-500">{island}</div>
          <div className="line-clamp-2 font-semibold">{title}</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              From <span className="font-semibold">€{price}</span>
            </div>
            {rating != null ? (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                {rating}
              </div>
            ) : (
              <span className="text-xs text-gray-400">No rating</span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
ExperienceCard.displayName = "ExperienceCard";

export function ExperienceCardSkeleton({
  widthClass = "min-w-[260px] max-w-[260px]",
  imageHeightClass = "h-40",
  className,
}: Pick<ExperienceCardProps, "widthClass" | "imageHeightClass" | "className">) {
  return (
    <Card className={cn(widthClass, "overflow-hidden", className)}>
      <div
        className={cn("w-full animate-pulse bg-gray-200", imageHeightClass)}
      />
      <CardContent className="p-3">
        <div className="mb-1 h-3 w-16 animate-pulse rounded bg-gray-200" />
        <div className="mb-2 h-4 w-44 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
}
