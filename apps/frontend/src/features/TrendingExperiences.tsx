"use client";

import { ExperienceCard } from "@/components/ui/experience";

const TRENDING = [
  {
    img: "https://www.volcanoteide.com/source/roques-de-garcia.webp",
    title: "Teide Sunrise & Stargazing",
    island: "Tenerife",
    price: null,
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
    img: "https://live.staticflickr.com/1275/1251152959_98054e7e7c_c.jpg",
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
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/La_gomera_%28344678704%29.jpg",
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
    img: "https://live.staticflickr.com/8343/8190490359_59b47c957d_b.jpg",
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
