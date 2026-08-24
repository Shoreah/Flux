"use client";

import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import WidgetsIcon from "@mui/icons-material/Widgets";

export default function FiveBoxes() {
  return (
    <div className="w-full mb-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="mb-4 text-3xl font-bold text-white sm:mb-5 sm:text-4xl lg:text-5xl">
          Why Flux?
        </h1>
        <p className="text-sm text-gray-400 sm:text-base lg:text-lg">
          Thousands of titles, every genre, updated weekly — your cinema hub.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Card 1 */}
        <div className="flex min-h-[240px] flex-col justify-between gap-4 rounded-xl border border-white/5 bg-[#1f1f1f] px-5 py-5 transition-all duration-300 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] sm:min-h-[300px] sm:px-6 lg:h-[450px] lg:px-8 lg:py-6">
          <p className="text-lg font-semibold text-white sm:text-xl lg:text-3xl">
            Thousands of titles across every genre
          </p>
          <img
            src="/images/Fivebox1.webp"
            alt=""
            className="h-40 w-full rounded-lg object-cover sm:h-48 lg:h-64"
          />
        </div>

        {/* Card 2 */}
        <div className="flex min-h-[240px] flex-col justify-between gap-4 rounded-xl border border-white/5 bg-[#1f1f1f] px-5 py-5 transition-all duration-300 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] sm:min-h-[300px] sm:px-6 lg:h-[450px] lg:px-8 lg:py-6">
          <p className="text-lg font-semibold text-white sm:text-xl lg:text-3xl">
            New releases added every Friday
          </p>
          <img
            src="/images/Fivebox2.webp"
            alt=""
            className="h-40 w-full rounded-lg object-cover sm:h-48 lg:h-64"
          />
        </div>

        {/* Card 3 */}
        <div className="flex min-h-[180px] flex-col justify-center gap-4 rounded-xl border border-white/5 bg-[#1f1f1f] px-5 py-5 transition-all duration-300 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] sm:min-h-[220px] sm:px-6 lg:h-[450px] lg:px-10 lg:py-5">
          <LanguageIcon sx={{ fontSize: 50, color: "#C026D3" }} />
          <p className="text-lg font-semibold text-white sm:text-xl lg:text-3xl">
            Stream on any device, anytime
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex min-h-[180px] flex-col justify-center gap-4 rounded-xl border border-white/5 bg-[#1f1f1f] px-5 py-5 transition-all duration-300 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] sm:min-h-[220px] sm:px-6 lg:h-[450px] lg:px-10 lg:py-5">
          <WidgetsIcon sx={{ fontSize: 50, color: "#C026D3" }} />
          <p className="text-lg font-semibold text-white sm:text-xl lg:text-3xl">
            Curated picks from award-winning films
          </p>
        </div>

        {/* Card 5 */}
        <div className="flex flex-col items-start gap-4 rounded-xl border border-white/5 bg-[#1f1f1f] px-5 py-5 transition-all duration-300 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] sm:col-span-2 sm:flex-row sm:items-center sm:px-6 lg:h-[450px] lg:px-6 lg:py-5">
          <p className="text-lg font-semibold text-white sm:text-xl lg:text-3xl">
            Your watchlist, your way personalised just for you
          </p>
          <img
            src="/images/Fivebox3.webp"
            alt=""
            className="w-full max-w-[400px] rounded-md sm:w-1/2"
          />
        </div>
      </div>
    </div>
  );
}
