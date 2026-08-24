"use client";

import { useState, useEffect, useRef } from "react";

export default function VidGroupHeader() {
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
        className={`text-[clamp(2rem,4vw,2.5rem)] leading-tight font-semibold my-5 mx-4 md:mx-15 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Lights, camera, stream.
      </h1>
    </div>
  );
}
