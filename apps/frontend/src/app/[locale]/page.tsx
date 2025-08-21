import { ProviderCTA } from "@/components/ui/ProviderCTA";
import { TestimonialsGrid } from "@/components/ui/TestimonialsGrid";
import AdventureHero from "@/features/home/Hero";
import TrendingExperiences from "@/features/home/TrendingExperiences";

const FIFTEEN_MINUTES = 60 * 15;

export const revalidate = FIFTEEN_MINUTES; // 15 minutes

export default function Home() {
  return (
    <div>
      <AdventureHero />
      <TrendingExperiences />
      <TestimonialsGrid />
      <ProviderCTA />
    </div>
  );
}
