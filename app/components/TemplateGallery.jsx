import { fetchTrending, getImageUrl } from "../lib/tmdb.js";
import TrendingMarquee from "./TrendingMarquee.jsx";

const WIDTHS = [380, 300, 420, 340, 360, 320];

export default async function TemplateGallery() {
  const results = await fetchTrending();
  const movies = results.slice(0, 12).map((movie, i) => ({
    id: movie.id,
    title: movie.title,
    baseWidth: WIDTHS[i % WIDTHS.length],
    image: getImageUrl(movie.backdrop_path, "w780"),
    rating: movie.vote_average?.toFixed(1),
  }));

  return <TrendingMarquee movies={movies} />;
}
