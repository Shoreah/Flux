"use client";

import { useRef, useEffect } from "react";

const COLUMNS = [
  {
    title: "Discover",
    links: ["Movies", "TV Shows", "Anime", "Documentaries", "Short Films"],
  },
  {
    title: "Browse",
    links: ["Trending", "New Releases", "Top Rated", "Coming Soon", "Genres"],
  },
  {
    title: "Community",
    links: ["Watchlist", "Reviews", "Ratings", "Lists", "Forum"],
  },
  {
    title: "About",
    links: ["About Flux", "Contact", "Press", "Privacy", "Terms"],
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const textRef = useRef(null);
  const currentWeight = useRef(100);
  const targetWeight = useRef(100);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      const diff = targetWeight.current - currentWeight.current;
      if (Math.abs(diff) > 0.5) {
        currentWeight.current += diff * 0.08;
        if (textRef.current) {
          textRef.current.style.fontVariationSettings = `'wght' ${currentWeight.current}`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const rect = footerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const progress = Math.min(Math.max(y / rect.height, 0), 1);
    targetWeight.current = 100 + progress * 800;
  };

  const handleMouseLeave = () => {
    targetWeight.current = 100;
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#111111] w-full overflow-hidden"
    >
      <div className="px-6 sm:px-10 pt-10 sm:pt-14 pb-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 lg:gap-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-3">
          <span className="text-white font-bold text-2xl tracking-tight">
            Flux
          </span>
          <p className="text-gray-500 text-xs leading-relaxed mt-1">
            Your home for cinema.
          </p>
          <a
            href="mailto:hello@flux.com"
            className="text-[#C026D3] text-xs font-medium hover:underline mt-2"
          >
            hello@flux.com
          </a>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              {col.title}
            </p>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link}>
                  <button className="text-gray-400 text-sm hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer p-0">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 sm:col-span-3 lg:col-span-1 border-l border-white/10 pl-6">
          <p className="text-gray-400 text-xs leading-relaxed italic">
            Flux is built for film lovers. Every title, every genre, every mood
            — curated and updated weekly so there's always something worth
            watching.
          </p>
          <div className="flex flex-col gap-2 mt-6">
            {["Instagram", "Twitter", "Letterboxd", "LinkedIn"].map((link) => (
              <a
                key={link}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xs font-medium hover:text-[#C026D3] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-6 sm:mx-10 border-t border-white/5" />

      <div className="px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-gray-600 text-xs">
          © 2026 Flux. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Use", "Cookies"].map((item) => (
            <button
              key={item}
              className="text-gray-600 text-xs hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex w-full overflow-hidden justify-center">
        <p
          ref={textRef}
          style={{
            fontVariationSettings: "'wght' 900",
            fontSize: "clamp(160px, 28vw, 420px)",
            fontFamily: "Inter, sans-serif",
            color: "white",
            lineHeight: 0.85,
            marginBottom: "-0.15em",
            letterSpacing: "0.05em",
          }}
          className="select-none leading-none text-center"
        >
          Flux
        </p>
      </div>
    </footer>
  );
}
