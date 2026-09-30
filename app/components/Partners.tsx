"use client";

import { useEffect, useRef, useState } from "react";

export default function Partners() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const partners = [
    {
      name: "Airbnb",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.1 16.4c-.3.7-1.1 1.2-1.9 1.2-.5 0-.9-.2-1.3-.5-.5-.4-1.1-1.1-1.8-2.1-.9.5-1.6 1.1-2.1 1.9-.6 1-1.3 1.5-2.2 1.5-.4 0-.8-.1-1.2-.4-.7-.5-1-1.2-1-2.1 0-.4.1-.8.2-1.3.3-1.1 1-2.4 1.9-3.6-.3-1.1-.5-2.1-.5-2.9 0-1.1.3-2 1-2.5.3-.2.7-.3 1-.3 1 0 1.7.9 2.2 2.2.1.3.2.6.4 1 .6-.4 1.2-.7 1.9-.9.7-.2 1.3-.3 1.8-.3.8 0 1.4.3 1.8.8.3.5.4 1 .4 1.6 0 1.3-.7 2.5-2.1 3.5.5.9.9 1.6 1.2 2 .3.4.4.8.4 1.2 0 .4-.1.7-.2 1z" />
        </svg>
      ),
    },
    {
      name: "Booking.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M2 7h8v10H2V7zm10 0h10v10H12V7z" />
        </svg>
      ),
    },
    {
      name: "Trivago",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19 9l-7 3.5L5 9l7-4.5z" />
        </svg>
      ),
    },
    {
      name: "Expedia",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      name: "TripAdvisor",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <circle cx="8" cy="14" r="3" />
          <circle cx="16" cy="14" r="3" />
          <path d="M12 6C7 6 3 9 3 14h4c0-3 2-5 5-5s5 2 5 5h4c0-5-4-8-9-8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="partners" ref={ref}>
      <div className="partners-inner">
        <div className="partners-label">
          <div className="partners-label-dots">
            <span />
            <span />
            <span />
          </div>
          Follow
        </div>
        <div className="partners-logos">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`partner-logo ${
                visible ? "animate-fade-in-up" : ""
              }`}
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
                opacity: visible ? undefined : 0,
              }}
            >
              {partner.icon}
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
