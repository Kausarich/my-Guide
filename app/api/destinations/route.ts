import { NextResponse } from "next/server";

// Type definitions for destination data
export interface Destination {
  id: string;
  name: string;
  address: string;
  rating: number;
  userRatingsTotal: number;
  types: string[];
  photoUrl: string;
  placeId: string;
  isOpen: boolean | null;
  lat: number;
  lng: number;
}

// Curated fallback destinations — real Indonesian travel destinations
const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Tanah Lot Temple",
    address: "Beraban, Kediri, Tabanan, Bali",
    rating: 4.6,
    userRatingsTotal: 48231,
    types: ["tourist_attraction", "place_of_worship"],
    photoUrl: "/images/destination-bali.jpg",
    placeId: "ChIJL0kVZGFG0i0R2JdW4hNUsSk",
    isOpen: true,
    lat: -8.6212,
    lng: 115.0868,
  },
  {
    id: "2",
    name: "Raja Ampat Islands",
    address: "Raja Ampat, Southwest Papua",
    rating: 4.9,
    userRatingsTotal: 12450,
    types: ["tourist_attraction", "natural_feature"],
    photoUrl: "/images/destination-raja-ampat.jpg",
    placeId: "ChIJt7IzRxNYMy4RuJ2ZXFMwBNw",
    isOpen: true,
    lat: -0.2334,
    lng: 130.5165,
  },
  {
    id: "3",
    name: "Komodo National Park",
    address: "Komodo, Manggarai Barat, NTT",
    rating: 4.7,
    userRatingsTotal: 22890,
    types: ["tourist_attraction", "national_park"],
    photoUrl: "/images/destination-komodo.jpg",
    placeId: "ChIJrURGphtxRy4RdF2d7VwHHWg",
    isOpen: true,
    lat: -8.5500,
    lng: 119.4892,
  },
  {
    id: "4",
    name: "Borobudur Temple",
    address: "Borobudur, Magelang, Central Java",
    rating: 4.6,
    userRatingsTotal: 52100,
    types: ["tourist_attraction", "place_of_worship"],
    photoUrl: "/images/destination-bali.jpg",
    placeId: "ChIJn-oSOOgvei4RCuEU_sDXOyw",
    isOpen: true,
    lat: -7.6079,
    lng: 110.2038,
  },
  {
    id: "5",
    name: "Lake Toba",
    address: "Toba Samosir, North Sumatra",
    rating: 4.7,
    userRatingsTotal: 18900,
    types: ["tourist_attraction", "natural_feature"],
    photoUrl: "/images/destination-raja-ampat.jpg",
    placeId: "ChIJjyxcqFILITARE3glmLsUEaY",
    isOpen: true,
    lat: 2.6845,
    lng: 98.8588,
  },
  {
    id: "6",
    name: "Nusa Penida",
    address: "Nusa Penida, Klungkung, Bali",
    rating: 4.8,
    userRatingsTotal: 31200,
    types: ["tourist_attraction", "natural_feature"],
    photoUrl: "/images/destination-komodo.jpg",
    placeId: "ChIJx3f4zCBI0S0RwCvrA2ORJNU",
    isOpen: true,
    lat: -8.7275,
    lng: 115.5444,
  },
];

/**
 * Fetches travel destinations from Google Places API.
 * Falls back to curated data when API key is not configured.
 */
async function fetchFromGooglePlaces(
  query: string
): Promise<Destination[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.log(
      "GOOGLE_MAPS_API_KEY not set — using curated fallback destinations"
    );
    return FALLBACK_DESTINATIONS;
  }

  try {
    // Use Google Places Text Search API
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&type=tourist_attraction&key=${apiKey}`;

    const response = await fetch(searchUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK" || !data.results?.length) {
      console.warn("Google Places returned no results, using fallback");
      return FALLBACK_DESTINATIONS;
    }

    const destinations: Destination[] = data.results
      .slice(0, 6)
      .map(
        (
          place: {
            place_id: string;
            name: string;
            formatted_address: string;
            rating: number;
            user_ratings_total: number;
            types: string[];
            photos?: { photo_reference: string }[];
            opening_hours?: { open_now: boolean };
            geometry: { location: { lat: number; lng: number } };
          },
          index: number
        ) => {
          // Build photo URL from photo reference
          let photoUrl = FALLBACK_DESTINATIONS[index % FALLBACK_DESTINATIONS.length].photoUrl;
          if (place.photos?.[0]?.photo_reference) {
            photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}`;
          }

          return {
            id: place.place_id,
            name: place.name,
            address: place.formatted_address,
            rating: place.rating || 4.5,
            userRatingsTotal: place.user_ratings_total || 0,
            types: place.types || [],
            photoUrl,
            placeId: place.place_id,
            isOpen: place.opening_hours?.open_now ?? null,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          };
        }
      );

    return destinations;
  } catch (error) {
    console.error("Google Places fetch failed:", error);
    return FALLBACK_DESTINATIONS;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query =
    searchParams.get("q") || "top travel destinations Indonesia";

  try {
    const destinations = await fetchFromGooglePlaces(query);

    return NextResponse.json(
      {
        success: true,
        source: process.env.GOOGLE_MAPS_API_KEY ? "google_places" : "curated",
        count: destinations.length,
        destinations,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch destinations",
        destinations: FALLBACK_DESTINATIONS,
      },
      { status: 500 }
    );
  }
}
