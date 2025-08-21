import { ProviderCTA } from "@/components/ui/ProviderCTA";
import { TestimonialsGrid } from "@/components/ui/TestimonialsGrid";
import TrendingExperiences from "@/features/TrendingExperiences";

export const revalidate = 60 * 15; // 15 minutes

export default function Home() {
  return (
    <div>
      <TrendingExperiences />
      <TestimonialsGrid />
      <ProviderCTA />
    </div>
  );
}
