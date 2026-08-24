"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getImageUrl } from "../lib/tmdb.js";

export default function InfiniteAnimeGrid({
  category,
  initialItems,
  totalPages,
  label,
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading || page >= totalPages) return;
    setLoading(true);
    const nextPage = page + 1;
    try {
      const res = await fetch(`/api/anime/${category}?page=${nextPage}`);
      const data = await res.json();
      setItems((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more anime:", err);
    } finally {
      setLoading(false);
    }
  }, [category, page, totalPages, loading]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  const filtered = items.filter((item) => item.poster_path);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="group mb-4 flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back
        </button>
        {label && (
          <h1 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            {label}
          </h1>
        )}
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filtered.map((item) => {
          const name = item.title || item.name;
          const year = (item.release_date || item.first_air_date || "").slice(
            0,
            4,
          );

          return (
            <Link
              key={`${item.media_type}-${item.id}`}
              href={`/details/${item.media_type}/${item.id}`}
              className="group block"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1f1f1f]">
                <img
                  src={getImageUrl(item.poster_path, "w342")}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {item.vote_average > 0 && (
                  <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-[#C026D3] text-xs font-semibold px-2 py-0.5 rounded-full">
                    ★ {item.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              <p className="text-white font-semibold text-sm mt-2 truncate group-hover:text-[#C026D3] transition-colors duration-200">
                {name}
              </p>
              <p className="text-gray-400 text-xs">
                {item.media_type === "tv" ? "TV Show" : "Movie"}
                {year ? ` · ${year}` : ""}
              </p>
            </Link>
          );
        })}
      </div>

      {page < totalPages && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-[#C026D3] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
}
