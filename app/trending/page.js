import Link from "next/link";
import { fetchTrending, getImageUrl } from "../lib/tmdb.js";
import Footer from "../components/Footer.jsx";

export default async function TrendingPage() {
  const items = await fetchTrending();

  return (
    <>
      <main className="min-h-screen bg-[#141414] px-4 md:px-10 py-16">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Trending Now
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            What everyone's watching this week, movies and shows alike
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {items.map((item) => {
            const title = item.title || item.name;
            const year = (item.release_date || item.first_air_date || "").slice(
              0,
              4,
            );

            return (
              <Link
                key={`${item.media_type}-${item.id}`}
                href={`/details/${item.media_type}/${item.id}`}
                className="group block"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1f1f1f] border border-white/5 transition-all duration-300 group-hover:border-[#C026D3]/40 group-hover:shadow-[0_0_25px_rgba(192,38,211,0.15)]">
                  <img
                    src={getImageUrl(item.poster_path, "w342")}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.vote_average > 0 && (
                    <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-[#C026D3] text-xs font-semibold px-2 py-0.5 rounded-full">
                      ★ {item.vote_average.toFixed(1)}
                    </span>
                  )}
                  <span className="absolute top-2 left-2 bg-[#C026D3]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                    {item.media_type === "tv" ? "TV" : "Movie"}
                  </span>
                </div>
                <p className="text-white font-semibold text-sm mt-2 truncate group-hover:text-[#C026D3] transition-colors duration-200">
                  {title}
                </p>
                <p className="text-gray-400 text-xs">
                  {item.media_type === "tv" ? "TV Show" : "Movie"}
                  {year ? ` · ${year}` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
