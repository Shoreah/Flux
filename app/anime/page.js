import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  fetchPopularAnime,
  fetchTopRatedAnime,
  fetchAiringAnime,
  fetchAnimeMovies,
  getImageUrl,
} from "../lib/tmdb.js";
import Footer from "../components/Footer.jsx";

function AnimeRow({ title, slug, items }) {
  const filtered = items.filter((item) => item.poster_path).slice(0, 10);

  if (filtered.length === 0) return null;

  return (
    <section className="mb-14">
      <Link
        href={`/anime/${slug}`}
        className="group flex items-center gap-2 mb-5 w-fit"
      >
        <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#C026D3] transition-colors duration-200">
          {title}
        </h2>
        <ChevronRight
          size={20}
          className="text-gray-400 group-hover:text-[#C026D3] group-hover:translate-x-1 transition-all duration-200"
        />
      </Link>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filtered.map((item) => {
          const name = item.title || item.name;
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
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {item.vote_average > 0 && (
                  <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-[#C026D3] text-xs font-semibold px-2 py-0.5 rounded-full">
                    ★ {item.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              <p className="text-white font-semibold text-sm mt-2 truncate group-hover:text-[#C026D3] transition-colors duration-200">
                {name}
              </p>
              <p className="text-gray-400 text-xs">
                {item.media_type === "tv" ? "TV Show" : "Movie"}
                {year ? ` · ${year}` : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default async function AnimePage() {
  const [popular, topRated, airing, movies] = await Promise.all([
    fetchPopularAnime(),
    fetchTopRatedAnime(),
    fetchAiringAnime(),
    fetchAnimeMovies(),
  ]);

  return (
    <>
      <main className="min-h-screen bg-[#141414] px-4 md:px-10 py-16">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Anime
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-10">
          Everything animated, sorted by what actually matters
        </p>

        <AnimeRow title="Top Rated" slug="top-rated" items={topRated} />
        <AnimeRow title="Movies" slug="movies" items={movies} />
        <AnimeRow title="Popular" slug="popular" items={popular} />
        <AnimeRow title="Random" slug="now-airing" items={airing} />
      </main>
      <Footer />
    </>
  );
}
