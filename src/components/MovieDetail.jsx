import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);

  // Mocked movie data — replace this with real API call if needed
  const movie = {
    title: "Mulan",
    year: 2020,
    duration: "1h 56m",
    genre: "Action",
    description: "A fearless young woman risks everything to become a warrior...",
    backdrop: "/images/mulan.jpg",
    trailer: "/trailers/top_gun_maverick.mp4",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2500); // 2.5s delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen text-white">
      {/* Background */}
      {!showVideo ? (
        <img
          src={movie.backdrop}
          alt="Backdrop"
          className="absolute inset-0 w-full h-full object-cover brightness-75 transition duration-500"
        />
      ) : (
        <video
          src={movie.trailer}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover transition duration-500"
        />
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent flex items-center pl-12 pr-6">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <div className="text-sm text-gray-300 space-x-4">
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
            <span>{movie.genre}</span>
          </div>
          <p className="text-gray-200">{movie.description}</p>

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
