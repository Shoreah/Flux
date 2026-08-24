"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, Pause } from "lucide-react";

const PANELS = [
  {
    title: "Every Genre, Every Era",
    description:
      "Shonen, seinen, slice-of-life, classics from the 90s to this season's newest drops — it's all here, organized and ready to binge.",
    src: "/videos/Yuta.mp4",
  },
  {
    title: "Stream in HD & 4K",
    description:
      "Crisp animation deserves a crisp picture. Every frame, every fight scene, every detail — looking exactly as sharp as it should on any screen.",
    src: "/videos/120.mp4",
  },
  {
    title: "New Episodes Weekly",
    description:
      "Simulcasts and fresh episodes added on schedule. No spoilers, no waiting around — just caught up, every week.",
    src: "/videos/rengoku.mp4",
  },
];

export default function VideoShowcase() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.currentTime = 0;
        if (isPlaying) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      } else {
        video.pause();
      }
    });
  }, [active]);

  useEffect(() => {
    const current = videoRefs.current[active];
    if (!current) return;
    if (isPlaying) {
      current.play().catch(() => {});
    } else {
      current.pause();
    }
  }, [isPlaying]);

  const goToAnime = () => {
    router.push("/anime");
  };

  return (
    <div className="mx-auto w-full max-w-[1220px] p-4 font-sans sm:p-6">
      {/* Video stage */}
      <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-[#1f1f1f] shadow-xl sm:h-[320px] md:h-[380px] lg:h-[430px]">
        {PANELS.map((panel, i) => (
          <video
            key={panel.src}
            ref={(el) => (videoRefs.current[i] = el)}
            src={panel.src}
            muted
            loop
            playsInline
            autoPlay={i === active}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{
              opacity: i === active ? 1 : 0,
              zIndex: i === active ? 1 : 0,
            }}
          />
        ))}

        <button
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#C026D3]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C026D3] sm:bottom-4 sm:right-4 sm:h-9 sm:w-9"
        >
          {isPlaying ? (
            <Pause
              size={14}
              fill="currentColor"
              strokeWidth={0}
              className="sm:hidden"
            />
          ) : (
            <Play
              size={14}
              fill="currentColor"
              strokeWidth={0}
              className="ml-0.5 sm:hidden"
            />
          )}
          {isPlaying ? (
            <Pause
              size={16}
              fill="currentColor"
              strokeWidth={0}
              className="hidden sm:block"
            />
          ) : (
            <Play
              size={16}
              fill="currentColor"
              strokeWidth={0}
              className="ml-0.5 hidden sm:block"
            />
          )}
        </button>
      </div>

      {/* Controller cards */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 md:grid-cols-3">
        {PANELS.map((panel, i) => (
          <div
            key={panel.title}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 sm:p-5 ${
              active === i
                ? "bg-[#1f1f1f] border-[#C026D3] shadow-[0_0_20px_rgba(192,38,211,0.15)]"
                : "bg-transparent border-transparent hover:bg-[#1f1f1f] hover:border-white/10"
            }`}
          >
            <h3
              className={`mb-2 text-xl font-semibold transition-colors duration-300 sm:text-2xl md:text-3xl ${active === i ? "text-[#C026D3]" : "text-white"}`}
            >
              {panel.title}
            </h3>
            <p className="text-sm text-gray-400">{panel.description}</p>
          </div>
        ))}
      </div>

      <div className="my-8 flex justify-center sm:my-10">
        <button
          onClick={goToAnime}
          className="group mb-3 flex cursor-pointer items-center gap-0 rounded-full bg-[#C026D3] px-8 py-3 font-semibold text-white transition-all duration-300 hover:gap-2 hover:scale-105 hover:bg-[#a21caf] sm:px-12 sm:py-3.5 md:px-15 md:py-4"
        >
          Browse Anime
          <ArrowRight
            size={18}
            className="w-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:w-[18px] group-hover:translate-x-0 group-hover:opacity-100"
          />
        </button>
      </div>
    </div>
  );
}
