import TrendingExperiences from "@/components/ui/experience/ExperienceCard";
import AdventureHero from "@/features/home/Hero";

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
