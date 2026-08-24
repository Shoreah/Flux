const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  next: { revalidate: 3600 },
};

export async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/week`, options);
  const data = await res.json();
  return data.results;
}

export async function fetchNowPlaying() {
  const res = await fetch(`${BASE_URL}/movie/now_playing`, options);
  const data = await res.json();
  return data.results;
}

export async function fetchUpcoming() {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?region=GB&language=en-US`,
    options,
  );
  const data = await res.json();
  return data.results;
}

export async function fetchTopRated() {
  const res = await fetch(`${BASE_URL}/movie/top_rated`, options);
  const data = await res.json();
  return data.results;
}

export function getImageUrl(path, size = "w780") {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function fetchThrillers() {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=53&sort_by=popularity.desc`,
    options,
  );
  const data = await res.json();
  return data.results;
}

export async function fetchMovieTrailer(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos`, options);
  const data = await res.json();
  return (
    data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    null
  );
}

export async function searchMovie(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );
  const data = await res.json();
  return data.results[0];
}

export async function searchTV(query) {
  const res = await fetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}`,
    options,
  );
  const data = await res.json();
  return data.results[0];
}

export async function fetchTVTrailer(seriesId) {
  const res = await fetch(`${BASE_URL}/tv/${seriesId}/videos`, options);
  const data = await res.json();
  return (
    data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    null
  );
}

export async function searchMulti(query) {
  if (!query.trim()) return [];
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false`,
    options,
  );
  const data = await res.json();
  return data.results.filter(
    (r) => (r.media_type === "movie" || r.media_type === "tv") && r.poster_path,
  );
}

export async function fetchMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?append_to_response=credits,videos,recommendations`,
    options,
  );
  return res.json();
}

export async function fetchTVDetails(id) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?append_to_response=credits,videos,recommendations`,
    options,
  );
  return res.json();
}
