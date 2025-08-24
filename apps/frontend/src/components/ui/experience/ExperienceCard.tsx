
import { BadgePill } from "@/components/ui/experience/BadgePill";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface ExperienceCardProps {
  img: string;
  title: string;
  island: string;
  price?: number | null;
  offerPrice?: number | undefined;
  rating?: number;
  badges?: string[];
  href?: string;
  className?: string;
}

export function ExperienceCard({
  img,
  title,
  island,
  price,
  offerPrice,
  rating,
  badges = [],
  href,
  className = "",
}: ExperienceCardProps) {
  const t = useTranslations("common");
  
  const displayPrice = offerPrice || price;
  const hasDiscount = offerPrice && price;
  const isFree = !displayPrice;

  const content = (
    <>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        
        {badges.length > 0 && (
          <div className="absolute left-3 top-3 flex gap-2">
            {badges.map((badge) => (
              <BadgePill key={badge} className="bg-white/90 text-gray-800">
                {badge}
              </BadgePill>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-1 text-xs uppercase text-gray-500">
          {island}
        </div>
        
        <h3 className="mb-3 font-semibold flex-1">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            {isFree ? (
              <span className="text-xl font-bold text-green-600">FREE</span>
            ) : (
              <>
                <span className="text-sm text-gray-500">{t("from")}</span>
                <span className="text-xl font-bold">€{displayPrice}</span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    €{price}
                  </span>
                )}
              </>
            )}
          </div>

          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const cardClass = `rounded-3xl border border-black/20 bg-white shadow-xs dark:border-white/20 dark:bg-gray-900 w-full group overflow-hidden transition-all duration-200 ease-in-out bg-card border border-border hover:border-border/80 hover:shadow-md focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 cursor-pointer h-full ${className}`;

  return href ? (
    <Link href={href} className="block h-full">
      <article className={cardClass}>{content}</article>
    </Link>
  ) : (
    <article className={cardClass}>{content}</article>
  );
}