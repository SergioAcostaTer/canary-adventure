import AdventureHero from "@/modules/core/components/Hero";
import TrendingExperiences from "@/modules/experiences/components/TrendingExperiences";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

type Props = {
  params: { locale: Locale };
};

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <div>
      <AdventureHero />
      <TrendingExperiences />
    </div>
  );
}
