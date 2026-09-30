"use client";

import { useEffect, useRef, useState } from "react";

interface StatItemData {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedStat({
  value,
  suffix,
  label,
  visible,
  delay,
}: StatItemData & { visible: boolean; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = value / steps;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [visible, value, delay]);

  return (
    <div className="stat-item">
      <div className="stat-value">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
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

  const stats: StatItemData[] = [
    { value: 500, suffix: "+", label: "Destinations" },
    { value: 120, suffix: "K+", label: "Happy Travelers" },
    { value: 98, suffix: "%", label: "Satisfaction Rate" },
    { value: 24, suffix: "/7", label: "Customer Support" },
  ];

  return (
    <div className="stats-row" ref={ref}>
      {stats.map((stat, index) => (
        <AnimatedStat
          key={index}
          {...stat}
          visible={visible}
          delay={index * 200}
        />
      ))}
    </div>
  );
}
