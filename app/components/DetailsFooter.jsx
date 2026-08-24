export default function DetailsFooter() {
  return (
    <footer className="bg-[#111111] w-full border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white font-bold text-lg tracking-tight">
          Flux
        </span>

        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Use", "Cookies"].map((item) => (
            <button
              key={item}
              className="text-gray-500 text-xs hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
            >
              {item}
            </button>
          ))}
        </div>

        <p className="text-gray-600 text-xs">
          © 2026 Flux. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
