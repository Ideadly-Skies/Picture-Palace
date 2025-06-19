import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=6b3e018d07a42e39065208f94be35ed3`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(true);
      }
    };

    fetchMovieDetail();

    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [id]);

  if (error) return <div className="text-white p-10">Error loading movie.</div>;
  if (!movie) return <div className="text-white p-10">Loading...</div>;

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
            <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
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
