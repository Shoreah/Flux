"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const CARD_HEIGHT = 420;
const GAP = 8;
const SPEED = 34;

function getScale() {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w < 400) return 0.4;
  if (w < 640) return 0.48;
  if (w < 1024) return 0.78;
  return 1;
}

export default function TrendingMarquee({ movies }) {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const hoverPauseRef = useRef(false);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);
  const router = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setScale(getScale());
  }, []);

  useEffect(() => {
    const handleResize = () => setScale(getScale());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardHeight = Math.round(CARD_HEIGHT * scale);
  const gap = Math.round(GAP * scale);
  const speed = SPEED * scale;

  const scaledWidth = (baseWidth) => Math.round(baseWidth * scale);

  const periodWidth =
    movies.slice(0, 6).reduce((sum, t) => sum + scaledWidth(t.baseWidth), 0) +
    gap * movies.slice(0, 6).length;

  const loopItems = [...movies, ...movies];

  useEffect(() => {
    if (movies.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      pausedRef.current = true;
      setIsPaused(true);
    }

    const tick = (time) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current && !hoverPauseRef.current) {
        offsetRef.current += speed * dt;
        if (offsetRef.current >= periodWidth) {
          offsetRef.current -= periodWidth;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [movies, periodWidth, speed]);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setIsPaused(pausedRef.current);
    lastTimeRef.current = null;
  };

  const goToDetails = (id) => {
    router.push(`/details/movie/${id}`);
  };

  const goToTrending = () => {
    router.push("/trending");
  };

  return (
    <div className="w-full mb-20 bg-[#141414]">
      <div className="pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Popular This Week
        </h2>
        <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base md:text-lg">
          Hand-picked across every genre, from action to art-house
        </p>
      </div>

      {movies.length === 0 ? (
        <div
          className="w-full bg-[#1f1f1f] animate-pulse rounded-xl mx-4 sm:mx-6"
          style={{ height: cardHeight }}
        />
      ) : (
        <div className="w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{ gap, willChange: "transform" }}
          >
            {loopItems.map((item, i) => {
              const cardKey = `${item.id}-${i}`;
              const isHovered = hoveredKey === cardKey;
              const width = scaledWidth(item.baseWidth);
              const isFirstPass = i < movies.length;

              return (
                <div
                  key={cardKey}
                  onClick={() => goToDetails(item.id)}
                  className="relative flex-shrink-0 overflow-hidden rounded-xl cursor-pointer"
                  style={{ width, height: cardHeight }}
                  onMouseEnter={() => {
                    setHoveredKey(cardKey);
                    hoverPauseRef.current = true;
                  }}
                  onMouseLeave={() =>
                    setHoveredKey((c) => {
                      if (c === cardKey) {
                        hoverPauseRef.current = false;
                        return null;
                      }
                      return c;
                    })
                  }
                >
                  <motion.img
                    layoutId={
                      mounted && isFirstPass
                        ? `poster-movie-${item.id}`
                        : undefined
                    }
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover select-none"
                  />

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-opacity duration-200"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.65)",
                      opacity: isHovered ? 1 : 0,
                      pointerEvents: isHovered ? "auto" : "none",
                    }}
                  >
                    <p className="text-white font-bold text-sm sm:text-lg text-center px-3 sm:px-4">
                      {item.title}
                    </p>
                    {item.rating && (
                      <p className="text-[#C026D3] text-xs sm:text-sm font-semibold">
                        ★ {item.rating}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetails(item.id);
                      }}
                      onFocus={() => {
                        setHoveredKey(cardKey);
                        hoverPauseRef.current = true;
                      }}
                      onBlur={() =>
                        setHoveredKey((c) => {
                          if (c === cardKey) {
                            hoverPauseRef.current = false;
                            return null;
                          }
                          return c;
                        })
                      }
                      className="bg-[#C026D3] hover:bg-[#a21caf] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors"
                    >
                      Watch Now
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetails(item.id);
                      }}
                      className="text-gray-300 text-xs sm:text-sm font-medium underline-offset-4 hover:underline hover:text-white transition-colors"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative flex items-center justify-center px-4 sm:px-6 md:px-10 py-6 sm:py-8">
        <button
          type="button"
          onClick={goToTrending}
          className="cursor-pointer bg-[#C026D3] hover:bg-[#a21caf] text-white text-xs sm:text-sm font-semibold px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-colors"
        >
          Browse All Movies
        </button>

        <button
          type="button"
          onClick={togglePause}
          aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}
          aria-pressed={isPaused}
          className="absolute right-3 sm:right-6 md:right-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full text-white bg-[#2a2a2a] hover:bg-[#C026D3]/30 border border-white/10 hover:border-[#C026D3] transition-all duration-200"
        >
          {isPaused ? (
            <Play size={16} className="sm:hidden" />
          ) : (
            <Pause size={16} className="sm:hidden" />
          )}
          {isPaused ? (
            <Play size={18} className="hidden sm:block" />
          ) : (
            <Pause size={18} className="hidden sm:block" />
          )}
        </button>
      </div>
    </div>
  );
}
