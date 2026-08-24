"use client";

import { useState } from "react";
import NowShowing from "./NowShowing.jsx";
import TopRated from "./TopRated.jsx";
import ComingSoon from "./ComingSoon.jsx";

const tabs = ["Now Showing", "Top Rated", "Coming Soon"];

export default function MoodTabs({ nowPlaying, topRated, upcoming }) {
  const [activeTab, setActiveTab] = useState("Now Showing");

  return (
    <div className="py-8 md:py-12">
      <h1 className="px-4 text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        What are you in the mood for?
      </h1>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4 sm:mt-8 sm:gap-3 md:mt-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 hover:scale-105 hover:cursor-pointer sm:px-6 sm:py-2.5 sm:text-sm md:px-8 md:py-3 ${
              activeTab === tab
                ? "bg-[#C026D3] text-white border-[#C026D3]"
                : "border-white/20 text-gray-400 hover:border-[#C026D3] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={activeTab === "Now Showing" ? "" : "hidden"}>
        <NowShowing movies={nowPlaying} />
      </div>
      <div className={activeTab === "Top Rated" ? "" : "hidden"}>
        <TopRated movies={topRated} />
      </div>
      <div className={activeTab === "Coming Soon" ? "" : "hidden"}>
        <ComingSoon movies={upcoming} />
      </div>
    </div>
  );
}
