"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Destination {
  id: string;
  name: string;
  address: string;
  rating: number;
  userRatingsTotal: number;
  types: string[];
  photoUrl: string;
  isOpen: boolean | null;
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line short" />
        <div className="skeleton skeleton-line shorter" />
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          style={{
            opacity: star <= Math.round(rating) ? 1 : 0.25,
          }}
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function getTypeLabel(types: string[]): string {
  const typeMap: Record<string, string> = {
    tourist_attraction: "Tourist Attraction",
    natural_feature: "Nature",
    place_of_worship: "Temple",
    national_park: "National Park",
    museum: "Museum",
    restaurant: "Restaurant",
    lodging: "Hotel",
    park: "Park",
  };
  for (const t of types) {
    if (typeMap[t]) return typeMap[t];
  }
  return "Destination";
}

export default function GmapsDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>("loading");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/destinations?q=top+travel+destinations+Indonesia");
      const data = await res.json();
      setDestinations(data.destinations || []);
      setSource(data.source || "curated");
    } catch (err) {
      console.error("Failed to fetch destinations:", err);
      setSource("error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="explore" className="gmaps-section" ref={ref}>
      <div className="section" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="section-header">
          <div className="section-header-top">
            <div>
              <h2
                className={`section-title ${
                  visible ? "animate-fade-in-left" : ""
                }`}
              >
                Explore From Google Maps
              </h2>
              <p
                className={`section-subtitle ${
                  visible ? "animate-fade-in-left delay-200" : ""
                }`}
                style={{ opacity: visible ? undefined : 0 }}
              >
                Real destination data scraped from Google Maps — ratings,
                reviews, and live status.
                {source !== "loading" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      marginLeft: 8,
                      fontSize: "0.75rem",
                      padding: "2px 8px",
                      borderRadius: 999,
                      background:
                        source === "google_places" ? "#dcfce7" : "#e0f2fe",
                      color:
                        source === "google_places" ? "#16a34a" : "#0284c7",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background:
                          source === "google_places" ? "#16a34a" : "#0284c7",
                      }}
                    />
                    {source === "google_places" ? "Live API" : "Curated Data"}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="gmaps-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : destinations.map((dest, index) => (
                <div
                  key={dest.id}
                  className={`gmaps-card ${
                    visible ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: `${0.1 + index * 0.1}s`,
                    opacity: visible ? undefined : 0,
                  }}
                >
                  <div className="gmaps-card-image">
                    <Image
                      src={dest.photoUrl}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="gmaps-card-type">
                      {getTypeLabel(dest.types)}
                    </span>
                  </div>
                  <div className="gmaps-card-body">
                    <h3 className="gmaps-card-name">{dest.name}</h3>
                    <div className="gmaps-card-address">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {dest.address}
                    </div>
                    <div className="gmaps-card-meta">
                      <div className="gmaps-card-rating">
                        <StarRating rating={dest.rating} />
                        <span>{dest.rating}</span>
                        <span className="gmaps-card-reviews">
                          ({dest.userRatingsTotal.toLocaleString()})
                        </span>
                      </div>
                      {dest.isOpen !== null && (
                        <span
                          className={`gmaps-card-status ${
                            dest.isOpen ? "open" : "closed"
                          }`}
                        >
                          {dest.isOpen ? "Open" : "Closed"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
