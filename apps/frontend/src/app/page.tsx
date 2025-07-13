import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

// API Response types
interface Place {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  image_urls: string[];
}

interface ApiResponse {
  results: Place[];
  pagination: {
    page: string;
    limit: string;
  };
}

// Function to fetch places data
async function fetchPlaces(): Promise<ApiResponse> {
  try {
    const response = await fetch("http://localhost:8000/places/featured", {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching places:", error);
    // Return fallback data
    return {
      results: [],
      pagination: { page: "1", limit: "4" },
    };
  }
}

// Fallback images for places without images
const fallbackImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
];

export default async function Home() {
  const placesData = await fetchPlaces();

  return (
    <div className="min-h-screen">
      {/* Compact Hero Section */}
      <section className="py-12 md:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            Discover the{" "}
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Canary Islands
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore breathtaking landscapes, volcanic wonders, and pristine
            beaches across the magical islands of eternal spring.
          </p>
        </div>
      </section>

      {/* Featured Places Section */}
      <section className="pb-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
            Featured Destinations
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover the most spectacular places across the Canary Islands
          </p>
        </div>

        {placesData.results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {placesData.results.map((place, index) => (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={
                      place.image_urls[0] ||
                      fallbackImages[index % fallbackImages.length]
                    }
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-900 shadow-lg">
                    Featured
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-pink-300 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 mb-3 opacity-90 line-clamp-2">
                    {place.short_description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-gray-300">
                        Canary Islands
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-pink-400 group-hover:text-pink-300 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)] text-lg">
              No places found. Please check back later.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
