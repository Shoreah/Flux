"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from "lucide-react";

const CARD_TITLES = [
  {
    title: "Arcane",
    poster: "/images/arcane.jpeg",
    type: "tv",
    src: "/videos/ArcaneVid.mp4",
  },
  {
    title: "Stranger Things",
    poster: "/images/StrangerThings.jpg",
    type: "tv",
    src: "/videos/StrangerVid.mp4",
  },
  {
    title: "Demon Slayer",
    poster: "/images/Demon.jpg",
    type: "tv",
    src: "/videos/Demon.mp4",
  },
  {
    title: "Hells Paradise",
    poster: "/images/hell.jpeg",
    type: "tv",
    src: "/videos/HellVid.mp4",
  },
  {
    title: "F1",
    poster: "/images/F1.jpg",
    type: "movie",
    src: "/videos/F1Vid.mp4",
  },
];

const DISPLAY_TITLES = {
  F1: "F1: The Movie",
  "Demon Slayer": "Demon Slayer",
  "Hells Paradise": "Hells Paradise",
  Arcane: "Arcane",
  "Stranger Things": "Stranger Things",
};

const CARD_LAYOUT = {
  center: { x: "0%", scale: 1, opacity: 1, zIndex: 30 },
  left: { x: "-38%", scale: 0.78, opacity: 0.85, zIndex: 20 },
  right: { x: "38%", scale: 0.78, opacity: 0.85, zIndex: 20 },
  hiddenLeft: { x: "-70%", scale: 0.65, opacity: 0, zIndex: 10 },
  hiddenRight: { x: "70%", scale: 0.65, opacity: 0, zIndex: 10 },
};

function VideoCard({ video, layout, opening, active, onClick }) {
  const localVideoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute left-1/2 top-0 w-[85%] sm:w-[75%] md:w-[62%] -translate-x-1/2 cursor-pointer"
      animate={{ ...layout, scale: opening ? 1.06 : layout.scale }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      style={{ zIndex: layout.zIndex }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        if (active && localVideoRef.current) {
          localVideoRef.current.currentTime = 0;
          localVideoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (localVideoRef.current) {
          localVideoRef.current.pause();
          localVideoRef.current.currentTime = 0;
        }
      }}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden rounded-[18px] md:rounded-[28px] bg-black shadow-2xl"
      >
        <div className="relative aspect-video">
          <motion.img
            src={video.poster}
            alt={video.title}
            animate={{
              scale: isHovered ? 1.02 : 1,
              opacity: active || (isHovered && active) ? 1 : 0.78,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            ref={localVideoRef}
            src={video.src}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered && active ? "opacity-100" : "opacity-0"
            }`}
          />
          <motion.div
            animate={{ scale: isHovered && active ? 1.02 : 1 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-[18px] md:rounded-[28px] bg-black shadow-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
            <h2 className="text-lg sm:text-2xl md:text-4xl font-bold">
              {video.title}
            </h2>
            <p className="mt-1 md:mt-3 max-w-md text-xs sm:text-sm md:text-lg text-white/80 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VideoCarousel() {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openingVideoId, setOpeningVideoId] = useState(null);

  const wheelLock = useRef(false);
  const carouselRef = useRef(null);
  const dragStartX = useRef(null);

  useEffect(() => {
    const fetchers = CARD_TITLES.map((item) =>
      fetch(
        `/api/title-search?title=${encodeURIComponent(item.title)}&type=${item.type}`,
      ).then((res) => res.json()),
    );

    Promise.all(fetchers).then((results) => {
      const mapped = results
        .map((result, i) => {
          if (!result) return null;
          return {
            id: result.id,
            type: CARD_TITLES[i].type,
            title: DISPLAY_TITLES[CARD_TITLES[i].title] || CARD_TITLES[i].title,
            description: result.overview,
            poster: CARD_TITLES[i].poster,
            src: CARD_TITLES[i].src,
          };
        })
        .filter(Boolean);
      setVideos(mapped);
    });
  }, []);

  const previous = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLock.current) return;
      if (Math.abs(e.deltaX) < 40) return;
      wheelLock.current = true;
      if (e.deltaX > 0) {
        next();
      } else {
        previous();
      }
      setTimeout(() => {
        wheelLock.current = false;
      }, 350);
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [next, previous]);

  const handleCardClick = (video, index) => {
    setActiveIndex(index);
    setOpeningVideoId(video.id);
    setTimeout(() => {
      setSelectedVideo(video);
      setOpeningVideoId(null);
    }, 180);
  };

  const getLayout = (index) => {
    const total = videos.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    switch (diff) {
      case 0:
        return CARD_LAYOUT.center;
      case -1:
        return CARD_LAYOUT.left;
      case 1:
        return CARD_LAYOUT.right;
      case -2:
        return CARD_LAYOUT.hiddenLeft;
      case 2:
        return CARD_LAYOUT.hiddenRight;
      default:
        return { opacity: 0, scale: 0.6, x: "0%", zIndex: 0 };
    }
  };

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[420px] sm:h-[560px] md:h-[760px]">
        <div className="w-[85%] sm:w-[75%] md:w-[62%] aspect-video bg-[#1f1f1f] animate-pulse rounded-[18px] md:rounded-[28px] border border-white/5" />
      </div>
    );
  }

  return (
    <>
      <section className="relative mx-auto flex h-[420px] sm:h-[560px] md:h-[760px] w-full max-w-[1500px] items-center justify-center overflow-hidden px-2 sm:px-4 md:px-8">
        <motion.div
          ref={carouselRef}
          className="relative h-[320px] sm:h-[440px] md:h-[600px] w-full"
          onPointerDown={(e) => {
            dragStartX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (dragStartX.current === null) return;
            const distance = e.clientX - dragStartX.current;
            dragStartX.current = null;
            if (Math.abs(distance) < 70) return;
            if (distance < 0) {
              next();
            } else {
              previous();
            }
          }}
        >
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              layout={getLayout(index)}
              opening={openingVideoId === video.id}
              active={index === activeIndex}
              onClick={() => handleCardClick(video, index)}
            />
          ))}

          <button
            onClick={previous}
            className="absolute left-1 sm:left-3 md:left-6 top-1/2 z-50 flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1f1f1f] border border-white/10 text-white hover:border-[#C026D3] hover:bg-[#C026D3]/20 hover:scale-105 transition-all duration-200"
          >
            <ChevronLeft size={18} className="sm:hidden" />
            <ChevronLeft size={22} className="hidden sm:block" />
          </button>

          <button
            onClick={next}
            className="absolute right-1 sm:right-3 md:right-6 top-1/2 z-50 flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1f1f1f] border border-white/10 text-white hover:border-[#C026D3] hover:bg-[#C026D3]/20 hover:scale-105 transition-all duration-200"
          >
            <ChevronRight size={18} className="sm:hidden" />
            <ChevronRight size={22} className="hidden sm:block" />
          </button>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative w-full sm:w-[90%] md:w-[78%] max-w-4xl overflow-hidden rounded-[20px] md:rounded-[36px] bg-[#141414] border border-white/10"
              initial={{ opacity: 0, scale: 0.84, y: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, y: 20, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                mass: 0.9,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute right-3 top-3 md:right-5 md:top-5 z-10 rounded-full bg-[#2a2a2a] border border-white/10 p-2 md:p-3 text-white hover:border-[#C026D3] hover:bg-[#C026D3]/20 transition-all duration-200 hover:scale-110"
              >
                <X size={16} className="md:hidden" />
                <X size={20} className="hidden md:block" />
              </button>

              <video
                src={selectedVideo.src}
                autoPlay
                muted={muted}
                loop
                playsInline
                preload="none"
                className="aspect-video w-full"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 text-white">
                <div>
                  <h2 className="text-xl md:text-3xl font-bold">
                    {selectedVideo.title}
                  </h2>
                  <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-400 line-clamp-2">
                    {selectedVideo.description}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="rounded-full bg-[#C026D3]/20 border border-[#C026D3] p-2 md:p-3 text-white hover:bg-[#C026D3]/40 transition-all duration-200"
                  >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
