"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DestinationData {
  id: string;
  name: string;
  address: string;
  rating: number;
  photoUrl: string;
}

const STATIC_DESTINATIONS: DestinationData[] = [
  {
    id: "1",
    name: "Tanah Lot Temple",
    address: "Bali, Indonesia",
    rating: 4.6,
    photoUrl: "/images/destination-bali.jpg",
  },
  {
    id: "2",
    name: "Raja Ampat Islands",
    address: "Papua, Indonesia",
    rating: 4.9,
    photoUrl: "/images/destination-raja-ampat.jpg",
  },
  {
    id: "3",
    name: "Komodo National Park",
    address: "NTT, Indonesia",
    rating: 4.7,
    photoUrl: "/images/destination-komodo.jpg",
  },
];

export default function PopularDestinations() {
  const [visible, setVisible] = useState(false);
  const [destinations] = useState<DestinationData[]>(STATIC_DESTINATIONS);
  const [activeSlide, setActiveSlide] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : destinations.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < destinations.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="destinations" className="section" ref={ref}>
      <div className="section-header">
        <div className="section-header-top">
          <div>
            <h2
              className={`section-title ${
                visible ? "animate-fade-in-left" : ""
              }`}
            >
              Popular Destination
            </h2>
            <p
              className={`section-subtitle ${
                visible ? "animate-fade-in-left delay-200" : ""
              }`}
              style={{ opacity: visible ? undefined : 0 }}
            >
              Unleash Your Wanderlust With myGuide
            </p>
          </div>
          <div className="section-nav">
            <button onClick={handlePrev} aria-label="Previous destinations">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="active"
              aria-label="Next destinations"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="destinations-grid">
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
            className={`destination-card ${
              visible ? "animate-fade-in-up" : ""
            }`}
            style={{
              animationDelay: `${0.2 + index * 0.15}s`,
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="destination-card-image">
              <Image
                src={dest.photoUrl}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="destination-card-overlay" />
            <div className="destination-card-content">
              <h3 className="destination-card-title">{dest.name}</h3>
              <div className="destination-card-location">
                <svg
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
            </div>
            <div className="destination-card-rating">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              {dest.rating}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
