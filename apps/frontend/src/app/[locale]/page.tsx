import AdventureHero from "@/modules/core/components/Hero";
import TrendingExperiences from "@/modules/experiences/components/TrendingExperiences";

export const revalidate = 3600; // 1 hour

export const dynamic = "force-static";

export default function Home() {
  return (
    <div>
      <AdventureHero />
      <TrendingExperiences />
    </div>
  );
}
