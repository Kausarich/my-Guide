"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Promo() {
  const [visible, setVisible] = useState(false);
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

  return (
    <section className="promo-section" ref={ref}>
      <div
        className={`promo-card ${visible ? "animate-fade-in-up" : ""}`}
        style={{ opacity: visible ? undefined : 0 }}
      >
        <div className="promo-image">
          <Image
            src="/images/promo-beach.jpg"
            alt="Traveler enjoying tropical beach"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
          <div className="promo-badge">
            <div className="promo-badge-value">20% OFF</div>
            <div className="promo-badge-label">Till 30 September, 2026</div>
          </div>
        </div>
        <div className="promo-content">
          <div
            className={`promo-eyebrow ${
              visible ? "animate-fade-in-right delay-200" : ""
            }`}
            style={{ opacity: visible ? undefined : 0 }}
          >
            Limited Time Offer
          </div>
          <h2
            className={`promo-title ${
              visible ? "animate-fade-in-right delay-300" : ""
            }`}
            style={{ opacity: visible ? undefined : 0 }}
          >
            UNLEASH WANDERLUST WITH MYGUIDE
          </h2>
          <p
            className={`promo-text ${
              visible ? "animate-fade-in-right delay-400" : ""
            }`}
            style={{ opacity: visible ? undefined : 0 }}
          >
            Travelling is a wonderful way to explore new places, learn about
            different cultures, and gain unique experiences. Let us be your
            guide to the world&apos;s most breathtaking destinations.
          </p>
          <a
            href="#"
            className={`hero-btn-primary ${
              visible ? "animate-fade-in-right delay-500" : ""
            }`}
            style={{
              width: "fit-content",
              opacity: visible ? undefined : 0,
            }}
          >
            Explore Now
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
