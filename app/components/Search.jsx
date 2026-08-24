"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "../lib/tmdb.js";

export default function Search() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);
  const router = useRouter();

  const iconVisible = !focused && !value.trim();
  const showDropdown = focused && value.trim().length > 0;

  useEffect(() => {
    if (!value.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(value.trim())}`,
        );
        const data = await res.json();
        setResults(data.slice(0, 8));
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [value]);

  const goToDetails = (item) => {
    router.push(`/details/${item.media_type}/${item.id}`);
    setValue("");
    setResults([]);
    inputRef.current?.blur();
  };

  const handleSearch = () => {
    if (results.length > 0) {
      goToDetails(results[0]);
    } else {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") inputRef.current?.blur();
  };

  return (
    <div className="my-5 rounded-xl gap-3 md:gap-1 max-w-[1275px] w-auto mx-auto min-h-fit md:h-25 bg-[#1f1f1f] flex flex-col md:flex-row justify-evenly items-center px-3 md:px-1 py-3 md:py-0">
      <div ref={wrapperRef} className="relative w-full max-w-[980px]">
        <div
          className={`flex items-center shadow-xl bg-[#2a2a2a] rounded-xl h-16 md:h-20 pr-1.5 pl-2 py-1.5 transition-shadow duration-200 ${
            focused ? "ring-2 ring-[#C026D3]" : "ring-0"
          }`}
        >
          <div
            className={`flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              iconVisible
                ? "w-[36px] md:w-[42px] min-w-[36px] md:min-w-[42px] opacity-100"
                : "w-0 min-w-0 opacity-0"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 flex-shrink-0"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            placeholder="Search movies, shows, actors..."
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={handleKeyDown}
            aria-label="Search"
            className="font-bold flex-1 min-w-0 border-0 ring-0 focus:ring-0 focus:outline-none bg-transparent text-base md:text-2xl text-white px-2 md:px-3 h-11 caret-[#C026D3] placeholder:text-gray-500 placeholder:text-sm md:placeholder:text-[25px] placeholder:font-bold placeholder:truncate"
          />

          <button
            onClick={handleSearch}
            aria-label="Search"
            className="flex font-bold items-center gap-1.5 px-4 md:px-10 py-3 md:py-8 h-11 bg-[#C026D3] active:scale-[0.97] text-white text-sm font-medium rounded-lg flex-shrink-0 whitespace-nowrap transition-all duration-150 cursor-pointer border-none hover:bg-[#a21caf]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {showDropdown && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl shadow-2xl max-h-[420px] overflow-y-auto z-50">
            {loading && (
              <p className="text-gray-400 text-sm px-4 py-4">Searching...</p>
            )}
            {!loading && results.length === 0 && (
              <p className="text-gray-400 text-sm px-4 py-4">
                No results found
              </p>
            )}
            {!loading &&
              results.map((item) => {
                const title = item.title || item.name;
                const year = (
                  item.release_date ||
                  item.first_air_date ||
                  ""
                ).slice(0, 4);
                return (
                  <button
                    key={`${item.media_type}-${item.id}`}
                    onClick={() => goToDetails(item)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#2a2a2a] transition-colors duration-150 text-left border-none bg-transparent cursor-pointer"
                  >
                    <img
                      src={getImageUrl(item.poster_path, "w92")}
                      alt={title}
                      className="w-10 h-14 object-cover rounded-md flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.media_type === "tv" ? "TV Show" : "Movie"}
                        {year ? ` · ${year}` : ""}
                      </p>
                    </div>
                  </button>
                );
              })}
          </div>
        )}
      </div>

      <div className="group flex justify-center md:justify-evenly items-center gap-2 hover:bg-[#2a2a2a] hover:cursor-pointer rounded-xl w-full md:w-[250px] h-16 md:h-20 p-3 transition-all duration-300 flex-shrink-0">
        <p className="text-2xl">🔥</p>
        <div>
          <p className="font-semibold text-white group-hover:text-[#C026D3] transition-colors duration-300">
            Trending Now
          </p>
          <p className="text-sm text-gray-400">Updated daily on Flux</p>
        </div>
      </div>
    </div>
  );
}
