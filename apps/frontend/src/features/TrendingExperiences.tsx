"use client";

import { ExperienceCard } from "@/components/ui/experience";

// Keep data external or fetch from API in real-world apps
const TRENDING = [
  {
    id: "teide-sunrise",
    title: "Teide Sunrise & Stargazing",
    island: "Tenerife",
    price: 49,
    rating: 4.9,
    img: "https://www.volcanoteide.com/source/roques-de-garcia.webp",
    badges: ["Free cancel", "Small group"],
  },
  {
    id: "famara-surf",
    title: "Famara Surf Lesson",
    island: "Lanzarote",
    price: 39,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
    badges: ["Top rated", "All gear"],
  },
  {
    id: "laurel-forest",
    title: "La Gomera Laurel Forest Hike",
    island: "La Gomera",
    price: 59,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1473443444230-1865f4bf9f9f?q=80&w=800&auto=format&fit=crop",
    badges: ["Local guide", "Family friendly"],
  },
  {
    id: "dolphin-whale",
    title: "Dolphin & Whale Watching",
    island: "Tenerife",
    price: 45,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1531730331038-7804a3f65c1b?q=80&w=800&auto=format&fit=crop",
    badges: ["Eco-friendly", "Live commentary"],
  },
];

export default function TrendingExperiences() {
  return (
    <section
      aria-labelledby="trending-experiences-title"
      className="mx-auto max-w-7xl px-4 py-8"
    >
      <h2
        id="trending-experiences-title"
        className="mb-6 text-2xl font-bold tracking-tight text-gray-900"
      >
        Trending Experiences
      </h2>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {TRENDING.map((item) => (
          <li key={item.id}>
            <ExperienceCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
