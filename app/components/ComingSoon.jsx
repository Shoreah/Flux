"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getImageUrl } from "../lib/tmdb.js";

export default function ComingSoon({ movies }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row mx-auto mb-18 px-10 pb-10 pt-6 gap-6">
        <div className="bg-[#1f1f1f] w-full h-[400px] rounded-xl animate-pulse border border-white/5" />
        <div className="bg-[#1f1f1f] w-full h-[400px] rounded-xl animate-pulse border border-white/5" />
      </div>
    );
  }

  const [main, second] = movies.slice(0, 2);

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const goToDetails = (movie) => {
    router.push(`/details/movie/${movie.id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row mx-auto mb-18 px-10 pb-10 pt-6 gap-6">
      <div
        onClick={() => goToDetails(main)}
        className="bg-[#1f1f1f] w-full lg:w-1/2 rounded-xl p-5 hover:shadow-[0_0_30px_rgba(192,38,211,0.15)] cursor-pointer transition duration-300 border border-white/5 flex flex-row lg:flex-col gap-4"
      >
        <div className="relative w-1/2 lg:w-full shrink-0">
          <motion.img
            layoutId={mounted ? `poster-movie-${main.id}` : undefined}
            src={getImageUrl(main.backdrop_path, "w1280")}
            alt={main.title}
            className="w-full h-full lg:h-[350px] object-cover rounded-lg"
          />
          {main.release_date && (
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
              🎬 {formatDate(main.release_date)}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center gap-2 w-1/2 lg:w-full">
          <span className="text-xs text-[#C026D3] font-bold tracking-widest uppercase">
            Coming This Month
          </span>
          <h2 className="text-xl lg:text-2xl font-semibold text-white">
            {main.title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-3">{main.overview}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetails(main);
            }}
            className="bg-[#C026D3] hover:bg-[#a21caf] hover:cursor-pointer rounded-full py-2 px-5 text-white text-sm font-semibold transition duration-300 w-fit mt-1"
          >
            See Full Schedule
          </button>
        </div>
      </div>

      <div
        onClick={() => goToDetails(second)}
        className="bg-[#1f1f1f] w-full lg:w-1/2 rounded-xl p-5 hover:shadow-[0_0_30px_rgba(192,38,211,0.15)] cursor-pointer transition duration-300 border border-white/5 flex flex-row lg:flex-col gap-4"
      >
        <div className="relative w-1/2 lg:w-full shrink-0">
          <motion.img
            layoutId={mounted ? `poster-movie-${second.id}` : undefined}
            src={getImageUrl(second.backdrop_path, "w1280")}
            alt={second.title}
            className="w-full h-full lg:h-[350px] object-cover rounded-lg"
          />
          {second.release_date && (
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
              🎬 {formatDate(second.release_date)}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center gap-2 w-1/2 lg:w-full">
          <span className="bg-[#C026D3]/20 border border-[#C026D3] text-[#C026D3] rounded-full w-fit px-3 py-0.5 text-xs font-bold tracking-wide">
            MOST ANTICIPATED
          </span>
          <h2 className="text-xl lg:text-2xl font-semibold text-white">
            {second.title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-3">
            {second.overview}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetails(second);
            }}
            className="bg-[#C026D3] hover:bg-[#a21caf] hover:cursor-pointer rounded-full py-2 px-5 text-white text-sm font-semibold transition duration-300 w-fit mt-1"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
