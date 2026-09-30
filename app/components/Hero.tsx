"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-content">
        <div
          className={`hero-image-wrapper ${
            isVisible ? "animate-scale-in" : ""
          }`}
        >
          <Image
            src="/images/hero-airplane.jpg"
            alt="Airplane flying over beautiful turquoise ocean"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="hero-overlay">
            <div
              className={`hero-badge ${
                isVisible ? "animate-fade-in-left delay-300" : ""
              }`}
            >
              <span className="hero-badge-dot" />
              ELEVATE YOUR TRAVEL JOURNEY
            </div>
            <h1
              className={`hero-title ${
                isVisible ? "animate-fade-in-left delay-400" : ""
              }`}
            >
              Experience The Magic Of Flight!
            </h1>
            <div
              className={`hero-actions ${
                isVisible ? "animate-fade-in-up delay-500" : ""
              }`}
            >
              <a href="#destinations" className="hero-btn-primary">
                Book a Trip Now
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
              <button className="hero-btn-play" aria-label="Watch video">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
            </div>
          </div>

          {/* Know More card */}
          <div
            className={`hero-know-more ${
              isVisible ? "animate-fade-in-right delay-600" : ""
            }`}
          >
            <div className="hero-know-more-top">
              <h4>Know More</h4>
              <span className="arrow">
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
                  <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
                </svg>
              </span>
            </div>
            <div className="hero-know-more-bottom">
              <div className="hero-avatars">
                {["🌍", "✈️", "🏖️"].map((emoji, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: `hsl(${210 + i * 30}, 80%, ${88 - i * 8}%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      marginLeft: i > 0 ? -8 : 0,
                      border: "2px solid white",
                      position: "relative",
                      zIndex: 3 - i,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="hero-know-more-text">
                <h5>Awesome Places</h5>
                <p>Discover the world, one adventure at a time!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
