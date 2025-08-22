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
    widthClass: "w-full",
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
    widthClass: "w-full",
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
    widthClass: "w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  {
    img: "https://images.musement.com/cover/0171/19/thumb_17018734_cover_header.jpg?w=1200&h=630&q=95&fit=crop",
    title: "Gran Canaria Dolphin Cruise",
    island: "Gran Canaria",
    price: 45,
    offerPrice: 35,
    rating: 4.6,
    badges: ["Family friendly", "Snacks included"],
    href: "/experiences/gran-canaria-boat",
    widthClass: "w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  // Added 4 more
  {
    img: "https://i2.pickpik.com/photos/932/214/476/away-volcano-canary-islands-la-palma-preview.jpg",
    title: "La Palma Volcano & Stars",
    island: "La Palma",
    price: 69,
    offerPrice: 55,
    rating: 4.9,
    badges: ["Astro guide", "Transport"],
    href: "/experiences/la-palma-astro",
    widthClass: "w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  {
    img: "https://dunebuggy.es/wp-content/uploads/2022/02/ADRENALINE-STOP.jpg",
    title: "Fuerteventura Dune Buggy",
    island: "Fuerteventura",
    price: 79,
    offerPrice: undefined,
    rating: 4.5,
    badges: ["Off-road", "Photo stops"],
    href: "/experiences/fuerteventura-buggy",
    widthClass: "w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  {
    img: "https://d2p1cf6997m1ir.cloudfront.net/media/thumbnails/a0/db/a0dbcdfa61296c66fb3c6230bb32bba6.webp",
    title: "El Hierro La Restinga Dive",
    island: "El Hierro",
    price: 95,
    offerPrice: 85,
    rating: 4.8,
    badges: ["All levels", "Wetsuit included"],
    href: "/experiences/el-hierro-dive",
    widthClass: "w-full",
    imageHeightClass: "h-48",
    className: "",
    onClick: undefined,
  },
  {
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b0/c7/13/face-your-fears-and-ride.jpg?w=1200&h=1200&s=1",
    title: "Siam Park Day Pass",
    island: "Tenerife",
    price: 42,
    offerPrice: undefined,
    rating: 4.7,
    badges: ["Skip-the-line", "Water park"],
    href: "/experiences/siam-park",
    widthClass: "w-full",
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
      <div className="flex items-end justify-between gap-4">
        <h2
          id="trending-experiences-title"
          className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Trending Experiences
        </h2>
        <p className="text-sm text-gray-600 hidden sm:block dark:text-gray-300">
          Handpicked adventures across the Canary Islands
        </p>
      </div>

      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-stretch"
      >
        {TRENDING.map((item) => (
          <li key={item.title} className="flex">
            {/* Ensure cards fill the grid cell nicely */}
            <ExperienceCard {...item} widthClass="w-full" className="h-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
