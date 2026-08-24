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

export async function fetchPopularAnime() {
  const data = await safeFetch(
    `${BASE_URL}/discover/tv?with_genres=16&with_origin_country=JP&sort_by=popularity.desc`,
    options,
  );
  return data?.results?.map((r) => ({ ...r, media_type: "tv" })) || [];
}

export async function fetchTopRatedAnime() {
  const data = await safeFetch(
    `${BASE_URL}/discover/tv?with_genres=16&with_origin_country=JP&sort_by=vote_average.desc&vote_count.gte=200`,
    options,
  );
  return data?.results?.map((r) => ({ ...r, media_type: "tv" })) || [];
}

export async function fetchAiringAnime() {
  const data = await safeFetch(
    `${BASE_URL}/discover/tv?with_genres=16&with_origin_country=JP&air_date.lte=${new Date().toISOString().split("T")[0]}&sort_by=first_air_date.desc`,
    options,
  );
  return data?.results?.map((r) => ({ ...r, media_type: "tv" })) || [];
}

export async function fetchAnimeMovies() {
  const data = await safeFetch(
    `${BASE_URL}/discover/movie?with_genres=16&with_original_language=ja&sort_by=popularity.desc`,
    options,
  );
  return data?.results?.map((r) => ({ ...r, media_type: "movie" })) || [];
}

const ANIME_CATEGORY_QUERIES = {
  "top-rated": (page) =>
    `${BASE_URL}/discover/tv?with_genres=16&with_origin_country=JP&sort_by=vote_average.desc&vote_count.gte=200&page=${page}`,
  movies: (page) =>
    `${BASE_URL}/discover/movie?with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=${page}`,
  popular: (page) =>
    `${BASE_URL}/discover/tv?with_genres=16&with_origin_country=JP&sort_by=popularity.desc&page=${page}`,
  "now-airing": (page) =>
    `${BASE_URL}/discover/tv?with_genres=16&with_origin_country=JP&air_date.lte=${new Date().toISOString().split("T")[0]}&sort_by=first_air_date.desc&page=${page}`,
};

export async function fetchAnimeCategory(category, page = 1) {
  const buildUrl = ANIME_CATEGORY_QUERIES[category];
  if (!buildUrl) return { results: [], totalPages: 0 };

  const data = await safeFetch(buildUrl(page), options);
  const mediaType = category === "movies" ? "movie" : "tv";

  return {
    results: data?.results?.map((r) => ({ ...r, media_type: mediaType })) || [],
    totalPages: data?.total_pages || 0,
  };
}
