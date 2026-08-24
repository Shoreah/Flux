import { fetchNowPlaying, fetchTopRated, fetchUpcoming } from "../lib/tmdb.js";
import MoodTabs from "./MoodTabs.jsx";

export default async function ThreePages() {
  const [nowPlaying, topRated, upcoming] = await Promise.all([
    fetchNowPlaying(),
    fetchTopRated(),
    fetchUpcoming(),
  ]);

  return (
    <MoodTabs nowPlaying={nowPlaying} topRated={topRated} upcoming={upcoming} />
  );
}
