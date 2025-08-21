import AdventureHero from "@/features/home/Hero";
import TrendingExperiences from "@/features/home/TrendingExperiences";

export const revalidate = 3600; // 1 hour

export default function Home() {
  return (
    <div>
      <AdventureHero />
      <TrendingExperiences />
    </div>
  );
}
