import AdventureHero from "@/features/home/Hero";
import TrendingExperiences from "@/features/home/TrendingExperiences";

export const revalidate = 3600; // 1 hour

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "es" },
    { locale: "de" },
    { locale: "fr" },
  ];
}

export default function Home() {
  return (
    <div>
      <AdventureHero />
      <TrendingExperiences />
    </div>
  );
}
