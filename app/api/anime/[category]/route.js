import { NextResponse } from "next/server";
import { fetchAnimeCategory } from "../../../lib/tmdb.js";

export async function GET(request, { params }) {
  const { category } = await params;
  const page = Number(request.nextUrl.searchParams.get("page")) || 1;

  const data = await fetchAnimeCategory(category, page);
  return NextResponse.json(data);
}
