const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  next: { revalidate: 3600 },
};

async function safeFetch(url, opts) {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) {
      console.error(`TMDB request failed: ${url} — status ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`TMDB request errored: ${url}`, err);
    return null;
  }
}

export async function fetchTrending() {
  const data = await safeFetch(`${BASE_URL}/trending/all/week`, options);
  return (
    data?.results?.filter(
      (r) => r.media_type === "movie" || r.media_type === "tv",
    ) || []
  );
}

export async function fetchNowPlaying() {
  const data = await safeFetch(`${BASE_URL}/movie/now_playing`, options);
  return data?.results || [];
}

export async function fetchUpcoming() {
  const data = await safeFetch(
    `${BASE_URL}/movie/upcoming?region=GB&language=en-US`,
    options,
  );
  return data?.results || [];
}

export async function fetchTopRated() {
  const data = await safeFetch(`${BASE_URL}/movie/top_rated`, options);
  return data?.results || [];
}

export function getImageUrl(path, size = "w780") {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function fetchThrillers() {
  const data = await safeFetch(
    `${BASE_URL}/discover/movie?with_genres=53&sort_by=popularity.desc`,
    options,
  );
  return data?.results || [];
}

export async function fetchMovieTrailer(movieId) {
  const data = await safeFetch(`${BASE_URL}/movie/${movieId}/videos`, options);
  return (
    data?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    null
  );
}

export async function searchMovie(query) {
  const data = await safeFetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );
  return data?.results?.[0] || null;
}

export async function searchTV(query) {
  const data = await safeFetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}`,
    options,
  );
  return data?.results?.[0] || null;
}

export async function fetchTVTrailer(seriesId) {
  const data = await safeFetch(`${BASE_URL}/tv/${seriesId}/videos`, options);
  return (
    data?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    null
  );
}

export async function searchMulti(query) {
  if (!query.trim()) return [];
  const data = await safeFetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false`,
    options,
  );
  return (
    data?.results?.filter(
      (r) =>
        (r.media_type === "movie" || r.media_type === "tv") && r.poster_path,
    ) || []
  );
}

export async function fetchMovieDetails(id) {
  return (
    (await safeFetch(
      `${BASE_URL}/movie/${id}?append_to_response=credits,videos,recommendations`,
      options,
    )) || null
  );
}

export async function fetchTVDetails(id) {
  return (
    (await safeFetch(
      `${BASE_URL}/tv/${id}?append_to_response=credits,videos,recommendations`,
      options,
    )) || null
  );
}
