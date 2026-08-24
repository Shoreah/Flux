"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { getImageUrl } from "../lib/tmdb.js";
import DetailsFooter from "./DetailsFooter.jsx";

export default function DetailsView({ data, mediaType, id }) {
  const router = useRouter();

  const title = data.title || data.name;
  const year = (data.release_date || data.first_air_date || "").slice(0, 4);
  const runtime = data.runtime
    ? `${data.runtime} min`
    : data.episode_run_time?.[0]
      ? `${data.episode_run_time[0]} min/ep`
      : null;
  const cast = data.credits?.cast?.slice(0, 6) || [];

  const director =
    mediaType === "tv"
      ? data.created_by?.map((c) => c.name).join(", ") || null
      : data.credits?.crew?.find((c) => c.job === "Director")?.name || null;

  const productionCompanies =
    data.production_companies?.map((c) => c.name).join(", ") || null;

  const recommendations = data.recommendations?.results?.slice(0, 8) || [];

  return (
    <motion.div
      className="min-h-screen bg-[#141414] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop hero */}
      <div className="relative w-full h-[70vh] md:h-[85vh]">
        <motion.img
          layoutId={`poster-${mediaType}-${id}`}
          src={getImageUrl(data.backdrop_path, "w1280")}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 pb-10 md:pb-16">
            <motion.div
              className="max-w-[650px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <h1 className="text-3xl md:text-6xl font-bold mb-3 drop-shadow-lg">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-5">
                {year && <span>{year}</span>}
                {runtime && <span>· {runtime}</span>}
                {data.vote_average > 0 && (
                  <span className="flex items-center gap-1 text-[#C026D3] font-semibold">
                    ★ {data.vote_average.toFixed(1)}
                  </span>
                )}
                {data.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="px-2 py-0.5 bg-[#2a2a2a]/80 rounded-full text-xs"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-200 leading-relaxed mb-8 drop-shadow-md line-clamp-4 md:line-clamp-none">
                {data.overview || "No description available."}
              </p>

              <button className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-200 text-black rounded-lg font-semibold transition-colors duration-200">
                <Play size={18} fill="black" />
                Play
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {cast.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Cast</h2>
            <div className="flex flex-wrap gap-4">
              {cast.map((person) => (
                <div key={person.id} className="w-20 text-center">
                  <img
                    src={
                      person.profile_path
                        ? getImageUrl(person.profile_path, "w185")
                        : "https://via.placeholder.com/185x278?text=?"
                    }
                    alt={person.name}
                    className="w-20 h-20 object-cover rounded-full mb-2"
                  />
                  <p className="text-xs text-gray-300 truncate">
                    {person.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 border-t border-white/10 pt-8">
          {director && (
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                {mediaType === "tv" ? "Created By" : "Director"}
              </p>
              <p className="text-white text-sm">{director}</p>
            </div>
          )}
          {data.status && (
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Status
              </p>
              <p className="text-white text-sm">{data.status}</p>
            </div>
          )}
          {data.budget > 0 && (
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Budget
              </p>
              <p className="text-white text-sm">
                ${data.budget.toLocaleString()}
              </p>
            </div>
          )}
          {data.revenue > 0 && (
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Revenue
              </p>
              <p className="text-white text-sm">
                ${data.revenue.toLocaleString()}
              </p>
            </div>
          )}
          {data.original_language && (
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Original Language
              </p>
              <p className="text-white text-sm uppercase">
                {data.original_language}
              </p>
            </div>
          )}
          {productionCompanies && (
            <div className="col-span-2 sm:col-span-3">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Production
              </p>
              <p className="text-white text-sm">{productionCompanies}</p>
            </div>
          )}
        </div>

        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">More Like This</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-5">
              {recommendations.map((item) => {
                const recTitle = item.title || item.name;
                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      router.push(`/details/${mediaType}/${item.id}`)
                    }
                    className="text-left bg-transparent border-none cursor-pointer flex-shrink-0 w-32 sm:w-full group"
                  >
                    <img
                      src={getImageUrl(item.poster_path, "w342")}
                      alt={recTitle}
                      className="w-full aspect-[2/3] object-cover rounded-lg mb-2 group-hover:opacity-80 transition-opacity duration-200"
                      loading="lazy"
                    />
                    <p className="text-white text-sm font-medium truncate">
                      {recTitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <DetailsFooter />
    </motion.div>
  );
}
