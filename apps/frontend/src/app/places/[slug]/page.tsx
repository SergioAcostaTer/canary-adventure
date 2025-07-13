import { ShareAndSaveButtons } from "@/components/shared/ShareAndSaveButtons";
import ImageGrid from "@/components/ui/ImageGrid";
import {
  Bookmark,
  Bus,
  Camera,
  Car,
  Clock,
  Coffee,
  ExternalLink,
  Eye,
  Flame,
  Globe,
  Heart,
  Info,
  MapPin,
  Mountain,
  Navigation,
  Phone,
  Plus,
  Shield,
  Star,
  Users,
} from "lucide-react";

// API Response type
interface PlaceApiResponse {
  id: string;
  slug: string;
  category_id: any;
  location: string;
  address: string;
  phone: string;
  website_url: string;
  email: any;
  price_level: string;
  average_rating: string;
  total_reviews: number;
  opening_hours: any;
  accessibility_features: any;
  amenities: string[];
  tags: string[];
  emotion_tags: string[];
  image_urls: string[];
  is_featured: boolean;
  is_active: boolean;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  longitude: number;
  latitude: number;
  name: string;
  description: string;
  short_description: string;
  tips: string;
}

// Enhanced amenity icon mapping
const amenityIcons: Record<string, any> = {
  visitor_center: Info,
  guided_tours: Users,
  bus_tours: Bus,
  restaurant: Coffee,
  parking: Car,
  hiking_trails: Mountain,
  cable_car: Navigation,
  wifi: Globe,
  kitchen: Coffee,
  ocean_view: Eye,
  mountain_view: Mountain,
  photo_spot: Camera,
};

// Access information based on price level
const getAccessInfo = (priceLevel: string) => {
  switch (priceLevel) {
    case "low":
      return {
        access: "Free Access",
        type: "Open to public",
        badge: "FREE",
      };
    case "medium":
      return {
        access: "Entry Fee Required",
        type: "Paid attraction",
        badge: "PAID",
      };
    case "high":
      return {
        access: "Premium Experience",
        type: "Exclusive access",
        badge: "PREMIUM",
      };
    default:
      return {
        access: "Free Access",
        type: "Open to public",
        badge: "FREE",
      };
  }
};

// Tag icon mapping
const tagIcons: Record<string, any> = {
  national_park: Shield,
  volcanic: Flame,
  geology: Mountain,
  tours: Users,
  unique_landscape: Eye,
};

// Generate Google Maps URL
const getGoogleMapsUrl = (
  latitude: number,
  longitude: number,
  placeName: string
) => {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${encodeURIComponent(
    placeName
  )}`;
};

// Format amenity name
const formatAmenityName = (amenity: string): string => {
  return amenity.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

// Format tag name
const formatTagName = (tag: string): string => {
  return tag.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

async function fetchPlaceData(slug: string): Promise<PlaceApiResponse> {
  try {
    const response = await fetch(`http://localhost:8000/places/slug/${slug}`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "es",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching place data:", error);
    throw error;
  }
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let placeData: PlaceApiResponse;

  try {
    placeData = await fetchPlaceData(slug);
  } catch (error) {
    console.error("Failed to fetch place data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Info className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Place not found
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            The place you're looking for doesn't exist or couldn't be loaded.
          </p>
        </div>
      </div>
    );
  }

  // Transform API data
  const accessInfo = getAccessInfo(placeData.price_level);
  const rating = parseFloat(placeData.average_rating);
  const googleMapsUrl = getGoogleMapsUrl(
    placeData.latitude,
    placeData.longitude,
    placeData.name
  );

  // Generate highlights from tags and emotion tags
  const highlights = [
    ...placeData.tags.map((tag) => ({
      text: formatTagName(tag),
      icon: tagIcons[tag] || Mountain,
    })),
    ...placeData.emotion_tags.map((tag) => ({
      text: `${tag.charAt(0).toUpperCase() + tag.slice(1)} experience`,
      icon: Heart,
    })),
  ].slice(0, 6);

  // Transform amenities with icons
  const amenitiesWithIcons = placeData.amenities.map((amenity) => ({
    icon: amenityIcons[amenity] || Info,
    label: formatAmenityName(amenity),
  }));

  // Fallback images for volcanic/natural places
  const fallbackImages = [
    "https://images.unsplash.com/photo-1580500550469-6c3bdb8e7b44?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-4 sm:py-6 lg:py-8">
          {/* Title and Actions */}
          <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
                  {placeData.name}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gray-900 text-gray-900 flex-shrink-0" />
                    <span className="font-semibold">{rating.toFixed(2)}</span>
                    <span className="text-gray-600 truncate">
                      ({placeData.total_reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  <span className="hidden sm:inline text-gray-400">•</span>

                  <div className="flex items-center gap-1 text-gray-600 min-w-0">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-900 transition-colors truncate"
                    >
                      {placeData.address}
                    </a>
                  </div>

                  {placeData.is_featured && (
                    <>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Actions - Hidden on mobile, shown on larger screens */}
              <div className="hidden lg:block">
                <ShareAndSaveButtons />
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="mb-8 sm:mb-12">
            <ImageGrid
              images={
                placeData.image_urls.length > 0
                  ? placeData.image_urls
                  : fallbackImages
              }
            />
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden mb-6">
            <ShareAndSaveButtons />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Place Overview */}
              <div className="pb-6 sm:pb-8 border-b border-gray-200">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                      {placeData.short_description}
                    </h2>
                    <p className="text-gray-600 text-sm break-words">
                      {placeData.tags.map(formatTagName).join(" • ")}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        accessInfo.badge === "FREE"
                          ? "bg-green-100 text-green-800"
                          : accessInfo.badge === "PAID"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {accessInfo.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pb-6 sm:pb-8 border-b border-gray-200">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  About this place
                </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                  {placeData.description}
                </p>

                {placeData.tips && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-amber-900 mb-2">
                          Important to know
                        </h4>
                        <p className="text-amber-800 text-sm sm:text-base">
                          {placeData.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* What makes it special */}
              <div className="pb-6 sm:pb-8 border-b border-gray-200">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  What makes this place special
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                        <highlight.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">
                        {highlight.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="pb-6 sm:pb-8 border-b border-gray-200">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  What this place offers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {amenitiesWithIcons.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2 sm:py-3"
                    >
                      <amenity.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              {(placeData.phone ||
                placeData.website_url ||
                placeData.email) && (
                <div className="pb-6 sm:pb-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                    Contact & Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <div className="space-y-4">
                      {placeData.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm sm:text-base">
                              Phone
                            </p>
                            <a
                              href={`tel:${placeData.phone}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base break-all"
                            >
                              {placeData.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      {placeData.website_url && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-gray-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm sm:text-base">
                              Website
                            </p>
                            <a
                              href={placeData.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base break-all"
                            >
                              Visit official website
                            </a>
                          </div>
                        </div>
                      )}
                      {placeData.email && (
                        <div className="flex items-center gap-3">
                          <Info className="w-5 h-5 text-gray-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm sm:text-base">
                              Email
                            </p>
                            <a
                              href={`mailto:${placeData.email}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base break-all"
                            >
                              {placeData.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Information Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 sm:top-6 lg:top-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xl">
                  {/* Access Type */}
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-base sm:text-lg font-semibold text-gray-900">
                        {accessInfo.access}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {accessInfo.type}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <Star className="w-5 h-5 fill-gray-900 text-gray-900" />
                    <span className="font-semibold text-gray-900">
                      {rating.toFixed(2)}
                    </span>
                    <span className="text-gray-600 text-sm truncate">
                      ({placeData.total_reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Quick Info Cards */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Location
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 truncate">
                          {placeData.address.split(",")[0]}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Eye className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Experience
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 truncate">
                          {placeData.emotion_tags.slice(0, 2).join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Visit Type
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          {placeData.amenities.includes("guided_tours")
                            ? "Guided tours available"
                            : "Self-guided exploration"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg block text-center"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">
                          Get Directions
                        </span>
                      </div>
                    </a>

                    {placeData.website_url && (
                      <a
                        href={placeData.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border-2 border-blue-200 hover:border-blue-300 text-blue-700 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 hover:shadow-md block text-center"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-sm sm:text-base">
                            Official Info
                          </span>
                        </div>
                      </a>
                    )}

                    <button className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">
                          Add to Itinerary
                        </span>
                      </div>
                    </button>

                    <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 sm:px-6 rounded-xl transition-all duration-200">
                      <div className="flex items-center justify-center gap-2">
                        <Bookmark className="w-4 h-4" />
                        <span className="text-sm sm:text-base">
                          Save for Later
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        Updated:{" "}
                        {new Date(placeData.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
