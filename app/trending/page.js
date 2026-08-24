import Link from "next/link";
import { fetchTrending, getImageUrl } from "../lib/tmdb.js";

export default async function TrendingPage() {
  const items = await fetchTrending();

  return (
    <main className="min-h-screen bg-[#141414] px-4 md:px-10 py-24">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">
        Trending Now
      </h1>

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
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1f1f1f]">
                <img
                  src={getImageUrl(item.poster_path, "w342")}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
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
  );
}
