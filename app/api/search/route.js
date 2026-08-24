import { searchMulti } from "../../lib/tmdb.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const results = await searchMulti(query);
  return Response.json(results);
}
