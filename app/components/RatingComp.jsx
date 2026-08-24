"use client";

import dynamic from "next/dynamic";
const Rating = dynamic(() => import("./TrustRating.jsx"), { ssr: false });

export default function RatingComp() {
  return (
    <div className="mt-8 mb-16 md:mt-15 md:mb-30 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-3 text-sm text-center px-4">
      <p>
        Our customers say{" "}
        <span className="text-lg font-semibold">Excellent</span>
      </p>

      <div className="hidden md:block h-4 border-l border-gray-300" />

      <Rating />

      <p>
        4.4 out of 5 stars based on <span className="font-bold">136,815</span>{" "}
        reviews
      </p>

      <div className="hidden md:block h-4 border-l border-gray-300" />

      <p>TrustPilot</p>
    </div>
  );
}
