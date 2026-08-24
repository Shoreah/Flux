"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getImageUrl } from "../lib/tmdb.js";

export default function TopRated({ movies }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row mx-auto mb-18 px-4 sm:px-6 lg:px-10 pb-10 pt-6 gap-6">
        <div className="bg-[#1f1f1f] h-[280px] lg:h-auto lg:w-[590px] w-full rounded-xl animate-pulse border border-white/5" />
        <div className="w-full lg:w-[600px] flex flex-col gap-6">
          <div className="bg-[#1f1f1f] h-[280px] rounded-xl animate-pulse border border-white/5" />
          <div className="bg-[#1f1f1f] h-[280px] rounded-xl animate-pulse border border-white/5" />
        </div>
      </div>
    );
  }

  const [main, second, third] = movies.slice(0, 3);

  const goToDetails = (movie) => {
    router.push(`/details/movie/${movie.id}`);
  };

  return (
    <div className="flex flex-col justify-center lg:flex-row mx-auto mb-18 px-4 sm:px-6 lg:px-10 pb-10 pt-6 gap-6">
      <div
        onClick={() => goToDetails(main)}
        className="bg-[#1f1f1f] w-full lg:w-[590px] rounded-xl p-5 hover:shadow-[0_0_30px_rgba(192,38,211,0.15)] cursor-pointer transition duration-300 border border-white/5 flex flex-col gap-4"
      >
        <div className="w-full shrink-0">
          <motion.img
            layoutId={mounted ? `poster-movie-${main.id}` : undefined}
            src={getImageUrl(main.backdrop_path, "w1280")}
            alt={main.title}
            className="w-full h-[200px] sm:h-[260px] lg:h-[350px] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 w-full">
          <span className="text-xs text-[#C026D3] font-bold tracking-widest uppercase">
            Audience Favourite
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
            Watch Now
          </button>
        </div>
      </div>

      <div className="w-full lg:w-[600px] flex flex-col gap-6 lg:self-stretch">
        <div
          onClick={() => goToDetails(second)}
          className="bg-[#1f1f1f] flex-1 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-[0_0_30px_rgba(192,38,211,0.15)] cursor-pointer transition duration-300 border border-white/5"
        >
          <div className="w-full sm:w-1/2 shrink-0 order-1 sm:order-2">
            <motion.img
              layoutId={mounted ? `poster-movie-${second.id}` : undefined}
              src={getImageUrl(second.backdrop_path, "w1280")}
              alt={second.title}
              className="h-40 sm:h-44 w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-1/2 min-w-0 order-2 sm:order-1">
            <span className="text-xs text-[#C026D3] font-bold tracking-widest uppercase">
              Award Season Picks
            </span>
            <h2 className="text-xl font-bold text-white">{second.title}</h2>
            <p className="text-sm text-gray-400 line-clamp-3">
              {second.overview}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToDetails(second);
              }}
              className="bg-[#C026D3] hover:bg-[#a21caf] hover:cursor-pointer rounded-full py-2 px-5 text-white text-sm font-bold transition duration-300 w-fit mt-1"
            >
              Explore
            </button>
          </div>
        </div>

        <div
          onClick={() => goToDetails(third)}
          className="bg-[#1f1f1f] flex-1 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-[0_0_30px_rgba(192,38,211,0.15)] cursor-pointer transition duration-300 border border-white/5"
        >
          <div className="w-full sm:w-1/2 shrink-0 order-1 sm:order-2">
            <motion.img
              layoutId={mounted ? `poster-movie-${third.id}` : undefined}
              src={getImageUrl(third.backdrop_path, "w1280")}
              alt={third.title}
              className="h-40 sm:h-44 w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-1/2 min-w-0 order-2 sm:order-1">
            <span className="text-xs text-[#C026D3] font-bold tracking-widest uppercase">
              Hidden Gems
            </span>
            <h2 className="text-xl font-bold text-white">{third.title}</h2>
            <p className="text-sm text-gray-400 line-clamp-3">
              {third.overview}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToDetails(third);
              }}
              className="bg-[#C026D3] hover:bg-[#a21caf] hover:cursor-pointer rounded-full py-2 px-5 text-white text-sm font-bold transition duration-300 w-fit mt-1"
            >
              Discover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
