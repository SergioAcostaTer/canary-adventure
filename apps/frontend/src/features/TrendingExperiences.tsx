"use client";

import { ExperienceCard } from "@/components/ui/experience";

const TRENDING = [
  {
    img: "https://www.volcanoteide.com/source/roques-de-garcia.webp",
    title: "Teide Sunrise & Stargazing",
    island: "Tenerife",
    price: 49,
    offerPrice: undefined,
    rating: 4.9,
    badges: ["Free cancel", "Small group"],
    href: "/experiences/teide-sunrise",
    widthClass: "min-w-[280px] max-w-[320px] w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  {
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
    title: "Famara Surf Lesson",
    island: "Lanzarote",
    price: 39,
    offerPrice: 29,
    rating: 4.8,
    badges: ["Top rated", "All gear"],
    href: "/experiences/famara-surf",
    widthClass: "min-w-[280px] max-w-[320px] w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  {
    img: "https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=800&auto=format&fit=crop",
    title: "La Gomera Rainforest Hike",
    island: "La Gomera",
    price: 59,
    offerPrice: undefined,
    rating: 4.7,
    badges: ["Nature", "Guided tour"],
    href: "/experiences/la-gomera-hike",
    widthClass: "min-w-[280px] max-w-[320px] w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  {
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    title: "Gran Canaria Dolphin Cruise",
    island: "Gran Canaria",
    price: 45,
    offerPrice: 35,
    rating: 4.6,
    badges: ["Family friendly", "Snacks included"],
    href: "/experiences/gran-canaria-boat",
    widthClass: "min-w-[280px] max-w-[320px] w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
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
          <li key={item.title} className="flex">
            <ExperienceCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
