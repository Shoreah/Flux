import { fetchMovieDetails, fetchTVDetails } from "../../../lib/tmdb.js";
import DetailsView from "../../../components/DetailsView.jsx";

export default async function DetailsPage({ params }) {
  const { mediaType, id } = await params;
  const fetcher = mediaType === "tv" ? fetchTVDetails : fetchMovieDetails;
  const data = await fetcher(id);

  if (!data || data.success === false) {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">Couldn't find that title.</p>
        <a
          href="/"
          className="px-6 py-2 bg-[#C026D3] hover:bg-[#a21caf] rounded-lg text-white font-semibold"
        >
          Back to Flux
        </a>
      </div>
    );
  }

  return <DetailsView data={data} mediaType={mediaType} id={id} />;
}
