// TrendingPlaces.tsx
import { PlaceCard } from "./PlaceCard";

type Place = {
  img: string;
  title: string;
  island: string;
  duration: number; // minutes
  rating: number; // 0..5
  mood:
    | "family"
    | "adventure"
    | "nature"
    | "romantic"
    | "chill"
    | "relax"
    | string;
  group: Array<"family" | "friends" | "solo" | "couples" | string>;
  badges: string[];
  href: string;
  featured: boolean;
};

const PLACES: Place[] = [
  {
    img: "https://www.volcanoteide.com/source/roques-de-garcia.webp",
    title: "Teide National Park Volcano Trails",
    island: "Tenerife",
    duration: 360, // ~6h
    rating: 4.9,
    mood: "adventure",
    group: ["family", "friends", "solo"],
    badges: ["Iconic", "Stargazing"],
    href: "/places/teide-national-park",
    featured: true,
  },
  {
    img: "https://live.staticflickr.com/1275/1251152959_98054e7e7c_c.jpg",
    title: "Playa de Famara Surf and Beach Escape",
    island: "Lanzarote",
    duration: 480, // full beach day
    rating: 4.8,
    mood: "chill",
    group: ["friends", "solo", "couples"],
    badges: ["Surf town", "Scenic cliffs"],
    href: "/places/famara-beach",
    featured: false,
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/La_gomera_%28344678704%29.jpg",
    title: "Garajonay National Park Rainforest Walks",
    island: "La Gomera",
    duration: 240, // ~4h
    rating: 4.7,
    mood: "nature",
    group: ["family", "friends"],
    badges: ["Rainforest", "UNESCO"],
    href: "/places/garajonay-national-park",
    featured: true,
  },
  {
    img: "https://images.musement.com/cover/0171/19/thumb_17018734_cover_header.jpg?w=1200&h=630&q=95&fit=crop",
    title: "Puerto Rico Marina and Coastal Promenade",
    island: "Gran Canaria",
    duration: 120, // ~2h
    rating: 4.6,
    mood: "relax",
    group: ["couples", "family"],
    badges: ["Boats", "Coastal vibes"],
    href: "/places/puerto-rico-marina",
    featured: false,
  },
  {
    img: "https://i2.pickpik.com/photos/932/214/476/away-volcano-canary-islands-la-palma-preview.jpg",
    title: "Roque de los Muchachos Sky Observatory",
    island: "La Palma",
    duration: 90, // ~1.5h
    rating: 4.9,
    mood: "romantic",
    group: ["couples", "friends", "solo"],
    badges: ["Observatory", "Above the clouds"],
    href: "/places/roque-de-los-muchachos",
    featured: false,
  },
  {
    img: "https://dunebuggy.es/wp-content/uploads/2022/02/ADRENALINE-STOP.jpg",
    title: "Parque Natural de Corralejo Sand Dunes",
    island: "Fuerteventura",
    duration: 180, // ~3h
    rating: 4.5,
    mood: "adventure",
    group: ["friends", "family"],
    badges: ["Sand dunes", "Photo spots"],
    href: "/places/corralejo-dunes",
    featured: true,
  },
  {
    img: "https://d2p1cf6997m1ir.cloudfront.net/media/thumbnails/a0/db/a0dbcdfa61296c66fb3c6230bb32bba6.webp",
    title: "La Restinga Marine Reserve Diving Experience",
    island: "El Hierro",
    duration: 300, // ~5h
    rating: 4.8,
    mood: "nature",
    group: ["solo", "friends"],
    badges: ["Diving", "Marine life"],
    href: "/places/la-restinga-marine-reserve",
    featured: false,
  },
  {
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b0/c7/13/face-your-fears-and-ride.jpg?w=1200&h=1200&s=1",
    title: "Siam Park Tenerife Water Kingdom",
    island: "Tenerife",
    duration: 480, // full day
    rating: 4.7,
    mood: "family",
    group: ["family", "friends"],
    badges: ["Water park", "Top rated"],
    href: "/places/siam-park",
    featured: true,
  },
];

export default function TrendingPlaces() {
  return (
    <section
      aria-labelledby="trending-places-title"
      className="mx-auto max-w-7xl px-5 py-8"
    >
      <div className="flex items-end justify-between gap-4">
        <h2
          id="trending-places-title"
          className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Trending Places
        </h2>
        <p className="text-sm text-gray-600 hidden sm:block dark:text-gray-300">
          Handpicked spots across the Canary Islands
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {PLACES.map((item) => (
          <PlaceCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
