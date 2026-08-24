"use client";

import { useState, useEffect, useRef } from "react";

export default function FloatingHeader() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h1
        ref={ref}
        className={`my-4 px-4 text-center text-2xl font-semibold transition-all duration-700 ease-out sm:my-5 sm:text-3xl md:text-4xl lg:text-5xl ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        For the ones who finish the season in a weekend
      </h1>
    </div>
  );
}
