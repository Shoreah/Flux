const items = [
  "Why Choose Flux?",
  "THOUSANDS OF TITLES",
  "NEW RELEASES WEEKLY",
  "WATCH ANYWHERE",
  "Why Choose Flux?",
  "STREAM IN 4K",
  "AWARD WINNERS",
  "ALL GENRES",
];

export default function Marquee() {
  const loopItems = [...items, ...items];

  return (
    <div className="w-full bg-[#1f1f1f] border-y border-white/5 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track flex items-center gap-2 sm:gap-3 whitespace-nowrap py-5 sm:py-6 md:py-8">
        {loopItems.map((text, i) => {
          const isBold = text === "Why Choose Flux?";
          return (
            <span key={i} className="flex items-center gap-2 sm:gap-3">
              <span
                className={
                  isBold
                    ? "font-bold text-[#C026D3] text-base sm:text-lg md:text-xl"
                    : "font-normal text-gray-400 text-xs sm:text-sm tracking-widest"
                }
              >
                {text}
              </span>
              <span className="text-[#C026D3] text-base sm:text-lg">•</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
