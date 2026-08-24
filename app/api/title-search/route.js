import { searchMovie, searchTV } from "../../lib/tmdb.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const type = searchParams.get("type");

  const result =
    type === "tv" ? await searchTV(title) : await searchMovie(title);
  return Response.json(result || null);
}
