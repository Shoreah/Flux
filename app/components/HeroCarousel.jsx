"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const slides = [
  {
    id: 0,
    label: "TV Shows",
    type: "image",
    media: "/images/website.png",
    subtitle: "New Releases",
    title: "Your next favorite film is waiting",
    btnText: "Watch Now",
    showLearnMore: true,
  },

  {
    id: 1,
    label: "Movies",
    type: "video",
    media: "/videos/Domain.mp4",
    subtitle: "Now Trending",
    title: "Discover stories that move you",
    btnText: "Browse Movies",
    showLearnMore: false,
  },
];

const DURATION = 8000;

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const animationRef = useRef();
  const startTimeRef = useRef();
  const videoRef = useRef(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
    startTimeRef.current = performance.now();
  };

  const selectSlide = (index) => {
    setActiveSlide(index);
    setProgress(0);
    startTimeRef.current = performance.now();
  };

  useEffect(() => {
    startTimeRef.current = performance.now();

    const animate = (time) => {
      if (!paused) {
        const elapsed = time - startTimeRef.current;
        const percentage = (elapsed / DURATION) * 100;

        if (percentage >= 100) {
          nextSlide();
        } else {
          setProgress(percentage);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [activeSlide, paused]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (paused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [paused]);

  return (
    <section className="relative mx-3 my-5 h-[420px] overflow-hidden rounded-2xl sm:h-[480px] md:h-[550px] lg:h-[600px]">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={activeSlide === index ? videoRef : null}
                src={slide.media}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={slide.media}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div
        key={activeSlide}
        className="relative z-10 flex h-full flex-col items-center justify-center
                    px-4 pb-20 text-center text-white animate-[fadeIn_.5s_ease] sm:px-6 sm:pb-24 md:pb-16"
      >
        <p className="mb-2 text-sm font-medium sm:mb-3 sm:text-base md:mb-4 md:text-lg">
          {slides[activeSlide].subtitle}
        </p>

        <h1 className="max-w-xs text-2xl font-bold leading-tight sm:max-w-lg sm:text-3xl md:max-w-2xl md:text-4xl lg:max-w-3xl lg:text-5xl">
          {slides[activeSlide].title}
        </h1>

        <div className="mt-4 flex flex-col items-center gap-3 sm:mt-6 sm:flex-row sm:gap-4">
          <button className="rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-black sm:px-12 sm:py-3 sm:text-base md:px-16 md:py-4">
            {slides[activeSlide].btnText}
          </button>

          {slides[activeSlide].showLearnMore && (
            <button className="text-sm font-semibold sm:text-base">
              See What's New →
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 sm:bottom-6 sm:left-6 sm:gap-3 md:bottom-8 md:left-8">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;

          const isCompleted =
            (activeSlide === 0 && index === 1) ||
            (activeSlide === 1 && index === 0 && progress > 95);

          return (
            <button
              key={slide.id}
              onClick={() => selectSlide(index)}
              className="
                relative overflow-hidden rounded-full
                bg-white px-3 py-1
                text-xs font-semibold
                sm:px-4 sm:text-sm
                md:px-5
              "
            >
              <div
                className="absolute inset-0 bg-neutral-300"
                style={{
                  width: isActive
                    ? `${progress}%`
                    : isCompleted
                      ? "100%"
                      : "0%",
                }}
              />

              <span className="relative z-10 text-black">{slide.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setPaused((prev) => !prev)}
          className="
            flex h-6 w-6 items-center justify-center
            rounded-full bg-white/80
            backdrop-blur-md
            transition hover:bg-white
            sm:h-7 sm:w-7
            md:h-8 md:w-8
          "
        >
          {paused ? (
            <Play size={12} strokeWidth={1.5} />
          ) : (
            <Pause size={12} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </section>
  );
}
