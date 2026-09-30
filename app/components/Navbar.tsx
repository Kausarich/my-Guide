"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#" className="navbar-logo">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
          <path
            d="M10 20C12 14 16 8 22 12C18 16 14 22 10 20Z"
            fill="currentColor"
            opacity="0.8"
          />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
        myGuide
      </a>

      <ul className={`navbar-links ${mobileOpen ? "open" : ""}`}>
        <li>
          <a href="#destinations" onClick={() => setMobileOpen(false)}>
            Destinations
          </a>
        </li>
        <li>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>
            How It Works
          </a>
        </li>
        <li>
          <a href="#explore" onClick={() => setMobileOpen(false)}>
            Explore
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="navbar-cta">
            Book Trip
          </a>
        </li>
      </ul>

      <button
        className="navbar-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
