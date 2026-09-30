import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "myGuide — Discover Amazing Travel Destinations",
  description:
    "Explore the world's most breathtaking travel destinations with real-time data from Google Maps. Find ratings, reviews, and book your next adventure with myGuide.",
  keywords: [
    "travel",
    "destinations",
    "Indonesia",
    "Bali",
    "Raja Ampat",
    "Komodo",
    "booking",
    "tourism",
  ],
  openGraph: {
    title: "myGuide — Discover Amazing Travel Destinations",
    description:
      "Explore breathtaking destinations with real-time Google Maps data.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
      </body>
    </html>
  );
}
