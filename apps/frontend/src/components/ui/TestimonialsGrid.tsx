import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Card } from "./cards/Card";
import { CardContent } from "./cards/CardContent";

/**
 * Reusable Testimonials grid
 * - Drop-in component with sensible defaults
 * - Supports custom title, testimonials list, column count, and rating toggle
 * - Includes avatar (image or initials fallback)
 * - Accessible markup
 */

export type Testimonial = {
  name: string;
  text: string;
  /** Optional avatar image URL */
  avatarSrc?: string;
  /** Optional short descriptor like country code or city */
  meta?: string;
  /** Optional rating (1-5). If absent, defaults to 5 when showRating=true */
  rating?: number;
};

export type TestimonialsGridProps = {
  title?: string;
  /** Grid column count at ≥sm breakpoints (1-4). Default: 3 */
  columns?: 1 | 2 | 3 | 4;
  /** Show star rating row. Default: true */
  showRating?: boolean;
  /** Items to render. If omitted, a curated default set is used. */
  testimonials?: Testimonial[];
  className?: string;
};

function Stars({ value = 5 }: { value?: number }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div
      className="flex items-center gap-1 text-yellow-500"
      aria-label={`${v} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < v ? "fill-yellow-400 stroke-yellow-400" : "stroke-yellow-400"
          )}
        />
      ))}
    </div>
  );
}

function initialsFromName(name: string) {
  return name
    .split(/\s|,/) // split by space or comma
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Nerea",
    meta: "ES",
    text: "Booked stargazing over Teide — the AI suggested the perfect night. Unreal sky!",
  },
  {
    name: "Martin",
    meta: "DE",
    text: "Simple and fast. The plan mixed hiking and wineries just right.",
  },
  {
    name: "Sophie",
    meta: "FR",
    text: "Great for kids! We found family-friendly beaches and a dolphin tour.",
  },
];

export function TestimonialsGrid({
  title = "Loved by travelers",
  columns = 3,
  showRating = true,
  testimonials = defaultTestimonials,
  className,
}: TestimonialsGridProps) {
  const colClass = React.useMemo(() => {
    switch (columns) {
      case 1:
        return "sm:grid-cols-1";
      case 2:
        return "sm:grid-cols-2";
      case 4:
        return "sm:grid-cols-4";
      case 3:
      default:
        return "sm:grid-cols-3";
    }
  }, [columns]);

  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-8", className)}>
      {title ? (
        <h2 className="mb-4 text-xl font-extrabold tracking-tight">{title}</h2>
      ) : null}

      <div className={cn("grid grid-cols-1 gap-4", colClass)}>
        {(testimonials ?? []).map((t, i) => (
          <Card
            key={`${t.name}-${i}`}
            className="border-none shadow-sm data-[theme=dark]:bg-neutral-900"
          >
            <CardContent className="p-4">
              {showRating ? <Stars value={t.rating ?? 5} /> : null}

              <p className="mt-2 leading-relaxed text-sm text-muted-foreground">
                {t.text}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  {t.avatarSrc ? (
                    <AvatarImage src={t.avatarSrc} alt={`${t.name} avatar`} />
                  ) : (
                    <AvatarFallback>{initialsFromName(t.name)}</AvatarFallback>
                  )}
                </Avatar>
                <div className="text-xs">
                  <div className="font-medium text-foreground">{t.name}</div>
                  {t.meta ? (
                    <div className="text-muted-foreground">{t.meta}</div>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
