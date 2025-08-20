import { ProviderCTA } from "@/components/ui/ProviderCTA";
import { TestimonialsGrid } from "@/components/ui/TestimonialsGrid";
import TrendingExperiences from "@/features/TrendingExperiences";

export default async function Home() {
  return (
    <div className="">
      <TrendingExperiences />
      <TestimonialsGrid />
      <ProviderCTA />
    </div>
  );
}
