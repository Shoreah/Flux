import { notFound } from "next/navigation";
import { fetchAnimeCategory } from "../../lib/tmdb.js";
import InfiniteAnimeGrid from "../../components/InfiniteAnimeGrid.jsx";

const CATEGORY_LABELS = {
  "top-rated": "Top Rated",
  movies: "Movies",
  popular: "Popular",
  "now-airing": "Now Airing",
};

export default async function AnimeCategoryPage({ params }) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];

  if (!label) notFound();

  const { results, totalPages } = await fetchAnimeCategory(category, 1);

  return (
    <main className="min-h-screen bg-[#141414] px-4 md:px-10 py-16">
      <InfiniteAnimeGrid
        category={category}
        initialItems={results}
        totalPages={totalPages}
        label={label}
      />
    </main>
  );
}
