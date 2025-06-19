import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MovieDetail({movies}) {
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  
  // Convert ID string from URL to number and find the movie
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50"></div>
      </div>
    );
  }

  // Derive trailer URL — replace this with a real trailer fetch if needed
  const trailerUrl = `/trailers/top_gun_maverick.mp4`;
  
  return (
    <div className="relative w-full h-screen text-white">
      {/* display spinner when image and video not loaded */}
      {!showVideo && !imageLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50"></div>
        </div>
      )}

      {/* Background */}
      {!showVideo ? (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Backdrop"
          className="absolute inset-0 w-full h-full object-cover brightness-75 transition duration-500"
          onLoad={() => setImageLoaded(true)}
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
          <p className="text-gray-200">{movie.overview} <a href="/" className="underline hover:text-white transition duration-200">[home]</a></p>

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