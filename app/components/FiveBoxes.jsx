"use client";

import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import WidgetsIcon from "@mui/icons-material/Widgets";

export default function FiveBoxes() {
  return (
    <div className="w-full mb-6 px-1 sm:px-2 lg:px-3">
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="mb-4 text-3xl font-bold text-white sm:mb-5 sm:text-4xl lg:text-5xl">
          Why Flux?
        </h1>
        <p className="text-sm text-gray-400 sm:text-base lg:text-lg">
          Thousands of titles, every genre, updated weekly — your cinema hub.
        </p>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 sm:gap-5 lg:gap-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {/* Card 1 */}
          <div className="h-[220px] flex flex-col justify-between rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] transition-all duration-300 px-4 py-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[450px] lg:px-10 lg:py-5">
            <p className="text-base font-semibold text-white sm:text-xl lg:text-3xl">
              Thousands of titles across every genre
            </p>
            <img src="/images/Fivebox1.webp" alt="" className="rounded-md" />
          </div>

          {/* Card 2 */}
          <div className="h-[220px] flex flex-col justify-between rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] transition-all duration-300 px-4 py-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[450px] lg:px-10 lg:py-5">
            <p className="text-base font-semibold text-white sm:text-xl lg:text-3xl">
              New releases added every Friday
            </p>
            <img src="/images/Fivebox2.webp" alt="" className="rounded-md" />
          </div>

          {/* Card 3 */}
          <div className="h-[220px] rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] transition-all duration-300 px-4 py-4 flex flex-col justify-center gap-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[450px] lg:px-10 lg:py-5">
            <LanguageIcon sx={{ fontSize: 50, color: "#C026D3" }} />
            <p className="font-semibold text-white sm:text-xl lg:text-3xl">
              Stream on any device, anytime
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {/* Card 4 */}
          <div className="h-[220px] rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] transition-all duration-300 px-4 py-4 flex flex-col justify-center gap-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[450px] lg:px-10 lg:py-5">
            <WidgetsIcon sx={{ fontSize: 50, color: "#C026D3" }} />
            <p className="font-semibold text-white sm:text-xl lg:text-3xl">
              Curated picks from award-winning films
            </p>
          </div>

          {/* Card 5 */}
          <div className="flex items-center col-span-2 h-[220px] rounded-xl bg-[#1f1f1f] border border-white/5 hover:border-[#C026D3]/40 hover:shadow-[0_0_25px_rgba(192,38,211,0.1)] transition-all duration-300 px-4 py-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[450px] lg:px-6 lg:py-5">
            <p className="text-base font-semibold text-white sm:text-xl lg:text-3xl">
              Your watchlist, your way personalised just for you
            </p>
            <img
              src="/images/Fivebox3.webp"
              alt=""
              className="w-1/2 max-w-[400px] rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
