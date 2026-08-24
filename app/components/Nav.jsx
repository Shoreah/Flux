"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SiFluxer } from "react-icons/si";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Movies", id: "movies" },
  { label: "TV Shows", id: "tv-shows" },
  { label: "Anime", id: "anime" },
  { label: "Trending", id: "trending" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 80) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full bg-[#141414]/95 backdrop-blur-md border-b border-white/5 z-50"
    >
      <div className="flex items-center justify-between h-[76px] px-4 md:px-12">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 no-underline"
        >
          <SiFluxer size={34} className="text-white" />
          <span className="text-white font-bold text-2xl tracking-tight">
            Flux
          </span>
        </Link>

        {/* 4 nav links — hidden below md */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleLinkClick(id)}
              className="relative text-gray-400 hover:text-white text-sm font-semibold transition-colors duration-200 cursor-pointer bg-transparent border-none group"
            >
              {label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#C026D3] rounded-full transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Auth buttons — hidden below md */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-6 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/60 hover:text-white transition-all duration-200 cursor-pointer bg-transparent">
            Sign In
          </button>
          <button className="px-6 py-2 rounded-full text-sm font-medium text-white bg-[#C026D3]/20 border border-[#C026D3] hover:bg-[#C026D3]/40 transition-all duration-200 cursor-pointer">
            Join Free
          </button>
        </div>

        {/* Hamburger — only below md */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#141414] border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-4 pb-6">
          {links.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleLinkClick(id)}
              className="text-left text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none pt-4"
            >
              {label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <button className="w-full px-5 py-2 rounded-full text-xs font-medium text-white border border-white/20 hover:border-white/60 transition-all duration-200 cursor-pointer bg-transparent">
              Sign In
            </button>
            <button className="w-full px-5 py-2 rounded-full text-xs font-medium text-white bg-[#C026D3]/20 border border-[#C026D3] hover:bg-[#C026D3]/40 transition-all duration-200 cursor-pointer">
              Join Free
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
