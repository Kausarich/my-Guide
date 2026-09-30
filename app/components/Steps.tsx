"use client";

import { useEffect, useRef, useState } from "react";

export default function Steps() {
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

  const steps = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      ),
      title: "Find Your Destination",
      description:
        "Browse through our curated list of top travel destinations scraped directly from Google Maps.",
      featured: false,
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9z" />
          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M12 14h.01" />
        </svg>
      ),
      title: "Book A Ticket",
      description:
        "Travelling is a wonderful way to explore new places, learn about different cultures and experiences.",
      featured: true,
      cta: "LEARN MORE",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
      title: "Pay & Start Journey",
      description:
        "Secure payment options and instant booking confirmation. Your adventure starts here.",
      featured: false,
    },
  ];

  return (
    <section id="how-it-works" className="steps-section" ref={ref}>
      <div className="section">
        <div className="steps-header">
          <h2
            className={`section-title ${
              visible ? "animate-fade-in-up" : ""
            }`}
          >
            Journey To The Skies Made Simple!
          </h2>
          <p
            className={`section-subtitle ${
              visible ? "animate-fade-in-up delay-200" : ""
            }`}
            style={{ opacity: visible ? undefined : 0 }}
          >
            Travelling is a wonderful way to explore new places, learn about
            different cultures, and gain unique experiences.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-card ${step.featured ? "featured" : ""} ${
                visible ? "animate-fade-in-up" : ""
              }`}
              style={{
                animationDelay: `${0.3 + index * 0.15}s`,
                opacity: visible ? undefined : 0,
              }}
            >
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {step.cta && (
                <button className="step-learn-more">
                  {step.cta}
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
