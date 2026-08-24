"use client";

import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import DesktopIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import Email from "@mui/icons-material/EmailOutlined";
import ForumIcon from "@mui/icons-material/ForumOutlined";
import Phone from "@mui/icons-material/StayCurrentPortraitOutlined";

const features = [
  { icon: <LanguageIcon fontSize="small" />, label: "HD Streaming" },
  { icon: <DesktopIcon fontSize="small" />, label: "4K Ultra HD" },
  { icon: <Email fontSize="small" />, label: "Download & Watch Offline" },
  { icon: <ForumIcon fontSize="small" />, label: "Multiple Profiles" },
  { icon: <Phone fontSize="small" />, label: "Mobile App" },
];

export default function Overlap() {
  return (
    <div className="my-10">
      <h1 className="text-3xl md:text-5xl font-bold mx-5 my-5 text-white">
        Cinema, your way
      </h1>
      <div className="w-full max-w-[1320px] mx-auto relative lg:h-[560px]">
        <img
          src="/images/Overlap1.jpg"
          alt=""
          className="object-cover h-[280px] md:h-[380px] lg:h-[550px] w-full rounded-3xl"
        />

        <div className="relative lg:absolute mx-5 lg:mx-0 -mt-10 lg:mt-0 bg-[#1f1f1f] border border-white/10 w-auto lg:w-[55%] lg:top-12 lg:right-5 rounded-xl p-5 md:p-8 lg:p-10">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 md:mb-8 lg:mb-15 text-white leading-snug">
            "From pulse-pounding action to quiet indie gems — everything you
            love about film, all in one place."
          </p>

          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 font-semibold text-md">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex gap-3 items-center group hover:cursor-pointer"
                >
                  <div className="bg-[#2a2a2a] group-hover:bg-[#C026D3]/20 border border-white/5 group-hover:border-[#C026D3] rounded-lg w-9 h-9 flex items-center justify-center text-gray-400 group-hover:text-[#C026D3] transition-all duration-200 shrink-0">
                    {f.icon}
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-200">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden lg:block">
              <img
                src="/images/Overlap2.jpg"
                alt=""
                className="object-cover w-100 shrink-0 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
