import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MovieDetail({movies}) {
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);
  
  // Convert ID string from URL to number and find the movie
  const movie = movies.find((m) => m.id === parseInt(id));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!movie) return <div className="text-white p-10">Loading...</div>;
  console.log(movie)

  // Derive trailer URL — replace this with a real trailer fetch if needed
  const trailerUrl = `/trailers/top_gun_maverick.mp4`;

  return (
    <div className="relative w-full h-screen text-white">
      {/* Background */}
      {!showVideo ? (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Backdrop"
          className="absolute inset-0 w-full h-full object-cover brightness-75 transition duration-500"
        />
      ) : (
        <video
          src={trailerUrl}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover transition duration-500"
        />
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/30 flex items-center pl-12 pr-6">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <div className="text-sm text-gray-300 space-x-4">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span> {movie.vote_average.toFixed(1)} <span className="">★</span> </span>
            <span>{movie.genres?.[0]?.name}</span>
          </div>
          <p className="text-gray-200">{movie.overview}</p>

          <div className="flex space-x-4 mt-4">
            <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300">
              ▶ Play
            </button>
            <button className="bg-gray-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600">
              + My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}